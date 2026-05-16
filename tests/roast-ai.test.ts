import { beforeEach, describe, expect, it, vi } from "vitest";
import { MEME_TEMPLATE_IDS } from "@/app/lib/meme-library";
import { analyzeLandingPageScreenshot, extractModelContent, normalizeRoastModelOutput, parseModelJson } from "@/app/lib/roast-ai";
import { buildRoastPrompt } from "@/app/lib/roast-prompt";
import { buildRoastJsonSchema, roastModelOutputSchema } from "@/app/lib/roast-schema";

const openRouterCreate = vi.hoisted(() => vi.fn());

vi.mock("@/app/lib/openrouter", () => ({
  getOpenRouterClient: () => ({
    chat: {
      completions: {
        create: openRouterCreate,
      },
    },
  }),
  getRoastModel: () => "google/gemini-3.1-flash-lite",
}));

const sampleModelOutput = {
  summary: {
    pageType: "SaaS landing page",
    audience: "Marketing teams",
    score: 72,
    verdict: "Clear enough to survive, vague enough to leave money behind.",
  },
  roast: {
    title: "The hero whispers when it should sell.",
    body: "The page has good bones, but the value prop is wearing camouflage.",
    severity: "spicy",
  },
  findings: [
    {
      category: "messaging",
      issue: "The headline is too generic.",
      evidence: "The hero copy does not name a concrete outcome.",
      whyItMatters: "Visitors need a reason to keep reading.",
      recommendation: "Lead with a measurable customer outcome.",
      impact: "high",
      effort: "low",
    },
    {
      category: "cta",
      issue: "The primary action blends in.",
      evidence: "The CTA does not dominate the hero area.",
      whyItMatters: "A weak action costs qualified clicks.",
      recommendation: "Make one primary CTA visually dominant.",
      impact: "high",
      effort: "low",
    },
    {
      category: "trust",
      issue: "There is not enough proof above the fold.",
      evidence: "No testimonial, customer logo, or concrete metric is visible.",
      whyItMatters: "Specific proof lowers perceived risk.",
      recommendation: "Add one metric or customer proof point near the hero.",
      impact: "medium",
      effort: "medium",
    },
  ],
  rewrites: {
    headline: "Turn landing page visits into qualified demos.",
    subheadline: "Find weak copy, fuzzy CTAs, and conversion leaks before paid traffic does.",
    cta: "Get my teardown",
  },
  actionPlan: [
    { priority: 1, label: "Rewrite the headline", rationale: "Specific outcomes beat category fluff." },
    { priority: 2, label: "Strengthen the CTA", rationale: "A visible next step reduces hesitation." },
    { priority: 3, label: "Add proof", rationale: "Proof makes the promise believable." },
  ],
  meme: {
    templateId: "imgflip-181913649",
    caption: "CLEAR VALUE? BEST I CAN DO IS VIBES.",
    reason: "The page keeps swiping past clear value in favor of vague polish.",
    altText: "A local reaction meme template selected to summarize the landing page critique.",
  },
};

describe("parseModelJson", () => {
  it("parses plain JSON", () => {
    expect(parseModelJson('{"ok":true}')).toEqual({ ok: true });
  });

  it("parses fenced JSON", () => {
    expect(parseModelJson('```json\n{"ok":true}\n```')).toEqual({ ok: true });
  });

  it("extracts JSON from mixed model text", () => {
    expect(parseModelJson('Here is the result:\n{"ok":true}\nDone.')).toEqual({ ok: true });
  });

  it("throws a useful error for malformed JSON", () => {
    expect(() => parseModelJson("not json")).toThrow("OpenRouter returned invalid JSON");
  });
});

describe("extractModelContent", () => {
  it("returns trimmed string content", () => {
    expect(extractModelContent({ role: "assistant", content: "  {\"ok\":true}  " })).toBe('{"ok":true}');
  });

  it("joins text content parts", () => {
    expect(
      extractModelContent({
        role: "assistant",
        content: [
          { type: "text", text: "{\"ok\":" },
          { type: "text", text: "true}" },
        ],
      }),
    ).toBe('{"ok":\ntrue}');
  });

  it("stringifies already parsed object content", () => {
    expect(extractModelContent({ role: "assistant", content: { ok: true } })).toBe('{"ok":true}');
  });

  it("returns empty content for empty messages", () => {
    expect(extractModelContent(undefined)).toBe("");
  });
});

