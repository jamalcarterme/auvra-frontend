"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bot, Database, LayoutGrid, Users, DollarSign, ListChecks, Megaphone,
  Headset, CalendarClock, Rocket, Store, BarChart3, ShieldCheck, ScrollText,
  Settings, Bell, ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/cn";

const nav = [
  { group: "AI", items: [
    { name: "AI Co-Founder", href: "/app/co-founder", icon: Bot },
    { name: "Business Memory", href: "/app/memory", icon: Database },
  ]},
  { group: "Operate", items: [
    { name: "Workspace", href: "/app/workspace", icon: LayoutGrid },
    { name: "Customers & Leads", href: "/app/customers", icon: Users },
    { name: "Sales", href: "/app/sales", icon: DollarSign },
    { name: "Tasks & Workflows", href: "/app/tasks", icon: ListChecks },
  ]},
  { group: "Grow", items: [
    { name: "Marketing & Growth", href: "/app/marketing", icon: Megaphone },
    { name: "Customer Service", href: "/app/service", icon: Headset },
    { name: "Meetings & Calendar", href: "/app/meetings", icon: CalendarClock },
    { name: "Startup Workspace", href: "/app/startup", icon: Rocket },
    { name: "Marketplace", href: "/app/marketplace", icon: Store },
  ]},
  { group: "Oversight", items: [
    { name: "Analytics", href: "/app/analytics", icon: BarChart3 },
    { name: "Approval Queue", href: "/app/approvals", icon: ShieldCheck },
    { name: "Audit Trail", href: "/app/audit", icon: ScrollText },
    { name: "Settings", href: "/app/settings", icon: Settings },
  ]},
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper flex">
      <aside className="hidden md:flex w-[248px] shrink-0 flex-col border-r border-line bg-surface h-screen sticky top-0">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-line">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/auvra-mark.png" alt="" width={22} height={15} />
            <span className="font-display font-semibold text-ink">Auvra</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto thin-scroll py-4 px-3 space-y-5">
          {nav.map((g) => (
            <div key={g.group}>
              <p className="px-2.5 mb-1.5 text-[11px] font-medium tracking-wide text-muted uppercase">{g.group}</p>
              <div className="space-y-0.5">
                {g.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[14px] transition-colors",
                        active ? "bg-indigo-light text-indigo-dark font-medium" : "text-ink/75 hover:bg-ink/[0.04]"
                      )}
                    >
                      <item.icon size={16} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-line">
          <Link href="/" className="flex items-center gap-2 px-2.5 py-2 rounded-md text-[13px] text-muted hover:text-ink hover:bg-ink/[0.04]">
            <ChevronLeft size={15} /> Back to site
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-line bg-surface/80 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-6">
          <div>
            <p className="text-[13px] text-muted leading-none">Demo workspace</p>
            <p className="text-[14px] font-medium text-ink leading-tight mt-0.5">Nwosu Bakehouse</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md hover:bg-ink/[0.05] focus-ring" aria-label="Notifications">
              <Bell size={18} className="text-ink/70" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-cyan" />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo text-white text-[13px] font-medium flex items-center justify-center">
              GN
            </div>
          </div>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
