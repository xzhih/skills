#!/usr/bin/env node
import { Buffer } from "node:buffer";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { homedir } from "node:os";
import { randomUUID } from "node:crypto";

const CHATGPT_CODEX_BASE = "https://chatgpt.com/backend-api/codex";
const OAUTH_TOKEN_URL = "https://auth.openai.com/oauth/token";
const OAUTH_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";
const AUTH_PATH = join(homedir(), ".codex", "auth.json");
const CONFIG_PATH = join(homedir(), ".codex", "config.toml");
const USER_AGENT = "codex-tui/0.137.0 (Mac OS 26.4.1; arm64) Apple_Terminal/470 (codex-tui; 0.137.0)";
const INSTRUCTIONS = "You are a helpful assistant. When asked to create or edit an image, call the image_generation tool.";

const MAX_EDGE = 3840;
const MIN_PIXELS = 655_360;
const MAX_PIXELS = 8_294_400;
const MAX_RATIO = 3.0;

function die(message, code = 1) {
  console.error(`Error: ${message}`);
  process.exit(code);
}

function parseArgs(argv) {
  const args = {
    out: "output.png",
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
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      i += 1;
      if (i >= argv.length) die(`${arg} requires a value`);
      return argv[i];
    };
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else if (arg === "--prompt") args.prompt = next();
    else if (arg === "--out") args.out = next();
    else if (arg === "--size") args.size = next();
    else if (arg === "--quality") args.quality = next();
    else if (arg === "--format") args.format = next();
    else if (arg === "--background") args.background = next();
    else if (arg === "--output-compression") args.outputCompression = Number(next());
    else if (arg === "--partial-images") args.partialImages = Number(next());
    else if (arg === "--moderation") args.moderation = next();
    else if (arg === "--action") args.action = next();
    else if (arg === "--n") args.n = Number(next());
    else if (arg === "--input-image") args.inputImage.push(next());
    else if (arg === "--api") args.api = next();
    else if (arg === "--mode") args.mode = next();
    else if (arg === "--model") args.model = next();
    else if (arg === "--image-model") args.imageModel = next();
    else if (arg === "--timeout") args.timeout = Number(next());
    else die(`unknown argument: ${arg}`);
  }
  if (!args.prompt) die("--prompt is required");
  for (const [key, allowed] of Object.entries({
    format: ["png", "jpeg", "webp"],
    action: ["auto", "generate", "edit"],
    api: ["images", "responses"],
    mode: ["auto", "apikey", "chatgpt"],
  })) {
    if (!allowed.includes(args[key])) die(`--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)} must be one of ${allowed.join("|")}`);
  }
  if (!Number.isInteger(args.n) || args.n < 1 || args.n > 10) die("--n must be between 1 and 10");
  if (args.outputCompression !== undefined && (!Number.isInteger(args.outputCompression) || args.outputCompression < 0 || args.outputCompression > 100)) {
    die("--output-compression must be between 0 and 100");
  }
  if (args.outputCompression !== undefined && args.format === "png") die("--output-compression only applies to jpeg/webp output");
  if (args.partialImages !== undefined && (![0, 1, 2, 3].includes(args.partialImages))) die("--partial-images must be 0, 1, 2, or 3");
  validateSize(args.size);
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/generate.mjs --prompt PROMPT [options]

Options:
  --out PATH                         output path (default output.png)
  --size WIDTHxHEIGHT|auto           output size (default 1024x1024)
  --quality low|medium|high|auto     image quality
  --format png|jpeg|webp             output format
  --background auto|opaque           background handling
  --output-compression 0-100         compression for jpeg/webp
  --partial-images 0|1|2|3           responses-only partial previews
  --moderation auto|low              moderation level
  --action auto|generate|edit        image action
  --n 1-10                           number of images
  --input-image PATH                 reference/edit image (repeatable)
  --api images|responses             API shape (default images)
  --mode auto|apikey|chatgpt         auth mode
  --model MODEL                      responses model
  --image-model MODEL                image model
  --timeout SECONDS                  request timeout
