import { BookOpen, Clock, Target, Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8 md:p-10">
      
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Good evening.</h1>
        <p className="mt-2 text-zinc-400">Here is your study overview for today.</p>
      </header>

      {/* Bento Box Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Widget 1: Streak */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:bg-zinc-900/80">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Current Streak</span>
            <div className="rounded-md bg-orange-500/10 p-2">
              <Zap size={16} className="text-orange-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-semibold text-white">12 Days</p>
            <p className="mt-1 text-xs text-zinc-500">Top 5% of students</p>
          </div>
        </div>

        {/* Widget 2: Study Hours */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:bg-zinc-900/80">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Study Time</span>
            <div className="rounded-md bg-cyan-500/10 p-2">
              <Clock size={16} className="text-cyan-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-semibold text-white">4.5 hrs</p>
            <p className="mt-1 text-xs text-zinc-500">This week</p>
          </div>
        </div>

        {/* Widget 3: Topics Mastered */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:bg-zinc-900/80">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Topics Mastered</span>
            <div className="rounded-md bg-purple-500/10 p-2">
              <BookOpen size={16} className="text-purple-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-semibold text-white">24</p>
            <p className="mt-1 text-xs text-zinc-500">Across 3 courses</p>
          </div>
        </div>

        {/* Widget 4: Next Goal */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:bg-zinc-900/80">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Next Exam</span>
            <div className="rounded-md bg-rose-500/10 p-2">
              <Target size={16} className="text-rose-500" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-semibold text-white">Data Structs</p>
            <p className="mt-1 text-xs text-zinc-500">In 4 days</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}