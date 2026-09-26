import { Badge, Card } from "@/components/ui/Primitives";
import { CheckCircle2, FileText, MessageSquare, Mail } from "lucide-react";

export function MemoryPanel() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink">Business Memory</span>
        <Badge tone="indigo">Editable</Badge>
      </div>
      <div className="space-y-3">
        {[
          ["Brand voice", "Warm, direct, no jargon"],
          ["Cancellation policy", "48-hour window on custom orders"],
          ["Top offering", "Weekly pastry subscription — ₦18,000/mo"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-4 py-2 border-b border-line last:border-0">
            <span className="text-[13px] text-muted w-2/5">{k}</span>
            <span className="text-[13px] text-ink text-right">{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted flex items-center gap-1.5">
        <FileText size={13} /> Source: Company handbook.pdf, p.3
      </p>
    </Card>
  );
}

export function WorkspacePanel() {
  const rows = [
    { name: "Ada Eze", stage: "Proposal", value: "₦2.4M" },
    { name: "Femi Okoro", stage: "Qualified", value: "₦850K" },
    { name: "Chiamaka Obi", stage: "Proposal", value: "₦4.1M" },
  ];
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink">Customers & Leads</span>
        <span className="text-xs text-muted">7 active</span>
      </div>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-muted">
            <th className="font-normal pb-2">Name</th>
            <th className="font-normal pb-2">Stage</th>
            <th className="font-normal pb-2 text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-line">
              <td className="py-2.5 text-ink">{r.name}</td>
              <td className="py-2.5"><Badge tone="indigo">{r.stage}</Badge></td>
              <td className="py-2.5 text-right text-ink">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export function MarketingPanel() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink">Lagos Launch — Meta Ads</span>
        <Badge tone="low">Below target CPA</Badge>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[["Spend", "₦12,400"], ["CPA", "₦890"], ["Leads", "14"]].map(([k, v]) => (
          <div key={k}>
            <p className="text-xs text-muted mb-1">{k}</p>
            <p className="text-[17px] font-display font-semibold text-ink">{v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-indigo-light px-3.5 py-3 text-[13px] text-indigo-dark">
        Suggested: raise daily budget ₦15,000 → ₦25,000 — awaiting your approval
      </div>
    </Card>
  );
}

export function ServicePanel() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink">Conversations</span>
        <span className="text-xs text-muted">3 open</span>
      </div>
      <div className="space-y-3">
        {[
          { icon: MessageSquare, name: "Blessing Etim", channel: "WhatsApp", preview: "Is the subscription pausable?" },
          { icon: Mail, name: "David Adeyemi", channel: "Email", preview: "Following up on my quote…" },
        ].map((c) => (
          <div key={c.name} className="flex items-start gap-3 py-2 border-b border-line last:border-0">
            <c.icon size={16} className="text-indigo mt-0.5" />
            <div className="min-w-0">
              <p className="text-[13px] text-ink font-medium">{c.name} <span className="text-muted font-normal">· {c.channel}</span></p>
              <p className="text-[13px] text-muted truncate">{c.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function MeetingsPanel() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink">Today, 2:00pm</span>
        <Badge tone="indigo">Briefed</Badge>
      </div>
      <p className="text-[15px] text-ink font-medium mb-1">Discovery call — Chiamaka Obi</p>
      <p className="text-[13px] text-muted mb-4">Obi Legal Practice · Proposal stage · ₦4.1M</p>
      <div className="space-y-2 text-[13px] text-ink">
        <p className="flex gap-2"><CheckCircle2 size={15} className="text-risk-low mt-0.5 shrink-0" /> Opened with the pricing question from her last email</p>
        <p className="flex gap-2"><CheckCircle2 size={15} className="text-risk-low mt-0.5 shrink-0" /> Mention the retainer discount she qualifies for</p>
      </div>
    </Card>
  );
}

export function StartupPanel() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink">Idea → PRD</span>
        <Badge tone="indigo">Generated</Badge>
      </div>
      <div className="space-y-2.5 text-[13px]">
        {["Requirements", "Suggested architecture", "Phased roadmap", "Cost & timeline estimate"].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-full bg-indigo-light text-indigo-dark text-[11px] font-medium flex items-center justify-center">{i + 1}</span>
            <span className="text-ink">{s}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
