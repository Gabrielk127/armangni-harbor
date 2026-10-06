import { cn } from "@/lib/utils";

interface MarkProps {
  className?: string;
  strokeWidth?: number;
  /** desenha o traço ao montar (stroke-dashoffset) */
  draw?: boolean;
}

/**
 * Marca da Armangni: três prédios em contorno com o "A" de picos duplos.
 * Usa currentColor; com `draw`, cada traço se desenha em sequência.
 */
export function ArmangniMark({ className, strokeWidth = 22, draw = false }: MarkProps) {
  const paths = [
    "M94 662 V105 L362 20 V108",
    "M267 662 V108 H622 V662",
    "M541 108 V16 H777 V662",
    "M297 528 L440 224 L582 528",
    "M335 528 L440 300 L544 528",
  ];
  return (
    <svg
      viewBox="0 0 875 668"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          style={
            draw
              ? {
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: `draw 1.6s cubic-bezier(.65,0,.35,1) ${0.25 + i * 0.22}s forwards`,
                }
              : undefined
          }
        />
      ))}
      <path d="M0 662 H875" pathLength={1} style={draw ? { strokeDasharray: 1, strokeDashoffset: 1, animation: "draw 1.4s cubic-bezier(.65,0,.35,1) .1s forwards" } : undefined} />
    </svg>
  );
}

/** Nome do empreendimento em caixa alta espaçada, como no KV. */
export function HarborWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-start font-display font-extralight uppercase leading-none", className)}>
      <span className="tracking-[0.32em]">Harbor</span>
      <span className="-ml-[0.24em] mt-[0.1em] text-[0.32em] font-normal tracking-[0.08em]">360°</span>
    </span>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.6l6.02-1.58a11.33 11.33 0 0 0 5.44 1.39h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.32-8.03z" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className={cn("h-4 w-4 flex-none", className)} aria-hidden="true">
      <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
