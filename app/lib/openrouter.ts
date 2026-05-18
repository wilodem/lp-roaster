import OpenAI from "openai";
import { DEFAULT_ROAST_MODEL_ID } from "@/app/lib/roast-models";

const openRouterDefaults = {
  baseUrl: "https://openrouter.ai/api/v1",
  siteUrl: "http://localhost:3000",
  appTitle: "Landing Page Roaster",
};

let client: OpenAI | null = null;

export function getOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is required to analyze screenshots.");
  }

  client ??= new OpenAI({
    apiKey,
    baseURL: openRouterDefaults.baseUrl,
    defaultHeaders: {
      "HTTP-Referer": openRouterDefaults.siteUrl,
      "X-Title": openRouterDefaults.appTitle,
    },
  });

  return client;
}

export function getRoastModel() {
  return DEFAULT_ROAST_MODEL_ID;
}
