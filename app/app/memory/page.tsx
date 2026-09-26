"use client";

import { useState } from "react";
import { businessMemory } from "@/lib/mock/data";
import { Badge, Card } from "@/components/ui/Primitives";
import { Pencil, Check, FileText, Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";

type TabKey = "profile" | "offerings" | "policies" | "voice" | "goals" | "documents";

const tabs: { key: TabKey; label: string }[] = [
  { key: "profile", label: "Company profile" },
  { key: "offerings", label: "Products & pricing" },
  { key: "policies", label: "Policies" },
  { key: "voice", label: "Brand voice" },
  { key: "goals", label: "Goals" },
  { key: "documents", label: "Documents" },
];

function EditableField({ label, value: initial }: { label: string; value: string }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initial);
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-line last:border-0 group">
      <span className="text-[13px] text-muted w-1/3 pt-1.5">{label}</span>
      {editing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 text-[14px] border border-indigo rounded-md px-2.5 py-1.5 outline-none"
          />
          <button onClick={() => setEditing(false)} className="p-1.5 rounded-md bg-indigo text-white">
            <Check size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="flex-1 flex items-center justify-between text-left group/btn"
        >
          <span className="text-[14px] text-ink">{value}</span>
          <Pencil size={13} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      )}
    </div>
  );
}

function EditableListCard({ title, items: initial }: { title: string; items: string[] }) {
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState("");
  return (
    <Card className="p-5">
      <p className="text-sm font-medium text-ink mb-4">{title}</p>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start justify-between gap-3 text-[14px] text-ink">
            <span>{it}</span>
            <button
              onClick={() => setItems((arr) => arr.filter((_, idx) => idx !== i))}
              className="text-muted hover:text-risk-high shrink-0"
              aria-label="Remove"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-line">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && draft.trim()) {
              setItems((arr) => [...arr, draft.trim()]);
              setDraft("");
            }
          }}
          placeholder="Add new…"
          className="flex-1 text-[14px] border border-line rounded-md px-2.5 py-1.5 outline-none focus:border-indigo"
        />
        <button
          onClick={() => {
            if (draft.trim()) {
              setItems((arr) => [...arr, draft.trim()]);
              setDraft("");
            }
          }}
          className="p-1.5 rounded-md border border-line hover:border-ink/30"
        >
          <Plus size={14} />
        </button>
      </div>
    </Card>
  );
}

export default function BusinessMemoryPage() {
  const [tab, setTab] = useState<TabKey>("profile");

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Business Memory</h1>
          <p className="text-[14px] text-muted mt-1">
            What Auvra knows about {businessMemory.profile.name} — edit anything, it's used everywhere.
          </p>
        </div>
        <Badge tone="indigo">Editable</Badge>
      </div>

      <div className="mt-6 flex gap-1 border-b border-line overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-3.5 py-2.5 text-[14px] whitespace-nowrap border-b-2 -mb-px transition-colors",
              tab === t.key ? "border-indigo text-ink font-medium" : "border-transparent text-muted hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "profile" && (
          <Card className="p-5">
            <EditableField label="Company name" value={businessMemory.profile.name} />
            <EditableField label="Industry" value={businessMemory.profile.industry} />
            <EditableField label="Founded" value={businessMemory.profile.founded} />
            <EditableField label="Team size" value={businessMemory.profile.size} />
          </Card>
        )}

        {tab === "offerings" && (
          <Card className="p-5">
            {businessMemory.offerings.map((o) => (
              <EditableField key={o.name} label={o.name} value={o.price} />
            ))}
          </Card>
        )}

        {tab === "policies" && (
          <EditableListCard title="Policies" items={businessMemory.policies} />
        )}

        {tab === "voice" && (
          <Card className="p-5">
            <p className="text-sm font-medium text-ink mb-3">Brand voice</p>
            <textarea
              defaultValue={businessMemory.brandVoice}
              rows={4}
              className="w-full text-[14px] text-ink border border-line rounded-md p-3 outline-none focus:border-indigo resize-none"
            />
            <p className="text-xs text-muted mt-2">Used for every draft — emails, replies, ad copy, blog posts.</p>
          </Card>
        )}

        {tab === "goals" && (
          <EditableListCard title="Current goals" items={businessMemory.goals} />
        )}

        {tab === "documents" && (
          <Card className="p-5">
            <p className="text-sm font-medium text-ink mb-4">Uploaded documents</p>
            {["Company handbook.pdf", "2026 pricing sheet.xlsx", "Brand guidelines.pdf"].map((d) => (
              <div key={d} className="flex items-center gap-3 py-2.5 border-b border-line last:border-0">
                <FileText size={16} className="text-indigo" />
                <span className="text-[14px] text-ink">{d}</span>
                <span className="text-xs text-muted ml-auto">Indexed</span>
              </div>
            ))}
            <button className="mt-4 flex items-center gap-2 text-[14px] text-indigo font-medium">
              <Plus size={15} /> Upload document
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}
