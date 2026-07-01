import test from "node:test";
import assert from "node:assert/strict";
import { parseGenerateArgs, validateSize } from "../scripts/lib/args.mjs";

test("existing flags parse correctly", () => {
  const args = parseGenerateArgs([
    "--prompt", "small blue square",
    "--out", "build/out.png",
    "--size", "1024x1024",
    "--quality", "low",
    "--format", "png",
    "--action", "generate",
    "--api", "images",
    "--mode", "auto",
    "--n", "2",
    "--timeout", "10",
  ]);
  assert.equal(args.prompt, "small blue square");
  assert.equal(args.out, "build/out.png");
  assert.equal(args.size, "1024x1024");
  assert.equal(args.n, 2);
  assert.equal(args.timeout, 10);
});

test("prompt and prompt-file conflict", () => {
  assert.throws(() => parseGenerateArgs(["--prompt", "x", "--prompt-file", "prompt.txt"]), /mutually exclusive/);
});

test("out and out-dir conflict", () => {
  assert.throws(() => parseGenerateArgs(["--prompt", "x", "--out", "a.png", "--out-dir", "build"]), /mutually exclusive/);
});

test("documented custom sizes validate", () => {
  for (const size of ["3840x2160", "2160x3840", "2048x2048", "2048x1536", "2048x1152"]) {
    assert.doesNotThrow(() => validateSize(size));
  }
});

test("invalid sizes are rejected", () => {
  assert.throws(() => validateSize("4096x4096"), /longest edge/);
  assert.throws(() => validateSize("1000x1000"), /divisible by 16/);
  assert.throws(() => validateSize("512x512"), /total pixels/);
});

test("mask requires an edit input", () => {
  assert.throws(() => parseGenerateArgs(["--prompt", "x", "--mask", "mask.png", "--action", "generate"]), /requires edit action/);
  assert.throws(() => parseGenerateArgs(["--prompt", "x", "--mask", "mask.png", "--action", "edit"]), /requires at least one/);
});
