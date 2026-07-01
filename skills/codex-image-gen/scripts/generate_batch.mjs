#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { parseBatchArgs, printBatchHelp } from "./lib/args.mjs";
import { readJsonl, mergeBatchArgs } from "./lib/jsonl.mjs";
import { runGenerateJob } from "./lib/generation.mjs";

export async function main(argv = process.argv.slice(2)) {
  const globalArgs = parseBatchArgs(argv);
  if (globalArgs.help) {
    printBatchHelp();
    return 0;
  }
  const rawJobs = await readJsonl(globalArgs.input);
  const jobs = rawJobs.map((job) => mergeBatchArgs(globalArgs, job));
  const result = await runBatch(jobs, globalArgs);
  printBatchSummary(result);
  if (result.failed.length) return 1;
  return 0;
}

export async function runBatch(jobs, globalArgs) {
  const succeeded = [];
  const failed = [];
  const skipped = [];
  let nextIndex = 0;
  let stopScheduling = false;
  const concurrency = Math.min(globalArgs.concurrency, jobs.length || 1);

  async function worker() {
    while (nextIndex < jobs.length && !stopScheduling) {
      const index = nextIndex;
      nextIndex += 1;
      const job = jobs[index];
      try {
        const result = await runWithRetries(job, globalArgs.maxAttempts);
        succeeded.push({ index: index + 1, lineNumber: job.lineNumber, result });
      } catch (error) {
        failed.push({ index: index + 1, lineNumber: job.lineNumber, error: error?.message || String(error) });
        if (globalArgs.failFast) stopScheduling = true;
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  if (stopScheduling && nextIndex < jobs.length) {
    for (let i = nextIndex; i < jobs.length; i += 1) {
      skipped.push({ index: i + 1, lineNumber: jobs[i].lineNumber });
    }
  }
  return { succeeded: sortByIndex(succeeded), failed: sortByIndex(failed), skipped: sortByIndex(skipped) };
}

async function runWithRetries(job, maxAttempts) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await runGenerateJob(job);
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) await sleep(backoffMs(attempt));
    }
  }
  throw lastError;
}

function printBatchSummary(result) {
  console.log(`Batch complete: ${result.succeeded.length} succeeded, ${result.failed.length} failed, ${result.skipped.length} skipped`);
  if (result.succeeded.length) {
    console.log("Succeeded:");
    for (const item of result.succeeded) {
      const saved = item.result.saved?.join(", ") || "(dry-run)";
      const size = item.result.files?.[0]?.actual_size || item.result.requested_size || "unknown";
      console.log(`  [${item.index}] ${saved} ${size}`);
    }
  }
  if (result.failed.length) {
    console.log("Failed:");
    for (const item of result.failed) {
      console.log(`  [${item.index}] line ${item.lineNumber}: ${item.error}`);
    }
  }
  if (result.skipped.length) {
    console.log("Skipped:");
    for (const item of result.skipped) {
      console.log(`  [${item.index}] line ${item.lineNumber}`);
    }
  }
}

function backoffMs(attempt) {
  return Math.round(500 * (2 ** (attempt - 1)) + Math.random() * 250);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sortByIndex(items) {
  return items.sort((a, b) => a.index - b.index);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => {
    process.exit(code);
  }).catch((error) => {
    console.error(`Error: ${error?.message || String(error)}`);
    process.exit(1);
  });
}
