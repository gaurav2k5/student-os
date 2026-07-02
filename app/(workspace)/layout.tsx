import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-50 overflow-hidden">
      {/* The side navigation */}
      <Sidebar />
      
      {/* The main right-hand column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        {/* The scrollable page content goes here */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}