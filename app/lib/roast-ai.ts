import type { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions";
import { getOpenRouterClient, getRoastModel } from "@/app/lib/openrouter";
import { buildRoastPrompt, roastSystemPrompt } from "@/app/lib/roast-prompt";
import { roastJsonSchema, roastModelOutputSchema } from "@/app/lib/roast-schema";
import { shouldRequireStructuredOutputSupport } from "@/app/lib/roast-models";
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
  const dataUrl = `data:${options.mimeType};base64,${Buffer.from(options.imageBuffer).toString("base64")}`;

  const request: OpenRouterChatCompletionParams = {
    model,
    temperature: 0.25,
    max_tokens: 3600,
    stream: false,
    plugins: [{ id: "response-healing" }],
    provider: shouldRequireStructuredOutputSupport(model) ? { require_parameters: true } : undefined,
    response_format: {
      type: "json_schema",
      json_schema: roastJsonSchema,
    },
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
  const analysis = roastModelOutputSchema.safeParse(parsed);

  if (!analysis.success) {
    throw new Error("OpenRouter returned analysis with an unexpected shape. Try again with a clearer screenshot.");
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
