import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mergeBatchArgs, parseBatchJob, readJsonl } from "../scripts/lib/jsonl.mjs";

test("valid JSONL loads multiple jobs and ignores comments", async () => {
  const dir = await mkdtemp(join(tmpdir(), "codex-image-gen-jsonl-"));
  const file = join(dir, "jobs.jsonl");
  try {
    await writeFile(file, [
      "# comment",
      "",
      "{\"prompt\":\"A\",\"out\":\"a.png\"}",
      "{\"prompt\":\"B\",\"out\":\"b.png\"}",
    ].join("\n"));
    const jobs = await readJsonl(file);
    assert.equal(jobs.length, 2);
    assert.equal(jobs[0].lineNumber, 3);
    assert.equal(jobs[1].lineNumber, 4);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("invalid JSON reports line number", () => {
  assert.throws(() => parseBatchJob("{", 7), /line 7/);
});

test("CLI overrides apply to operational fields", () => {
  const args = mergeBatchArgs(
    {
      provided: ["outDir", "mode", "api", "imageModel", "timeout"],
      outDir: "build/batch",
      mode: "apikey",
      api: "responses",
      imageModel: "gpt-image-2",
      timeout: 12,
      force: true,
      dryRun: true,
    },
    {
      lineNumber: 9,
      prompt: "A",
      out: "ignored.png",
      mode: "chatgpt",
      api: "images",
    },
  );
  assert.equal(args.outDir, "build/batch");
  assert.equal(args.out, undefined);
  assert.equal(args.outputStem, "job-9");
  assert.equal(args.mode, "apikey");
  assert.equal(args.api, "responses");
  assert.equal(args.timeout, 12);
  assert.equal(args.force, true);
  assert.equal(args.dryRun, true);
});

test("prompt and output requirements are enforced", () => {
  assert.throws(() => mergeBatchArgs({ provided: [] }, { lineNumber: 1, out: "a.png" }), /prompt/);
  assert.throws(() => mergeBatchArgs({ provided: [] }, { lineNumber: 1, prompt: "A" }), /out/);
});
