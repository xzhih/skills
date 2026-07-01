import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const OAUTH_TOKEN_URL = "https://auth.openai.com/oauth/token";
const OAUTH_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";
const AUTH_PATH = join(homedir(), ".codex", "auth.json");
const CONFIG_PATH = join(homedir(), ".codex", "config.toml");

export function responsesUrl(baseUrl, assumeV1) {
  const base = baseUrl.replace(/\/+$/, "");
  if (base.endsWith("/responses")) return base;
  if (base.endsWith("/v1")) return `${base}/responses`;
  return `${base}${assumeV1 ? "/v1/responses" : "/responses"}`;
}

export function imagesBaseUrl(baseUrl, assumeV1) {
  let base = baseUrl.replace(/\/+$/, "");
  for (const suffix of ["/images/generations", "/images/edits", "/responses"]) {
    if (base.endsWith(suffix)) base = base.slice(0, -suffix.length);
  }
  if (base.endsWith("/v1") || !assumeV1) return base;
  return `${base}/v1`;
}

export async function resolveAuth(requested) {
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
    if (requested === "apikey") {
      throw new Error("mode apikey requested but no OPENAI_API_KEY env and no usable codex provider in ~/.codex/config.toml");
    }
  }

  if (["auto", "chatgpt"].includes(requested)) {
    if (existsSync(AUTH_PATH)) {
      const auth = await readJsonFile(AUTH_PATH);
      if (auth.auth_mode === "chatgpt" && auth.tokens?.access_token) {
        return { mode: "chatgpt", label: "ChatGPT login (~/.codex/auth.json)" };
      }
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
    if (requested === "chatgpt") {
      throw new Error("mode chatgpt requested but ~/.codex/auth.json has no chatgpt access_token");
    }
  }
  throw new Error("No credentials found. Provide OPENAI_API_KEY, codex provider config, or ChatGPT login in ~/.codex/auth.json");
}

export function describeDryRunAuth(requested) {
  if (requested === "apikey") return { mode: "apikey", label: "dry-run; credentials not read" };
  if (requested === "chatgpt") return { mode: "chatgpt", label: "dry-run; credentials not read" };
  return { mode: "auto", label: "dry-run; auth not resolved" };
}

export async function loadTokens() {
  return (await readJsonFile(AUTH_PATH)).tokens;
}

export async function refreshAccessToken() {
  const auth = await readJsonFile(AUTH_PATH);
  const refreshToken = auth.tokens?.refresh_token;
  if (!refreshToken) throw new Error("[chatgpt] access_token expired and no refresh_token available; re-login to codex.");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: OAUTH_CLIENT_ID,
  });
  const response = await fetchWithTimeout(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
  }, 30);
  const payload = await response.json();
  if (!response.ok) throw new Error(`[chatgpt] token refresh failed HTTP ${response.status}: ${JSON.stringify(payload).slice(0, 200)}`);
  if (!payload.access_token) throw new Error("[chatgpt] token refresh response missing access_token");
  auth.tokens.access_token = payload.access_token;
  for (const key of ["id_token", "refresh_token"]) {
    if (payload[key]) auth.tokens[key] = payload[key];
  }
  auth.last_refresh = new Date().toISOString();
  await writeFile(AUTH_PATH, `${JSON.stringify(auth, null, 2)}\n`);
  console.error("[chatgpt] refreshed access_token");
  return payload.access_token;
}

export function fetchWithTimeout(url, options, timeoutSeconds) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutSeconds * 1000);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
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
