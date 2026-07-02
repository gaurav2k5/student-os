"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCw, X, Check } from "lucide-react";
import Link from "next/link";

export default function StudyMode() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex h-full flex-col">
      
      {/* Study Header */}
      <header className="flex items-center justify-between border-b border-white/5 bg-zinc-950/50 px-8 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/flashcards" className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-medium text-white">Database Systems</h1>
            <p className="text-xs text-zinc-500">Card 12 of 42</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex w-64 items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
            <div className="h-full w-[28%] rounded-full bg-cyan-500"></div>
          </div>
          <span className="text-xs font-medium text-zinc-400">28%</span>
        </div>
      </header>

      {/* Main Study Canvas */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        
        {/* The 3D Flipping Card Container */}
        <div className="perspective-1000 relative h-96 w-full max-w-2xl">
          <motion.div
            className="absolute h-full w-full transform-style-3d cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            
            {/* Front of Card (Question) */}
            <div className="backface-hidden absolute flex h-full w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 p-10 text-center shadow-2xl transition-colors hover:border-white/20">
              <span className="absolute left-6 top-6 text-xs font-medium uppercase tracking-widest text-cyan-500">Question</span>
              <h2 className="text-3xl font-medium leading-relaxed text-white">
                What is the primary difference between a Primary Key and a Foreign Key?
              </h2>
              <div className="absolute bottom-6 flex items-center gap-2 text-sm text-zinc-500">
                <RotateCw size={16} /> Click to flip
              </div>
            </div>

            {/* Back of Card (Answer) */}
            <div 
              className="backface-hidden absolute flex h-full w-full flex-col items-center justify-center rounded-2xl border border-cyan-500/30 bg-zinc-900 p-10 text-center shadow-2xl"
              style={{ transform: "rotateY(180deg)" }}
            >
              <span className="absolute left-6 top-6 text-xs font-medium uppercase tracking-widest text-emerald-500">Answer</span>
              <p className="text-xl leading-relaxed text-zinc-300">
                A <strong className="text-white">Primary Key</strong> uniquely identifies a record within its own table. 
                <br /><br />
                A <strong className="text-white">Foreign Key</strong> is a field in one table that links to the primary key of another table, establishing a relationship between the two.
              </p>
            </div>

          </motion.div>
        </div>

        {/* Evaluation Buttons (Only show when flipped) */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 flex gap-4"
            >
              <button className="group flex flex-col items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-8 py-4 transition-colors hover:bg-rose-500/20">
                <div className="rounded-full bg-rose-500/20 p-2 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <X size={20} />
                </div>
                <span className="text-sm font-medium text-rose-500">Needs Review</span>
              </button>
              
              <button className="group flex flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-8 py-4 transition-colors hover:bg-emerald-500/20">
                <div className="rounded-full bg-emerald-500/20 p-2 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Check size={20} />
                </div>
                <span className="text-sm font-medium text-emerald-500">Got it</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}