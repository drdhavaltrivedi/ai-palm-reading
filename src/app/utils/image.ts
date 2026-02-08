/**
 * Image compression and validation helpers.
 * Implementation can use expo-image-manipulator or similar.
 */

import { MAX_IMAGE_DIMENSION, MAX_IMAGE_SIZE_KB } from "./constants";

export interface ImageValidationResult {
  valid: boolean;
  error?: "too_large" | "too_small" | "invalid";
}

export async function compressImageForUpload(uri: string): Promise<string> {
  // TODO: use expo-image-manipulator to resize/compress; return new uri
  return uri;
}

export function validateImageDimensions(
  width: number,
  height: number
): ImageValidationResult {
  if (width < 100 || height < 100) return { valid: false, error: "too_small" };
  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    return { valid: false, error: "too_large" };
  }
  return { valid: true };
}
