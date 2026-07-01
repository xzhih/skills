import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ensureWritableOutput, outputPath, resolveOutputTargets } from "../scripts/lib/output_paths.mjs";

test("single image uses exact out path", () => {
  assert.equal(outputPath("build/out.png", "png", 1, 0), "build/out.png");
});

test("multiple images append indexes", () => {
  assert.equal(outputPath("build/out.png", "png", 2, 0), "build/out-1.png");
  assert.equal(outputPath("build/out.png", "png", 2, 1), "build/out-2.png");
});

test("out-dir creates deterministic names", async () => {
  const dir = await mkdtemp(join(tmpdir(), "codex-image-gen-out-"));
  try {
    const paths = await resolveOutputTargets({ outDir: dir, outputStem: "job-7", format: "png" }, 2, "png");
    assert.deepEqual(paths, [join(dir, "job-7-1.png"), join(dir, "job-7-2.png")]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("existing output rejects without force", async () => {
  const dir = await mkdtemp(join(tmpdir(), "codex-image-gen-force-"));
  const file = join(dir, "out.png");
  try {
    await writeFile(file, "x");
    await assert.rejects(() => ensureWritableOutput(file, { force: false }), /already exists/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("existing output passes with force", async () => {
  const dir = await mkdtemp(join(tmpdir(), "codex-image-gen-force-"));
  const file = join(dir, "out.png");
  try {
    await writeFile(file, "x");
    await assert.doesNotReject(() => ensureWritableOutput(file, { force: true }));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
