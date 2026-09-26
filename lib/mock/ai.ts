// Simulated AI orchestrator. In the real build this swaps for a call to the
// orchestrator LLM; components only depend on this interface.

export type AiMode = "answering" | "researching" | "analyzing" | "drafting" | "executing";

export type AiTurn = {
  mode: AiMode;
  text: string;
  citedMemory?: string[];
  proposedAction?: { title: string; risk: "low" | "medium" | "high" };
};

const RESPONSES: Record<string, AiTurn> = {
  default: {
    mode: "answering",
    text: "Here's where things stand: revenue is up 14% month over month, your proposal to Eze & Co. Interiors has been sitting for 3 days without a reply, and I've queued a low-risk ad optimization for your approval. Want me to draft a follow-up to Ada now?",
    citedMemory: ["Customers & Leads", "Revenue ledger"],
  },
  revenue: {
    mode: "analyzing",
    text: "September revenue is ₦5.8M against ₦2.7M in expenses — a 53% margin, your best this year. The jump is mostly the Nwosu Bakehouse subscription tier and the Obi Legal proposal closing. Expenses ticked up from ad spend on the Lagos Launch campaign, which is performing well enough to justify it.",
    citedMemory: ["Revenue ledger", "Marketing — Lagos Launch"],
  },
  proposal: {
    mode: "drafting",
    text: "Draft ready. I kept it short, referenced her original brief, and matched your brand voice guide — warm, direct, no jargon. It's in your Approval Queue as a low-risk send since it's going to an existing contact.",
    citedMemory: ["Business Memory — Brand voice", "Customers & Leads — Ada Eze"],
    proposedAction: { title: "Send follow-up email to Ada Eze", risk: "low" },
  },
  ads: {
    mode: "researching",
    text: "Pulling the last 14 days of ad performance across your active campaigns now. One moment — checking CPA trends, budget pacing, and creative fatigue signals before I say anything conclusive.",
    citedMemory: ["Marketing & Growth — Ad accounts"],
  },
  hire: {
    mode: "answering",
    text: "For fractional finance help, Kunle Bamidele on the Marketplace has a strong fit — CFO experience with SMBs your size, 4.9 rating. I can send him your Q3 numbers and request a call, or just share his profile with you first.",
    citedMemory: ["Marketplace"],
  },
};

export function pickResponse(input: string): AiTurn {
  const q = input.toLowerCase();
  if (q.includes("revenue") || q.includes("money") || q.includes("expense")) return RESPONSES.revenue;
  if (q.includes("proposal") || q.includes("follow up") || q.includes("follow-up") || q.includes("email")) return RESPONSES.proposal;
  if (q.includes("ad") || q.includes("campaign") || q.includes("marketing")) return RESPONSES.ads;
  if (q.includes("hire") || q.includes("accountant") || q.includes("lawyer") || q.includes("cfo")) return RESPONSES.hire;
  return RESPONSES.default;
}

export const suggestedPrompts = [
  "How's revenue looking this month?",
  "Draft a follow-up to Ada Eze's proposal",
  "Check my ad campaign performance",
  "I need to hire a fractional CFO",
];

export const modeLabel: Record<AiMode, string> = {
  answering: "Answering",
  researching: "Researching",
  analyzing: "Analyzing",
  drafting: "Drafting",
  executing: "Executing",
};
