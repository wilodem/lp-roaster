import { describe, expect, it } from "vitest";
import { parseModelJson } from "@/app/lib/roast-ai";

describe("parseModelJson", () => {
  it("parses plain JSON", () => {
    expect(parseModelJson('{"ok":true}')).toEqual({ ok: true });
  });

  it("parses fenced JSON", () => {
    expect(parseModelJson('```json\n{"ok":true}\n```')).toEqual({ ok: true });
  });

  it("throws a useful error for malformed JSON", () => {
    expect(() => parseModelJson("not json")).toThrow("OpenRouter returned invalid JSON");
  });
});
