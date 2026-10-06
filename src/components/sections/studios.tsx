import Image from "next/image";
import { AirVent, Fence, Flame, Gauge, KeyRound, LayoutGrid } from "lucide-react";
import { IMAGES, STUDIO_FEATURES, whatsappLink } from "@/lib/site";
import { ArrowRight, WhatsAppIcon } from "../icons";

const ICONES = [Fence, KeyRound, LayoutGrid, Gauge, AirVent, Flame];

export default function Studios() {
  return (
    <section id="studios" className="bg-ink-1">
      <div className="wrap section grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div className="reveal relative order-2 lg:order-1">
          <div className="reveal-up relative aspect-[4/5] overflow-hidden">
            <div className="absolute inset-[-10%_0]" data-parallax="0.08">
              <Image src={IMAGES.studiosFacade} alt="Fachada dos Harbor Studios com sacadas e elevador panorâmico" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-[38%_center]" />
            </div>
          </div>
          {/* interior sobreposto à fachada */}
          <div className="reveal-img absolute -bottom-10 right-4 w-[58%] border-[6px] border-ink-1 sm:right-8 lg:-right-12" style={{ ["--d" as string]: "450ms" }}>
            <div className="relative aspect-[16/10]">
              <Image src={IMAGES.studioInterior} alt="Interior de um studio com sacada, sala e dormitório integrados" fill sizes="(min-width:1024px) 26vw, 58vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute -right-2 top-8 hidden flex-col items-end gap-2 sm:flex lg:-right-10">
            <span className="bg-ink-2/90 px-4 py-3 font-display text-[0.55rem] uppercase tracking-[0.24em] text-pearl backdrop-blur">
              Studios com sacada
            </span>
            <span className="bg-taupe px-4 py-3 font-display text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-ink-2">
              Prontos para short stay
            </span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="reveal">
            <p className="kicker">Studios</p>
            <p className="mt-3 font-display text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-taupe">Harbor Studios</p>
            <h2 className="display mt-6 text-[clamp(2rem,5.6vw,3.6rem)] leading-[1.05] text-white">
              {["Morar no alto", <strong key="b">de tudo isso.</strong>].map((l, i) => (
                <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                  <span>{l}</span>
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-md text-lg font-light text-pearl/80">O ponto em que a vida urbana desacelera.</p>
            <div className="rule-tick my-8 text-taupe" />
            <p className="font-display text-[0.72rem] uppercase leading-relaxed tracking-[0.16em] text-white">
              Mais do que onde investir. <strong className="font-semibold text-taupe">Onde ficar.</strong>
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {STUDIO_FEATURES.map((f, i) => {
              const Icon = ICONES[i];
              return (
                <li
                  key={f}
                  className="reveal group flex items-center gap-4 bg-ink-1 px-5 py-5 transition-colors duration-500 hover:bg-ink-3"
                  style={{ ["--d" as string]: `${i * 80}ms` }}
                >
                  <Icon className="h-5 w-5 flex-none text-taupe transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.2} />
                  <span className="text-[0.95rem] text-pearl/90">{f}</span>
                </li>
              );
            })}
          </ul>

          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#contato" data-interesse="studios" className="btn btn-primary">
              Antecipe-se ao lançamento <ArrowRight />
            </a>
            <a href={whatsappLink("Olá! Quero saber mais sobre os studios do Harbor 360°.")} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <WhatsAppIcon className="h-4 w-4 text-wa" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* o luxo mora nos detalhes */}
      <div className="border-y border-white/10 bg-ink-2">
        <div className="wrap grid items-center gap-10 py-20 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-0">
          <div className="reveal order-2 md:order-1 md:py-24">
            <p className="kicker">Studios · Acabamento</p>
            <p className="display mt-6 text-[clamp(1.5rem,4.2vw,2.8rem)] leading-[1.15] text-white">
              O luxo mora
              <br />
              <strong className="text-taupe">nos detalhes.</strong>
            </p>
            <div className="mt-8 flex flex-col gap-3 font-display text-[0.6rem] uppercase tracking-[0.3em] text-pearl/85 sm:flex-row sm:items-center sm:gap-5">
              <span>Acabamento</span>
              <span className="hidden h-px w-10 bg-taupe sm:block" />
              <span>Tecnologia</span>
              <span className="hidden h-px w-10 bg-taupe sm:block" />
              <span>Conforto</span>
            </div>
          </div>
          <div className="reveal order-1 md:order-2" style={{ ["--d" as string]: "150ms" }}>
            <div className="reveal-img relative aspect-square overflow-hidden md:-mt-10">
              <Image src={IMAGES.detalhes} alt="Toalhas com a marca HARBOR e vista da cidade ao fundo" fill sizes="(min-width:768px) 50vw, 100vw" className="img-zoom object-cover" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
