import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { LinkButton } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <Reveal>
        <div className="bg-indigo rounded-card px-8 py-14 md:px-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-[42px] font-semibold tracking-tight text-white max-w-2xl mx-auto leading-[1.15]">
            Your business already runs. Let's make it smarter.
          </h2>
          <p className="mt-4 text-[17px] text-white/80 max-w-lg mx-auto">
            Walk through the full demo — Business Memory, the AI co-founder, and every
            module — with realistic sample data, no setup required.
          </p>
          <div className="mt-8 flex justify-center">
            <LinkButton href="/app/co-founder" variant="dark" className="!bg-white !text-indigo hover:!bg-white/90">
              Try the demo <ArrowUpRight size={16} />
            </LinkButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const footerCols = [
  {
    title: "Product",
    links: [
      ["AI Co-Founder", "/app/co-founder"],
      ["Business Memory", "/app/memory"],
      ["Workspace", "/app/workspace"],
      ["Approval Queue", "/app/approvals"],
    ],
  },
  {
    title: "Modules",
    links: [
      ["Marketing & Growth", "/app/marketing"],
      ["Customer Service", "/app/service"],
      ["Meetings & Calendar", "/app/meetings"],
      ["Startup Workspace", "/app/startup"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Marketplace", "/#marketplace"],
      ["Pricing", "/#pricing"],
      ["Trust & security", "/#trust"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/auvra-mark.png" alt="" width={24} height={16} />
              <span className="font-display font-semibold text-lg text-ink">Auvra</span>
            </Link>
            <p className="text-[14px] text-muted max-w-[240px]">Your Business. Smarter. Together.</p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium text-ink mb-3">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(([name, href]) => (
                  <li key={name}>
                    <Link href={href} className="text-[14px] text-muted hover:text-ink transition-colors">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-3 text-[13px] text-muted">
          <span>© 2026 Auvra. Demo build — no real data leaves your browser.</span>
          <span>Built with Next.js, Tailwind CSS and Framer Motion.</span>
        </div>
      </div>
    </footer>
  );
}