`);
}

function validateSize(size) {
  if (size === "auto") return;
  const match = /^(\d+)x(\d+)$/i.exec(size);
  if (!match) die(`size must be 'auto' or WIDTHxHEIGHT, got ${JSON.stringify(size)}`);
  const width = Number(match[1]);
  const height = Number(match[2]);
  const edge = Math.max(width, height);
  if (edge > MAX_EDGE) die(`size ${size}: longest edge must be <= ${MAX_EDGE}px`);
  if (width % 16 || height % 16) die(`size ${size}: width and height must both be divisible by 16`);
  if (edge / Math.min(width, height) > MAX_RATIO) die(`size ${size}: long:short edge ratio must be <= ${MAX_RATIO}:1`);
  if (width * height < MIN_PIXELS || width * height > MAX_PIXELS) {
    die(`size ${size}: total pixels must be between ${MIN_PIXELS.toLocaleString()} and ${MAX_PIXELS.toLocaleString()}`);
  }
}

function responsesUrl(baseUrl, assumeV1) {
  const base = baseUrl.replace(/\/+$/, "");
  if (base.endsWith("/responses")) return base;
  if (base.endsWith("/v1")) return `${base}/responses`;
  return `${base}${assumeV1 ? "/v1/responses" : "/responses"}`;
}

function imagesBaseUrl(baseUrl, assumeV1) {
  let base = baseUrl.replace(/\/+$/, "");
  for (const suffix of ["/images/generations", "/images/edits", "/responses"]) {
    if (base.endsWith(suffix)) base = base.slice(0, -suffix.length);
  }
  if (base.endsWith("/v1") || !assumeV1) return base;
  return `${base}/v1`;
}

async function readJsonFile(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function readCodexProvider() {
  if (!existsSync(CONFIG_PATH)) return null;
  const text = await readFile(CONFIG_PATH, "utf8");
  const active = text.match(/^\s*model_provider\s*=\s*"([^"]+)"/m)?.[1];
  if (!active) return null;
  const section = text.match(new RegExp(`^\\[model_providers\\.${escapeRegExp(active)}\\]\\s*([\\s\\S]*?)(?=^\\[|$)`, "m"))?.[1];
  if (!section) return null;
  const field = (key) => section.match(new RegExp(`^\\s*${key}\\s*=\\s*"([^"]*)"`, "m"))?.[1];
  const baseUrl = field("base_url");
  if (!baseUrl) return null;
  const token = field("experimental_bearer_token") || (field("env_key") ? process.env[field("env_key")] : "");
  if (!token) return null;
  return { baseUrl, token, name: field("name") || active };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function resolveAuth(requested) {
  if (["auto", "apikey"].includes(requested)) {
    if (process.env.OPENAI_API_KEY) {
      const base = process.env.OPENAI_BASE_URL || "https://api.openai.com";
      return {
        mode: "apikey",
        responsesUrl: responsesUrl(base, true),
        imagesBaseUrl: imagesBaseUrl(base, true),
        token: process.env.OPENAI_API_KEY,
        label: "env OPENAI_API_KEY",
      };
    }
    const provider = await readCodexProvider();
    if (provider) {
      return {
        mode: "apikey",
        responsesUrl: responsesUrl(provider.baseUrl, false),
        imagesBaseUrl: imagesBaseUrl(provider.baseUrl, false),
        token: provider.token,
        label: `codex provider '${provider.name}'`,
      };
    }
    if (requested === "apikey") die("mode apikey requested but no OPENAI_API_KEY env and no usable codex provider in config.toml");
  }

  if (["auto", "chatgpt"].includes(requested)) {
    if (existsSync(AUTH_PATH)) {
      const auth = await readJsonFile(AUTH_PATH);
      if (auth.auth_mode === "chatgpt" && auth.tokens?.access_token) return { mode: "chatgpt", label: "ChatGPT login (auth.json)" };
      if (auth.OPENAI_API_KEY) {
        return {
          mode: "apikey",
          responsesUrl: responsesUrl("https://api.openai.com", true),
          imagesBaseUrl: imagesBaseUrl("https://api.openai.com", true),
          token: auth.OPENAI_API_KEY,
          label: "auth.json OPENAI_API_KEY",
        };
      }
    }
    if (requested === "chatgpt") die("mode chatgpt requested but ~/.codex/auth.json has no chatgpt access_token");
  }
  die("No credentials found. Provide OPENAI_API_KEY, codex provider config, or ChatGPT login in ~/.codex/auth.json");
}

async function loadTokens() {
  return (await readJsonFile(AUTH_PATH)).tokens;
}

async function refreshAccessToken() {
  const auth = await readJsonFile(AUTH_PATH);
  const refreshToken = auth.tokens?.refresh_token;
  if (!refreshToken) die("[chatgpt] access_token expired and no refresh_token available; re-login to codex.");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: OAUTH_CLIENT_ID,
  });
  const response = await fetchWithTimeout(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
    body,
  }, 30);
  const payload = await response.json();
  if (!response.ok) die(`[chatgpt] token refresh failed HTTP ${response.status}: ${JSON.stringify(payload).slice(0, 200)}`);
  if (!payload.access_token) die("[chatgpt] token refresh response missing access_token");
  auth.tokens.access_token = payload.access_token;
  for (const key of ["id_token", "refresh_token"]) {
    if (payload[key]) auth.tokens[key] = payload[key];
  }
  auth.last_refresh = new Date().toISOString();
  await writeFile(AUTH_PATH, `${JSON.stringify(auth, null, 2)}\n`);
  console.error("[chatgpt] refreshed access_token");
  return payload.access_token;
}

