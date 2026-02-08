/**
 * API Service for Palm Reading
 * Uses Gemini AI for analysis and local storage for readings
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AnalyzeRequest, AnalyzeResponse, Reading } from "../../types";
import { analyzePalmImage } from "./gemini";

const READINGS_STORAGE_KEY = "@palm_readings";

/**
 * Submit palm image for analysis using Gemini AI
 */
export async function submitAnalysis(
  request: AnalyzeRequest,
  _token?: string
): Promise<AnalyzeResponse> {
  try {
    // Analyze palm using Gemini AI
    const reading = await analyzePalmImage(
      request.imageUri,
      request.handSide,
      request.isDominant
    );

    // Save reading to local storage
    await saveReading(reading);

    return {
      readingId: reading.id,
    };
  } catch (error) {
    console.error("Error submitting analysis:", error);
    throw error;
  }
}

/**
 * Get a specific reading by ID
 */
export async function getReading(
  readingId: string,
  _token?: string
): Promise<Reading> {
  try {
    const readings = await getReadingsList();
    const reading = readings.find((r) => r.id === readingId);

    if (!reading) {
      throw new Error("Reading not found");
    }

    return reading;
  } catch (error) {
    console.error("Error getting reading:", error);
    throw error;
  }
}

/**
 * Get list of all readings
 */
export async function getReadingsList(_token?: string): Promise<Reading[]> {
  try {
    const readingsJson = await AsyncStorage.getItem(READINGS_STORAGE_KEY);
    if (!readingsJson) {
      return [];
    }
    return JSON.parse(readingsJson);
  } catch (error) {
    console.error("Error getting readings list:", error);
    return [];
  }
}

/**
 * Save a reading to local storage
 */
async function saveReading(reading: Reading): Promise<void> {
  try {
    const existingReadings = await getReadingsList();
    const updatedReadings = [reading, ...existingReadings];
    await AsyncStorage.setItem(
      READINGS_STORAGE_KEY,
      JSON.stringify(updatedReadings)
    );
  } catch (error) {
    console.error("Error saving reading:", error);
    throw error;
  }
}

/**
 * Delete a reading
 */
export async function deleteReading(readingId: string): Promise<void> {
  try {
    const existingReadings = await getReadingsList();
    const updatedReadings = existingReadings.filter((r) => r.id !== readingId);
    await AsyncStorage.setItem(
      READINGS_STORAGE_KEY,
      JSON.stringify(updatedReadings)
    );
  } catch (error) {
    console.error("Error deleting reading:", error);
    throw error;
  }
}
