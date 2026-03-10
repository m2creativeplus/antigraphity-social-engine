import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// This is the main Orchestrator Agent Endpoint
export async function POST(req: Request) {
  try {
    const { topic, tone, platforms, language } = await req.json();

    if (!topic || !platforms || platforms.length === 0) {
      return NextResponse.json({ error: "Topic and at least one platform are required" }, { status: 400 });
    }

    // 1. Agent 1 & 2: Content Strategist & Platform Optimizer (Gemini 2.5 Pro)
    // We use generateObject to ensure we get structured, predictable JSON back for the UI Matrix.
    const { object: campaignData } = await generateObject({
      model: google('gemini-2.5-pro'),
      schema: z.object({
        posts: z.array(z.object({
          platform: z.string(),
          content: z.string().describe("The actual post text, optimized for the platform with appropriate hashtags and emojis."),
          imagePromptDesc: z.string().describe("A highly detailed prompt for an Image Generation model (like Imagen 4) to create a matching visual."),
          videoPromptDesc: z.string().describe("A scene description for a Video Generation model (like Veo 3) with camera movement and style.")
        }))
      }),
      prompt: `
        You are the Antigraphity Social AI Orchestrator, an expert in Somaliland & Horn of Africa digital strategy.
        
        Directive Details:
        - Topic: ${topic}
        - Tone: ${tone}
        - Target Language: ${language}
        - Target Platforms: ${platforms.join(', ')}

        Apply the SCALE framework (Subject, Camera, Action, Lighting, Environment) mental model to generate the media prompts.

        For each platform requested, create:
        1. The highly optimized text post in the target language.
        2. An English prompt for Imagen 4 to generate the perfect accompanying image.
        3. An English prompt for Veo 3 to generate a complementary 8-second video clip.

        Ensure all content aligns with the institutional and professional standards expected in Somaliland.
      `,
    });

    return NextResponse.json({ success: true, campaign: campaignData });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate campaign", details: error }, { status: 500 });
  }
}
