"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const productLinks = [
  { name: "AI Co-Founder", href: "/app/co-founder", desc: "Talk, don't click — voice or text" },
  { name: "Business Memory", href: "/app/memory", desc: "The structured brain behind every answer" },
  { name: "Workspace", href: "/app/workspace", desc: "Customers, sales, tasks, ledger" },
  { name: "Marketing & Growth", href: "/app/marketing", desc: "Campaigns, creative, budget calls" },
  { name: "Customer Service", href: "/app/service", desc: "WhatsApp, email and web, one queue" },
  { name: "Meetings & Calendar", href: "/app/meetings", desc: "Briefings, notes, follow-ups" },
  { name: "Approval Queue", href: "/app/approvals", desc: "Nothing acts without your say-so" },
];

const solutionLinks = [
  { name: "New business owners", href: "/#how-it-works", desc: "Go from idea to a working plan" },
  { name: "Running SMBs", href: "/#workspace", desc: "Day-to-day operations on autopilot" },
  { name: "Startup founders", href: "/#startup-workspace", desc: "Idea to buildable PRD" },
  { name: "Teams", href: "/#trust", desc: "Shared memory, roles, permissions" },
  { name: "Agencies & professionals", href: "/#marketplace", desc: "Get discovered, get hired" },
];

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: { name: string; href: string; desc: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-[15px] text-ink/80 hover:text-ink px-3 py-2 focus-ring rounded-md"
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={15} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 w-[340px] z-40">
          <div className="bg-surface border border-line rounded-card shadow-raised p-2">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 hover:bg-ink/[0.04] transition-colors"
              >
                <span className="text-[14px] font-medium text-ink">{item.name}</span>
                <span className="text-[13px] text-muted">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/auvra-mark.png" alt="" width={26} height={18} />
          <span className="font-display font-semibold text-lg text-ink">Auvra</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Dropdown label="Product" items={productLinks} />
          <Dropdown label="Solutions" items={solutionLinks} />
          <Link href="/#marketplace" className="text-[15px] text-ink/80 hover:text-ink px-3 py-2 rounded-md">
            Marketplace
          </Link>
          <Link href="/#pricing" className="text-[15px] text-ink/80 hover:text-ink px-3 py-2 rounded-md">
            Pricing
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <LinkButton href="/app/co-founder" variant="ghost" size="sm">
            Log in
          </LinkButton>
          <LinkButton href="/app/co-founder" variant="primary" size="sm">
            Try the demo
          </LinkButton>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 focus-ring rounded-md"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-paper px-6 py-4 space-y-1">
          {productLinks.map((item) => (
            <Link key={item.name} href={item.href} className="block py-2 text-[15px] text-ink">
              {item.name}
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            <LinkButton href="/app/co-founder" variant="secondary" size="sm" className="flex-1 justify-center">
              Log in
            </LinkButton>
            <LinkButton href="/app/co-founder" variant="primary" size="sm" className="flex-1 justify-center">
              Try the demo
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
