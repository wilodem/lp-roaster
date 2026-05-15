import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeLandingPageScreenshot } from "@/app/lib/roast-ai";
import { RequestValidationError, validateScreenshotFile } from "@/app/lib/file-validation";
import { parseRoastForm } from "@/app/lib/roast-request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.includes("multipart/form-data")) {
      throw new RequestValidationError("Send the screenshot as multipart/form-data.");
    }

    const formData = await request.formData();
    const input = parseRoastForm(formData);
    const screenshot = validateScreenshotFile(formData.get("screenshot"));
    const imageBuffer = await screenshot.file.arrayBuffer();

    const analysis = await analyzeLandingPageScreenshot({
      imageBuffer,
      mimeType: screenshot.mimeType,
      intensity: input.intensity,
      focusAreas: input.focusAreas,
      startedAt,
    });

    return NextResponse.json({ analysis });
  } catch (error) {
    return jsonError(error);
  }
}

function jsonError(error: unknown) {
  if (error instanceof RequestValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: "The roast request was invalid.",
        detail: error.issues[0]?.message ?? "Check the submitted fields.",
      },
      { status: 400 },
    );
  }

  const message = error instanceof Error ? error.message : "Unknown roast error.";
  const isConfigError = message.includes("OPENROUTER_API_KEY");

  return NextResponse.json(
    {
      error: isConfigError ? message : "The landing page roast failed.",
      detail: isConfigError ? undefined : message,
    },
    { status: 500 },
  );
}
