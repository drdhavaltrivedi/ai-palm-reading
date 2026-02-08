/**
 * Gemini AI Service for Palm Reading Analysis and Chat
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system/legacy";
import type { Reading, ReadingSection } from "../../types/reading";

// TODO: Add your Gemini API key in .env file
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

if (!GEMINI_API_KEY) {
    console.warn("⚠️ Gemini API key not found. Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Analyze palm image and generate a comprehensive reading
 */
export async function analyzePalmImage(
    imageUri: string,
    handSide: "left" | "right",
    isDominant: boolean
): Promise<Reading> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

        // Read image file and convert to base64
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
            encoding: "base64",
        });

        const palmReadingPrompt = `You are an expert palm reader with years of experience in palmistry and hand analysis. 
    
Analyze this ${handSide} hand palm image (${isDominant ? "dominant hand" : "non-dominant hand"}) and provide a comprehensive, insightful palm reading.

Please provide your analysis in the following JSON format with these specific sections:

{
  "sections": [
    {
      "id": "life_line",
      "title": "Life Line",
      "content": "Detailed analysis of the life line, including vitality, energy levels, and life path"
    },
    {
      "id": "heart_line",
      "title": "Heart Line",
      "content": "Analysis of emotional nature, relationships, and heart matters"
    },
    {
      "id": "head_line",
      "title": "Head Line",
      "content": "Insights about thinking patterns, intelligence, and mental approach"
    },
    {
      "id": "fate_line",
      "title": "Fate Line",
      "content": "Career path, life direction, and destiny insights"
    },
    {
      "id": "mounts",
      "title": "Palm Mounts",
      "content": "Analysis of the various mounts and what they reveal about personality"
    },
    {
      "id": "fingers",
      "title": "Fingers & Shape",
      "content": "Finger length, shape analysis and overall hand type"
    },
    {
      "id": "overall",
      "title": "Overall Reading",
      "content": "Summary and key insights from the complete palm analysis"
    }
  ]
}

Make the reading insightful, positive, and personalized based on what you observe in the palm. Focus on the major lines, mounts, and overall hand characteristics visible in the image.`;

        const result = await model.generateContent([
            palmReadingPrompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: "image/jpeg",
                },
            },
        ]);

        const response = result.response;
        const text = response.text();

        // Parse JSON response
        let parsedData;
        try {
            // Extract JSON from markdown code blocks if present
            const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
            const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
            parsedData = JSON.parse(jsonStr);
        } catch (e) {
            // Fallback if JSON parsing fails
            parsedData = {
                sections: [
                    {
                        id: "general",
                        title: "Palm Reading",
                        content: text,
                    },
                ],
            };
        }

        // Create Reading object
        const reading: Reading = {
            id: `reading_${Date.now()}`,
            handSide,
            isDominant,
            createdAt: new Date().toISOString(),
            sections: parsedData.sections as ReadingSection[],
            imageUri, // Store the image URI for chat feature
        };

        return reading;
    } catch (error) {
        console.error("Error analyzing palm:", error);
        throw new Error("Failed to analyze palm image. Please try again.");
    }
}

/**
 * Chat interface for asking questions about a specific palm reading
 */
export class PalmReadingChat {
    private chatSession: any;
    private reading: Reading;
    private imageUri: string;

    constructor(reading: Reading, imageUri: string) {
        this.reading = reading;
        this.imageUri = imageUri;
    }

    /**
     * Initialize chat session with context about the palm reading
     */
    async initialize() {
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

        // Read image file
        const base64Image = await FileSystem.readAsStringAsync(this.imageUri, {
            encoding: "base64",
        });

        // Create initial context
        const readingSummary = this.reading.sections
            .map((s) => `${s.title}: ${s.content}`)
            .join("\n\n");

        const systemPrompt = `You are an expert palm reader assistant. You have just analyzed a ${this.reading.handSide} palm (${this.reading.isDominant ? "dominant" : "non-dominant"} hand) and provided this reading:

${readingSummary}

The user can now ask you questions about their palm reading. Answer their questions based on:
1. The palm image you can see
2. The reading analysis you provided
3. Your knowledge of palmistry and palm reading

Be friendly, insightful, and provide detailed explanations. If asked about specific aspects not visible in the image or not covered in the reading, acknowledge this and provide general palmistry knowledge that might be relevant.`;

        this.chatSession = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [
                        { text: systemPrompt },
                        {
                            inlineData: {
                                data: base64Image,
                                mimeType: "image/jpeg",
                            },
                        },
                    ],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "I understand. I'm ready to answer questions about this palm reading. What would you like to know?",
                        },
                    ],
                },
            ],
        });
    }

    /**
     * Send a message and get response
     */
    async sendMessage(message: string): Promise<string> {
        if (!this.chatSession) {
            await this.initialize();
        }

        try {
            const result = await this.chatSession.sendMessage(message);
            const response = result.response;
            return response.text();
        } catch (error) {
            console.error("Error sending chat message:", error);
            throw new Error("Failed to get response. Please try again.");
        }
    }

    /**
     * Get suggested questions based on the reading
     */
    getSuggestedQuestions(): string[] {
        const suggestions = [
            "What does my life line tell you about my future?",
            "Can you tell me more about my relationships based on my heart line?",
            "What career path is suggested by my palm?",
            "How do my fingers reveal my personality?",
            "What do the mounts on my palm indicate?",
            "Can you see any special markings or symbols?",
        ];

        return suggestions;
    }
}

/**
 * Quick palmistry insights without full analysis (for demo/preview)
 */
export async function getQuickPalmInsights(imageUri: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
            encoding: "base64",
        });

        const result = await model.generateContent([
            "Briefly describe what you see in this palm and provide 2-3 quick palmistry insights in a friendly, conversational way. Keep it under 100 words.",
            {
                inlineData: {
                    data: base64Image,
                    mimeType: "image/jpeg",
                },
            },
        ]);

        return result.response.text();
    } catch (error) {
        console.error("Error getting quick insights:", error);
        return "Unable to analyze palm at this moment. Please try again.";
    }
}
