"use client";

import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { useToast } from "@/components/app/PageHeader";
import { Card, Badge } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { Modal, Drawer, Toast } from "@/components/ui/Overlay";
import { customers as initialCustomers, type Customer } from "@/lib/mock/data";
import { Plus, Mail, Phone, Sparkles } from "lucide-react";

const stages: { key: Customer["stage"]; label: string }[] = [
  { key: "lead", label: "Lead" },
  { key: "qualified", label: "Qualified" },
  { key: "proposal", label: "Proposal" },
  { key: "won", label: "Won" },
  { key: "lost", label: "Lost" },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", value: "" });
  const { msg, show, fire } = useToast();

  function addCustomer() {
    if (!form.name.trim() || !form.company.trim()) return;
    const c: Customer = {
      id: crypto.randomUUID(),
      name: form.name,
      company: form.company,
      stage: "lead",
      value: Number(form.value) || 0,
      owner: "You",
      lastActivity: "Just now",
      source: "Manual entry",
    };
    setCustomers((cs) => [c, ...cs]);
    setForm({ name: "", company: "", value: "" });
    setAddOpen(false);
    fire("Lead added");
  }

  function moveStage(id: string, stage: Customer["stage"]) {
    setCustomers((cs) => cs.map((c) => (c.id === id ? { ...c, stage } : c)));
    setSelected((s) => (s && s.id === id ? { ...s, stage } : s));
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Customers & Leads"
        description="The light CRM the AI reads from and writes to."
        action={
          <Button onClick={() => setAddOpen(true)}>
            <Plus size={16} /> Add lead
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
        {stages.map((stage) => {
          const items = customers.filter((c) => c.stage === stage.key);
          const total = items.reduce((s, c) => s + c.value, 0);
          return (
            <div key={stage.key} className="min-w-[220px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[13px] font-medium text-ink">{stage.label}</p>
                <span className="text-[12px] text-muted">{items.length}</span>
              </div>
              <p className="text-[12px] text-muted px-1 mb-2">₦{(total / 1000000).toFixed(1)}M</p>
              <div className="space-y-2.5">
                {items.map((c) => (
                  <button key={c.id} onClick={() => setSelected(c)} className="w-full text-left">
                    <Card className="p-3.5 hover:border-indigo/40 transition-colors">
                      <p className="text-[14px] font-medium text-ink">{c.name}</p>
                      <p className="text-[12px] text-muted mt-0.5">{c.company}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[12px] text-ink">₦{(c.value / 1000).toFixed(0)}K</span>
                        <span className="text-[11px] text-muted">{c.lastActivity}</span>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""}>
        {selected && (
          <div className="space-y-6">
            <div>
              <p className="text-[15px] font-medium text-ink">{selected.company}</p>
              <p className="text-[13px] text-muted mt-0.5">Source: {selected.source} · Owner: {selected.owner}</p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="flex-1 justify-center"><Mail size={14} /> Email</Button>
              <Button size="sm" variant="secondary" className="flex-1 justify-center"><Phone size={14} /> Call</Button>
            </div>

            <div>
              <p className="text-[13px] font-medium text-ink mb-2">Stage</p>
              <div className="flex flex-wrap gap-1.5">
                {stages.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => moveStage(selected.id, s.key)}
                    className={`text-[13px] px-3 py-1.5 rounded-full border ${
                      selected.stage === s.key ? "bg-indigo text-white border-indigo" : "border-line text-ink/70 hover:border-ink/30"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div><p className="text-muted">Deal value</p><p className="text-ink mt-1">₦{selected.value.toLocaleString()}</p></div>
              <div><p className="text-muted">Last activity</p><p className="text-ink mt-1">{selected.lastActivity}</p></div>
            </div>

            <div className="rounded-card border border-line bg-indigo-light/40 p-4">
              <p className="flex items-center gap-1.5 text-[13px] font-medium text-indigo-dark mb-1.5">
                <Sparkles size={13} /> AI suggestion
              </p>
              <p className="text-[13px] text-ink leading-relaxed">
                {selected.stage === "proposal"
                  ? `No reply in a few days — want a follow-up drafted for ${selected.name.split(" ")[0]}?`
                  : selected.stage === "lead"
                  ? `This lead hasn't been qualified yet. I can draft a discovery-call invite.`
                  : `Nothing urgent here right now.`}
              </p>
            </div>
          </div>
        )}
      </Drawer>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add lead">
        <div className="space-y-4">
          <div>
            <label className="text-[13px] text-muted">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 border border-line rounded-md px-3 py-2 text-[14px] outline-none focus:border-indigo" />
          </div>
          <div>
            <label className="text-[13px] text-muted">Company</label>
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full mt-1 border border-line rounded-md px-3 py-2 text-[14px] outline-none focus:border-indigo" />
          </div>
          <div>
            <label className="text-[13px] text-muted">Estimated value (₦)</label>
            <input value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} type="number" className="w-full mt-1 border border-line rounded-md px-3 py-2 text-[14px] outline-none focus:border-indigo" />
          </div>
          <Button onClick={addCustomer} className="w-full justify-center">Add to pipeline</Button>
        </div>
      </Modal>

      <Toast message={msg} show={show} />
    </div>
  );
}
