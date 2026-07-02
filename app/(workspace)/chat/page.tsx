import { Bot, Paperclip, Sparkles, User, ArrowUp } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col relative">
      
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/5 bg-zinc-950/80 px-8 py-6 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
            <Bot className="text-cyan-500" />
            AI Tutor
          </h1>
          <p className="mt-1 text-sm text-zinc-400">Ask questions, generate quizzes, or prepare for interviews.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
          <Sparkles size={14} />
          GPT-4o Active
        </div>
      </header>

      {/* Chat History Canvas */}
      <div className="flex-1 overflow-y-auto p-8 pb-32">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          
          {/* User Message */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
              <User size={18} />
            </div>
            <div className="flex-1 space-y-2 mt-2">
              <h3 className="text-sm font-medium text-zinc-300">You</h3>
              <p className="text-white leading-relaxed">
                Can you explain recursion to me in simple language? I'm having trouble understanding how it doesn't just loop forever.
              </p>
            </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-900 text-cyan-400 shadow-[0_0_15px_-3px_rgba(8,145,178,0.4)]">
              <Sparkles size={18} />
            </div>
            <div className="flex-1 space-y-2 mt-2">
              <h3 className="text-sm font-medium text-cyan-400">StudentOS Tutor</h3>
              <div className="text-zinc-300 leading-relaxed space-y-4">
                <p>
                  Think of recursion like a set of Russian nesting dolls. You open the biggest doll to find a smaller one inside, and you keep opening them until you finally reach the tiniest doll, which can't be opened anymore.
                </p>
                <p>
                  In programming, recursion is simply a function that <strong>calls itself</strong>. But to prevent it from looping forever, it must have two vital parts:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li><strong className="text-zinc-200">The Base Case:</strong> This is the tiniest doll. It's the condition that tells the function, "Stop calling yourself and just give me an answer."</li>
                  <li><strong className="text-zinc-200">The Recursive Case:</strong> This is opening the next doll. The function does a little bit of work and then calls itself with a slightly smaller piece of the problem.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-10 pb-8 px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative flex items-end overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/50 shadow-2xl">
            
            <button className="flex h-14 w-12 shrink-0 items-center justify-center text-zinc-400 transition-colors hover:text-white">
              <Paperclip size={20} />
            </button>
            
            <textarea 
              rows={1}
              placeholder="Ask the tutor anything..."
              className="max-h-32 min-h-[56px] w-full resize-none bg-transparent py-4 text-sm text-white placeholder-zinc-500 outline-none"
            />
            
            <div className="flex h-14 w-14 shrink-0 items-center justify-center">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_-3px_rgba(8,145,178,0.5)]">
                <ArrowUp size={16} />
              </button>
            </div>

          </div>
          <p className="mt-3 text-center text-xs text-zinc-600">
            StudentOS AI can make mistakes. Verify important information before your exams.
          </p>
        </div>
      </div>

    </div>
  );
}