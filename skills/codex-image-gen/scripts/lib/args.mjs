export const MAX_EDGE = 3840;
export const MIN_PIXELS = 655_360;
export const MAX_PIXELS = 8_294_400;
export const MAX_RATIO = 3.0;

const GENERATE_DEFAULTS = {
  size: "1024x1024",
  quality: "low",
  format: "png",
  action: "auto",
  n: 1,
  api: "images",
  mode: "auto",
  model: "gpt-5.5",
  imageModel: "gpt-image-2",
  timeout: 300,
  inputImage: [],
  inputFidelity: "auto",
  downscaleSuffix: "-downscaled",
};

const BATCH_DEFAULTS = {
  concurrency: 2,
  maxAttempts: 1,
  failFast: false,
  dryRun: false,
  force: false,
};

export function parseGenerateArgs(argv, options = {}) {
  const raw = parseGenerateArgv(argv);
  if (raw.help) return raw;
  return normalizeGenerateArgs(raw, {
    defaultOut: true,
    requirePrompt: true,
    requireOutput: false,
    ...options,
  });
}

export function parseBatchArgs(argv) {
  const args = { ...BATCH_DEFAULTS, provided: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      i += 1;
      if (i >= argv.length) throw new Error(`${arg} requires a value`);
      return argv[i];
    };
    if (arg === "--help" || arg === "-h") return { help: true };
    if (arg === "--input") args.input = next();
    else if (arg === "--concurrency") args.concurrency = Number(next());
    else if (arg === "--max-attempts") args.maxAttempts = Number(next());
    else if (arg === "--fail-fast") args.failFast = true;
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--out-dir") markProvided(args, "outDir", next());
    else if (arg === "--mode") markProvided(args, "mode", next());
    else if (arg === "--api") markProvided(args, "api", next());
    else if (arg === "--model") markProvided(args, "model", next());
    else if (arg === "--image-model") markProvided(args, "imageModel", next());
    else if (arg === "--timeout") markProvided(args, "timeout", Number(next()));
    else if (arg === "--quality") markProvided(args, "quality", next());
    else if (arg === "--format") markProvided(args, "format", next());
    else if (arg === "--background") markProvided(args, "background", next());
    else if (arg === "--moderation") markProvided(args, "moderation", next());
    else if (arg === "--downscale-max-dim") markProvided(args, "downscaleMaxDim", Number(next()));
    else if (arg === "--downscale-suffix") markProvided(args, "downscaleSuffix", next());
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (!args.input) throw new Error("--input is required");
  if (!Number.isInteger(args.concurrency) || args.concurrency < 1) throw new Error("--concurrency must be a positive integer");
  if (!Number.isInteger(args.maxAttempts) || args.maxAttempts < 1) throw new Error("--max-attempts must be a positive integer");
  validateCommonChoices(args);
  validateDownscale(args);
  return args;
}

export function normalizeGenerateArgs(rawInput, options = {}) {
  const raw = normalizeKeys(rawInput);
  const args = {
    ...GENERATE_DEFAULTS,
    ...raw,
    inputImage: normalizeInputImages(raw),
  };
  if (raw.outDir !== undefined) args.outDir = raw.outDir;
  if (raw.mask !== undefined) args.mask = raw.mask;
  if (raw.outputStem !== undefined) args.outputStem = raw.outputStem;
  if (raw.promptFile !== undefined) args.promptFile = raw.promptFile;
  if (raw.prompt !== undefined) args.prompt = raw.prompt;
  if (raw.force !== undefined) args.force = Boolean(raw.force);
  if (raw.dryRun !== undefined) args.dryRun = Boolean(raw.dryRun);

  const defaultOut = options.defaultOut !== false;
  if (args.out === undefined && !args.outDir && defaultOut) args.out = "output.png";

  validateGenerateArgs(args, options);
  return args;
}

