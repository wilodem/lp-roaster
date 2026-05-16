import { describe, expect, it } from "vitest";
import { formatLoadingFocusAreas, formatRoastCopyText } from "@/app/components/roaster-app";
import type { RoastAnalysis } from "@/app/types/roast";

describe("formatLoadingFocusAreas", () => {
  it("formats one selected focus area", () => {
    expect(formatLoadingFocusAreas(["cta"])).toBe("CTA clarity");
  });

  it("formats two selected focus areas", () => {
    expect(formatLoadingFocusAreas(["messaging", "cta"])).toBe("messaging and CTA clarity");
  });

  it("formats three or more selected focus areas", () => {
    expect(formatLoadingFocusAreas(["visual-hierarchy", "messaging", "conversion-friction"])).toBe(
      "hierarchy, messaging, and conversion friction",
    );
  });
});

describe("formatRoastCopyText", () => {
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
    meta: {
      model: "test-model",
      latencyMs: 10,
      usage: {
        promptTokens: 100,
        completionTokens: 200,
        totalTokens: 300,
      },
      costUsd: 0.0042,
    },
  };

  it("formats the full text roast without meme or technical metadata", () => {
    const copy = formatRoastCopyText(sampleAnalysis);

    expect(copy.indexOf("Verdict")).toBeLessThan(copy.indexOf("Roast"));
    expect(copy.indexOf("Roast")).toBeLessThan(copy.indexOf("Diagnosis"));
    expect(copy.indexOf("Diagnosis")).toBeLessThan(copy.indexOf("Fixes"));
    expect(copy).toContain("Score: 72/100");
    expect(copy).toContain("1. Messaging: The headline is too generic.");
    expect(copy).toContain("Headline: Turn landing page visits into qualified demos.");
    expect(copy).not.toContain("CLEAR VALUE? BEST I CAN DO IS VIBES.");
    expect(copy).not.toContain("test-model");
    expect(copy).not.toContain("300");
  });
});
