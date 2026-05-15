import { beforeEach, describe, expect, it, vi } from "vitest";
import { ROAST_MODEL_OPTIONS } from "@/app/lib/roast-models";
import type { RoastAnalysis } from "@/app/types/roast";

const analyzeLandingPageScreenshot = vi.fn();

vi.mock("@/app/lib/roast-ai", () => ({
  analyzeLandingPageScreenshot,
}));

const sampleAnalysis: RoastAnalysis = {
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
  meta: {
    model: "test-model",
    latencyMs: 10,
  },
};

describe("POST /api/roast", () => {
  beforeEach(() => {
    analyzeLandingPageScreenshot.mockReset();
  });

  it("returns structured analysis for a valid screenshot", async () => {
    analyzeLandingPageScreenshot.mockResolvedValue(sampleAnalysis);
    const { POST } = await import("@/app/api/roast/route");
    const request = buildRequest(new File(["png"], "page.png", { type: "image/png" }));

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.analysis.summary.score).toBe(72);
    expect(analyzeLandingPageScreenshot).toHaveBeenCalledWith(
      expect.objectContaining({
        intensity: "spicy",
        focusAreas: ["visual-hierarchy", "messaging", "cta"],
        mimeType: "image/png",
        model: undefined,
      }),
    );
  });

  it.each(ROAST_MODEL_OPTIONS.map((option) => option.id))("passes allowlisted model %s to the analyzer", async (model) => {
    analyzeLandingPageScreenshot.mockResolvedValue(sampleAnalysis);
    const { POST } = await import("@/app/api/roast/route");
    const request = buildRequest(new File(["png"], "page.png", { type: "image/png" }), model);

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(analyzeLandingPageScreenshot).toHaveBeenCalledWith(
      expect.objectContaining({
        model,
      }),
    );
  });

  it("returns 400 for unknown model IDs", async () => {
    const { POST } = await import("@/app/api/roast/route");
    const request = buildRequest(new File(["png"], "page.png", { type: "image/png" }), "not/a-real-model");

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("The roast request was invalid.");
    expect(analyzeLandingPageScreenshot).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid files", async () => {
    const { POST } = await import("@/app/api/roast/route");
    const request = buildRequest(new File(["html"], "page.html", { type: "text/html" }));

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("Unsupported file type");
    expect(analyzeLandingPageScreenshot).not.toHaveBeenCalled();
  });

  it("returns 400 for non-multipart requests", async () => {
    const { POST } = await import("@/app/api/roast/route");
    const request = new Request("http://localhost:3000/api/roast", {
      method: "POST",
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toContain("multipart/form-data");
    expect(analyzeLandingPageScreenshot).not.toHaveBeenCalled();
  });

  it("returns a clear config error when OpenRouter is not configured", async () => {
    analyzeLandingPageScreenshot.mockRejectedValue(new Error("OPENROUTER_API_KEY is required to analyze screenshots."));
    const { POST } = await import("@/app/api/roast/route");
    const request = buildRequest(new File(["png"], "page.png", { type: "image/png" }));

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(500);
    expect(payload.error).toContain("OPENROUTER_API_KEY");
  });
});

function buildRequest(file: File, model?: string) {
  const form = new FormData();
  form.append("screenshot", file);
  form.append("intensity", "spicy");
  if (model) {
    form.append("model", model);
  }
  form.append("focusAreas", "visual-hierarchy");
  form.append("focusAreas", "messaging");
  form.append("focusAreas", "cta");

  return new Request("http://localhost:3000/api/roast", {
    method: "POST",
    body: form,
  });
}
