"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, MessageSquare, CheckSquare, Zap, User, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // Your core OS routes
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Notes", href: "/notes", icon: BookOpen },
    { name: "Tutor Chat", href: "/chat", icon: MessageSquare },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Deep Sync", href: "/focus", icon: Zap },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col bg-black/40 backdrop-blur-2xl border-r border-white/5 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.4)]">
      
      {/* OS Logo Header */}
      <div className="h-24 flex items-center px-8 border-b border-white/5">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white">
          <Zap className="text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" fill="currentColor" size={24} />
          StudentOS
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  // Applying the landing page effect to the active tab!
                  ? "liquid-glass text-white shadow-[0_0_15px_rgba(8,145,178,0.15)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} className={isActive ? "text-cyan-400" : "text-zinc-500"} />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300">
          <div className="h-9 w-9 rounded-full bg-cyan-950 border border-cyan-900 flex items-center justify-center shrink-0 shadow-inner">
            <User size={16} className="text-cyan-400" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-white">Jimmy</span>
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">Manage Profile</span>
          </div>
          <Settings size={14} className="ml-auto text-zinc-600" />
        </button>
      </div>

    </aside>
  );
}