"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Plus, GripVertical, Clock, MoreHorizontal, CheckCircle2, Circle, ArrowUpRight, Loader2, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type Priority = "Low" | "Medium" | "High";
type Status = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  user_id?: string;
}

export default function TasksPage() {
  const { user, isLoaded } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<Status | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const columns: { id: Status; title: string; icon: any; color: string }[] = [
    { id: "todo", title: "To Do", icon: Circle, color: "text-zinc-400" },
    { id: "in-progress", title: "In Progress", icon: ArrowUpRight, color: "text-cyan-400" },
    { id: "done", title: "Completed", icon: CheckCircle2, color: "text-emerald-400" },
  ];

  // 1. FETCH TASKS ON LOAD
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) {
        toast.error("Failed to load tasks");
      } else {
        setTasks(data || []);
      }
      setIsLoadingTasks(false);
    };

    if (isLoaded) fetchTasks();
  }, [user, isLoaded]);

  // 2. DRAG AND DROP
  const handleDragStart = (id: string) => setDraggedTaskId(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  
  const handleDrop = async (status: Status) => {
    if (!draggedTaskId || !user) return;
    
    setTasks((prev) => 
      prev.map((task) => (task.id === draggedTaskId ? { ...task, status } : task))
    );
    
    const currentId = draggedTaskId;
    setDraggedTaskId(null);

    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", currentId)
      .eq("user_id", user.id);

    if (error) toast.error("Database sync failed");
  };

  // 3. ADD NEW TASK
  const handleAddTask = async (status: Status) => {
    if (!newTaskTitle.trim() || !user) return;

    const tempId = Math.random().toString();
    const newTask: Task = {
      id: tempId,
      title: newTaskTitle,
      status,
      priority: "Medium",
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
    setIsAdding(null);

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          user_id: user.id,
          title: newTask.title,
          status: newTask.status,
          priority: newTask.priority,
        }
      ])
      .select()
      .single();

    if (error) {
      toast.error("Failed to save task");
      setTasks((prev) => prev.filter(t => t.id !== tempId));
    } else {
      setTasks((prev) => prev.map(t => t.id === tempId ? data : t));
      toast.success("Task securely saved");
    }
  };

  // 4. NEW FEATURE: QUICK TOGGLE COMPLETE BUTTON
  const handleToggleComplete = async (id: string, currentStatus: Status) => {
    if (!user) return;
    const nextStatus: Status = currentStatus === "done" ? "todo" : "done";

    // Optimistic UI Update
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );

    const { error } = await supabase
      .from("tasks")
      .update({ status: nextStatus })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(nextStatus === "done" ? "Task marked as completed!" : "Task moved back to To Do");
    }
  };

  // 5. NEW FEATURE: PERMANENT DELETE BUTTON
  const handleDeleteTask = async (id: string) => {
    if (!user) return;

    // Optimistic UI Update
    setTasks((prev) => prev.filter((t) => t.id !== id));

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to delete task from database");
    } else {
      toast.success("Task deleted permanently");
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Low": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="flex h-full flex-col p-8 bg-[#0a0a0a]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Project Board</h1>
        <p className="text-zinc-400">Manage your workflow, track assignments, and ship faster.</p>
      </header>

      {isLoadingTasks ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-cyan-500 h-8 w-8" />
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex h-full gap-6 min-w-max">
            {columns.map((col) => (
              <div 
                key={col.id}
                className="flex h-full w-80 flex-col rounded-2xl bg-zinc-950/50 border border-white/5 backdrop-blur-xl"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(col.id)}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <col.icon size={16} className={col.color} />
                    {col.title}
                    <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-zinc-400">
                      {tasks.filter((t) => t.status === col.id).length}
                    </span>
                  </div>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Task Cards */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {tasks
                    .filter((t) => t.status === col.id)
                    .map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task.id)}
                        className="group relative cursor-grab active:cursor-grabbing rounded-xl border border-white/5 bg-zinc-900 p-4 shadow-sm hover:border-white/10 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <p className="text-sm font-medium text-zinc-200 leading-snug">{task.title}</p>
                          <GripVertical size={14} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/[0.03]">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          
                          {/* Sleek Macro-Action Buttons */}
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleToggleComplete(task.id, task.status)}
                              className={`p-1.5 rounded-lg border border-white/5 transition-all ${
                                task.status === "done" 
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:border-white/10"
                              }`}
                              title={task.status === "done" ? "Mark incomplete" : "Mark completed"}
                            >
                              <Check size={12} />
                            </button>
                            <button 
                              onClick={() => handleDeleteTask(task.id)}
                              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 border border-white/5 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
                              title="Delete task permanently"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Add Task Input */}
                  {isAdding === col.id ? (
                    <div className="rounded-xl border border-cyan-500/50 bg-zinc-900 p-3 shadow-[0_0_15px_rgba(8,145,178,0.1)]">
                      <input
                        autoFocus
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddTask(col.id);
                          if (e.key === "Escape") setIsAdding(null);
                        }}
                        placeholder="What needs to be done?"
                        className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                      />
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[10px] text-zinc-500">Press Enter to save</span>
                        <button onClick={() => handleAddTask(col.id)} className="text-xs font-medium text-cyan-400 hover:text-cyan-300">Save</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsAdding(col.id)}
                      className="flex w-full items-center gap-2 rounded-xl border border-dashed border-white/10 p-3 text-sm font-medium text-zinc-500 hover:border-white/20 hover:text-zinc-300 transition-colors group"
                    >
                      <Plus size={16} className="group-hover:text-cyan-400 transition-colors" />
                      Add Task
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}