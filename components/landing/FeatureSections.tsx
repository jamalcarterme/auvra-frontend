import { Reveal } from "./Reveal";
import {
  MemoryPanel,
  WorkspacePanel,
  MarketingPanel,
  ServicePanel,
  MeetingsPanel,
  StartupPanel,
} from "./MockPanels";
import { cn } from "@/lib/cn";

type Row = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  panel: React.ReactNode;
  reverse?: boolean;
};

const rows: Row[] = [
  {
    id: "memory",
    eyebrow: "Business Memory",
    title: "The one thing every agent reads from",
    body: "Not chat history — a structured record of your company: profile, offerings, pricing, customers, policies, brand voice and goals. Every answer the AI gives cites which record it used, and you can correct anything in place.",
    points: ["Structured schema, not just embeddings", "RAG over uploaded documents for the rest", "Source-linked, so you can verify any answer"],
    panel: <MemoryPanel />,
  },
  {
    id: "workspace",
    eyebrow: "Business Workspace",
    title: "Customers, sales and tasks — one place, not five tabs",
    body: "Staff and roles, a light CRM, a products catalog, a revenue and expense ledger, tasks and workflows — the operational core the AI reads and writes to, and that you can run by hand any time.",
    points: ["Full CRUD, no AI required to use it", "AI recommendations layered on top", "Same data model your future backend will use"],
    panel: <WorkspacePanel />,
    reverse: true,
  },
  {
    id: "marketing",
    eyebrow: "Marketing & Growth",
    title: "It watches your campaigns so you don't have to",
    body: "Connect Google, Meta and TikTok ads. Auvra flags CPA drift and creative fatigue, drafts new copy variants, and proposes budget changes — auto-executing only what you've explicitly allowed.",
    points: ["Read-only analysis on day one", "Low-risk actions auto-execute at your thresholds", "Budget increases and launches always need approval"],
    panel: <MarketingPanel />,
  },
  {
    id: "service",
    eyebrow: "Customer Service",
    title: "One queue for WhatsApp, email and your website",
    body: "Teach it your FAQs and policies once. It answers what it can in your voice, and hands off to a human with full context — never a cold transfer — when it hits the edge of what it knows.",
    points: ["WhatsApp Business, email, web widget", "Escalation rules you set, not guesswork", "Full conversation context on handoff"],
    panel: <ServicePanel />,
    reverse: true,
  },
  {
    id: "meetings",
    eyebrow: "Meetings & Calendar",
    title: "Walks in prepared, walks out with follow-ups done",
    body: "Calendar sync, booking pages, and an AI-written briefing pulled from memory and recent activity before every call. After it ends: summary, action items turned into tasks, and a drafted follow-up.",
    points: ["Briefings pull from memory automatically", "Action items become real tasks, not notes", "Live copilot only ships behind explicit consent"],
    panel: <MeetingsPanel />,
  },
  {
    id: "startup-workspace",
    eyebrow: "Startup Workspace",
    title: "Turn a rough idea into a plan you can actually build",
    body: "For founders starting from scratch: describe the idea, get back requirements, a suggested architecture, a phased roadmap, and a rough cost and skills estimate — the same process behind this very platform.",
    points: ["Structured PRD, not a vague brainstorm", "Phased so a solo founder can execute it", "Cost and timeline estimates included"],
    panel: <StartupPanel />,
    reverse: true,
  },
];

export function FeatureSections() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
      {rows.map((row) => (
        <section id={row.id} key={row.id} className="py-14 md:py-20 border-t border-line first:border-0">
          <div
            className={cn(
              "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
              row.reverse && "lg:[&>*:first-child]:order-2"
            )}
          >
            <Reveal>
              <p className="text-sm font-medium text-indigo mb-3">{row.eyebrow}</p>
              <h3 className="font-display text-2xl md:text-[32px] font-semibold tracking-tight text-ink leading-[1.2]">
                {row.title}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">{row.body}</p>
              <ul className="mt-6 space-y-2.5">
                {row.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>{row.panel}</Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
