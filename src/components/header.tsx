"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND, NAV, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight, WhatsAppIcon } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // item ativo: a seção que ocupa o meio da tela
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,padding,border-color] duration-500",
        scrolled || open
          ? "border-white/10 bg-ink-2/85 py-3 backdrop-blur-xl"
          : "border-transparent py-4 md:py-6",
      )}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <a href="#inicio" aria-label="Armangni Negócios Imobiliários — início" className="relative z-10 block">
          <Image
            src="/brand/logo-branco.png"
            alt="Armangni Negócios Imobiliários"
            width={1400}
            height={290}
            priority
            className={cn(
              "h-auto transition-[width] duration-500",
              scrolled ? "w-[132px] md:w-[150px]" : "w-[140px] md:w-[178px]",
            )}
          />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative py-2 font-display text-[0.6rem] font-normal uppercase tracking-[0.24em] transition-colors",
                  isActive ? "text-white" : "text-pearl/70 hover:text-white",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-taupe transition-transform duration-500",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            );
          })}
          <a href="#contato" data-interesse="header" className="btn btn-primary !px-5 !py-3 !text-[0.56rem]">
            Lista prioritária
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="relative z-10 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
        >
          <span className={cn("h-px w-6 bg-white transition-transform duration-300", open && "translate-y-1 rotate-45")} />
          <span className={cn("h-px w-6 bg-white transition-transform duration-300", open && "-translate-y-1 -rotate-45")} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 top-0 flex h-[100dvh] flex-col bg-ink-1 px-4 pb-8 pt-28 sm:px-8 lg:hidden"
          >
            <nav aria-label="Menu" className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.2, 0.65, 0.25, 1] }}
                  className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-lg font-light uppercase tracking-[0.14em] text-pearl"
                >
                  <span className="font-display text-[0.6rem] tracking-[0.2em] text-taupe">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-auto flex flex-col gap-3"
            >
              <a href="#contato" data-interesse="menu" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Entrar na lista prioritária <ArrowRight />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full">
                <WhatsAppIcon className="h-4 w-4 text-wa" /> {BRAND.phoneFormatted}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
