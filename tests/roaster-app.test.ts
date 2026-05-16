import { describe, expect, it } from "vitest";
import { formatLoadingFocusAreas } from "@/app/components/roaster-app";

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
