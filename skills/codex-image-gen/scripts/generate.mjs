#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { parseGenerateArgs, printGenerateHelp } from "./lib/args.mjs";
import { runGenerateJob } from "./lib/generation.mjs";

export async function main(argv = process.argv.slice(2)) {
  const args = parseGenerateArgs(argv);
  if (args.help) {
    printGenerateHelp();
    return 0;
  }
  const result = await runGenerateJob(args);
  console.log(JSON.stringify(result, null, 2));
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`Error: ${error?.message || String(error)}`);
    process.exit(1);
  });
}
