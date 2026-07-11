import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google("gemini-2.5-flash"), 
      system: `You are StudentOS, an expert AI tutor. 
      Generate a comprehensive study guide. 
      Use rich Markdown, headers, bullet points, and bold text. 
      CRITICAL: You MUST include a mermaid flowchart or diagram whenever explaining a process or system. 
      Wrap all mermaid node labels in double quotes.`,
      messages: messages, 
    });

    return result.toDataStreamResponse(); 
  } catch (error) {
    console.error("Notes API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate document" }), { status: 500 });
  }
}