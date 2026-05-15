import type { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions";
import { getOpenRouterClient, getRoastModel } from "@/app/lib/openrouter";
import { buildRoastPrompt, roastSystemPrompt } from "@/app/lib/roast-prompt";
import { roastJsonSchema, roastModelOutputSchema } from "@/app/lib/roast-schema";
import { shouldRequireStructuredOutputSupport, shouldUseJsonSchemaResponseFormat } from "@/app/lib/roast-models";
import type { RoastModelId } from "@/app/lib/roast-models";
import type { RoastAnalysis, RoastIntensity } from "@/app/types/roast";

type OpenRouterChatCompletionParams = ChatCompletionCreateParamsNonStreaming & {
  plugins?: Array<{ id: "response-healing" }>;
  provider?: {
    require_parameters?: boolean;
  };
};

type FlexibleModelMessage = {
  content?: unknown;
};

export async function analyzeLandingPageScreenshot(options: {
  imageBuffer: ArrayBuffer;
  mimeType: string;
  intensity: RoastIntensity;
  focusAreas: string[];
  model?: RoastModelId;
  startedAt: number;
}): Promise<RoastAnalysis> {
  const model = options.model ?? getRoastModel();
  const useJsonSchemaResponseFormat = shouldUseJsonSchemaResponseFormat(model);
  const dataUrl = `data:${options.mimeType};base64,${Buffer.from(options.imageBuffer).toString("base64")}`;

  const request: OpenRouterChatCompletionParams = {
    model,
    temperature: 0.25,
    max_tokens: 3600,
    stream: false,
    plugins: useJsonSchemaResponseFormat ? [{ id: "response-healing" }] : undefined,
    provider: shouldRequireStructuredOutputSupport(model) ? { require_parameters: true } : undefined,
    response_format: useJsonSchemaResponseFormat
      ? {
          type: "json_schema",
          json_schema: roastJsonSchema,
        }
      : undefined,
    messages: [
      {
        role: "system",
        content: roastSystemPrompt,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: buildRoastPrompt({
              intensity: options.intensity,
              focusAreas: options.focusAreas,
            }),
          },
          {
            type: "image_url",
            image_url: {
              url: dataUrl,
            },
          },
        ],
      },
    ],
  };

  const response = await getOpenRouterClient().chat.completions.create(request);

  const choice = response.choices[0];
  const content = extractModelContent(choice?.message);

  if (!content) {
    throw new Error(getEmptyResponseMessage(choice?.finish_reason));
  }

  const parsed = parseModelJson(content);
  const normalized = normalizeRoastModelOutput(parsed);
  const analysis = roastModelOutputSchema.safeParse(normalized);

  if (!analysis.success) {
    throw new Error(`OpenRouter returned analysis with an unexpected shape: ${formatSchemaIssues(analysis.error.issues)}.`);
  }

  return {
    ...analysis.data,
    meta: {
      model: response.model ?? model,
      latencyMs: Date.now() - options.startedAt,
    },
  };
}

export function extractModelContent(message: FlexibleModelMessage | undefined) {
  const content = message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (!Array.isArray(content)) {
    if (content && typeof content === "object") {
      return JSON.stringify(content);
    }

    return "";
  }

  return content
    .flatMap((part): string[] => {
      if (isTextContentPart(part)) {
        return [part.text];
      }

      return [];
    })
    .join("\n")
    .trim();
}

function isTextContentPart(part: unknown): part is { text: string } {
  if (!part || typeof part !== "object") {
    return false;
  }

  const candidate = part as { text?: unknown; type?: unknown };

  return typeof candidate.text === "string" && (!candidate.type || candidate.type === "text");
}

export function parseModelJson(content: string) {
  const normalized = stripJsonFence(content);

  try {
    return JSON.parse(normalized);
  } catch {
    const jsonValue = extractFirstJsonValue(normalized);

    if (jsonValue) {
      try {
        return JSON.parse(jsonValue);
      } catch {
        // Fall through to the shared user-facing error.
      }
    }
  }

  throw new Error("OpenRouter returned invalid JSON. Try again with a clearer screenshot.");
}

