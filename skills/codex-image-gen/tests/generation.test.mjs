import test from "node:test";
import assert from "node:assert/strict";
import { sizeMismatchWarning } from "../scripts/lib/generation.mjs";

test("size mismatch warning names smaller outputs", () => {
  assert.match(sizeMismatchWarning("3840x2160", "1536x1024"), /smaller image/);
});

test("size mismatch warning names larger outputs", () => {
  assert.match(sizeMismatchWarning("1024x1024", "1254x1254"), /larger image/);
});

test("size mismatch warning names aspect-only differences", () => {
  assert.match(sizeMismatchWarning("1024x2048", "2048x1024"), /different-aspect image/);
});
