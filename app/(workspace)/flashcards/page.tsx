"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { BrainCircuit, Plus, Layers, MoreVertical, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Make sure your path matches where you put supabase.ts

export default function FlashcardsPage() {
  const { user, isLoaded } = useUser();
  const [decks, setDecks] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  // 1. Fetch data from Supabase when the page loads
  useEffect(() => {
    async function loadDecks() {
      if (!user) return;
      const { data, error } = await supabase
        .from("flashcards")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setDecks(data);
    }
    loadDecks();
  }, [user]);

  // 2. Create a new deck and push it to Supabase
  const handleCreateDeck = async () => {
    if (!user) return;
    
    const title = prompt("What do you want to study? (e.g., Database Normalization)");
    if (!title) return;

    setIsCreating(true);

    const newDeck = {
      user_id: user.id,
      title: title,
    };

    const { data, error } = await supabase
      .from("flashcards")
      .insert([newDeck])
      .select();

    if (!error && data) {
      // Instantly update the UI with the newly created deck
      setDecks([data[0], ...decks]);
    }
    
    setIsCreating(false);
  };

  if (!isLoaded) return <div className="p-8 text-zinc-400">Loading workspace...</div>;

  return (
    <div className="flex h-full flex-col relative overflow-y-auto p-8">
      
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <BrainCircuit className="text-cyan-500 h-8 w-8" />
            Study Decks
          </h1>
          <p className="mt-2 text-zinc-400">Master your subjects with AI-generated flashcards.</p>
        </div>
        
        <button 
          onClick={handleCreateDeck}
          disabled={isCreating}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-cyan-500 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
        
        >
          {isCreating ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
          New Deck
          
        </button>
      </header>

      {/* Dynamic Database Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-white/10 p-12 text-center text-zinc-500">
            No study decks yet. Click "New Deck" to get started!
          </div>
        ) : (
          decks.map((deck) => (
            <div 
              key={deck.id} 
              onClick={() => window.location.href = `/flashcards/${deck.id}`} // <--- ADD THIS LINE
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:border-cyan-500/50 hover:bg-zinc-900 transition-all cursor-pointer shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-cyan-400 group-hover:bg-cyan-950 group-hover:text-cyan-300 transition-colors">
                  <Layers size={24} />
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-1">{deck.title}</h3>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span>0 cards</span> {/* We will hook this up later! */}
                  <span>•</span>
                  <span>Created just now</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}