"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Bot, BrainCircuit, NotebookPen, Sparkles, Zap } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) return <div className="p-8 text-zinc-400">Loading OS...</div>;

  return (
    <div className="flex h-full flex-col relative overflow-y-auto p-8">
      
      {/* Greeting Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 mb-4 border border-cyan-500/20">
          <Sparkles size={14} />
          StudentOS is online
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
          Welcome back, {user?.firstName || "Jimmy"}
        </h1>
        <p className="mt-2 text-zinc-400 text-lg">Here is an overview of your workspace today.</p>
      </header>

      {/* Quick Metrics (Static for now, we will wire these to Supabase later) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-400 mb-1">Study Streak</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-white">3</h3>
            <span className="text-zinc-500 text-sm mb-1">days</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-400 mb-1">Flashcards Mastered</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-cyan-400">12</h3>
            <span className="text-zinc-500 text-sm mb-1">cards</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-sm">
          <p className="text-sm font-medium text-zinc-400 mb-1">Tutor Sessions</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-white">5</h3>
            <span className="text-zinc-500 text-sm mb-1">chats</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Zap className="text-cyan-500" size={20} />
        Quick Launch
      </h2>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Tutor Card */}
        <div 
          onClick={() => router.push('/chat')}
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900 p-6 hover:border-cyan-500/50 hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-zinc-100 mb-2">AI Tutor</h3>
            <p className="text-sm text-zinc-400">Ask questions, debug code, and get complex concepts explained instantly.</p>
          </div>
        </div>

        {/* Flashcards Card */}
        <div 
          onClick={() => router.push('/flashcards')}
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900 p-6 hover:border-cyan-500/50 hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-zinc-100 mb-2">Study Decks</h3>
            <p className="text-sm text-zinc-400">Review your PostgreSQL-backed flashcards with 3D physical animations.</p>
          </div>
        </div>

        {/* Notes Card (Coming Soon) */}
        <div className="group relative flex flex-col justify-between rounded-2xl border border-dashed border-white/10 bg-zinc-900/30 p-6 transition-all opacity-70">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-zinc-500 mb-4">
            <NotebookPen size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-zinc-300 mb-2">Smart Notes</h3>
            <p className="text-sm text-zinc-500">Coming next: A rich Markdown editor to save your study guides.</p>
          </div>
        </div>

      </div>

    </div>
  );
}