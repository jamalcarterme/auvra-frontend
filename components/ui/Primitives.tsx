import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "low" | "medium" | "high" | "indigo";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-ink/[0.06] text-ink/70",
    low: "bg-risk-low/10 text-risk-low",
    medium: "bg-risk-medium/10 text-risk-medium",
    high: "bg-risk-high/10 text-risk-high",
    indigo: "bg-indigo-light text-indigo-dark",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-surface border border-line rounded-card shadow-panel",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="text-sm font-medium text-indigo mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
