import { z } from "zod";
import { MEME_TEMPLATE_IDS } from "@/app/lib/meme-library";
import { ROAST_MODEL_IDS } from "@/app/lib/roast-models";

export const roastIntensitySchema = z.enum(["helpful", "spicy", "savage"]);
export const roastModelSchema = z.enum(ROAST_MODEL_IDS);

export const focusAreaSchema = z.enum([
  "visual-hierarchy",
  "messaging",
  "cta",
  "trust",
  "conversion-friction",
  "accessibility",
]);

export const roastRequestSchema = z.object({
  intensity: roastIntensitySchema.default("spicy"),
  focusAreas: z.array(focusAreaSchema).min(1).max(6).default(["visual-hierarchy", "messaging", "cta"]),
  model: roastModelSchema.optional(),
});

export const memeTemplateIdSchema = z.string().refine((value) => MEME_TEMPLATE_IDS.includes(value), {
  message: "Choose a meme template from the local manifest.",
});

export const memeVerdictSchema = z.object({
  templateId: memeTemplateIdSchema,
  caption: z.string().min(1).max(90),
  reason: z.string().min(1).max(240),
  altText: z.string().min(1).max(260),
});

export const roastModelOutputSchema = z.object({
  summary: z.object({
    pageType: z.string().min(1),
    audience: z.string().min(1),
    score: z.number().int().min(0).max(100),
    verdict: z.string().min(1),
  }),
  roast: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    severity: z.enum(["warm", "spicy", "savage"]),
  }),
  findings: z
    .array(
      z.object({
        category: focusAreaSchema,
        issue: z.string().min(1),
        evidence: z.string().min(1),
        whyItMatters: z.string().min(1),
        recommendation: z.string().min(1),
        impact: z.enum(["low", "medium", "high"]),
        effort: z.enum(["low", "medium", "high"]),
      }),
    )
    .min(3)
    .max(6),
  rewrites: z.object({
    headline: z.string().min(1),
    subheadline: z.string().min(1),
    cta: z.string().min(1),
  }),
  actionPlan: z
    .array(
      z.object({
        priority: z.number().int().min(1).max(5),
        label: z.string().min(1),
        rationale: z.string().min(1),
      }),
    )
    .min(3)
    .max(5),
  meme: memeVerdictSchema,
});

export const roastAnalysisSchema = roastModelOutputSchema.extend({
  meta: z.object({
    model: z.string().min(1),
    latencyMs: z.number().int().nonnegative(),
  }),
});

export const roastJsonSchema = {
  name: "landing_page_roast",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["summary", "roast", "findings", "rewrites", "actionPlan", "meme"],
    properties: {
      summary: {
        type: "object",
        additionalProperties: false,
        required: ["pageType", "audience", "score", "verdict"],
        properties: {
          pageType: { type: "string" },
          audience: { type: "string" },
          score: { type: "integer", minimum: 0, maximum: 100 },
          verdict: { type: "string" },
        },
      },
      roast: {
        type: "object",
        additionalProperties: false,
        required: ["title", "body", "severity"],
        properties: {
          title: { type: "string" },
          body: { type: "string" },
          severity: { type: "string", enum: ["warm", "spicy", "savage"] },
        },
      },
      findings: {
        type: "array",
        minItems: 3,
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "category",
            "issue",
            "evidence",
            "whyItMatters",
            "recommendation",
            "impact",
            "effort"
          ],
          properties: {
            category: {
              type: "string",
              enum: [
                "visual-hierarchy",
                "messaging",
                "cta",
                "trust",
                "conversion-friction",
                "accessibility"
              ],
            },
            issue: { type: "string" },
            evidence: { type: "string" },
            whyItMatters: { type: "string" },
            recommendation: { type: "string" },
            impact: { type: "string", enum: ["low", "medium", "high"] },
            effort: { type: "string", enum: ["low", "medium", "high"] },
          },
        },
      },
      rewrites: {
        type: "object",
        additionalProperties: false,
        required: ["headline", "subheadline", "cta"],
        properties: {
          headline: { type: "string" },
          subheadline: { type: "string" },
          cta: { type: "string" },
        },
      },
      actionPlan: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["priority", "label", "rationale"],
          properties: {
            priority: { type: "integer", minimum: 1, maximum: 5 },
            label: { type: "string" },
            rationale: { type: "string" },
          },
        },
      },
      meme: {
        type: "object",
        additionalProperties: false,
        required: ["templateId", "caption", "reason", "altText"],
        properties: {
          templateId: {
            type: "string",
            enum: MEME_TEMPLATE_IDS,
          },
          caption: {
            type: "string",
            minLength: 1,
            maxLength: 90,
          },
          reason: {
            type: "string",
            minLength: 1,
            maxLength: 240,
          },
          altText: {
            type: "string",
            minLength: 1,
            maxLength: 260,
          },
        },
      },
    },
  },
} as const;
