const allowedImageTypes = new Set(["image/png", "image/jpeg", "image/webp"]);

export const maxScreenshotBytes = 4 * 1024 * 1024;

export type ValidatedScreenshot = {
  file: File;
  mimeType: string;
};

export function validateScreenshotFile(value: FormDataEntryValue | null): ValidatedScreenshot {
  if (!(value instanceof File)) {
    throw new RequestValidationError("Upload a landing page screenshot before asking for a roast.");
  }

  if (value.size === 0) {
    throw new RequestValidationError("The screenshot file is empty.");
  }

  if (value.size > maxScreenshotBytes) {
    throw new RequestValidationError("The screenshot is too large. Use a PNG, JPG, or WebP under 4 MB.");
  }

  if (!allowedImageTypes.has(value.type)) {
    throw new RequestValidationError("Unsupported file type. Upload a PNG, JPG, or WebP screenshot.");
  }

  return {
    file: value,
    mimeType: value.type,
  };
}

export class RequestValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestValidationError";
  }
}
