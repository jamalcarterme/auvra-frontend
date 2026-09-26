"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Primitives";
import { modeLabel, type AiMode } from "@/lib/mock/ai";
import { Mic, ArrowUpRight } from "lucide-react";

const script: { mode: AiMode; text: string }[] = [
  { mode: "researching", text: "Checking your last 14 days of ad performance across active campaigns…" },
  {
    mode: "analyzing",
    text: "CPA on 'Lagos Launch' is down 34% vs. target — it's outperforming. Budget has room to scale.",
  },
  {
    mode: "drafting",
    text: "I've drafted a budget increase from ₦15,000/day to ₦25,000/day.",
  },
  {
    mode: "executing",
    text: "This changes real spend, so it needs your approval — sent to your queue now.",
  },
];

function useTypewriter(text: string, active: boolean, speed = 14) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

function AiPreviewPanel() {
  const [step, setStep] = useState(0);
  const current = script[step];
  const typed = useTypewriter(current.text, true);

  useEffect(() => {
    if (typed.length < current.text.length) return;
    const t = setTimeout(() => {
      setStep((s) => (s + 1) % script.length);
    }, 1400);
    return () => clearTimeout(t);
  }, [typed, current.text.length]);

  return (
    <div className="bg-ink rounded-card shadow-raised overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-white/90 text-sm font-medium">Auvra — live</span>
        </div>
        <span className="text-white/50 text-xs">{modeLabel[current.mode]}…</span>
      </div>
      <div className="p-6 min-h-[168px]">
        <p className="text-white text-[16px] leading-relaxed font-normal">
          {typed}
          <span className="inline-block w-[2px] h-[16px] bg-cyan align-middle ml-0.5 animate-pulse" />
        </p>
      </div>
      <div className="flex items-center gap-3 px-5 py-3.5 border-t border-white/10 bg-white/[0.03]">
        <Mic size={16} className="text-white/50" />
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-cyan"
            animate={{ width: ["20%", "70%", "40%", "85%", "30%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-white/40 text-xs">Listening (demo)</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge tone="indigo" className="mb-6">Now in test mode — demo build</Badge>
          <h1 className="font-display text-[40px] md:text-[54px] font-semibold leading-[1.08] tracking-tight text-ink">
            An AI co-founder for the business you're already running.
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-muted max-w-xl">
            Auvra isn't a chatbot bolted onto a CRM. One conversational AI, backed by a
            structured memory of your business, runs sales, marketing, service and
            meetings — and asks before it does anything that matters.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <LinkButton href="/app/co-founder" size="md">
              Try the demo <ArrowUpRight size={16} />
            </LinkButton>
            <LinkButton href="#how-it-works" variant="secondary" size="md">
              See how it works
            </LinkButton>
          </div>
          <p className="mt-6 text-sm text-muted">
            No card, no setup — this is a guided walkthrough with sample data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <AiPreviewPanel />
        </motion.div>
      </div>
    </section>
  );
}
