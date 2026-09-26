// Mock data layer — field names/shapes are written to mirror the eventual
// Postgres schema described in the PRD, so swapping in a real API later is
// a data-source change, not a UI rewrite.

export type RiskTier = "low" | "medium" | "high";

export type Customer = {
  id: string;
  name: string;
  company: string;
  stage: "lead" | "qualified" | "proposal" | "won" | "lost";
  value: number;
  owner: string;
  lastActivity: string;
  source: string;
};

export const customers: Customer[] = [
  { id: "c1", name: "Ada Eze", company: "Eze & Co. Interiors", stage: "proposal", value: 2400000, owner: "You", lastActivity: "2h ago", source: "Website" },
  { id: "c2", name: "Femi Okoro", company: "Okoro Logistics", stage: "qualified", value: 850000, owner: "You", lastActivity: "Yesterday", source: "Referral" },
  { id: "c3", name: "Grace Nwosu", company: "Nwosu Bakehouse", stage: "won", value: 320000, owner: "Tolu", lastActivity: "3 days ago", source: "Instagram" },
  { id: "c4", name: "Ibrahim Sule", company: "Sule Realty", stage: "lead", value: 1200000, owner: "You", lastActivity: "5 days ago", source: "Cold outreach" },
  { id: "c5", name: "Chiamaka Obi", company: "Obi Legal Practice", stage: "proposal", value: 4100000, owner: "Tolu", lastActivity: "1h ago", source: "LinkedIn" },
  { id: "c6", name: "David Adeyemi", company: "Adeyemi Motors", stage: "lost", value: 600000, owner: "You", lastActivity: "2 weeks ago", source: "Website" },
  { id: "c7", name: "Blessing Etim", company: "Etim Foods", stage: "qualified", value: 950000, owner: "You", lastActivity: "4h ago", source: "Referral" },
];

export type Task = {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "review" | "done";
  assignee: string;
  due: string;
  createdBy: "ai" | "human";
  priority: "low" | "medium" | "high";
};

export const tasks: Task[] = [
  { id: "t1", title: "Send revised proposal to Eze & Co.", status: "in_progress", assignee: "You", due: "Today", createdBy: "ai", priority: "high" },
  { id: "t2", title: "Follow up with Okoro Logistics on pricing q's", status: "todo", assignee: "You", due: "Tomorrow", createdBy: "ai", priority: "medium" },
  { id: "t3", title: "Draft Q4 ad creative variants (3x)", status: "review", assignee: "Tolu", due: "Fri", createdBy: "ai", priority: "medium" },
  { id: "t4", title: "Reconcile September expenses", status: "todo", assignee: "You", due: "Mon", createdBy: "human", priority: "low" },
  { id: "t5", title: "Prep briefing for Obi Legal call", status: "done", assignee: "You", due: "Yesterday", createdBy: "ai", priority: "high" },
];

export type Workflow = {
  id: string;
  name: string;
  trigger: string;
  status: "active" | "paused" | "draft";
  runs: number;
};

export const workflows: Workflow[] = [
  { id: "w1", name: "New lead → qualify + assign", trigger: "Form submitted", status: "active", runs: 214 },
  { id: "w2", name: "Underperforming ad → pause + notify", trigger: "CPA > threshold", status: "active", runs: 12 },
  { id: "w3", name: "Meeting ends → draft follow-up email", trigger: "Calendar event ends", status: "active", runs: 58 },
  { id: "w4", name: "Invoice overdue 7 days → reminder", trigger: "Ledger date check", status: "paused", runs: 6 },
];

export type ApprovalRequest = {
  id: string;
  title: string;
  agent: string;
  action: string;
  diff: string;
  reason: string;
  risk: RiskTier;
  requestedAt: string;
};

export const approvals: ApprovalRequest[] = [
  {
    id: "a1",
    title: "Increase 'Lagos Launch' ad budget",
    agent: "Marketing Agent",
    action: "ads.budget.update",
    diff: "₦15,000/day → ₦25,000/day",
    reason: "CPA has been 34% below target for 6 days straight; more budget should scale results at a similar cost.",
    risk: "high",
    requestedAt: "12 min ago",
  },
  {
    id: "a2",
    title: "Send WhatsApp template to 42 cold leads",
    agent: "CS Agent",
    action: "whatsapp.template.send",
    diff: "Template: 're-engagement-sept' → 42 recipients",
    reason: "These leads went quiet after a proposal was sent 14+ days ago with no reply.",
    risk: "medium",
    requestedAt: "1h ago",
  },
  {
    id: "a3",
    title: "Publish drafted blog post",
    agent: "Marketing Agent",
    action: "content.publish",
    diff: "\"5 Signs Your Business Needs a CRM\" → live on blog",
    reason: "Drafted from your brand voice guide; reviewed content shows no flags.",
    risk: "low",
    requestedAt: "3h ago",
  },
  {
    id: "a4",
    title: "Pause underperforming ad set",
    agent: "Marketing Agent",
    action: "ads.adset.pause",
    diff: "'Retarget — Website visitors' → paused",
    reason: "CPA 3.1x above target for 4 consecutive days, no sign of recovery.",
    risk: "low",
    requestedAt: "Yesterday",
  },
];

export type AuditEntry = {
  id: string;
  action: string;
  actor: string;
  onBehalfOf: string;
  outcome: "success" | "failed" | "pending";
  timestamp: string;
};

