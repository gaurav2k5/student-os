"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, User, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

// 1. We bring in our bulletproof Mermaid component for the chat!
const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const renderDiagram = async () => {
      if (ref.current && chart) {
        try {
          const mermaid = (await import("mermaid")).default;
          mermaid.initialize({ theme: "dark", startOnLoad: false, suppressErrorRendering: true });
          const id = `mermaid-chat-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) ref.current.innerHTML = svg;
          setHasError(false);
        } catch (error) {
          setHasError(true);
        }
      }
    };
    renderDiagram();
  }, [chart]);

  if (hasError) {
    return (
      <div className="my-4 p-4 bg-red-950/30 border border-red-900/50 rounded-xl">
        <p className="text-red-400 text-xs font-bold mb-2 uppercase tracking-wider">⚠️ Diagram Error</p>
      </div>
    );
  }

  return <div ref={ref} className="flex justify-center my-6 p-4 bg-zinc-950/80 border border-white/5 rounded-xl shadow-inner overflow-x-auto" />;
};

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full flex-col bg-[#0a0a0a]">
      
      {/* Header */}
      <header className="px-8 py-6 border-b border-white/10 bg-zinc-950/50">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
          <Bot className="text-cyan-400" /> AI Tutor Chat
        </h1>
        <p className="text-sm text-zinc-400 mt-1">Ask questions, debug code, and explore complex topics.</p>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
          
          {messages.length === 0 && (
            <div className="text-center text-zinc-500 mt-20 flex flex-col items-center gap-4">
              <Sparkles size={40} className="text-zinc-800" />
              <p>Hello! I am your StudentOS AI Tutor. How can I help you today?</p>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              
              {/* AI Avatar */}
              {m.role === "assistant" && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-900 mt-1">
                  <Bot size={20} className="text-cyan-400" />
                </div>
              )}

              {/* Message Bubble */}
              <div 
                className={`px-6 py-4 rounded-2xl max-w-[85%] ${
                  m.role === "user" 
                    ? "bg-cyan-600 text-white rounded-tr-sm" 
                    : "bg-zinc-900 border border-white/10 text-zinc-300 rounded-tl-sm shadow-xl"
                }`}
              >
                {m.role === "user" ? (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                ) : (
                  // Markdown & Diagram Renderer for AI Responses
                  <div className="prose prose-invert prose-cyan max-w-none prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/10 text-base">
                    <ReactMarkdown
                      components={{
                        code(props) {
                          const { children, className, node, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || "");
                          if (match && match[1] === "mermaid") {
                            return <MermaidDiagram chart={String(children).replace(/\n$/, "")} />;
                          }
                          return <code {...rest} className={`${className} bg-zinc-800 px-1.5 py-0.5 rounded-md`}>{children}</code>;
                        },
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {m.role === "user" && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 mt-1">
                  <User size={20} className="text-zinc-400" />
                </div>
              )}

            </div>
          ))}
          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-zinc-950 border-t border-white/10">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Explain the flow of a fingerprint sensor to a database..."
            className="w-full rounded-xl border border-white/10 bg-zinc-900 py-4 pl-6 pr-16 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:hover:bg-cyan-600"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </div>

    </div>
  );
}