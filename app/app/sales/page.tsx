"use client";

import { useState } from "react";
import { PageHeader, StatCard } from "@/components/app/PageHeader";
import { Card, Badge } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { transactions, revenueByMonth } from "@/lib/mock/data";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

const statusTone: Record<string, "low" | "medium" | "high"> = { paid: "low", pending: "medium", overdue: "high" };

export default function SalesPage() {
  const [filter, setFilter] = useState<"all" | "sale" | "expense">("all");
  const rows = transactions.filter((t) => filter === "all" || t.type === filter);
  const totalRevenue = transactions.filter((t) => t.type === "sale").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const maxVal = Math.max(...revenueByMonth.map((m) => m.revenue));

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <PageHeader
        title="Sales"
        description="Deals, revenue and expenses — the ledger the AI reports from."
        action={<Button><Plus size={16} /> Log transaction</Button>}
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Revenue, Sept" value={`₦${(totalRevenue / 1000000).toFixed(1)}M`} sub="+14% vs. Aug" tone="up" />
        <StatCard label="Expenses, Sept" value={`₦${(totalExpenses / 1000000).toFixed(2)}M`} sub="Mostly marketing spend" />
        <StatCard label="Net margin" value={`${Math.round(((totalRevenue - totalExpenses) / totalRevenue) * 100)}%`} sub="Best this year" tone="up" />
      </div>

      <Card className="p-5">
        <p className="text-sm font-medium text-ink mb-5">Revenue vs. expenses, last 6 months</p>
        <div className="flex items-end gap-6 h-40">
          {revenueByMonth.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end gap-1 h-32">
                <div className="flex-1 bg-indigo rounded-t-sm" style={{ height: `${(m.revenue / maxVal) * 100}%` }} />
                <div className="flex-1 bg-line rounded-t-sm" style={{ height: `${(m.expenses / maxVal) * 100}%` }} />
              </div>
              <span className="text-[12px] text-muted">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-5 mt-4 text-[12px] text-muted">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-indigo" /> Revenue</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-line" /> Expenses</span>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center gap-1 px-5 pt-4">
          {(["all", "sale", "expense"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 text-[13px] rounded-full",
                filter === f ? "bg-ink text-white" : "text-muted hover:bg-ink/5"
              )}
            >
              {f === "all" ? "All" : f === "sale" ? "Sales" : "Expenses"}
            </button>
          ))}
        </div>
        <table className="w-full text-[14px] mt-3">
          <thead>
            <tr className="text-left text-muted border-t border-line">
              <th className="font-normal px-5 py-2.5">Item</th>
              <th className="font-normal px-5 py-2.5">Customer</th>
              <th className="font-normal px-5 py-2.5">Date</th>
              <th className="font-normal px-5 py-2.5">Status</th>
              <th className="font-normal px-5 py-2.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-t border-line">
                <td className="px-5 py-3 text-ink">{t.item}</td>
                <td className="px-5 py-3 text-muted">{t.customer}</td>
                <td className="px-5 py-3 text-muted">{t.date}</td>
                <td className="px-5 py-3"><Badge tone={statusTone[t.status]}>{t.status}</Badge></td>
                <td className={cn("px-5 py-3 text-right font-medium", t.type === "expense" ? "text-risk-high" : "text-ink")}>
                  {t.type === "expense" ? "-" : "+"}₦{t.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
