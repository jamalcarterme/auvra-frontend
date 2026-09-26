"use client";

import { useState } from "react";
import { PageHeader, useToast } from "@/components/app/PageHeader";
import { Card, Badge } from "@/components/ui/Primitives";
import { Toggle } from "@/components/ui/Toggle";
import { Toast } from "@/components/ui/Overlay";
import { tasks as initialTasks, workflows as initialWorkflows, type Task } from "@/lib/mock/data";
import { Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/cn";

const columns: { key: Task["status"]; label: string }[] = [
  { key: "todo", label: "To do" },
  { key: "in_progress", label: "In progress" },
  { key: "review", label: "In review" },
  { key: "done", label: "Done" },
];

const priorityTone: Record<string, "low" | "medium" | "high"> = { low: "low", medium: "medium", high: "high" };

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const { msg, show, fire } = useToast();

  function advance(id: string) {
    setTasks((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t;
        const order: Task["status"][] = ["todo", "in_progress", "review", "done"];
        const next = order[Math.min(order.indexOf(t.status) + 1, order.length - 1)];
        return { ...t, status: next };
      })
    );
  }

  function toggleWorkflow(id: string) {
    setWorkflows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w;
        const status = w.status === "active" ? "paused" : "active";
        fire(status === "active" ? "Workflow resumed" : "Workflow paused");
        return { ...w, status };
      })
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-10">
      <PageHeader title="Tasks & Workflows" description="What the AI queued up for you, and the automations running quietly in the background." />

      <div>
        <p className="text-[13px] font-medium text-muted mb-3 uppercase tracking-wide">Tasks</p>
        <div className="grid md:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col.key}>
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[13px] font-medium text-ink">{col.label}</p>
                <span className="text-[12px] text-muted">{tasks.filter((t) => t.status === col.key).length}</span>
              </div>
              <div className="space-y-2.5">
                {tasks.filter((t) => t.status === col.key).map((t) => (
                  <button key={t.id} onClick={() => advance(t.id)} className="w-full text-left" disabled={t.status === "done"}>
                    <Card className={cn("p-3.5 transition-colors", t.status !== "done" && "hover:border-indigo/40")}>
                      <p className="text-[13.5px] text-ink leading-snug">{t.title}</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge tone={priorityTone[t.priority]}>{t.priority}</Badge>
                        <span className="text-[11px] text-muted">{t.due}</span>
                      </div>
                      {t.createdBy === "ai" && (
                        <p className="flex items-center gap-1 text-[11px] text-indigo mt-2">
                          <Sparkles size={11} /> Created by AI
                        </p>
                      )}
                    </Card>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[13px] font-medium text-muted mb-3 uppercase tracking-wide">Workflows</p>
        <Card className="divide-y divide-line">
          {workflows.map((w) => (
            <div key={w.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-md bg-indigo-light text-indigo-dark flex items-center justify-center shrink-0">
                  <Zap size={15} />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] text-ink font-medium truncate">{w.name}</p>
                  <p className="text-[12px] text-muted">Trigger: {w.trigger} · {w.runs} runs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge tone={w.status === "active" ? "low" : "neutral"}>{w.status}</Badge>
                <Toggle checked={w.status === "active"} onChange={() => toggleWorkflow(w.id)} />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <Toast message={msg} show={show} />
    </div>
  );
}
