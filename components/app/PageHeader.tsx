"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/Primitives";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
        <p className="text-[14px] text-muted mt-1">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "up" | "down" }) {
  return (
    <Card className="p-4">
      <p className="text-[13px] text-muted">{label}</p>
      <p className="font-display text-2xl font-semibold text-ink mt-1.5">{value}</p>
      {sub && (
        <p className={`text-[12px] mt-1 ${tone === "up" ? "text-risk-low" : tone === "down" ? "text-risk-high" : "text-muted"}`}>
          {sub}
        </p>
      )}
    </Card>
  );
}

export function useToast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const fire = useCallback((m: string) => {
    setMsg(m);
    setShow(true);
    setTimeout(() => setShow(false), 2200);
  }, []);
  return { msg, show, fire };
}
