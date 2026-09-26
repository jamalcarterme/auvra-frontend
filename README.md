# Auvra — AI Co-Founder & Business Operating Platform

Frontend-only demo build. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
No backend, database, real AI, or payments — everything runs on mock data in `/lib/mock`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The landing page is `/`, the app is under `/app/*`.

## What's live in this phase

- **Landing page** — full marketing site: navbar with dropdowns, hero with a live
  simulated AI preview panel, all feature sections (Business Memory, AI Co-Founder,
  Workspace, Marketing, Customer Service, Meetings, Startup Workspace), Approval
  Queue showcase, Analytics showcase, Marketplace, How It Works, Pricing, Trust &
  Security, CTA and footer.
- **App shell** — sidebar navigation across all 15 modules, topbar with workspace
  switcher placeholder and notifications.
- **AI Co-Founder** (`/app/co-founder`) — fully working simulated chat: streaming
  text, AI modes (answering/researching/analyzing/drafting/executing), memory
  citations, a proposed action that hands off to the Approval Queue, voice-input
  toggle and file-attach affordance.
- **Business Memory** (`/app/memory`) — editable company profile, products &
  pricing, policies, brand voice, goals and a documents list, tabbed and
  inline-editable.
- **Workspace** (`/app/workspace`) — an at-a-glance dashboard pulling from
  customers, sales, tasks and meetings.
- **Customers & Leads** (`/app/customers`) — a kanban pipeline board (Lead →
  Qualified → Proposal → Won/Lost), click a card for a detail drawer with an
  AI suggestion, plus an "Add lead" modal.
- **Sales** (`/app/sales`) — revenue-vs-expense chart, stat cards, and a
  filterable transaction ledger (sales/expenses).
- **Tasks & Workflows** (`/app/tasks`) — a status board for tasks (click to
  advance), and a workflow-automation list with live on/off toggles.

## What's next

The remaining 9 modules (Marketing & Growth, Customer Service, Meetings &
Calendar, Startup Workspace, Professional Marketplace, Analytics, Approval
Queue, Audit Trail, Settings) are routed and reachable from the sidebar, but
currently show a placeholder screen. Mock data for most of them already exists
in `lib/mock/data.ts` — ask to continue the build and they'll be filled in
next, page by page, at the same fidelity as the pages above.

## Structure

```
app/
  page.tsx              → landing page
  layout.tsx             → root layout, fonts
  app/layout.tsx          → app shell wrapper
  app/co-founder/         → AI chat (built)
  app/memory/              → Business Memory (built)
  app/workspace/            → Workspace overview (built)
  app/customers/            → Customers & Leads (built)
  app/sales/                → Sales / ledger (built)
  app/tasks/                → Tasks & Workflows (built)
  app/<other-modules>/    → placeholder pages
components/
  landing/                → landing page sections
  app/                     → app shell + shared app components
  ui/                       → shared primitives (Button, Card, Badge, Modal, Drawer, Toggle…)
lib/
  mock/data.ts            → mock schema-shaped data (customers, tasks, transactions, approvals…)
  mock/ai.ts               → simulated AI response/streaming logic
```

## Design system

- Colors: near-navy ink (#0E1420), cool paper background, indigo (#3B4FE0) +
  cyan (#17B8C4) drawn from the Auvra mark, used sparingly as accents.
- Type: Sora (display/headings) + Inter (UI/body), loaded via `next/font/google`
  — requires internet access at build time (works normally outside this sandbox).
- Motion: Framer Motion for scroll reveals, the hero's live AI preview, chat
  message transitions, and modal/drawer open-close — kept purposeful rather
  than decorative.

Verified with `next build` in this environment (fonts swapped to system fonts
temporarily to confirm the rest of the app compiles cleanly with no type errors,
since this sandbox can't reach fonts.googleapis.com — your machine will build
the real fonts fine).
