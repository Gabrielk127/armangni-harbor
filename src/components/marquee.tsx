import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Faixa que corre sem parar; a lista é duplicada para o laço não ter emenda. */
export default function Marquee({ items, className }: MarqueeProps) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div
      className={cn(
        "overflow-hidden border-y border-white/10 bg-ink-1/60 py-5 backdrop-blur-md",
        className,
      )}
      aria-hidden="true"
    >
      <div className="marquee-track font-display text-[0.64rem] font-light uppercase tracking-[0.5em] text-mist">
        {loop.map((t, i) => (
          <span key={i} className="contents">
            <span className="flex-none">{t}</span>
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
