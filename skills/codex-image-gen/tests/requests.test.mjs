import test from "node:test";
import assert from "node:assert/strict";
import { validateProviderSupport } from "../scripts/lib/requests.mjs";

const transparentArgs = {
  background: "transparent",
  api: "images",
  mask: undefined,
  inputFidelity: "auto",
};

test("native transparency rejects the private ChatGPT route", () => {
  assert.throws(
    () => validateProviderSupport(transparentArgs, { mode: "chatgpt" }),
    /requires --mode apikey/,
  );
});

test("native transparency accepts the public Images API path", () => {
  assert.doesNotThrow(
    () => validateProviderSupport(transparentArgs, { mode: "apikey" }),
  );
});

test("native transparency rejects the Responses API path", () => {
  assert.throws(
    () => validateProviderSupport({ ...transparentArgs, api: "responses" }, { mode: "apikey" }),
    /requires --api images/,
  );
});
