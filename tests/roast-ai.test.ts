import { describe, expect, it } from "vitest";
import { extractModelContent, parseModelJson } from "@/app/lib/roast-ai";

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