function imageMime(path) {
  const ext = extname(path).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "image/png";
}

async function inputImageDataUrls(paths) {
  const images = [];
  for (const path of paths || []) {
    if (!existsSync(path)) die(`input image not found: ${path}`);
    const data = await readFile(path);
    images.push(`data:${imageMime(path)};base64,${data.toString("base64")}`);
  }
  return images;
}

function imageAction(args) {
  if (args.action === "edit" || args.inputImage.length > 0) return "edit";
  return "generate";
}

async function buildImagesBody(args) {
  const body = {
    model: args.imageModel,
    prompt: args.prompt,
    n: 1,
    size: args.size,
    quality: args.quality,
    output_format: args.format,
  };
  if (args.background) body.background = args.background;
  if (args.outputCompression !== undefined) body.output_compression = args.outputCompression;
  if (args.moderation) body.moderation = args.moderation;
  if (imageAction(args) === "edit") {
    body.images = (await inputImageDataUrls(args.inputImage)).map((image_url) => ({ image_url }));
  }
  return body;
}

async function buildResponsesBody(args, stream) {
  const content = [{ type: "input_text", text: args.prompt }];
  for (const image_url of await inputImageDataUrls(args.inputImage)) {
    content.push({ type: "input_image", image_url });
  }
  const tool = {
    type: "image_generation",
    action: args.action,
    model: args.imageModel,
    size: args.size,
    quality: args.quality,
    output_format: args.format,
  };
  if (args.background) tool.background = args.background;
  if (args.outputCompression !== undefined) tool.output_compression = args.outputCompression;
  if (args.partialImages !== undefined) tool.partial_images = args.partialImages;
  if (args.moderation) tool.moderation = args.moderation;
  const body = {
    model: args.model,
    instructions: INSTRUCTIONS,
    input: [{ type: "message", role: "user", content }],
    tools: [tool],
    tool_choice: { type: "image_generation" },
  };
  if (stream) {
    body.stream = true;
    body.store = false;
  }
  return body;
}

function fetchWithTimeout(url, options, timeoutSeconds) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutSeconds * 1000);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
}

