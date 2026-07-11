"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Square, RotateCcw, Zap, ShieldAlert, Sparkles, Activity, ShieldCheck, Flame, Headphones, Volume2, VolumeX, Radio } from "lucide-react";
import { toast } from "sonner";

type CoreState = "dormant" | "syncing" | "stabilized" | "shattered";
type SyncMode = { name: string; duration: number; frequency: string; energy: number };
type AudioTrack = { id: string; name: string; file: string; icon: string };

const SYNC_MODES: SyncMode[] = [
  { name: "Beta Wave", duration: 15 * 60, frequency: "15Hz", energy: 15 },
  { name: "Theta Wave", duration: 25 * 60, frequency: "6Hz", energy: 25 },
  { name: "Gamma Wave", duration: 60 * 60, frequency: "40Hz", energy: 60 },
];

const AUDIO_TRACKS: AudioTrack[] = [
  { id: "rain", name: "Heavy Rain", file: "/audio/rain.mp3", icon: "🌧️" },
  { id: "drone", name: "Neural Synth", file: "/audio/drone.mp3", icon: "🌌" },
  { id: "noise", name: "Brown Noise", file: "/audio/noise.mp3", icon: "🌊" },
];

export default function FocusPage() {
  const [selectedMode, setSelectedMode] = useState<SyncMode>(SYNC_MODES[1]);
  const [timeLeft, setTimeLeft] = useState(SYNC_MODES[1].duration);
  const [isActive, setIsActive] = useState(false);
  const [coreState, setCoreState] = useState<CoreState>("dormant");
  const [stats, setStats] = useState({ stabilized: 0, shattered: 0, totalMinutes: 0 });

  // Atmospheric Audio State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<AudioTrack>(AUDIO_TRACKS[0]);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedStabilized = localStorage.getItem("studentos_cores_stabilized");
    const savedShattered = localStorage.getItem("studentos_cores_shattered");
    const savedMinutes = localStorage.getItem("studentos_total_focus_minutes");
    
    setStats({
      stabilized: savedStabilized ? parseInt(savedStabilized, 10) : 0,
      shattered: savedShattered ? parseInt(savedShattered, 10) : 0,
      totalMinutes: savedMinutes ? parseInt(savedMinutes, 10) : 0,
    });
  }, []);

  useEffect(() => {
    if (!isActive && coreState !== "shattered") {
      setTimeLeft(selectedMode.duration);
    }
  }, [selectedMode, isActive, coreState]);

  // Audio Engine Controller
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isAudioPlaying) {
        audioRef.current.play().catch(() => {
          toast.error("Browser blocked autoplay. Please click play again.");
          setIsAudioPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying, activeTrack, volume]);

  const toggleAudio = () => setIsAudioPlaying(!isAudioPlaying);
  
  const handleTrackChange = (track: AudioTrack) => {
    setActiveTrack(track);
    setIsAudioPlaying(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setCoreState("stabilized");
      
      const updatedStabilized = stats.stabilized + 1;
      const updatedMinutes = stats.totalMinutes + (selectedMode.duration / 60);
      
      setStats(prev => ({ ...prev, stabilized: updatedStabilized, totalMinutes: updatedMinutes }));
      localStorage.setItem("studentos_cores_stabilized", updatedStabilized.toString());
      localStorage.setItem("studentos_total_focus_minutes", updatedMinutes.toString());
      
      toast.success(`${selectedMode.name} stabilized successfully!`, { icon: "🧠" });
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, stats, selectedMode]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && isActive) {
      setIsActive(false);
      setCoreState("shattered");
      
      const updatedShattered = stats.shattered + 1;
      setStats(prev => ({ ...prev, shattered: updatedShattered }));
      localStorage.setItem("studentos_cores_shattered", updatedShattered.toString());
      
      toast.error("Focus broken! The Deep-Sync Core collapsed.", { 
        style: { background: "#7f1d1d", color: "#fca5a5", borderColor: "#991b1b" }
      });
    }
  }, [isActive, stats]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);

  const toggleTimer = () => {
    if (!isActive && coreState === "shattered") {
      setTimeLeft(selectedMode.duration);
    }
    setIsActive(!isActive);
    setCoreState(!isActive ? "syncing" : "dormant");
    
    // Auto-start audio when entering focus mode
    if (!isActive && !isAudioPlaying) {
      setIsAudioPlaying(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedMode.duration);
    setCoreState("dormant");
  };

  const getCoreStyles = () => {
    switch (coreState) {
      case "syncing":
        return {
          ring1: "animate-[spin_6s_linear_infinite] border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)]",
          ring2: "animate-[spin_4s_linear_infinite_reverse] border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)]",
          center: "bg-cyan-400 shadow-[0_0_60px_rgba(34,211,238,0.7)] animate-pulse",
          text: "text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]"
        };
      case "stabilized":
        return {
          ring1: "border-emerald-500/60 shadow-[0_0_40px_rgba(16,185,129,0.4)]",
          ring2: "border-emerald-400/60 shadow-[0_0_30px_rgba(52,211,153,0.4)]",
          center: "bg-emerald-400 shadow-[0_0_60px_rgba(52,211,153,1)]",
          text: "text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
        };
      case "shattered":
        return {
          ring1: "border-red-950 rotate-45 translate-x-3 translate-y-2 opacity-40",
          ring2: "border-red-950 -rotate-45 -translate-x-3 -translate-y-2 opacity-40",
          center: "bg-red-950 scale-y-40 scale-x-125 opacity-30 shadow-none",
          text: "text-red-900/80"
        };
      default:
        return {
          ring1: "border-white/10",
          ring2: "border-white/5",
          center: "bg-zinc-900 border border-white/10",
          text: "text-zinc-400"
        };
    }
  };

  const styles = getCoreStyles();

  return (
    <div className="flex h-full flex-col p-8 bg-[#0a0a0a] text-white overflow-y-auto">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={activeTrack.file} loop preload="auto" />

      <header className="mb-6 flex justify-between items-start w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Deep Sync</h1>
          <p className="text-zinc-400">Lock into cognitive frequencies. Maintain core alignment.</p>
        </div>
        
        {/* Compact Atmospheric Audio Deck */}
        <div className="flex items-center gap-3 bg-zinc-950/80 border border-white/5 rounded-2xl p-2 pr-4 shadow-lg backdrop-blur-md">
          <button 
            onClick={toggleAudio}
            className={`p-3 rounded-xl transition-all duration-300 ${isAudioPlaying ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'}`}
          >
            {isAudioPlaying ? <Radio size={18} className="animate-pulse" /> : <Headphones size={18} />}
          </button>
          
          <div className="flex flex-col gap-1 w-32">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                {activeTrack.icon} {activeTrack.name}
              </span>
              {/* CSS Equalizer Animation */}
              {isAudioPlaying && (
                <div className="flex gap-[2px] items-end h-2.5">
                  <div className="w-[2px] bg-cyan-400 animate-[bounce_0.8s_infinite] h-full" />
                  <div className="w-[2px] bg-cyan-400 animate-[bounce_1.2s_infinite] h-1.5" />
                  <div className="w-[2px] bg-cyan-400 animate-[bounce_0.9s_infinite] h-2" />
                </div>
              )}
            </div>
            <div className="flex gap-1 w-full">
              {AUDIO_TRACKS.map(track => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track)}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${activeTrack.id === track.id ? 'bg-cyan-400' : 'bg-zinc-800 hover:bg-zinc-600'}`}
                  title={track.name}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 pl-2 border-l border-white/5 ml-1">
            <VolumeX size={12} className="text-zinc-600" />
            <input 
              type="range" 
              min="0" max="1" step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <Volume2 size={12} className="text-zinc-400" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto w-full mb-8">
        {SYNC_MODES.map((mode) => {
          const isSelected = selectedMode.name === mode.name;
          return (
            <button
              key={mode.name}
              disabled={isActive}
              onClick={() => setSelectedMode(mode)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-300 flex flex-col relative overflow-hidden ${
                isSelected 
                  ? "bg-zinc-900 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                  : "bg-zinc-950/40 border-white/5 hover:border-white/10 disabled:opacity-40"
              }`}
            >
              <span className={`text-xs font-semibold uppercase tracking-wider ${isSelected ? "text-cyan-400" : "text-zinc-500"}`}>
                {mode.name}
              </span>
              <span className="text-xl font-bold mt-1 text-zinc-100">{mode.duration / 60}m</span>
              <span className="text-[10px] text-zinc-500 mt-0.5 font-mono">{mode.frequency} Tune</span>
              {isSelected && <div className="absolute right-2 bottom-2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
            </button>
          );
        })}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        
        <div className="relative w-80 h-80 flex items-center justify-center mb-10 transition-transform duration-500">
          <div className={`absolute w-full h-full rounded-full border border-dashed transition-all duration-1000 ${styles.ring1}`} />
          <div className={`absolute w-5/6 h-5/6 rounded-full border transition-all duration-700 ${styles.ring2}`} style={{ borderStyle: coreState === 'shattered' ? 'dashed' : 'solid' }} />
          
          <div className={`absolute w-20 h-20 rounded-full transition-all duration-500 z-10 flex items-center justify-center ${styles.center}`}>
            {coreState === "syncing" && <Zap size={28} className="text-zinc-950 animate-pulse" />}
            {coreState === "stabilized" && <Sparkles size={28} className="text-zinc-950" />}
            {coreState === "shattered" && <ShieldAlert size={28} className="text-red-300" />}
          </div>

          <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
            <span className={`text-6xl font-black tracking-tighter tabular-nums transition-colors duration-500 ${styles.text}`}>
              {timeString}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 mt-1.5">
              {coreState === "dormant" ? "Standby" : coreState === "syncing" ? "Locking Grid" : coreState === "shattered" ? "Core Broken" : "Aligned"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] border active:scale-[0.98] ${
              isActive 
                ? "bg-zinc-950 border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.05)]" 
                : coreState === "shattered"
                ? "bg-zinc-900 border-red-500/50 text-red-400"
                : "bg-zinc-900 border-cyan-500/30 text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.1)]"
            }`}
          >
            {isActive ? <Square size={16} className="fill-current" /> : <Play size={16} className="fill-current" />}
            {isActive ? "Terminate Sync" : coreState === "shattered" ? "Re-Initialize Core" : "Engage Neural Grid"}
          </button>

          <button
            onClick={resetTimer}
            disabled={isActive}
            className="p-3.5 rounded-xl border border-white/5 bg-zinc-950/60 text-zinc-500 hover:text-zinc-200 hover:border-white/10 transition-all disabled:opacity-20"
          >
            <RotateCcw size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}