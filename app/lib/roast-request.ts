import { roastRequestSchema } from "@/app/lib/roast-schema";

export function parseRoastForm(formData: FormData) {
  const rawIntensity = formData.get("intensity");
  const rawFocusAreas = formData.getAll("focusAreas");

  const focusAreas =
    rawFocusAreas.length > 0
      ? rawFocusAreas.flatMap((value) =>
          String(value)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        )
      : undefined;

  return roastRequestSchema.parse({
    intensity: typeof rawIntensity === "string" ? rawIntensity : undefined,
    focusAreas,
  });
}