export function printGenerateHelp() {
  console.log(`Usage: node scripts/generate.mjs --prompt PROMPT [options]

Options:
  --prompt PROMPT                    prompt text
  --prompt-file PATH                 read prompt text from UTF-8 file
  --out PATH                         output path (default output.png)
  --out-dir DIR                      output directory instead of --out
  --size WIDTHxHEIGHT|auto           output size (default 1024x1024)
  --quality low|medium|high|auto     image quality
  --format png|jpeg|webp             output format
  --background auto|opaque|transparent
  --output-compression 0-100         compression for jpeg/webp
  --partial-images 0|1|2|3           responses-only partial previews
  --moderation auto|low              moderation level
  --action auto|generate|edit        image action
  --n 1-10                           number of images
  --input-image PATH                 reference/edit image (repeatable)
  --mask PATH                        edit mask image; API-key images path only
  --input-fidelity low|high|auto     edit input fidelity where supported
  --api images|responses             API shape (default images)
  --mode auto|apikey|chatgpt         auth mode
  --model MODEL                      responses model
  --image-model MODEL                image model
  --timeout SECONDS                  request timeout
  --dry-run                          print sanitized request without network
  --force                            overwrite existing output files
  --downscale-max-dim INTEGER        optionally create a downscaled copy
  --downscale-suffix TEXT            suffix for downscaled copy (default -downscaled)
`);
}

export function printBatchHelp() {
  console.log(`Usage: node scripts/generate_batch.mjs --input jobs.jsonl [options]

Options:
  --input PATH                       JSONL batch file
  --concurrency INTEGER              concurrent jobs (default 2)
  --max-attempts INTEGER             attempts per job (default 1)
  --fail-fast                        stop scheduling after first failure
  --dry-run                          print resolved jobs without network
  --force                            overwrite existing output files
  --out-dir DIR                      global output directory
  --mode auto|apikey|chatgpt         global auth mode
  --api images|responses             global API shape
  --model MODEL                      global responses model
  --image-model MODEL                global image model
  --timeout SECONDS                  global timeout
  --quality low|medium|high|auto     global image quality
  --format png|jpeg|webp             global output format
  --background auto|opaque|transparent
  --moderation auto|low              global moderation level
  --downscale-max-dim INTEGER        optionally create downscaled copies
  --downscale-suffix TEXT            suffix for downscaled copies
`);
}

export function validateSize(size) {
  if (size === "auto") return;
  const match = /^(\d+)x(\d+)$/i.exec(String(size || ""));
  if (!match) throw new Error(`size must be 'auto' or WIDTHxHEIGHT, got ${JSON.stringify(size)}`);
  const width = Number(match[1]);
  const height = Number(match[2]);
  const edge = Math.max(width, height);
  if (edge > MAX_EDGE) throw new Error(`size ${size}: longest edge must be <= ${MAX_EDGE}px`);
  if (width % 16 || height % 16) throw new Error(`size ${size}: width and height must both be divisible by 16`);
  if (edge / Math.min(width, height) > MAX_RATIO) throw new Error(`size ${size}: long:short edge ratio must be <= ${MAX_RATIO}:1`);
  if (width * height < MIN_PIXELS || width * height > MAX_PIXELS) {
    throw new Error(`size ${size}: total pixels must be between ${MIN_PIXELS.toLocaleString()} and ${MAX_PIXELS.toLocaleString()}`);
  }
}

export function imageAction(args) {
  if (args.action === "edit" || (args.inputImage || []).length > 0) return "edit";
  return "generate";
}

function parseGenerateArgv(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      i += 1;
      if (i >= argv.length) throw new Error(`${arg} requires a value`);
      return argv[i];
    };
    if (arg === "--help" || arg === "-h") return { help: true };
    if (arg === "--prompt") args.prompt = next();
    else if (arg === "--prompt-file") args.promptFile = next();
    else if (arg === "--out") args.out = next();
    else if (arg === "--out-dir") args.outDir = next();
    else if (arg === "--size") args.size = next();
    else if (arg === "--quality") args.quality = next();
    else if (arg === "--format") args.format = next();
    else if (arg === "--background") args.background = next();
    else if (arg === "--output-compression") args.outputCompression = Number(next());
    else if (arg === "--partial-images") args.partialImages = Number(next());
    else if (arg === "--moderation") args.moderation = next();
    else if (arg === "--action") args.action = next();
    else if (arg === "--n") args.n = Number(next());
    else if (arg === "--input-image") appendInputImage(args, next());
    else if (arg === "--mask") args.mask = next();
    else if (arg === "--input-fidelity") args.inputFidelity = next();
    else if (arg === "--api") args.api = next();
    else if (arg === "--mode") args.mode = next();
    else if (arg === "--model") args.model = next();
    else if (arg === "--image-model") args.imageModel = next();
    else if (arg === "--timeout") args.timeout = Number(next());
    else if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--force") args.force = true;
    else if (arg === "--downscale-max-dim") args.downscaleMaxDim = Number(next());
    else if (arg === "--downscale-suffix") args.downscaleSuffix = next();
    else throw new Error(`unknown argument: ${arg}`);
  }
  return args;
}

