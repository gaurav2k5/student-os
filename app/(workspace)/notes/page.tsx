import { Sparkles, FileText, PlaySquare, Link as LinkIcon, Plus } from "lucide-react";

export default function NotesPage() {
  return (
    <div className="flex h-full flex-col p-8 md:p-10">
      <div className="mx-auto w-full max-w-4xl flex-1">
        
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">AI Notes</h1>
            <p className="mt-2 text-zinc-400">Generate, refine, and organize your study materials.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95">
            <Plus size={16} />
            New Document
          </button>
        </header>

        {/* The AI Command Center (Empty State) */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/50 py-20 text-center backdrop-blur-sm">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
            <Sparkles size={32} />
          </div>
          <h2 className="mb-2 text-xl font-medium text-white">What are we studying today?</h2>
          <p className="mb-8 max-w-md text-sm text-zinc-400">
            Type a topic, paste a YouTube link, or upload a PDF. The AI will instantly generate comprehensive, structured notes for you.
          </p>
          
          {/* Main Input Bar */}
          <div className="w-full max-w-xl px-4">
            <div className="relative flex items-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-colors focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/50 hover:border-white/20">
              <input 
                type="text" 
                placeholder="e.g., Explain hardware architecture in simple language..."
                className="w-full bg-transparent py-4 pl-4 pr-12 text-sm text-white placeholder-zinc-500 outline-none"
              />
              <button className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-cyan-600 hover:text-white">
                <Sparkles size={16} />
              </button>
            </div>
            
            {/* Context Action Buttons */}
            <div className="mt-5 flex items-center justify-center gap-6 text-xs font-medium text-zinc-500">
              <button className="flex items-center gap-1.5 transition-colors hover:text-cyan-400">
                <FileText size={14} /> Upload PDF
              </button>
              <button className="flex items-center gap-1.5 transition-colors hover:text-rose-400">
                <PlaySquare size={14} /> YouTube Link
              </button>
              <button className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
                <LinkIcon size={14} /> Web Page
              </button>
            </div>
          </div>
        </div>

        {/* Recent Files Grid */}
        <div className="mt-16">
          <h3 className="mb-4 text-sm font-medium text-zinc-400">Recent Documents</h3>
          <div className="grid gap-4 md:grid-cols-2">
            
            {/* Dummy File 1 */}
            <div className="group flex cursor-pointer items-start gap-4 rounded-xl border border-white/5 bg-zinc-900/30 p-5 transition-colors hover:bg-zinc-900/80">
              <div className="rounded-lg bg-zinc-800 p-2 text-zinc-400 group-hover:text-cyan-400 transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-medium text-zinc-200 group-hover:text-white transition-colors">ESP32 & Microcontroller Pinouts</h4>
                <p className="mt-1 text-xs text-zinc-500">Generated 2 days ago • Markdown</p>
              </div>
            </div>

            {/* Dummy File 2 */}
            <div className="group flex cursor-pointer items-start gap-4 rounded-xl border border-white/5 bg-zinc-900/30 p-5 transition-colors hover:bg-zinc-900/80">
              <div className="rounded-lg bg-zinc-800 p-2 text-zinc-400 group-hover:text-orange-400 transition-colors">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-medium text-zinc-200 group-hover:text-white transition-colors">Database Management Systems</h4>
                <p className="mt-1 text-xs text-zinc-500">Generated 5 days ago • Summary</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}