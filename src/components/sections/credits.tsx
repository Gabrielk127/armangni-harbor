"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CREDITS } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Credits() {
  const listRef = useRef<HTMLOListElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  // o retrato segue o cursor (desktop)
  function onMouseMove(e: React.MouseEvent) {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <section id="quem-assina" className="section bg-ink-3">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="reveal">
            <p className="kicker">Quem assina</p>
            <h2 className="mt-6 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-extralight leading-[1.15] tracking-[-0.02em] text-white">
              Um time à altura
              <br />
              <strong className="font-normal">do projeto.</strong>
            </h2>
          </div>
          <p className="reveal max-w-xs text-[0.9rem] text-mist" style={{ ["--d" as string]: "150ms" }}>
            Arquitetura, engenharia, luz, arte e paisagem assinadas por quem entende de cada detalhe.
          </p>
        </div>

        <ol
          ref={listRef}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setHover(null)}
          className="relative mt-14 border-t border-white/12"
        >
          {/* retrato flutuante */}
          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
          >
            <div
              className={cn(
                "relative ml-8 aspect-[3/4] w-[210px] -translate-y-1/2 overflow-hidden border border-white/15 shadow-[0_30px_60px_rgba(0,0,0,.5)] transition-[opacity,scale] duration-300",
                hover === null ? "scale-90 opacity-0" : "scale-100 opacity-100",
              )}
            >
              {CREDITS.map((c, i) => (
                <Image
                  key={c.name}
                  src={c.photo}
                  alt=""
                  fill
                  sizes="210px"
                  className={cn("object-cover transition-opacity duration-300", hover === i ? "opacity-100" : "opacity-0")}
                />
              ))}
            </div>
          </motion.div>

          {CREDITS.map((c, i) => (
            <li
              key={c.name}
              onMouseEnter={() => setHover(i)}
              className="reveal group relative overflow-hidden border-b border-white/12"
              style={{ ["--d" as string]: `${i * 70}ms` }}
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-taupe transition-transform duration-700 ease-[cubic-bezier(.6,.05,.2,1)] group-hover:scale-x-100" />
              <div className="relative grid grid-cols-[3.5rem_1fr] items-center gap-x-4 py-4 md:grid-cols-[3.5rem_1fr_1.4fr_auto] md:items-baseline md:py-7">
                {/* miniatura no celular */}
                <span className="relative row-span-2 block aspect-[3/4] w-14 overflow-hidden bg-ink-4 md:hidden">
                  <Image src={c.photo} alt={c.name} fill sizes="56px" className="object-cover" />
                </span>
                <span className="hidden font-display text-[0.6rem] tracking-[0.2em] text-taupe transition-colors duration-500 group-hover:text-ink-2 md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="self-end font-display text-[0.55rem] uppercase tracking-[0.26em] text-mist transition-colors duration-500 group-hover:text-ink-2/70 md:self-auto">
                  {c.role}
                </span>
                <span className="self-start font-display text-[clamp(1.05rem,2.6vw,1.7rem)] font-extralight tracking-[0.02em] text-white transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-ink-2 md:self-auto">
                  {c.name}
                </span>
                <span className="hidden text-ink-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.2}>
                    <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
