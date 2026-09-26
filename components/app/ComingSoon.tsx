import { Card } from "@/components/ui/Primitives";
import { Construction } from "lucide-react";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
      <p className="text-[14px] text-muted mt-1 mb-8">{description}</p>
      <Card className="p-10 flex flex-col items-center text-center">
        <div className="h-12 w-12 rounded-full bg-indigo-light text-indigo-dark flex items-center justify-center mb-4">
          <Construction size={20} />
        </div>
        <p className="text-[15px] font-medium text-ink">This module is next in the build queue</p>
        <p className="text-[14px] text-muted mt-1.5 max-w-sm">
          The AI Co-Founder and Business Memory pages are live in this demo — this screen ships in the next phase.
        </p>
      </Card>
    </div>
  );
}
