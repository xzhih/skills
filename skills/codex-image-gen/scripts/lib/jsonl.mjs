import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { normalizeGenerateArgs } from "./args.mjs";

export async function readJsonl(path) {
  const text = await readFile(path, "utf8");
  const jobs = [];
  let lineNumber = 0;
  for (const line of text.split(/\r?\n/)) {
    lineNumber += 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    jobs.push(parseBatchJob(line, lineNumber));
  }
  return jobs;
}

export function parseBatchJob(line, lineNumber) {
  try {
    const job = JSON.parse(line);
    if (!job || typeof job !== "object" || Array.isArray(job)) {
      throw new Error("job must be a JSON object");
    }
    return { ...job, lineNumber };
  } catch (error) {
    throw new Error(`JSONL line ${lineNumber}: ${error.message}`);
  }
}

export function mergeBatchArgs(globalArgs, jobArgs) {
  const raw = { ...jobArgs };
  delete raw.lineNumber;

  for (const key of globalArgs.provided || []) {
    if (key === "outDir") continue;
    raw[key] = globalArgs[key];
  }
  if (globalArgs.force) raw.force = true;
  if (globalArgs.dryRun) raw.dryRun = true;

  if ((globalArgs.provided || []).includes("outDir")) {
    raw.out = undefined;
    raw.outDir = globalArgs.outDir;
    raw.outputStem = raw.outputStem || raw.output_stem || `job-${jobArgs.lineNumber}`;
  }

  const args = normalizeGenerateArgs(raw, {
    defaultOut: false,
    requirePrompt: true,
    requireOutput: true,
  });
  return { ...args, lineNumber: jobArgs.lineNumber };
}

export function batchOutputPath(outDir, lineNumber, ext = "png") {
  return join(outDir, `job-${lineNumber}.${ext}`);
}
