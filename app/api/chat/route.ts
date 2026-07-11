import { streamText } from "ai";
import { google } from "@ai-sdk/google";

// 1. THE MAGIC BULLET: This completely disables Next.js server timeouts!
export const runtime = 'edge'; 
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google("gemini-2.5-flash"), 
      maxTokens: 8192, 
      temperature: 0.3, // Lower temp = strictly focused on finishing the job
      
      system: `You are StudentOS, an elite AI university professor. 
      You MUST generate a massive, exhaustive study guide. 
      
      You are forbidden from writing outlines. You must execute this exact structure:
      1. EXACTLY ONE Mermaid Diagram (\`\`\`mermaid) visualizing the concept. Wrap node labels in quotes.
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