export function normalizeRoastModelOutput(value: unknown) {
  if (!isRecord(value)) {
    return value;
  }

  const normalized: Record<string, unknown> = { ...value };
  const summary = isRecord(normalized.summary) ? { ...normalized.summary } : undefined;
  const roast = isRecord(normalized.roast) ? { ...normalized.roast } : undefined;
  const rewrites = getFirstRecord(normalized, ["rewrites", "rewrite", "heroRewrite", "hero_copy_rewrite"]);
  const actionPlan = getFirstArray(normalized, ["actionPlan", "action_plan", "actions", "nextSteps", "recommendations"]);
  const findings = getFirstArray(normalized, ["findings", "issues", "critiques"]);
  const meme = getFirstRecord(normalized, ["meme", "memeVerdict", "meme_verdict", "finalMeme"]);

  if (summary) {
    summary.score = normalizeNumber(summary.score);
    normalized.summary = summary;
  }

  if (roast) {
    roast.severity = normalizeSeverity(roast.severity);
    normalized.roast = roast;
  }

  if (findings) {
    normalized.findings = findings.map((finding) => normalizeFinding(finding));
  }

  if (rewrites) {
    normalized.rewrites = normalizeRewrites(rewrites);
  }

  if (actionPlan) {
    normalized.actionPlan = actionPlan.map((item, index) => normalizeActionItem(item, index));
  }

  if (meme) {
    normalized.meme = normalizeMeme(meme);
  }

  return normalized;
}

function normalizeFinding(value: unknown) {
  if (!isRecord(value)) {
    return value;
  }

  return {
    ...value,
    category: normalizeCategory(value.category ?? value.area ?? value.focusArea ?? value.type),
    issue: normalizeString(value.issue ?? value.title ?? value.finding),
    evidence: normalizeString(value.evidence ?? value.observation ?? value.visibleEvidence),
    whyItMatters: normalizeString(value.whyItMatters ?? value.why_it_matters ?? value.why ?? value.rationale),
    recommendation: normalizeString(value.recommendation ?? value.fix ?? value.suggestion ?? value.action),
    impact: normalizeImpactEffort(value.impact),
    effort: normalizeImpactEffort(value.effort),
  };
}

function normalizeRewrites(value: Record<string, unknown>) {
  return {
    ...value,
    headline: normalizeString(value.headline ?? value.heroHeadline ?? value.title),
    subheadline: normalizeString(value.subheadline ?? value.subhead ?? value.heroSubheadline ?? value.subtitle),
    cta: normalizeString(value.cta ?? value.button ?? value.primaryCta),
  };
}

function normalizeActionItem(value: unknown, index: number) {
  if (!isRecord(value)) {
    return value;
  }

  return {
    ...value,
    priority: normalizeNumber(value.priority) ?? index + 1,
    label: normalizeString(value.label ?? value.title ?? value.action ?? value.step),
    rationale: normalizeString(value.rationale ?? value.reason ?? value.why ?? value.description),
  };
}

function normalizeMeme(value: Record<string, unknown>) {
  return {
    ...value,
    templateId: normalizeString(value.templateId ?? value.template_id ?? value.id ?? value.template),
    caption: normalizeString(value.caption ?? value.text ?? value.punchline ?? value.title),
    reason: normalizeString(value.reason ?? value.rationale ?? value.why),
    altText: normalizeString(value.altText ?? value.alt_text ?? value.alt ?? value.description),
  };
}

function getFirstRecord(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (isRecord(source[key])) {
      return { ...source[key] };
    }
  }

  return undefined;
}

function getFirstArray(source: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (Array.isArray(source[key])) {
      return source[key];
    }
  }

  return undefined;
}

