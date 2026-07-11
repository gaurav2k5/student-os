"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Loader2 } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [isBooting, setIsBooting] = useState(false);

  const handleLaunch = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBooting(true);
    
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white bg-black">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 transition-opacity duration-1000"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4" />
      </video>

      <nav className="relative z-10 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
          <Zap className="text-cyan-500" fill="currentColor" />
          StudentOS
        </div>

        <button 
          onClick={handleLaunch}
          disabled={isBooting}
          className="liquid-glass rounded-full px-6 py-2.5 text-sm font-medium text-white hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 w-44 justify-center"
        >
          {isBooting ? <Loader2 size={16} className="animate-spin text-cyan-400" /> : "Launch Workspace"}
        </button>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-[calc(100vh-100px)]">
        
        <h1 
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Where <em className="not-italic text-cyan-400">focus</em> rises <em className="not-italic text-zinc-400">through the noise.</em>
        </h1>
        
        <p className="animate-fade-rise-delay text-zinc-300 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-sans">
          Designed for deep thinkers, bold creators, and top-tier students. 
          An AI-powered operating system to organize your mind and accelerate your workflow.
        </p>
        
        <button 
          onClick={handleLaunch}
          disabled={isBooting}
          className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base font-medium tracking-wide text-white mt-12 hover:scale-[1.03] transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-3 min-w-[260px]"
        >
          {isBooting ? (
            <>
              <Loader2 size={20} className="animate-spin text-cyan-400" />
              <span className="text-cyan-400">Booting OS...</span>
            </>
          ) : (
            "Launch Workspace"
          )}
        </button>
        
      </main>
    </div>
  );
}