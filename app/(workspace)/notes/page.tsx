"use client";

import { useRef, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Bot, Sparkles, Save, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChat } from "ai/react"; 

const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const renderDiagram = async () => {
      if (ref.current && chart) {
        try {
         
          const cleanChart = chart.trim().replace(/^```mermaid\s*/i, '').replace(/```$/i, '');

          const mermaid = (await import("mermaid")).default;
          mermaid.initialize({ 
            theme: "dark", 
            startOnLoad: false, 
            securityLevel: 'loose', 
            fontFamily: 'inherit' 
          });

          
          const id = `mermaid_svg_${Math.round(Math.random() * 1000000)}`;

         
          ref.current.innerHTML = '';

          const { svg } = await mermaid.render(id, cleanChart);
          if (ref.current) ref.current.innerHTML = svg;
          setHasError(false);
        } catch (error) {
         
          console.error("Mermaid Render Crash:", error);
          console.log("Failed Chart Data from AI:", chart);
          setHasError(true);
        }
      }
    };
    renderDiagram();
  }, [chart]);

  if (hasError) return (
    <div className="flex flex-col items-center justify-center p-6 my-6 bg-red-950/20 border border-red-900/30 rounded-2xl shadow-inner text-center gap-2">
      <span className="text-red-400 text-xs font-bold uppercase tracking-wider">⚠️ AI Syntax Error</span>
      <span className="text-red-400/70 text-[10px]">The AI generated an invalid shape. Check terminal for details.</span>
    </div>
  );
  
  return <div ref={ref} className="flex justify-center items-center my-8 p-6 bg-zinc-950/80 border border-white/5 rounded-2xl shadow-inner overflow-x-auto min-h-[150px]" />;
};

export default function NotesPage() {
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [promptInput, setPromptInput] = useState("");

  const { messages, append, isLoading, setMessages } = useChat({
    api: "/api/generate",
    onError: (err) => toast.error("Generation failed: " + err.message),
  });

  const generatedNote = messages.filter(m => m.role === "assistant").pop()?.content || "";

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    
    setMessages([]);
    
    append({ 
      role: "user", 
      content: `Execute the full 5-part StudentOS Study Guide protocol for the following topic: ${promptInput}. Start immediately with the diagram.` 
    });
  };

  const handleSave = async () => {
    if (!user || !generatedNote) return;
    setIsSaving(true);

    const newNote = {
      user_id: user.id,
      title: promptInput.charAt(0).toUpperCase() + promptInput.slice(1) + " Study Guide",
      content: generatedNote,
    };

    const { error } = await supabase.from("notes").insert([newNote]);
    
    setIsSaving(false);
    
    if (!error) {
      toast.success("Note securely saved to your database!"); 
      setMessages([]); 
      setPromptInput("");
    } else {
      toast.error("Error saving note: " + error.message); 
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen p-8 bg-[#0a0a0a] text-white overflow-hidden">
      
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold tracking-tight mb-1">AI Notes</h1>
        <p className="text-zinc-400">Generate intelligent, formatted study guides instantly.</p>
      </header>

      <div className="flex-1 flex flex-col min-h-0 max-w-4xl mx-auto w-full gap-6 pb-10">
        
        {/* Input Bar Container */}
        <form onSubmit={handleGenerate} className="flex-shrink-0 p-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 shadow-lg">
          <div className="flex items-center gap-3 bg-zinc-950 p-2 rounded-xl">
            <input
              type="text"
              autoFocus
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="What do you want to learn about today? (e.g., Database Normalization)"
              className="flex-1 bg-transparent border-none text-white focus:outline-none focus:ring-0 px-4 py-2 placeholder:text-zinc-600"
            />
            <button
              type="submit"
              disabled={isLoading || !promptInput.trim()}
              className="liquid-glass flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin text-cyan-400" /> : <Sparkles size={18} className="text-cyan-400" />}
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>

        {/* Eye-Catching Display Area */}
        {generatedNote && (
          <div className="flex-1 overflow-y-auto min-h-0 bg-gradient-to-b from-zinc-950 to-black border border-white/[0.03] rounded-3xl backdrop-blur-xl shadow-2xl relative animate-fade-rise group">
            
            {/* Visual Header Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-70" />

            {/* Custom Typography Configuration */}
            <div className="max-w-none p-8 sm:p-12
              prose prose-invert 
              prose-headings:font-normal prose-headings:tracking-tighter 
              prose-h1:text-4xl prose-h1:bg-gradient-to-r prose-h1:from-white prose-h1:to-zinc-400 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:font-light prose-h1:pb-4 prose-h1:border-b prose-h1:border-white/[0.05]
              prose-h2:text-2xl prose-h2:text-zinc-200 prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-lg prose-h3:text-cyan-400/90 prose-h3:mt-8
              prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-base prose-p:font-light
              prose-strong:text-zinc-100 prose-strong:font-semibold
              prose-ul:list-disc prose-ul:pl-6 prose-li:text-zinc-400 prose-li:my-2
              prose-blockquote:border-l-2 prose-blockquote:border-cyan-500/50 prose-blockquote:bg-white/[0.01] prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:text-zinc-300 prose-blockquote:italic
            ">
              <ReactMarkdown
                components={{
                  code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    const isMermaid = match && match[1] === "mermaid";
                    
                    if (isMermaid) {
                      if (isLoading) {
                        return (
                          <div className="flex items-center justify-center p-6 my-6 bg-zinc-900/50 border border-zinc-800 rounded-xl border-dashed">
                            <Loader2 className="animate-spin text-cyan-500 mr-3" size={18} />
                            <span className="text-cyan-500/70 font-mono text-sm tracking-widest uppercase animate-pulse">
                              AI is drawing diagram...
                            </span>
                          </div>
                        );
                      }
                      return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
                    }
                    
                    return <code {...rest} className={`${className} bg-white/[0.04] px-2 py-0.5 rounded text-cyan-400 font-mono text-sm border border-white/[0.02]`}>{children}</code>;
                  },
                }}
              >
                {generatedNote}
              </ReactMarkdown>
            </div>

            {/* Bottom Dock Control Area */}
            {!isLoading && (
              <div className="sticky bottom-0 pt-8 mt-8 flex justify-end border-t border-white/[0.03] bg-gradient-to-t from-black via-black/95 to-transparent -mx-8 -mb-8 px-8 pb-8 rounded-b-3xl">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="group/btn flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} className="transition-transform group-hover/btn:scale-110 duration-300" />}
                  <span>{isSaving ? "Locking to Database..." : "Commit to System"}</span>
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Standby Empty State Visual */}
        {!generatedNote && !isLoading && (
           <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 opacity-50 mt-10 animate-fade-rise-delay min-h-0">
             <Bot size={56} className="mb-4 text-cyan-900" />
             <p className="text-lg">Your AI Tutor is standing by.</p>
           </div>
        )}
      </div>
    </div>
  );
}