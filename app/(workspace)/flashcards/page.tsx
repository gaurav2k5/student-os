import { BrainCircuit, Layers, Play, Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";

export default function FlashcardsPage() {
  return (
    <div className="flex h-full flex-col p-8 md:p-10">
      <div className="mx-auto w-full max-w-5xl flex-1">
        
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
              <Layers className="text-cyan-500" />
              Flashcards
            </h1>
            <p className="mt-2 text-zinc-400">Master your knowledge with AI-generated spaced repetition.</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95">
            <Plus size={16} />
            Create Deck
          </button>
        </header>

        {/* AI Auto-Generation Banner */}
        <div className="mb-10 flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 to-transparent p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="mt-1 rounded-full bg-cyan-900/50 p-2 text-cyan-400">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h3 className="font-medium text-white">New notes detected!</h3>
              <p className="mt-1 text-sm text-zinc-400">
                The AI can automatically generate a flashcard deck from your "ESP32 & Microcontroller Pinouts" document.
              </p>
            </div>
          </div>
          <button className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-600">
            Generate Deck
          </button>
        </div>

        {/* Decks Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Deck Card 1 */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-6 transition-all hover:border-white/10 hover:bg-zinc-900/80">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Database Systems</h3>
                <p className="text-sm text-zinc-500">42 cards</p>
              </div>
              <button className="text-zinc-500 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-zinc-400">Mastery</span>
                <span className="text-emerald-400">78%</span>
              </div>
              {/* Progress Bar */}
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[78%] rounded-full bg-emerald-500"></div>
              </div>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                <Play size={16} className="fill-white" />
                Study Due (12)
              </button>
            </div>
          </div>

          {/* Deck Card 2 */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-6 transition-all hover:border-white/10 hover:bg-zinc-900/80">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Graph Algorithms</h3>
                <p className="text-sm text-zinc-500">28 cards</p>
              </div>
              <button className="text-zinc-500 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-zinc-400">Mastery</span>
                <span className="text-rose-400">24%</span>
              </div>
              {/* Progress Bar */}
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[24%] rounded-full bg-rose-500"></div>
              </div>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                <Play size={16} className="fill-white" />
                Study Due (28)
              </button>
            </div>
          </div>

          {/* Deck Card 3 (Completed) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 p-6 transition-all hover:border-white/10 hover:bg-zinc-900/40">
            <div className="absolute -right-6 -top-6 text-emerald-500/10">
              <CheckCircle2 size={120} />
            </div>
            <div className="relative z-10 mb-8 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Hardware Logic</h3>
                <p className="text-sm text-zinc-500">15 cards</p>
              </div>
              <button className="text-zinc-500 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="relative z-10">
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-zinc-400">Mastery</span>
                <span className="text-emerald-500">100%</span>
              </div>
              {/* Progress Bar */}
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-full rounded-full bg-emerald-500"></div>
              </div>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-transparent py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white">
                Review
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}