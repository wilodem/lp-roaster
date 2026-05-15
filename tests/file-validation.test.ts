import { describe, expect, it } from "vitest";
import { maxScreenshotBytes, RequestValidationError, validateScreenshotFile } from "@/app/lib/file-validation";

describe("validateScreenshotFile", () => {
  it("accepts supported image files under the limit", () => {
    const form = new FormData();
    form.append("screenshot", new File(["png"], "page.png", { type: "image/png" }));

    expect(validateScreenshotFile(form.get("screenshot")).mimeType).toBe("image/png");
  });

  it("rejects unsupported file types", () => {
    const form = new FormData();
    form.append("screenshot", new File(["html"], "page.html", { type: "text/html" }));

    expect(() => validateScreenshotFile(form.get("screenshot"))).toThrow(RequestValidationError);
  });

  it("rejects oversized screenshots", () => {
    const form = new FormData();
    const oversized = new File([new Uint8Array(maxScreenshotBytes + 1)], "page.png", { type: "image/png" });
    form.append("screenshot", oversized);

    expect(() => validateScreenshotFile(form.get("screenshot"))).toThrow("under 4 MB");
  });
});
