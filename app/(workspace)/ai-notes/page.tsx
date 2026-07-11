"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { Sparkles, FileText, Youtube, Link as LinkIcon, Plus, Loader2, Save, ArrowLeft } from "lucide-react";

export default function AINotesPage() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Send the prompt to the AI
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedNote(null);

    try {
      // Calling the AI chat route you built earlier!
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `You are an expert tutor and technical writer. Create a comprehensive, highly structured study guide in Markdown format about: ${prompt}. Include clear headings, bullet points, and code/wiring snippets if it relates to hardware or programming.`
          }]
        }),
      });

      if (!response.ok) throw new Error("Failed to generate note");

      // Extract the text from the response
      const data = await response.json();
      // Adjusting based on how your specific API returns data (OpenAI vs Vercel AI SDK)
      const text = data.text || data.content || data.choices?.[0]?.message?.content || data;
      
      setGeneratedNote(typeof text === "string" ? text : JSON.stringify(text));
    } catch (error) {
      console.error("Error generating note:", error);
      // Fallback for testing if the API route isn't perfectly matched yet
      setGeneratedNote(`# Study Guide: ${prompt}\n\n*The AI endpoint is currently unreachable, but this is where your generated Markdown guide will appear!*\n\n### Key Concepts\n- Point 1\n- Point 2`);
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Save to Supabase
  const handleSave = async () => {
    if (!user || !generatedNote) return;
    setIsSaving(true);

    const newNote = {
      user_id: user.id,
      title: prompt.charAt(0).toUpperCase() + prompt.slice(1) + " Study Guide",
      content: generatedNote,
    };

    const { error } = await supabase.from("notes").insert([newNote]);
    
    setIsSaving(false);
    if (!error) {
      alert("Note securely saved to your database!");
      setGeneratedNote(null); // Reset back to home screen
      setPrompt("");
    } else {
      alert("Error saving note: " + error.message);
    }
  };

  return (
    <div className="flex h-full flex-col relative overflow-y-auto p-8 bg-[#0a0a0a]">
      
      {/* Header */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">AI Notes</h1>
          <p className="text-zinc-400">Generate, refine, and organize your study materials.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors">
          <Plus size={16} />
          New Document
        </button>
      </header>

      {/* Main Content Area */}
      {!generatedNote ? (
        // STATE 1: THE INPUT GENERATOR (Matches your screenshot)
        <div className="flex-1 flex items-center justify-center pb-20">
          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-950/50 p-12 text-center shadow-xl">
            
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-950 border border-cyan-900 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <Sparkles className="text-cyan-400 h-8 w-8" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">What are we studying today?</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
              Type a topic, paste a YouTube link, or upload a PDF. The AI will instantly generate comprehensive, structured notes for you.
            </p>

            <form onSubmit={handleGenerate} className="relative max-w-xl mx-auto flex items-center">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="esp32"
                disabled={isGenerating}
                className="w-full rounded-xl border border-white/10 bg-zinc-900 py-4 pl-6 pr-14 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50 transition-all"
              />
              <button 
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 hover:bg-cyan-600 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-400"
              >
                {isGenerating ? <Loader2 size={18} className="animate-spin text-cyan-400" /> : <Sparkles size={18} />}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm font-medium text-zinc-500">
              <button className="flex items-center gap-2 hover:text-zinc-300 transition-colors"><FileText size={16} /> Upload PDF</button>
              <button className="flex items-center gap-2 hover:text-zinc-300 transition-colors"><Youtube size={16} /> YouTube Link</button>
              <button className="flex items-center gap-2 hover:text-zinc-300 transition-colors"><LinkIcon size={16} /> Web Page</button>
            </div>
          </div>
        </div>
      ) : (
        // STATE 2: THE RESULT EDITOR
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setGeneratedNote(null)}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back to Generator
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-cyan-500 transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isSaving ? "Saving..." : "Save to Database"}
            </button>
          </div>
          
          <div className="flex-1 rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-xl">
            <textarea
              value={generatedNote}
              onChange={(e) => setGeneratedNote(e.target.value)}
              className="w-full h-[600px] bg-transparent text-zinc-300 text-lg leading-relaxed resize-none focus:outline-none placeholder:text-zinc-700"
            />
          </div>
        </div>
      )}

    </div>
  );
}