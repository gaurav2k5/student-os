import { Search, Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-zinc-950/50 px-6 backdrop-blur-md">
      <div className="flex items-center gap-2 text-zinc-400">
        {/* The Command Palette Trigger (We will make this functional later) */}
        <button className="flex w-64 items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm transition-colors hover:border-zinc-700 hover:text-zinc-200">
          <Search size={16} />
          <span>Search StudentOS...</span>
          <span className="ml-auto text-xs font-semibold opacity-50">⌘K</span>
        </button>
      </div>
      
      {/* Profile & Notifications */}
      <div className="flex items-center gap-5">
        <button className="text-zinc-400 transition-colors hover:text-zinc-100">
          <Bell size={18} />
        </button>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-cyan-800 bg-cyan-950 text-cyan-400 transition-colors hover:bg-cyan-900">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}