function normalizeCategory(value: unknown) {
  const normalized = normalizeToken(value);

  const categoryAliases: Record<string, string> = {
    a11y: "accessibility",
    accessibility: "accessibility",
    copy: "messaging",
    cta: "cta",
    friction: "conversion-friction",
    hierarchy: "visual-hierarchy",
    messaging: "messaging",
    trust: "trust",
    "conversion-friction": "conversion-friction",
    "conversion-frictions": "conversion-friction",
    "visual-hierarchy": "visual-hierarchy",
  };

  if (categoryAliases[normalized]) {
    return categoryAliases[normalized];
  }

  if (normalized.includes("hierarchy")) {
    return "visual-hierarchy";
  }

  if (normalized.includes("message") || normalized.includes("copy")) {
    return "messaging";
  }

  if (normalized.includes("cta")) {
    return "cta";
  }

  if (normalized.includes("trust") || normalized.includes("proof")) {
    return "trust";
  }

  if (normalized.includes("friction") || normalized.includes("conversion")) {
    return "conversion-friction";
  }

  if (normalized.includes("access") || normalized.includes("a11y")) {
    return "accessibility";
  }

  return normalized;
}

function normalizeSeverity(value: unknown) {
  const normalized = normalizeToken(value);

  if (normalized === "warm" || normalized === "spicy" || normalized === "savage") {
    return normalized;
  }

  if (normalized === "mild" || normalized === "low") {
    return "warm";
  }

  if (normalized === "medium" || normalized === "moderate" || normalized === "hot") {
    return "spicy";
  }

  if (normalized === "high" || normalized === "brutal" || normalized === "harsh") {
    return "savage";
  }

  return value;
}

function normalizeImpactEffort(value: unknown) {
  const normalized = normalizeToken(value);

  if (normalized === "low" || normalized === "medium" || normalized === "high") {
    return normalized;
  }

  if (normalized.includes("low")) {
    return "low";
  }

  if (normalized.includes("high")) {
    return "high";
  }

  if (normalized.includes("medium") || normalized.includes("moderate")) {
    return "medium";
  }

  return value;
}

function normalizeNumber(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return value;
  }

  const outOfTen = value.match(/(\d+)\s*\/\s*10\b/);

  if (outOfTen) {
    return Number(outOfTen[1]) * 10;
  }

  const match = value.match(/\d+/);

  return match ? Number(match[0]) : value;
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value : value;
}

function normalizeToken(value: unknown) {
  return typeof value === "string"
    ? value
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : "";
}

function formatSchemaIssues(issues: Array<{ path: PropertyKey[]; message: string }>) {
  return issues
    .slice(0, 3)
    .map((issue) => `${issue.path.join(".") || "root"} ${issue.message}`)
    .join("; ");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function stripJsonFence(content: string) {
  return content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
}

function getEmptyResponseMessage(finishReason: string | null | undefined) {
  if (!finishReason) {
    return "OpenRouter returned an empty analysis.";
  }

  return `OpenRouter returned an empty analysis. Finish reason: ${finishReason}.`;
}

function extractFirstJsonValue(content: string) {
  const start = findJsonStart(content);

  if (start === -1) {
    return null;
  }

  const stack: string[] = [];
  let isInsideString = false;
  let isEscaped = false;

  for (let index = start; index < content.length; index += 1) {
    const character = content[index];

    if (isInsideString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (character === "\\") {
        isEscaped = true;
      } else if (character === "\"") {
        isInsideString = false;
      }

      continue;
    }

    if (character === "\"") {
      isInsideString = true;
      continue;
    }

    if (character === "{" || character === "[") {
      stack.push(character);
      continue;
    }

    if (character === "}" || character === "]") {
      const opener = stack.pop();

      if (!isMatchingJsonPair(opener, character)) {
        return null;
      }

      if (stack.length === 0) {
        return content.slice(start, index + 1);
      }
    }
  }

  return null;
}

function findJsonStart(content: string) {
  const objectStart = content.indexOf("{");
  const arrayStart = content.indexOf("[");

  if (objectStart === -1) {
    return arrayStart;
  }

  if (arrayStart === -1) {
    return objectStart;
  }

  return Math.min(objectStart, arrayStart);
}

function isMatchingJsonPair(opener: string | undefined, closer: string) {
  return (opener === "{" && closer === "}") || (opener === "[" && closer === "]");
}