function validateGenerateArgs(args, options) {
  const requirePrompt = options.requirePrompt !== false;
  const requireOutput = options.requireOutput === true;
  if (args.prompt && args.promptFile) throw new Error("--prompt and --prompt-file are mutually exclusive");
  if (requirePrompt && !args.prompt && !args.promptFile) throw new Error("--prompt or --prompt-file is required");
  if (args.out && args.outDir) throw new Error("--out and --out-dir are mutually exclusive");
  if (requireOutput && !args.out && !args.outDir) throw new Error("--out or --out-dir is required");
  validateCommonChoices(args);
  validateNumbers(args);
  validateSize(args.size);
  validateDownscale(args);
  if (args.mask && imageAction(args) !== "edit") throw new Error("--mask requires edit action");
  if (args.mask && !(args.inputImage || []).length) throw new Error("--mask requires at least one --input-image");
}

function validateCommonChoices(args) {
  const choices = {
    quality: ["low", "medium", "high", "auto"],
    format: ["png", "jpeg", "webp"],
    background: ["auto", "opaque", "transparent"],
    moderation: ["auto", "low"],
    action: ["auto", "generate", "edit"],
    api: ["images", "responses"],
    mode: ["auto", "apikey", "chatgpt"],
    inputFidelity: ["low", "high", "auto"],
  };
  for (const [key, allowed] of Object.entries(choices)) {
    if (args[key] !== undefined && !allowed.includes(args[key])) {
      throw new Error(`--${dashCase(key)} must be one of ${allowed.join("|")}`);
    }
  }
}

function validateNumbers(args) {
  if (!Number.isInteger(args.n) || args.n < 1 || args.n > 10) throw new Error("--n must be between 1 and 10");
  if (!Number.isInteger(args.timeout) || args.timeout < 1) throw new Error("--timeout must be a positive integer");
  if (args.outputCompression !== undefined && (!Number.isInteger(args.outputCompression) || args.outputCompression < 0 || args.outputCompression > 100)) {
    throw new Error("--output-compression must be between 0 and 100");
  }
  if (args.outputCompression !== undefined && args.format === "png") throw new Error("--output-compression only applies to jpeg/webp output");
  if (args.partialImages !== undefined && (![0, 1, 2, 3].includes(args.partialImages))) throw new Error("--partial-images must be 0, 1, 2, or 3");
}

function validateDownscale(args) {
  if (args.downscaleMaxDim !== undefined && (!Number.isInteger(args.downscaleMaxDim) || args.downscaleMaxDim < 1)) {
    throw new Error("--downscale-max-dim must be a positive integer");
  }
  if (args.downscaleSuffix !== undefined && String(args.downscaleSuffix).length === 0) {
    throw new Error("--downscale-suffix must not be empty");
  }
}

function normalizeKeys(input) {
  const raw = { ...input };
  const mappings = {
    prompt_file: "promptFile",
    out_dir: "outDir",
    output_compression: "outputCompression",
    partial_images: "partialImages",
    image_model: "imageModel",
    input_fidelity: "inputFidelity",
    input_image: "inputImage",
    input_images: "inputImages",
    downscale_max_dim: "downscaleMaxDim",
    downscale_suffix: "downscaleSuffix",
    output_stem: "outputStem",
  };
  for (const [from, to] of Object.entries(mappings)) {
    if (raw[from] !== undefined && raw[to] === undefined) raw[to] = raw[from];
    delete raw[from];
  }
  return raw;
}

function normalizeInputImages(raw) {
  const images = [];
  for (const value of [raw.inputImage, raw.inputImages]) {
    if (Array.isArray(value)) images.push(...value);
    else if (typeof value === "string") images.push(value);
  }
  return images;
}

function appendInputImage(args, value) {
  if (!args.inputImage) args.inputImage = [];
  args.inputImage.push(value);
}

function markProvided(args, key, value) {
  args[key] = value;
  args.provided.push(key);
}

function dashCase(key) {
  return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
