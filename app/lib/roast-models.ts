export const ROAST_MODEL_OPTIONS = [
  {
    id: "google/gemini-3.1-flash-lite",
    label: "Fast value",
    name: "Gemini 3.1 Flash Lite",
    detail: "Default demo model",
    priceHint: "$0.25 in / $1.50 out / $0.25 image",
    // OpenRouter can fail routing when require_parameters is true and no provider endpoint supports the full multimodal schema request.
    requireStructuredOutputSupport: true,
  },
  {
    id: "openai/gpt-5.4-mini",
    label: "Balanced",
    name: "GPT-5.4 Mini",
    detail: "Recognizable and efficient",
    priceHint: "$0.75 in / $4.50 out",
    requireStructuredOutputSupport: false,
  },
  {
    id: "x-ai/grok-4.3",
    label: "Sharp + efficient",
    name: "Grok 4.3",
    detail: "Low output cost",
    priceHint: "$1.25 in / $2.50 out",
    requireStructuredOutputSupport: true,
  },
  {
    id: "anthropic/claude-sonnet-4.6",
    label: "Best critique",
    name: "Claude Sonnet 4.6",
    detail: "Strong UX and copy reads",
    priceHint: "$3 in / $15 out",
    requireStructuredOutputSupport: false,
  },
  {
    id: "anthropic/claude-opus-4.7",
    label: "Premium depth",
    name: "Claude Opus 4.7",
    detail: "Deepest critique option",
    priceHint: "$5 in / $25 out",
    requireStructuredOutputSupport: false,
  },
] as const;

export type RoastModelId = (typeof ROAST_MODEL_OPTIONS)[number]["id"];

export const DEFAULT_ROAST_MODEL_ID: RoastModelId = "google/gemini-3.1-flash-lite";

export const ROAST_MODEL_IDS = ROAST_MODEL_OPTIONS.map((option) => option.id) as [RoastModelId, ...RoastModelId[]];

export function getRoastModelOption(modelId: string) {
  return ROAST_MODEL_OPTIONS.find((option) => option.id === modelId);
}

export function shouldRequireStructuredOutputSupport(modelId: string) {
  return getRoastModelOption(modelId)?.requireStructuredOutputSupport ?? true;
}
