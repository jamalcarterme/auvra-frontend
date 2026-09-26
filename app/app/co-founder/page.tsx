"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Paperclip, ArrowUp, Sparkles, ShieldCheck } from "lucide-react";
import { pickResponse, suggestedPrompts, modeLabel, type AiMode } from "@/lib/mock/ai";
import { Badge } from "@/components/ui/Primitives";
import { cn } from "@/lib/cn";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  text: string;
  mode?: AiMode;
  citedMemory?: string[];
  proposedAction?: { title: string; risk: "low" | "medium" | "high" };
  streaming?: boolean;
};

function useStream(fullText: string, run: boolean, onDone: () => void, speed = 12) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!run) return;
    setText("");
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(id);
        onDone();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);
  return text;
}

function AiBubble({ msg, onFinished }: { msg: ChatMessage; onFinished: (id: string) => void }) {
  const text = useStream(msg.text, !!msg.streaming, () => onFinished(msg.id));
  const shown = msg.streaming ? text : msg.text;

  return (
    <div className="flex gap-3 max-w-[720px]">
      <div className="h-8 w-8 rounded-full bg-ink text-white flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles size={15} className="text-cyan" />
      </div>
      <div className="min-w-0">
        {msg.mode && (
          <p className="text-xs text-indigo font-medium mb-1.5">{modeLabel[msg.mode]}…</p>
        )}
        <div className="bg-surface border border-line rounded-card px-4 py-3">
          <p className="text-[15px] leading-relaxed text-ink whitespace-pre-wrap">
            {shown}
            {msg.streaming && shown.length < msg.text.length && (
              <span className="inline-block w-[2px] h-[14px] bg-indigo align-middle ml-0.5 animate-pulse" />
            )}
          </p>
        </div>
        {!msg.streaming && msg.citedMemory && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {msg.citedMemory.map((c) => (
              <Badge key={c} tone="neutral">📎 {c}</Badge>
            ))}
          </div>
        )}
        {!msg.streaming && msg.proposedAction && (
          <div className="mt-3 border border-line rounded-card p-4 bg-indigo-light/40 flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-[13px] font-medium text-indigo-dark mb-1">
                <ShieldCheck size={14} /> Sent to Approval Queue
              </p>
              <p className="text-[14px] text-ink">{msg.proposedAction.title}</p>
            </div>
            <Badge tone={msg.proposedAction.risk}>{msg.proposedAction.risk} risk</Badge>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoFounderPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      mode: "answering",
      text: "Good afternoon. Revenue's up 14% this month and there's a proposal that's gone quiet for 3 days. What would you like to look at?",
      citedMemory: ["Business Memory"],
    },
  ]);
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text };
    const response = pickResponse(text);
    const aiId = crypto.randomUUID();
    setMessages((m) => [
      ...m,
      userMsg,
      { id: aiId, role: "ai", text: response.text, mode: response.mode, citedMemory: response.citedMemory, proposedAction: response.proposedAction, streaming: true },
    ]);
    setInput("");
  }

  function markDone(id: string) {
    setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, streaming: false } : msg)));
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-auto thin-scroll px-6 py-8">
        <div className="max-w-[760px] mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) =>
              msg.role === "user" ? (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="bg-ink text-white rounded-card px-4 py-3 max-w-[520px]">
                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <AiBubble msg={msg} onFinished={markDone} />
                </motion.div>
              )
            )}
          </AnimatePresence>
          <div ref={endRef} />
        </div>
      </div>

      {messages.length <= 1 && (
        <div className="max-w-[760px] mx-auto w-full px-6 pb-3 flex flex-wrap gap-2">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="text-[13px] px-3.5 py-2 rounded-full border border-line bg-surface hover:border-ink/30 transition-colors text-ink/80"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div className="border-t border-line bg-surface px-6 py-4">
        <div className="max-w-[760px] mx-auto">
          <div className="flex items-end gap-2 border border-line rounded-card px-3 py-2.5 focus-within:border-indigo transition-colors">
            <button className="p-1.5 text-ink/50 hover:text-ink" aria-label="Attach file">
              <Paperclip size={18} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask, research, draft, or tell it what to do…"
              rows={1}
              className="flex-1 resize-none bg-transparent outline-none text-[15px] text-ink placeholder:text-muted py-1 max-h-32"
            />
            <button
              onClick={() => setRecording((r) => !r)}
              className={cn("p-1.5 rounded-md", recording ? "text-white bg-indigo" : "text-ink/50 hover:text-ink")}
              aria-label="Voice input"
            >
              <Mic size={18} />
            </button>
            <button
              onClick={() => send(input)}
              className="p-2 rounded-md bg-indigo text-white hover:bg-indigo-dark disabled:opacity-40"
              disabled={!input.trim()}
              aria-label="Send"
            >
              <ArrowUp size={16} />
            </button>
          </div>
          <p className="text-xs text-muted mt-2 text-center">
            Demo mode — responses are simulated, no real actions are executed.
          </p>
        </div>
      </div>
    </div>
  );
}
