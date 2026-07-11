import Sidebar from "@/components/Sidebar"; 
import { Toaster } from "sonner"; 

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We add 'animate-fade-rise' here so the entire OS glides in smoothly on load
    <div className="flex h-screen w-full bg-black overflow-hidden animate-fade-rise">
      
      <Sidebar />
      
      {/* Adding a subtle top-left radius and border to separate the workspace from the sidebar */}
      <main className="flex-1 relative overflow-hidden bg-zinc-950 rounded-tl-2xl border-t border-l border-white/5 shadow-2xl">
        {children}
      </main>
      
      <Toaster theme="dark" position="bottom-right" className="font-sans" />
    </div>
  );
}