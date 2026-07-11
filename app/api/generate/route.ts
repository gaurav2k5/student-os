import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const runtime = 'edge'; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      // THE FIX: Back to the free-tier Flash model
      model: google("gemini-2.5-flash"), 
      
      maxTokens: 8192, 
      temperature: 0.4, 
      
      system: `You are StudentOS, an elite AI university professor. 
      You MUST generate a massive, exhaustive study guide. 
      CRITICAL RULE: You must write AT LEAST 400 words per section.
      
      Execute this exact structure:
      1. DIAGRAM: Exactly ONE Mermaid Diagram (\`\`\`mermaid) visualizing the concept. 
      >>> MERMAID SYNTAX RULES:
      - Use ONLY 'graph TD' or 'flowchart TD'.
      - Node IDs MUST be simple letters (A, B, C).
      - Node labels MUST be wrapped in double quotes (e.g., A["Database Concept"]).
      - DO NOT use parentheses (), brackets [], or special characters inside the labels.
      
      2. INTRODUCTION: Deep dive into what the concept is and why it exists.
      3. CORE MECHANICS: A highly detailed breakdown of how it works.
      4. REAL-WORLD EXAMPLES: Provide 3 complex, highly detailed examples.
      5. ADVANCED CONCEPTS: Explain edge cases and expert-level details.
      
      DO NOT STOP until all 5 sections are exhaustively completed.`,
      
      messages: messages,
    });

    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to stream text" }), { status: 500 });
  }
}