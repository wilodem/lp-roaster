import OpenAI from "openai";
import { DEFAULT_ROAST_MODEL_ID } from "@/app/lib/roast-models";

let client: OpenAI | null = null;

export function getOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is required to analyze screenshots.");
  }

  client ??= new OpenAI({
    apiKey,
    baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_TITLE ?? "Landing Page Roaster",
    },
  });

  return client;
}

export function getRoastModel() {
  return process.env.OPENROUTER_MODEL ?? DEFAULT_ROAST_MODEL_ID;
}
