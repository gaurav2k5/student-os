"use client";
import { ArrowLeft, Plus, BrainCircuit, Play, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase"; 
import StudyMode from "./study"; // <-- CHANGE: Import StudyMode

export default function DeckPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.id;

  const [cards, setCards] = useState<any[]>([]);
  const [deckName, setDeckName] = useState("Loading...");
  const [isStudyModeOpen, setIsStudyModeOpen] = useState(false); // <-- CHANGE: Add state

  useEffect(() => {
    async function loadDeckAndCards() {
      // Fetch the deck name
      const { data: deckData } = await supabase
        .from("flashcards")
        .select("title")
        .eq("id", deckId)
        .single();
      
      if (deckData) setDeckName(deckData.title);

      // Fetch the cards for this deck
      const { data: cardsData } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deckId)
        .order("created_at", { ascending: true });

      if (cardsData) setCards(cardsData);
    }
    
    if (deckId) loadDeckAndCards();
  }, [deckId]);

  const handleAddCard = async () => {
    const front = prompt("What is the question/front of the card?");
    if (!front) return;
    
    const back = prompt("What is the answer/back of the card?");
    if (!back) return;

    const newCard = { deck_id: deckId, front, back };

    const { data, error } = await supabase
      .from("cards")
      .insert([newCard])
      .select();

    if (!error && data) {
      setCards([...cards, data[0]]);
    }
  };

  return (
    <div className="flex h-full flex-col relative overflow-y-auto p-8">
      
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/flashcards')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">{deckName}</h1>
            <p className="mt-1 text-sm text-zinc-400">{cards.length} cards in this deck</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* AI Flashcard Generator (Coming Soon) */}
          <button 
            disabled
            className="flex items-center gap-2 rounded-xl border border-dashed border-white/10 bg-zinc-900/30 px-5 py-3 text-sm font-medium text-zinc-500 cursor-not-allowed transition-all"
          >
            <Sparkles size={18} className="opacity-50" />
            Auto-Generate (Coming Soon)
          </button>

          {/* Study Button */}
          {cards.length > 0 && (
            <button 
              onClick={() => setIsStudyModeOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-cyan-800/50 bg-cyan-950 px-5 py-3 text-sm font-semibold text-cyan-200 shadow-lg hover:bg-cyan-900 hover:scale-105 transition-all"
            >
              <Play size={18} />
              Study
            </button>
          )}

          {/* Add Card Button */}
          <button 
            onClick={handleAddCard}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 border border-white/10 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 hover:scale-105 transition-all"
          >
            <Plus size={18} />
            Add Card
          </button>
        </div>
      </header>

      {/* Grid of Cards (Existing List View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {cards.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-white/10 p-12 text-center text-zinc-500">
            This deck is empty. Add your first card to start studying!
          </div>
        ) : (
          cards.map((card) => (
            <div key={card.id} className="rounded-2xl border border-white/10 bg-zinc-900 p-6 flex flex-col gap-4 shadow-sm hover:border-white/20 transition-all">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-500 mb-2 block">Front</span>
                <p className="text-white text-lg">{card.front}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">Back</span>
                <p className="text-zinc-300 leading-relaxed">{card.back}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* <-- CHANGE: Study Mode Overlay --> */}
      {isStudyModeOpen && (
        <StudyMode 
          cards={cards} 
          onClose={() => setIsStudyModeOpen(false)} 
          deckName={deckName}
        />
      )}

    </div>
  );
}