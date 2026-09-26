import { Reveal } from "./Reveal";
import { SectionHeading, Card } from "@/components/ui/Primitives";
import { LinkButton } from "@/components/ui/Button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    note: "for new businesses finding their footing",
    features: ["1 user", "Business Memory & AI co-founder", "Workspace (CRM, tasks, ledger)", "Community support"],
    cta: "Start free",
  },
  {
    name: "Growth",
    price: "₦45,000/mo",
    note: "for SMBs running real operations",
    features: ["Up to 8 users", "Marketing & customer service modules", "Meetings & approvals workflow", "AI actions: 2,000/mo included"],
    cta: "Try the demo",
    highlight: true,
  },
  {
    name: "Team",
    price: "Custom",
    note: "for companies coordinating people at scale",
    features: ["Unlimited users", "Roles, permissions, audit trail", "Startup Workspace + marketplace", "Dedicated onboarding"],
    cta: "Talk to us",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-line">
      <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Pay for AI actions as you grow into them."
          description="No raw token metering — just simple tiers and a pool of AI actions that scales with you."
        />
      </Reveal>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <Card className={p.highlight ? "p-7 border-indigo shadow-raised" : "p-7"}>
              <p className="text-sm font-medium text-ink">{p.name}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">{p.price}</p>
              <p className="mt-1 text-[13px] text-muted">{p.note}</p>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink">
                    <Check size={15} className="text-indigo mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <LinkButton
                href="/app/co-founder"
                variant={p.highlight ? "primary" : "secondary"}
                className="w-full justify-center mt-7"
              >
                {p.cta}
              </LinkButton>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
