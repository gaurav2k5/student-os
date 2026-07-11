"use client";

import { useState } from "react";
import { BrainCircuit, X } from "lucide-react";

interface StudyCard {
  id: string;
  front: string;
  back: string;
}

interface StudyModeProps {
  cards: StudyCard[];
  onClose: () => void;
  deckName: string;
}

export default function StudyMode({ cards, onClose, deckName }: StudyModeProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (cards.length === 0) {
    onClose();
    return null;
  }

  const currentCard = cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 300); 
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-8 backdrop-blur-sm">
      
      {/* Injecting pure CSS directly to override framework quirks */}
      <style dangerouslySetInnerHTML={{__html: `
        .flip-container {
          perspective: 1000px;
        }
        .flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s ease-in-out;
          transform-style: preserve-3d;
        }
        .flip-container.flipped .flip-inner {
          transform: rotateY(180deg);
        }
        .flip-front, .flip-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .flip-back {
          transform: rotateY(180deg);
        }
      `}} />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
            <BrainCircuit className="text-cyan-500" />
            Study Mode: {deckName}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">Card {currentCardIndex + 1} of {cards.length}</p>
        </div>
        <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </header>

      {/* 3D Flipping Card Container using Vanilla CSS */}
      <div 
        className={`flip-container w-full max-w-2xl cursor-pointer ${isFlipped ? 'flipped' : ''}`} 
        onClick={handleFlip}
      >
        <div className="flip-inner h-96">
          
          {/* FRONT Side */}
          <div className="flip-front flex flex-col items-center justify-center rounded-3xl border-2 border-white/10 bg-zinc-900 p-10 shadow-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-500 mb-6 block">Question</span>
            <p className="text-white text-3xl font-medium text-center leading-snug">{currentCard.front}</p>
          </div>

          {/* BACK Side */}
          <div className="flip-back flex flex-col items-center justify-center rounded-3xl border-2 border-cyan-800/50 bg-cyan-950 p-10 shadow-cyan-950/50 shadow-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-200 mb-6 block">Answer</span>
            <p className="text-white text-xl text-center leading-relaxed">{currentCard.back}</p>
          </div>

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-12 flex items-center gap-6">
        <button onClick={prevCard} className="px-6 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-lg">
          Previous Card
        </button>
        <button onClick={nextCard} className="px-6 py-3 rounded-xl bg-cyan-600 font-semibold text-white hover:bg-cyan-500 transition-colors shadow-lg">
          Next Card
        </button>
      </div>

    </div>
  );
}