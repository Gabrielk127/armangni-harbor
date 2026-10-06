"use client";

import { useEffect } from "react";

export const INTEREST_EVENT = "harbor:interesse";

/**
 * Efeitos globais da página, em JS puro para não hidratar cada seção:
 * - revelação ao rolar (.reveal / .rule-tick ganham .in)
 * - parallax sutil em [data-parallax] (desktop)
 * - botões magnéticos (.btn, desktop)
 * - cliques em [data-interesse] avisam o formulário de onde veio o lead
 */
export default function PageEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 861px) and (hover: hover)");
    const cleanups: Array<() => void> = [];

    /* ---------- revelação ---------- */
    const alvos = document.querySelectorAll<HTMLElement>(".reveal, .rule-tick");
    if (reduce || !("IntersectionObserver" in window)) {
      alvos.forEach((el) => el.classList.add("in"));
    } else {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              obs.unobserve(en.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
      );
      alvos.forEach((el) => obs.observe(el));
      cleanups.push(() => obs.disconnect());
    }

    /* ---------- parallax ---------- */
    if (!reduce) {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      let ticking = false;
      const aplicar = () => {
        ticking = false;
        if (!desktop.matches) {
          els.forEach((el) => (el.style.transform = ""));
          return;
        }
        const vh = window.innerHeight;
        els.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -80 || r.top > vh + 80) return;
          const fator = parseFloat(el.dataset.parallax || "0.1");
          const centro = r.top + r.height / 2 - vh / 2;
          const y = Math.max(-70, Math.min(70, -centro * fator));
          el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
        });
      };
      const aoRolar = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(aplicar);
        }
      };
      window.addEventListener("scroll", aoRolar, { passive: true });
      window.addEventListener("resize", aoRolar);
      aplicar();
      cleanups.push(() => {
        window.removeEventListener("scroll", aoRolar);
        window.removeEventListener("resize", aoRolar);
      });
    }

    /* ---------- botões magnéticos ---------- */
    if (!reduce && desktop.matches) {
      const move = (e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement;
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = `translate(${(dx * 5).toFixed(1)}px,${(dy * 4 - 2).toFixed(1)}px)`;
      };
      const leave = (e: MouseEvent) => {
        (e.currentTarget as HTMLElement).style.transform = "";
      };
      const btns = document.querySelectorAll<HTMLElement>(".btn");
      btns.forEach((b) => {
        b.addEventListener("mousemove", move);
        b.addEventListener("mouseleave", leave);
      });
      cleanups.push(() =>
        btns.forEach((b) => {
          b.removeEventListener("mousemove", move);
          b.removeEventListener("mouseleave", leave);
        }),
      );
    }

    /* ---------- interesse (de qual botão veio o lead) ---------- */
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-interesse]");
      if (!el) return;
      window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: el.dataset.interesse }));
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
