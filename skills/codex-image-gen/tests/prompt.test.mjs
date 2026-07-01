import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { normalizePromptText, resolvePrompt } from "../scripts/lib/prompt.mjs";

test("prompt file is read and trimmed", async () => {
  const dir = await mkdtemp(join(tmpdir(), "codex-image-gen-prompt-"));
  const file = join(dir, "prompt.txt");
  try {
    await writeFile(file, "  hello image  \n");
    const args = await resolvePrompt({ promptFile: file });
    assert.equal(args.prompt, "hello image");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("multiline prompt is preserved", async () => {
  const text = "Title: 产品路线图\nSubtitle: Product Roadmap";
  assert.equal(normalizePromptText(`\n${text}\n`), text);
});

test("empty prompt file is rejected", async () => {
  const dir = await mkdtemp(join(tmpdir(), "codex-image-gen-prompt-"));
  const file = join(dir, "prompt.txt");
  try {
    await writeFile(file, " \n\t");
    await assert.rejects(() => resolvePrompt({ promptFile: file }), /empty/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("prompt is not automatically expanded", async () => {
  const args = await resolvePrompt({ prompt: "A red square" });
  assert.equal(args.prompt, "A red square");
});
