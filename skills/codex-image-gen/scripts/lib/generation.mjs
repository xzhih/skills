import { describeDryRunAuth, resolveAuth } from "./auth.mjs";
import { imageAction } from "./args.mjs";
import { resolvePrompt } from "./prompt.mjs";
import {
  buildRequestPreview,
  runImagesApiKey,
  runImagesChatgpt,
  runResponsesApiKey,
  runResponsesChatgpt,
  validateProviderSupport,
} from "./requests.mjs";
import { resolveOutputTargets, saveImages } from "./output_paths.mjs";

export async function runGenerateJob(inputArgs) {
  const args = await resolvePrompt(inputArgs);
  if (args.dryRun) return dryRunGenerateJob(args);

  const auth = await resolveAuth(args.mode);
  validateProviderSupport(args, auth);
  await resolveOutputTargets(args, args.n, args.format);

  const started = Date.now();
  console.error(`[${args.api}/${auth.mode}] via ${auth.label} -- size=${args.size} quality=${args.quality} format=${args.format} n=${args.n} ...`);
  const images = [];
  for (let i = 0; i < args.n; i += 1) {
    if (args.n > 1) console.error(`  image ${i + 1}/${args.n} ...`);
    if (args.api === "images") {
      images.push(...(auth.mode === "chatgpt" ? await runImagesChatgpt(args) : await runImagesApiKey(args, auth)));
    } else {
      images.push(...(auth.mode === "chatgpt" ? await runResponsesChatgpt(args) : await runResponsesApiKey(args, auth)));
    }
  }
  const files = await saveImages(images, args);
  printFileSummaries(files, args, auth.mode);
  return {
    dry_run: false,
    mode: auth.mode,
    api: args.api,
    saved: files.map((file) => file.path),
    files: files.map(({ metadata, ...file }) => file),
    size: files[0]?.actual_size || images[0]?.size || args.size,
    requested_size: args.size,
    quality: images[0]?.quality || args.quality,
    output_format: files[0]?.format || images[0]?.output_format || args.format,
    elapsed_s: Math.round((Date.now() - started) / 100) / 10,
  };
}

export async function dryRunGenerateJob(args) {
  const auth = describeDryRunAuth(args.mode);
  validateProviderSupport(args, auth);
  const request = await buildRequestPreview(args);
  return {
    dry_run: true,
    mode: auth.mode,
    auth: auth.label,
    api: args.api,
    action: imageAction(args),
    model: args.model,
    image_model: args.imageModel,
    requested_size: args.size,
    quality: args.quality,
    format: args.format,
    output: args.out || null,
    out_dir: args.outDir || null,
    force: Boolean(args.force),
    request,
  };
}

export function printFileSummaries(files, args, authMode) {
  for (const file of files) {
    console.error(`saved ${file.path} requested=${args.size} actual=${file.actual_size || "unknown"} format=${file.format} api=${args.api} mode=${authMode}`);
    if (file.actual_size && args.size !== "auto" && file.actual_size !== args.size) {
      console.error(sizeMismatchWarning(args.size, file.actual_size));
    }
    if (file.downscale?.path) {
      console.error(`downscaled ${file.downscale.path} max_dim=${file.downscale.max_dim} tool=${file.downscale.tool}`);
    } else if (file.downscale?.skipped) {
      console.error(`downscale skipped: ${file.downscale.reason}`);
    }
  }
}

export function sizeMismatchWarning(requested, actual) {
  const requestedSize = parseSize(requested);
  const actualSize = parseSize(actual);
  let relation = "different-sized";
  if (requestedSize && actualSize) {
    const requestedPixels = requestedSize.width * requestedSize.height;
    const actualPixels = actualSize.width * actualSize.height;
    if (actualPixels < requestedPixels) relation = "smaller";
    else if (actualPixels > requestedPixels) relation = "larger";
    else relation = "different-aspect";
  }
  return `Warning: requested ${requested} but saved ${actual}. The selected provider accepted the request but returned a ${relation} image.`;
}

function parseSize(size) {
  const match = /^(\d+)x(\d+)$/i.exec(String(size || ""));
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}
