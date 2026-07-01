import { readFile } from "node:fs/promises";

export async function resolvePrompt(args) {
  if (args.prompt && args.promptFile) throw new Error("--prompt and --prompt-file are mutually exclusive");
  const prompt = args.promptFile ? await readFile(args.promptFile, "utf8") : args.prompt;
  const normalized = normalizePromptText(prompt || "");
  if (!normalized) throw new Error("prompt is empty");
  return { ...args, prompt: normalized };
}

export function normalizePromptText(text) {
  return String(text).trim();
}
