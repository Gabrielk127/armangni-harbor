"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

/**
 * Celular: barra fixa com WhatsApp + lista prioritária (some na seção do formulário).
 * Desktop: botão flutuante de WhatsApp.
 */
export default function FloatingCta() {
  const [show, setShow] = useState(false);
  const [noForm, setNoForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const visiveis = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => (en.isIntersecting ? visiveis.add(en.target) : visiveis.delete(en.target)));
        setNoForm(visiveis.size > 0);
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll("[data-lead-form]").forEach((el) => obs.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const visivel = show && !noForm;

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-ink-1/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-500 md:hidden",
          visivel ? "translate-y-0" : "translate-y-full",
        )}
      >
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 py-4 font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white"
        >
          <WhatsAppIcon className="h-4 w-4 text-wa" /> WhatsApp
        </a>
        <a
          href="#contato"
          data-interesse="barra_mobile"
          className="flex items-center justify-center bg-taupe py-4 font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-2"
        >
          Lista prioritária
        </a>
      </div>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className={cn(
          "group fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-3 rounded-full bg-wa pl-4 pr-4 text-white shadow-[0_12px_40px_rgba(0,0,0,.45)] transition-all duration-500 hover:bg-wa-dark md:flex",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
        )}
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] transition-all duration-500 group-hover:max-w-[180px]">
          Falar agora
        </span>
      </a>
    </>
  );
}
