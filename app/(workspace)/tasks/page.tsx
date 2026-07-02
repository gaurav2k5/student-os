import { Calendar, CheckCircle2, Circle, Clock, MoreHorizontal, Play, Plus, RotateCcw } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="flex h-full flex-col p-8 md:p-10">
      
      {/* Header */}
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white flex items-center gap-3">
            <CheckCircle2 className="text-cyan-500" />
            Tasks & Focus
          </h1>
          <p className="mt-2 text-zinc-400">Plan your day and execute with deep focus.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95">
          <Plus size={16} />
          Add Task
        </button>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        
        {/* Left Column: Task List */}
        <div className="flex-1 rounded-2xl border border-white/5 bg-zinc-900/30 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Today's Plan</h2>
            <span className="text-xs font-medium text-zinc-500">3 Remaining</span>
          </div>

          <div className="flex flex-col gap-3">
            
            {/* Task 1 */}
            <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:border-white/10 hover:bg-zinc-800/80">
              <div className="flex items-center gap-4">
                <Circle size={20} className="text-zinc-600 transition-colors group-hover:text-cyan-500" />
                <div>
                  <h3 className="font-medium text-zinc-200">Finalize circuit diagram for Smart Attendance System</h3>
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                    <Calendar size={12} /> Due Today
                  </p>
                </div>
              </div>
              <button className="text-zinc-600 hover:text-white transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Task 2 */}
            <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 transition-colors hover:border-white/10 hover:bg-zinc-800/80">
              <div className="flex items-center gap-4">
                <Circle size={20} className="text-zinc-600 transition-colors group-hover:text-cyan-500" />
                <div>
                  <h3 className="font-medium text-zinc-200">Teaser post for "something new soon" launch</h3>
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                    <Calendar size={12} /> Due Today
                  </p>
                </div>
              </div>
              <button className="text-zinc-600 hover:text-white transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Completed Task */}
            <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-transparent p-4 opacity-50 transition-opacity hover:opacity-100">
              <div className="flex items-center gap-4">
                <CheckCircle2 size={20} className="text-emerald-500" />
                <div>
                  <h3 className="font-medium text-zinc-400 line-through">Take the Renault Kwid for servicing</h3>
                  <p className="text-xs text-zinc-600 mt-1">Completed at 10:30 AM</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Pomodoro Focus Timer */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/40 to-zinc-900/40 p-8 text-center backdrop-blur-sm">
            
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-900/50 text-cyan-400">
              <Clock size={24} />
            </div>
            
            <h2 className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-500">Deep Focus</h2>
            
            {/* The Timer Display */}
            <div className="my-8 text-7xl font-light tracking-tighter text-white">
              25<span className="text-zinc-600">:</span>00
            </div>

            <p className="mb-8 text-sm text-zinc-400">
              Session 1 of 4
            </p>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-4">
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-[0_0_30px_-5px_rgba(8,145,178,0.6)] transition-transform hover:scale-105 active:scale-95">
                <Play size={24} className="ml-1 fill-white" />
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
                <RotateCcw size={18} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}