async function responseText(response) {
  const reader = response.body?.getReader();
  if (!reader) return response.text();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function postJson(url, headers, body, timeout) {
  const response = await fetchWithTimeout(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  }, timeout);
  const text = await responseText(response);
  let payload;
  try {
    payload = JSON.parse(text);
  } catch (error) {
    die(`response was not complete JSON: ${error.message}`);
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${JSON.stringify(payload).slice(0, 300)}`);
  return payload;
}

function chatgptImagesHeaders(accessToken, accountId) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "chatgpt-account-id": accountId,
    Accept: "application/json",
    Connection: "Keep-Alive",
    originator: "codex-tui",
    session_id: randomUUID(),
    "x-client-request-id": randomUUID(),
    "User-Agent": USER_AGENT,
  };
}

function chatgptResponsesHeaders(accessToken, accountId) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "chatgpt-account-id": accountId,
    "OpenAI-Beta": "responses=experimental",
    originator: "codex_cli_rs",
    session_id: randomUUID(),
    Accept: "text/event-stream",
    "User-Agent": USER_AGENT,
  };
}

function apiHeaders(token, accept = "application/json") {
  return { Authorization: `Bearer ${token}`, Accept: accept, "User-Agent": USER_AGENT };
}

async function runImagesApiKey(args, auth) {
  const endpoint = imageAction(args) === "edit" ? "/images/edits" : "/images/generations";
  const body = await buildImagesBody(args);
  const data = await postJson(`${auth.imagesBaseUrl.replace(/\/+$/, "")}${endpoint}`, apiHeaders(auth.token), body, args.timeout);
  return parseImagesResponse(data, body);
}

async function runImagesChatgpt(args) {
  const tokens = await loadTokens();
  let accessToken = tokens.access_token;
  const accountId = tokens.account_id;
  const endpoint = imageAction(args) === "edit" ? "/images/edits" : "/images/generations";
  const body = await buildImagesBody(args);
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const data = await postJson(`${CHATGPT_CODEX_BASE}${endpoint}`, chatgptImagesHeaders(accessToken, accountId), body, args.timeout);
      return parseImagesResponse(data, body);
    } catch (error) {
      if (String(error?.message || error).includes("HTTP 401") && attempt === 1) {
        accessToken = await refreshAccessToken();
        continue;
      }
      throw error;
    }
  }
  return [];
}

function parseImagesResponse(data, requestBody) {
  if (data.error) die(`images endpoint error: ${JSON.stringify(data.error).slice(0, 300)}`);
  if (!Array.isArray(data.data)) die("images endpoint returned no data[]");
  return data.data.map((item) => {
    const imageB64 = item.b64_json || (typeof item.url === "string" && item.url.startsWith("data:image/") ? item.url.split(",", 2)[1] : "");
    if (!imageB64) die("images endpoint returned no b64_json");
    return {
      result: imageB64,
      size: String(item.size || data.size || requestBody.size || ""),
      quality: String(item.quality || data.quality || requestBody.quality || ""),
      background: String(item.background || data.background || requestBody.background || ""),
      output_format: String(item.output_format || data.output_format || requestBody.output_format || ""),
      revised_prompt: String(item.revised_prompt || ""),
    };
  });
}

async function runResponsesApiKey(args, auth) {
  const body = await buildResponsesBody(args, false);
  const data = await postJson(auth.responsesUrl, apiHeaders(auth.token), body, args.timeout);
  return (data.output || []).filter((item) => item.type === "image_generation_call" && item.result);
}

async function runResponsesChatgpt(args) {
  const tokens = await loadTokens();
  let accessToken = tokens.access_token;
  const accountId = tokens.account_id;
  const body = await buildResponsesBody(args, true);
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const response = await fetchWithTimeout(`${CHATGPT_CODEX_BASE}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...chatgptResponsesHeaders(accessToken, accountId) },
      body: JSON.stringify(body),
    }, args.timeout);
    if (response.status === 401 && attempt === 1) {
      accessToken = await refreshAccessToken();
      continue;
    }
    if (!response.ok) die(`[responses/chatgpt] HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return parseSse(await responseText(response));
  }
  return [];
}

function parseSse(text) {
  const byIndex = new Map();
  const fallback = [];
  let completedOutput = null;
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    let event;
    try {
      event = JSON.parse(payload);
    } catch {
      continue;
    }
    if (["error", "response.failed", "response.incomplete"].includes(event.type)) {
      die(`[responses/chatgpt] generation failed: ${JSON.stringify(event.error || event.response?.error || null).slice(0, 300)}`);
    }
    if (event.type === "response.output_item.done" && event.item?.type === "image_generation_call" && event.item.result) {
      if (Number.isInteger(event.output_index)) byIndex.set(event.output_index, event.item);
      else fallback.push(event.item);
    } else if (event.type === "response.completed") {
      completedOutput = event.response?.output || null;
    }
  }
  const fromCompleted = extractImageResults(completedOutput);
  if (fromCompleted.length) return fromCompleted;
  return extractImageResults([...Array.from(byIndex.keys()).sort((a, b) => a - b).map((key) => byIndex.get(key)), ...fallback]);
}

function extractImageResults(output) {
  return Array.isArray(output) ? output.filter((item) => item?.type === "image_generation_call" && item.result) : [];
}

async function saveImages(images, out, fallbackFormat) {
  if (!images.length) die("no image returned");
  const ext = images[0].output_format || fallbackFormat;
  const paths = [];
  for (let i = 0; i < images.length; i += 1) {
    const outPath = outputPath(out, ext, images.length, i);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, Buffer.from(images[i].result, "base64"));
    paths.push(outPath);
  }
  return paths;
}

function outputPath(out, ext, count, index) {
  if (count === 1) return extname(out) ? out : `${out}.${ext}`;
  const dir = dirname(out);
  const stem = basename(out, extname(out)) || "image";
  return join(dir, `${stem}-${index + 1}.${ext}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const auth = await resolveAuth(args.mode);
  console.error(`[${args.api}/${auth.mode}] via ${auth.label} -- size=${args.size} quality=${args.quality} format=${args.format} n=${args.n} ...`);
  const started = Date.now();
  const images = [];
  for (let i = 0; i < args.n; i += 1) {
    if (args.n > 1) console.error(`  image ${i + 1}/${args.n} ...`);
    if (args.api === "images") images.push(...(auth.mode === "chatgpt" ? await runImagesChatgpt(args) : await runImagesApiKey(args, auth)));
    else images.push(...(auth.mode === "chatgpt" ? await runResponsesChatgpt(args) : await runResponsesApiKey(args, auth)));
  }
  const saved = await saveImages(images, args.out, args.format);
  const meta = images[0];
  console.log(JSON.stringify({
    mode: auth.mode,
    api: args.api,
    saved,
    size: meta.size || args.size,
    quality: meta.quality || args.quality,
    output_format: meta.output_format || args.format,
    elapsed_s: Math.round((Date.now() - started) / 100) / 10,
  }));
}

main().catch((error) => die(error?.message || String(error)));
