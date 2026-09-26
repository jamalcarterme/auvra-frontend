import Link from "next/link";
import { PageHeader, StatCard } from "@/components/app/PageHeader";
import { Card, Badge } from "@/components/ui/Primitives";
import { customers, tasks, transactions, meetings } from "@/lib/mock/data";
import { ArrowUpRight, Users, DollarSign, ListChecks, CalendarClock } from "lucide-react";

const stageTone: Record<string, "neutral" | "indigo" | "low" | "high"> = {
  lead: "neutral", qualified: "indigo", proposal: "indigo", won: "low", lost: "high",
};

export default function WorkspacePage() {
  const openTasks = tasks.filter((t) => t.status !== "done").length;
  const pipelineValue = customers.filter((c) => c.stage !== "lost" && c.stage !== "won").reduce((s, c) => s + c.value, 0);
  const recentSales = transactions.filter((t) => t.type === "sale").slice(0, 4);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <PageHeader title="Workspace" description="Your operational home base — everything the AI reads from and writes to." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open pipeline" value={`₦${(pipelineValue / 1000000).toFixed(1)}M`} sub="17 active deals" tone="up" />
        <StatCard label="Revenue, Sept" value="₦5.8M" sub="+14% vs. Aug" tone="up" />
        <StatCard label="Open tasks" value={String(openTasks)} sub="3 created by AI today" />
        <StatCard label="Upcoming meetings" value={String(meetings.length)} sub="Next: today, 2:00pm" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-ink flex items-center gap-2"><Users size={16} className="text-indigo" /> Recent customers</p>
            <Link href="/app/customers" className="text-[13px] text-indigo font-medium flex items-center gap-1">
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="space-y-1">
            {customers.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                <div>
                  <p className="text-[14px] text-ink">{c.name}</p>
                  <p className="text-[12px] text-muted">{c.company}</p>
                </div>
                <Badge tone={stageTone[c.stage]}>{c.stage}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-ink flex items-center gap-2"><DollarSign size={16} className="text-indigo" /> Recent sales</p>
            <Link href="/app/sales" className="text-[13px] text-indigo font-medium flex items-center gap-1">
              View ledger <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="space-y-1">
            {recentSales.map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                <div>
                  <p className="text-[14px] text-ink">{t.item}</p>
                  <p className="text-[12px] text-muted">{t.customer} · {t.date}</p>
                </div>
                <span className="text-[14px] text-ink font-medium">₦{(t.amount / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-ink flex items-center gap-2"><ListChecks size={16} className="text-indigo" /> Tasks needing attention</p>
            <Link href="/app/tasks" className="text-[13px] text-indigo font-medium flex items-center gap-1">
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="space-y-1">
            {tasks.filter((t) => t.status !== "done").slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                <p className="text-[14px] text-ink">{t.title}</p>
                <span className="text-[12px] text-muted shrink-0 ml-3">{t.due}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-ink flex items-center gap-2"><CalendarClock size={16} className="text-indigo" /> Upcoming meetings</p>
            <Link href="/app/meetings" className="text-[13px] text-indigo font-medium flex items-center gap-1">
              View calendar <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="space-y-1">
            {meetings.map((m) => (
              <div key={m.id} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                <div>
                  <p className="text-[14px] text-ink">{m.title}</p>
                  <p className="text-[12px] text-muted">{m.with}</p>
                </div>
                <span className="text-[12px] text-muted shrink-0 ml-3">{m.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
