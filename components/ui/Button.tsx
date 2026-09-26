import { cn } from "@/lib/cn";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "sm";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "bg-indigo text-white hover:bg-indigo-dark",
  secondary: "bg-white text-ink border border-line hover:border-ink/30",
  ghost: "text-ink hover:bg-ink/5",
  dark: "bg-ink text-white hover:bg-ink/90",
};

const sizes: Record<Size, string> = {
  md: "text-[15px] px-5 py-2.5",
  sm: "text-sm px-3.5 py-1.5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
