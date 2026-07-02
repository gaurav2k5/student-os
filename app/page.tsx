"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    // We add a cinematic gradient background using teal (cyan) and orange accents
    <div className="relative min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(8,145,178,0.15),rgba(255,255,255,0))] selection:bg-cyan-900 selection:text-cyan-50">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-zinc-950/50 border-b border-white/5">
        <span className="text-xl font-bold tracking-tighter text-white">StudentOS</span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <span className="hover:text-white cursor-pointer transition-colors">Manifesto</span>
          <span className="hover:text-white cursor-pointer transition-colors">Features</span>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-cyan-500/80">
            The Future of Learning
          </p>
          
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">
            Instantly craft your <br />
            <span className="relative inline-block">
              perfect workspace.
              {/* The underline accent */}
              <span className="absolute bottom-2 left-0 h-3 w-full bg-orange-600/50 rounded-sm -z-10" />
            </span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg text-zinc-400">
            StudentOS merges the elegance of premium design with the depth of AI-powered study tools. Learn, organize, and track your progress in one beautiful ecosystem.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            {/* The Code Box from your design */}
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-900/50 px-6 py-4 backdrop-blur-sm">
              <Code2 size={18} className="text-cyan-500" />
              <code className="font-mono text-sm text-zinc-300">npx create-student-workspace</code>
            </div>
            
            {/* The Animated Button */}
            <Link 
              href="/dashboard"
              onClick={() => setIsTransitioning(true)}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center gap-2 rounded-lg bg-cyan-700 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-cyan-600 shadow-[0_0_40px_-10px_rgba(8,145,178,0.5)]"
              >
                {isTransitioning ? "Booting System..." : "Get Started"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* The Bounce Arrow */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 text-zinc-500"
        >
          <ArrowDown size={24} />
        </motion.div>
      </main>
    </div>
  );
}