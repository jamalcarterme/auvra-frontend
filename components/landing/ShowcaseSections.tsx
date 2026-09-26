import { Reveal } from "./Reveal";
import { SectionHeading, Badge, Card } from "@/components/ui/Primitives";
import { approvals, professionals } from "@/lib/mock/data";
import { Star, ShieldCheck } from "lucide-react";

export function ApprovalsSection() {
  const sample = approvals.slice(0, 3);
  return (
    <section id="approvals" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-line">
      <Reveal>
        <SectionHeading
          eyebrow="Approval Queue"
          title="Nothing acts on your business without your sign-off"
          description="High-impact actions become an ApprovalRequest, not a surprise in your inbox: what's proposed, why, and how risky it is — approve, edit or reject in one tap."
        />
      </Reveal>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {sample.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.08}>
            <Card className="p-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-sm font-medium text-ink leading-snug">{a.title}</span>
                <Badge tone={a.risk}>{a.risk} risk</Badge>
              </div>
              <p className="text-[13px] text-muted mb-4 flex-1">{a.reason}</p>
              <div className="text-xs text-ink/60 border-t border-line pt-3 flex items-center justify-between">
                <span>{a.agent}</span>
                <span>{a.requestedAt}</span>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AnalyticsSection() {
  const bars = [40, 55, 48, 62, 58, 74, 68, 80];
  return (
    <section id="analytics" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-line">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Analytics"
            title="Reporting that answers the question, not just charts it"
            description="Ask in plain language and get the number, the trend, and the reason behind it — sourced from the same workspace data your team already works in."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="p-6">
            <div className="flex items-end justify-between mb-1">
              <span className="text-sm font-medium text-ink">Revenue, last 8 weeks</span>
              <span className="text-xs text-risk-low font-medium">+18.4%</span>
            </div>
            <div className="mt-5 flex items-end gap-2.5 h-32">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 bg-indigo-light rounded-t-sm relative overflow-hidden" style={{ height: `${h}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-indigo/80" style={{ height: i === bars.length - 1 ? "100%" : "0%" }} />
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

export function MarketplaceSection() {
  return (
    <section id="marketplace" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-line">
      <Reveal>
        <SectionHeading
          eyebrow="Professional Marketplace"
          title="When AI hits its ceiling, a real person picks it up"
          description="Vetted accountants, lawyers, designers and agencies — discoverable, bookable, and reviewed, right inside the same workspace."
        />
      </Reveal>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {professionals.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <Card className="p-5 h-full">
              <div className="h-10 w-10 rounded-full bg-indigo-light text-indigo-dark font-display font-semibold flex items-center justify-center mb-3">
                {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <p className="text-[14px] font-medium text-ink">{p.name}</p>
              <p className="text-[13px] text-muted mb-3">{p.role}</p>
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-1 text-ink"><Star size={13} className="fill-amber text-amber" /> {p.rating}</span>
                <span className="text-muted">{p.rate}</span>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { title: "Tell it about your business", body: "A short conversation — not a 40-field form — builds your first Business Memory." },
  { title: "It proposes a plan", body: "Sales, marketing and service recommendations tailored to what you actually told it." },
  { title: "You approve what matters", body: "Low-risk work runs on its own; anything with real consequences waits for you." },
  { title: "It gets sharper over time", body: "Every correction you make and every approval you give refines what it does next." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-line">
      <Reveal>
        <SectionHeading eyebrow="How it works" title="From first conversation to running operations" />
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="border-t-2 border-ink pt-4">
              <span className="font-display text-2xl font-semibold text-ink/30">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-3 text-[16px] font-medium text-ink">{s.title}</h4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TrustSection() {
  const points = [
    "Every gated action creates an auditable ApprovalRequest — approve, edit or reject before anything runs.",
    "Permissions are enforced where actions execute, not just in the interface — an agent can't call what its role doesn't allow.",
    "Full audit trail per action: what ran, on whose behalf, with what data, and the outcome.",
    "This demo runs entirely in your browser — no real accounts are connected, no real actions are taken.",
  ];
  return (
    <section id="trust" className="bg-ink">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldCheck size={20} className="text-cyan" />
            <span className="text-sm font-medium text-cyan">Trust & security</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl leading-[1.15]">
            Autonomy you can see, and stop, at every step
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {points.map((p, i) => (
            <Reveal key={p} delay={i * 0.06}>
              <p className="text-[15px] leading-relaxed text-white/70 border-l-2 border-white/15 pl-4">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
