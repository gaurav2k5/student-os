import Link from "next/link";
import { BookOpen, CheckSquare, Home, Layers, MessageSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-zinc-800 bg-zinc-950/50 p-4 md:flex">
      <div className="mb-8 px-4 py-2">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">StudentOS</h2>
      </div>
      
      <nav className="flex flex-col gap-1">
        <NavItem href="/" icon={<Home size={18} />} label="Dashboard" />
        <NavItem href="/notes" icon={<BookOpen size={18} />} label="AI Notes" />
        <NavItem href="/chat" icon={<MessageSquare size={18} />} label="Tutor Chat" />
        <NavItem href="/flashcards" icon={<Layers size={18} />} label="Flashcards" />
        <NavItem href="/tasks" icon={<CheckSquare size={18} />} label="Tasks" />
      </nav>
    </aside>
  );
}

// This is a reusable mini-component just for the links
function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-zinc-100"
    >
      {icon}
      {label}
    </Link>
  );
}