describe("normalizeRoastModelOutput", () => {
  it("normalizes common prompt-only model shape drift", () => {
    const normalized = normalizeRoastModelOutput({
      summary: {
        pageType: "SaaS landing page",
        audience: "Marketing teams",
        score: "7/10",
        verdict: "Needs sharper copy.",
      },
      roast: {
        title: "The page is whispering.",
        body: "The hero needs more signal.",
        severity: "medium",
      },
      issues: [
        {
          area: "Visual hierarchy",
          title: "CTA is hidden",
          observation: "The button blends in.",
          why: "Visitors miss it.",
          fix: "Increase contrast.",
          impact: "High impact",
          effort: "Low effort",
        },
        {
          category: "copy",
          issue: "Headline is vague",
          evidence: "It never names the outcome.",
          rationale: "Specificity sells.",
          suggestion: "Lead with the outcome.",
          impact: "medium",
          effort: "low",
        },
        {
          focusArea: "proof",
          finding: "Trust is thin",
          visibleEvidence: "No proof point is visible.",
          whyItMatters: "Risk feels higher.",
          action: "Add a customer metric.",
          impact: "moderate",
          effort: "Medium",
        },
      ],
      heroRewrite: {
        heroHeadline: "Turn visits into demos.",
        heroSubheadline: "Find conversion leaks fast.",
        primaryCta: "Roast my page",
      },
      nextSteps: [
        { priority: "1", action: "Rewrite headline", reason: "It drives comprehension." },
        { priority: "2", step: "Boost CTA", description: "It should be obvious." },
        { priority: "3", label: "Add proof", rationale: "It lowers risk." },
      ],
      memeVerdict: {
        template: "imgflip-87743020",
        punchline: "CLICK WHAT, EXACTLY?",
        why: "The page makes visitors choose between two unclear next steps.",
        alt: "A local meme template about competing choices.",
      },
    });

    expect(normalized).toMatchObject({
      summary: { score: 70 },
      roast: { severity: "spicy" },
      findings: [
        {
          category: "visual-hierarchy",
          issue: "CTA is hidden",
          evidence: "The button blends in.",
          whyItMatters: "Visitors miss it.",
          recommendation: "Increase contrast.",
          impact: "high",
          effort: "low",
        },
        {
          category: "messaging",
          whyItMatters: "Specificity sells.",
          recommendation: "Lead with the outcome.",
        },
        {
          category: "trust",
          issue: "Trust is thin",
          evidence: "No proof point is visible.",
          recommendation: "Add a customer metric.",
          impact: "medium",
          effort: "medium",
        },
      ],
      rewrites: {
        headline: "Turn visits into demos.",
        subheadline: "Find conversion leaks fast.",
        cta: "Roast my page",
      },
      actionPlan: [
        { priority: 1, label: "Rewrite headline", rationale: "It drives comprehension." },
        { priority: 2, label: "Boost CTA", rationale: "It should be obvious." },
        { priority: 3, label: "Add proof", rationale: "It lowers risk." },
      ],
      meme: {
        templateId: "imgflip-87743020",
        caption: "CLICK WHAT, EXACTLY?",
        reason: "The page makes visitors choose between two unclear next steps.",
        altText: "A local meme template about competing choices.",
      },
    });
  });
});

describe("meme contract", () => {
  it("accepts only local meme template IDs", () => {
    expect(roastModelOutputSchema.safeParse(sampleModelOutput).success).toBe(true);
    expect(
      roastModelOutputSchema.safeParse({
        ...sampleModelOutput,
        meme: {
          ...sampleModelOutput.meme,
          templateId: "imgflip-not-real",
        },
      }).success,
    ).toBe(false);
  });

  it("includes the local meme allowlist in the prompt", () => {
    const prompt = buildRoastPrompt({
      intensity: "spicy",
      focusAreas: ["visual-hierarchy", "messaging", "cta"],
    });

    expect(prompt).toContain("Local meme template library:");
    expect(prompt).toContain(MEME_TEMPLATE_IDS[0]);
    expect(prompt).toContain("meme { templateId, caption, reason, altText }");
  });
});

describe("focus area scope", () => {
  it("limits the JSON schema finding categories to the selected focus areas", () => {
    const schema = buildRoastJsonSchema(["messaging", "cta"]);

    expect(schema.schema.properties.findings.items.properties.category.enum).toEqual(["messaging", "cta"]);
  });

  it("adds hard scope and section voice rules to the prompt", () => {
    const prompt = buildRoastPrompt({
      intensity: "spicy",
      focusAreas: ["messaging", "cta"],
    });

    expect(prompt).toContain("Treat the selected focus areas as the hard review scope.");
    expect(prompt).toContain("Every findings[].category value must be one of the selected focus areas exactly.");
    expect(prompt).toContain("summary.verdict: write one short, lightly roasty diagnostic line.");
    expect(prompt).toContain("findings[].evidence: state only raw visible evidence, with no joke.");
  });
});

describe("analyzeLandingPageScreenshot routing", () => {
  beforeEach(() => {
    openRouterCreate.mockReset();
    openRouterCreate.mockResolvedValue({
      model: "test-model",
      choices: [
        {
          finish_reason: "stop",
          message: {
            content: JSON.stringify(sampleModelOutput),
          },
        },
      ],
    });
  });

  it("requires provider parameter support for strict models", async () => {
    await analyzeLandingPageScreenshot({
      imageBuffer: new Uint8Array([1]).buffer,
      mimeType: "image/png",
      intensity: "spicy",
      focusAreas: ["messaging", "cta", "trust"],
      model: "google/gemini-3.1-flash-lite",
      startedAt: Date.now(),
    });

    expect(openRouterCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "google/gemini-3.1-flash-lite",
        provider: {
          require_parameters: true,
        },
      }),
    );
    expect(
      openRouterCreate.mock.calls[0][0].response_format.json_schema.schema.properties.findings.items.properties.category
        .enum,
    ).toEqual(["messaging", "cta", "trust"]);
  });

  it("avoids native schema parameters for prompt-shaped Anthropic models", async () => {
    await analyzeLandingPageScreenshot({
      imageBuffer: new Uint8Array([1]).buffer,
      mimeType: "image/png",
      intensity: "spicy",
      focusAreas: ["messaging", "cta", "trust"],
      model: "anthropic/claude-sonnet-4.6",
      startedAt: Date.now(),
    });

    expect(openRouterCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "anthropic/claude-sonnet-4.6",
        plugins: undefined,
        provider: undefined,
        response_format: undefined,
      }),
    );
  });

  it("rejects model findings outside the selected focus areas", async () => {
    await expect(
      analyzeLandingPageScreenshot({
        imageBuffer: new Uint8Array([1]).buffer,
        mimeType: "image/png",
        intensity: "spicy",
        focusAreas: ["messaging", "cta"],
        model: "anthropic/claude-sonnet-4.6",
        startedAt: Date.now(),
      }),
    ).rejects.toThrow("outside requested focus areas: trust");
  });
});
