import { Buffer } from "node:buffer";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname } from "node:path";
import { randomUUID } from "node:crypto";
import { fetchWithTimeout, loadTokens, refreshAccessToken } from "./auth.mjs";
import { imageAction } from "./args.mjs";

const CHATGPT_CODEX_BASE = "https://chatgpt.com/backend-api/codex";
const USER_AGENT = "codex-tui/0.137.0 (Mac OS 26.4.1; arm64) Apple_Terminal/470 (codex-tui; 0.137.0)";
const INSTRUCTIONS = "You are a helpful assistant. When asked to create or edit an image, call the image_generation tool.";

export async function buildImagesBody(args) {
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
  if (args.mask) {
    body.mask = { image_url: await imageDataUrl(args.mask) };
  }
  return body;
}

export async function buildResponsesBody(args, stream) {
  const content = [{ type: "input_text", text: args.prompt }];
  for (const image_url of await inputImageDataUrls(args.inputImage)) {
    content.push({ type: "input_image", image_url });
  }
  const tool = {
    type: "image_generation",
    action: imageAction(args),
    model: args.imageModel,
    size: args.size,
    quality: args.quality,
    output_format: args.format,
  };
  if (args.background) tool.background = args.background;
  if (args.outputCompression !== undefined) tool.output_compression = args.outputCompression;
  if (args.partialImages !== undefined) tool.partial_images = args.partialImages;
  if (args.moderation) tool.moderation = args.moderation;
  if (args.inputFidelity && args.inputFidelity !== "auto") tool.input_fidelity = args.inputFidelity;
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

export function validateProviderSupport(args, auth) {
  if (args.mask) {
    if (auth.mode === "chatgpt") throw new Error("--mask is not supported through ChatGPT/Codex private image routes");
    if (args.api !== "images") throw new Error("--mask is only supported on the images edit path");
  }
  if (args.inputFidelity && args.inputFidelity !== "auto" && args.api !== "responses") {
    throw new Error("--input-fidelity is only supported on the responses image_generation path");
  }
}

export async function runImagesApiKey(args, auth) {
  const endpoint = imageAction(args) === "edit" ? "/images/edits" : "/images/generations";
  const body = await buildImagesBody(args);
  const data = await postJson(`${auth.imagesBaseUrl.replace(/\/+$/, "")}${endpoint}`, apiHeaders(auth.token), body, args.timeout);
  return parseImagesResponse(data, body);
}

export async function runImagesChatgpt(args) {
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

export async function runResponsesApiKey(args, auth) {
  const body = await buildResponsesBody(args, false);
  const data = await postJson(auth.responsesUrl, apiHeaders(auth.token), body, args.timeout);
  return extractImageResults(data.output);
}

export async function runResponsesChatgpt(args) {
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
    if (!response.ok) throw new Error(`[responses/chatgpt] HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return parseSse(await responseText(response));
  }
  return [];
}

export function parseImagesResponse(data, requestBody) {
  if (data.error) throw new Error(`images endpoint error: ${JSON.stringify(data.error).slice(0, 300)}`);
  if (!Array.isArray(data.data)) throw new Error("images endpoint returned no data[]");
  return data.data.map((item) => {
    const imageB64 = item.b64_json || (typeof item.url === "string" && item.url.startsWith("data:image/") ? item.url.split(",", 2)[1] : "");
    if (!imageB64) throw new Error("images endpoint returned no b64_json");
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

export function redactRequestBody(value) {
  if (typeof value === "string") {
    if (value.startsWith("data:image/")) return "<image data omitted>";
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => redactRequestBody(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, redactRequestBody(item)]));
  }
  return value;
}

export async function buildRequestPreview(args) {
  const body = args.api === "images"
    ? await buildImagesBody(args)
    : await buildResponsesBody(args, args.mode !== "apikey");
  return redactRequestBody(body);
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
    images.push(await imageDataUrl(path));
  }
  return images;
}

async function imageDataUrl(path) {
  if (!existsSync(path)) throw new Error(`input image not found: ${path}`);
  const data = await readFile(path);
  return `data:${imageMime(path)};base64,${data.toString("base64")}`;
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
    throw new Error(`response was not complete JSON: ${error.message}`);
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
      throw new Error(`[responses/chatgpt] generation failed: ${JSON.stringify(event.error || event.response?.error || null).slice(0, 300)}`);
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
