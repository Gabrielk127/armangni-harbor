"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AMENITIES } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Amenities() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (card) setIndex(Math.min(AMENITIES.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + 16))));
  }

  function passo(dir: 1 | -1) {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16) * (window.innerWidth >= 1024 ? 2 : 1), behavior: "smooth" });
  }

  // arrastar com o mouse (no toque a rolagem nativa já resolve)
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
  }
  function onPointerMove(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!drag.current || !el) return;
    const dx = e.clientX - drag.current.x;
    if (!drag.current.moved && Math.abs(dx) > 4) {
      drag.current.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    if (drag.current.moved) el.scrollLeft = drag.current.left - dx;
  }
  function onPointerUp() {
    drag.current = null;
    setDragging(false);
  }

  return (
    <section id="experiencias" className="section overflow-hidden bg-ink-2">
      <div className="wrap flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="reveal">
          <p className="kicker">
            O <span className="text-pearl">Harbor 360°</span> por dentro
          </p>
          <h2 className="display mt-6 text-[clamp(1.6rem,4.4vw,3rem)] leading-[1.12] text-white">
            {["Espaços que fazem", <strong key="b">as pessoas ficarem.</strong>].map((l, i) => (
              <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="reveal flex items-center gap-5" style={{ ["--d" as string]: "200ms" }}>
          <span className="font-display text-[0.6rem] tracking-[0.2em] text-mist">
            <span className="text-white">{String(index + 1).padStart(2, "0")}</span> / {AMENITIES.length}
          </span>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => passo(d)}
                aria-label={d < 0 ? "Anterior" : "Próximo"}
                className="flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors hover:border-taupe hover:bg-taupe hover:text-ink-2"
              >
                <svg viewBox="0 0 24 24" className={cn("h-4 w-4", d < 0 && "rotate-180")} fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
                  <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => dragging && e.preventDefault()}
        className={cn(
          "bleed-x no-scrollbar mt-12 flex gap-4 overflow-x-auto pb-2 md:mt-16",
          dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory md:cursor-grab",
        )}
      >
        {AMENITIES.map((a, i) => (
          <figure
            key={a.name}
            data-card
            className="reveal group relative w-[78%] flex-none snap-start sm:w-[46%] lg:w-[calc((100%-48px)/3.4)]"
            style={{ ["--d" as string]: `${Math.min(i, 4) * 90}ms` }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-ink-3">
              <Image
                src={a.img}
                alt={`${a.name} do Harbor 360°`}
                fill
                draggable={false}
                sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 78vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.2,.65,.25,1)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-1/90 via-ink-1/10 to-transparent" />
              <span className="absolute left-5 top-5 font-display text-[0.55rem] tracking-[0.2em] text-white/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <figcaption className="absolute inset-x-5 bottom-5">
                <span className="font-display text-[0.5rem] uppercase tracking-[0.26em] text-taupe">{a.tag}</span>
                <p className="display mt-2 text-[1rem] tracking-[0.1em] text-white">{a.name}</p>
                <span className="mt-4 block h-px w-8 bg-taupe transition-all duration-500 group-hover:w-16" />
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      <div className="wrap mt-8 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-white/12">
          <span
            className="absolute inset-y-0 left-0 bg-taupe transition-[width] duration-200"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <span className="font-display text-[0.52rem] uppercase tracking-[0.3em] text-mist">Deslize para ver mais</span>
      </div>
      <p className="wrap mt-6 text-[0.75rem] text-mist/80">Imagens meramente ilustrativas. Projeto sujeito a alteração.</p>
    </section>
  );
}
