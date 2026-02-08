/**
 * Domain and API types for palm readings.
 * Backend contracts are interface-only; no implementation.
 */

export type HandSide = "left" | "right";

export interface ReadingSection {
  id: string;
  title: string;
  content: string;
}

export interface Reading {
  id: string;
  handSide: HandSide;
  isDominant: boolean;
  createdAt: string; // ISO
  sections: ReadingSection[];
  imageUri: string; // Path to the captured palm image
}

export interface AnalyzeRequest {
  imageUri: string;
  handSide: HandSide;
  isDominant: boolean;
}

export interface AnalyzeResponse {
  readingId: string;
  /** If async: jobId for polling */
  jobId?: string;
}
