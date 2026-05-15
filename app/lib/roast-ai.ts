import { getOpenRouterClient, getRoastModel } from "@/app/lib/openrouter";
import { buildRoastPrompt, roastSystemPrompt } from "@/app/lib/roast-prompt";
import { roastAnalysisSchema, roastJsonSchema } from "@/app/lib/roast-schema";
import type { RoastAnalysis, RoastIntensity } from "@/app/types/roast";

export async function analyzeLandingPageScreenshot(options: {
  imageBuffer: ArrayBuffer;
  mimeType: string;
  intensity: RoastIntensity;
  focusAreas: string[];
  startedAt: number;
}): Promise<RoastAnalysis> {
  const model = getRoastModel();
  const dataUrl = `data:${options.mimeType};base64,${Buffer.from(options.imageBuffer).toString("base64")}`;

  const response = await getOpenRouterClient().chat.completions.create({
    model,
    temperature: 0.45,
    max_tokens: 2200,
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
  });

  const content = response.choices[0]?.message.content;

  if (!content) {
    throw new Error("OpenRouter returned an empty analysis.");
  }

  const parsed = parseModelJson(content);
  const analysis = roastAnalysisSchema.parse(parsed);

  return {
    ...analysis,
    meta: {
      model: response.model ?? model,
      latencyMs: Date.now() - options.startedAt,
    },
  };
}

export function parseModelJson(content: string) {
  try {
    return JSON.parse(stripJsonFence(content));
  } catch {
    throw new Error("OpenRouter returned invalid JSON. Try again with a clearer screenshot.");
  }
}

function stripJsonFence(content: string) {
  return content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
}