export const auditTrail: AuditEntry[] = [
  { id: "e1", action: "ads.adset.pause — Retarget: Website visitors", actor: "Marketing Agent", onBehalfOf: "You", outcome: "success", timestamp: "Yesterday, 4:02pm" },
  { id: "e2", action: "content.publish — 5 Signs Your Business Needs a CRM", actor: "Marketing Agent", onBehalfOf: "You", outcome: "success", timestamp: "Yesterday, 11:14am" },
  { id: "e3", action: "calendar.event.create — Call w/ Obi Legal", actor: "Meeting Agent", onBehalfOf: "Tolu", outcome: "success", timestamp: "Mon, 9:40am" },
  { id: "e4", action: "whatsapp.message.send — Follow-up to Okoro Logistics", actor: "CS Agent", onBehalfOf: "You", outcome: "success", timestamp: "Mon, 8:55am" },
  { id: "e5", action: "ads.budget.update — Lagos Launch", actor: "Marketing Agent", onBehalfOf: "You", outcome: "failed", timestamp: "Sun, 6:20pm" },
];

export type MeetingItem = {
  id: string;
  title: string;
  with: string;
  time: string;
  briefed: boolean;
};

export const meetings: MeetingItem[] = [
  { id: "m1", title: "Discovery call", with: "Chiamaka Obi — Obi Legal Practice", time: "Today, 2:00pm", briefed: true },
  { id: "m2", title: "Pricing follow-up", with: "Femi Okoro — Okoro Logistics", time: "Tomorrow, 10:30am", briefed: true },
  { id: "m3", title: "Quarterly review", with: "Internal — Tolu", time: "Fri, 3:00pm", briefed: false },
];

export type Transaction = {
  id: string;
  customer: string;
  item: string;
  amount: number;
  type: "sale" | "expense";
  category?: string;
  date: string;
  status: "paid" | "pending" | "overdue";
};

export const transactions: Transaction[] = [
  { id: "tx1", customer: "Nwosu Bakehouse", item: "Corporate catering — 40 guests", amount: 320000, type: "sale", date: "Sep 24", status: "paid" },
  { id: "tx2", customer: "Obi Legal Practice", item: "Website + brand package", amount: 4100000, type: "sale", date: "Sep 23", status: "pending" },
  { id: "tx3", customer: "Etim Foods", item: "Monthly retainer", amount: 950000, type: "sale", date: "Sep 20", status: "paid" },
  { id: "tx4", customer: "—", item: "Meta Ads — Lagos Launch", amount: 372000, type: "expense", category: "Marketing", date: "Sep 19", status: "paid" },
  { id: "tx5", customer: "Adeyemi Motors", item: "Landing page (lost deal deposit)", amount: 600000, type: "sale", date: "Sep 12", status: "overdue" },
  { id: "tx6", customer: "—", item: "Office internet & tools", amount: 84000, type: "expense", category: "Operations", date: "Sep 10", status: "paid" },
  { id: "tx7", customer: "Okoro Logistics", item: "Discovery + proposal fee", amount: 150000, type: "sale", date: "Sep 8", status: "paid" },
  { id: "tx8", customer: "—", item: "Freelance designer — Zainab Yusuf", amount: 210000, type: "expense", category: "Contractors", date: "Sep 5", status: "paid" },
];

export const revenueByMonth = [
  { month: "Apr", revenue: 3.1, expenses: 1.8 },
  { month: "May", revenue: 3.6, expenses: 2.0 },
  { month: "Jun", revenue: 4.2, expenses: 2.1 },
  { month: "Jul", revenue: 4.0, expenses: 2.4 },
  { month: "Aug", revenue: 5.1, expenses: 2.6 },
  { month: "Sep", revenue: 5.8, expenses: 2.7 },
];

export const pipelineByStage = [
  { stage: "Lead", count: 18 },
  { stage: "Qualified", count: 11 },
  { stage: "Proposal", count: 6 },
  { stage: "Won", count: 9 },
];

export const professionals = [
  { id: "p1", name: "Kunle Bamidele", role: "Fractional CFO", rate: "₦45,000/hr", rating: 4.9, tags: ["Finance", "Fundraising"] },
  { id: "p2", name: "Zainab Yusuf", role: "Brand Designer", rate: "₦30,000/hr", rating: 5.0, tags: ["Design", "Brand"] },
  { id: "p3", name: "Chukwuemeka Ike", role: "Corporate Lawyer", rate: "₦60,000/hr", rating: 4.8, tags: ["Legal", "Contracts"] },
  { id: "p4", name: "Amaka Studio Collective", role: "Growth Agency", rate: "From ₦400,000/mo", rating: 4.7, tags: ["Marketing", "Ads"] },
];

export const businessMemory = {
  profile: {
    name: "Nwosu Bakehouse",
    industry: "Food & Beverage — Bakery",
    founded: "2021",
    size: "6 employees",
  },
  offerings: [
    { name: "Custom celebration cakes", price: "From ₦25,000" },
    { name: "Weekly pastry subscription", price: "₦18,000/mo" },
    { name: "Corporate catering", price: "Quoted per event" },
  ],
  policies: [
    "Orders under ₦50,000 require 50% deposit upfront.",
    "48-hour cancellation window for custom cake orders.",
    "Delivery only within Lagos mainland; pickup otherwise.",
  ],
  brandVoice: "Warm, a little playful, never corporate. We talk like the neighborhood bakery we are — short sentences, real enthusiasm, no jargon.",
  goals: [
    "Grow monthly recurring subscription revenue by 30% this quarter.",
    "Cut average customer response time to under 1 hour.",
    "Open a second kitchen location by Q3 next year.",
  ],
};
