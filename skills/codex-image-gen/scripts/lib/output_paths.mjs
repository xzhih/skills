import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { readImageMetadata } from "./image_meta.mjs";

export async function ensureWritableOutput(targetPath, options = {}) {
  if (existsSync(targetPath) && !options.force) {
    throw new Error(`output already exists: ${targetPath} (use --force to overwrite)`);
  }
  await mkdir(dirname(targetPath), { recursive: true });
}

export async function resolveOutputTargets(args, imageCount, fallbackFormat) {
  const ext = normalizeExt(fallbackFormat || args.format || "png");
  const paths = [];
  for (let i = 0; i < imageCount; i += 1) {
    const target = args.outDir
      ? outDirPath(args.outDir, args.outputStem || "image", ext, imageCount, i)
      : outputPath(args.out, ext, imageCount, i);
    await ensureWritableOutput(target, { force: args.force });
    paths.push(target);
  }
  return paths;
}

export function outputPath(out, ext, count, index) {
  const normalizedExt = normalizeExt(ext);
  if (count === 1) return extname(out) ? out : `${out}.${normalizedExt}`;
  const dir = dirname(out);
  const stem = basename(out, extname(out)) || "image";
  return join(dir, `${stem}-${index + 1}.${normalizedExt}`);
}

export async function saveImages(images, args) {
  if (!images.length) throw new Error("no image returned");
  const fallbackExt = images[0].output_format || args.format || "png";
  const targets = await resolveOutputTargets(args, images.length, fallbackExt);
  const files = [];
  for (let i = 0; i < images.length; i += 1) {
    const buffer = Buffer.from(images[i].result, "base64");
    const meta = readImageMetadata(buffer);
    await writeFile(targets[i], buffer);
    const downscale = await maybeDownscale(targets[i], meta, args);
    files.push({
      path: targets[i],
      requested_size: args.size,
      actual_size: meta.width && meta.height ? `${meta.width}x${meta.height}` : null,
      format: meta.format === "unknown" ? (images[i].output_format || args.format) : meta.format,
      metadata: meta,
      downscale,
    });
  }
  return files;
}

async function maybeDownscale(path, meta, args) {
  if (!args.downscaleMaxDim || !meta?.width || !meta?.height) return null;
  const maxDim = Math.max(meta.width, meta.height);
  if (maxDim <= args.downscaleMaxDim) return null;
  const suffix = args.downscaleSuffix || "-downscaled";
  const ext = extname(path);
  const out = join(dirname(path), `${basename(path, ext)}${suffix}${ext}`);
  if (existsSync(out) && !args.force) {
    return { skipped: true, reason: `downscale output already exists: ${out}` };
  }
  const resizer = findResizer();
  if (!resizer) {
    return { skipped: true, reason: "no local resizer found (checked sips, magick, convert)" };
  }
  await ensureWritableOutput(out, { force: args.force });
  const result = runResize(resizer, path, out, args.downscaleMaxDim);
  if (result.status !== 0) {
    return { skipped: true, reason: `${resizer} failed: ${String(result.stderr || result.stdout || "").slice(0, 200)}` };
  }
  return { path: out, max_dim: args.downscaleMaxDim, tool: resizer };
}

function outDirPath(outDir, stem, ext, count, index) {
  if (count === 1) return join(outDir, `${stem}.${normalizeExt(ext)}`);
  return join(outDir, `${stem}-${index + 1}.${normalizeExt(ext)}`);
}

function normalizeExt(ext) {
  return String(ext || "png").replace(/^\./, "") || "png";
}

function findResizer() {
  for (const command of ["sips", "magick", "convert"]) {
    const result = spawnSync(command, ["--version"], { encoding: "utf8" });
    if (result.status === 0) return command;
  }
  return null;
}

function runResize(tool, input, output, maxDim) {
  if (tool === "sips") {
    return spawnSync("sips", ["-Z", String(maxDim), input, "--out", output], { encoding: "utf8" });
  }
  if (tool === "magick") {
    return spawnSync("magick", [input, "-resize", `${maxDim}x${maxDim}>`, output], { encoding: "utf8" });
  }
  return spawnSync("convert", [input, "-resize", `${maxDim}x${maxDim}>`, output], { encoding: "utf8" });
}
