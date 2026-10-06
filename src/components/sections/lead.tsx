import Image from "next/image";
import { IMAGES, whatsappLink } from "@/lib/site";
import LeadForm from "../lead-form";

const BENEFICIOS = [
  "Informações oficiais do empreendimento em primeira mão",
  "Condições especiais para quem se antecipa ao lançamento",
  "Plantas e condições de lançamento antes do mercado",
];

export default function Lead() {
  return (
    <section id="contato" data-lead-form className="relative isolate overflow-hidden bg-ink-1">
      <div className="absolute inset-0 -z-10">
        <Image src={IMAGES.leadBg} alt="" fill sizes="100vw" className="object-cover object-[60%_center] opacity-25" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-1 via-ink-1/85 to-ink-1" />

      <div className="wrap section grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="reveal lg:pt-6">
          <p className="kicker">Seu novo ponto de partida</p>
          <h2 className="display mt-6 text-[clamp(1.5rem,4vw,2.4rem)] leading-[1.18] text-white">
            Entre na lista prioritária
            <br />
            do <strong className="text-taupe">Harbor 360°.</strong>
          </h2>
          <p className="mt-6 max-w-md font-display text-[0.95rem] font-extralight leading-relaxed tracking-[-0.01em] text-pearl/85">
            Quem chega primeiro escolhe melhor. Cadastre-se e receba antes de todo mundo:
          </p>
          <ul className="mt-8 border-t border-white/12">
            {BENEFICIOS.map((b, i) => (
              <li key={b} className="reveal flex gap-4 border-b border-white/12 py-4 text-pearl/85" style={{ ["--d" as string]: `${200 + i * 110}ms` }}>
                <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 flex-none text-taupe" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
                  <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-pearl/70">
            Prefere conversar agora?{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-normal text-white underline decoration-taupe underline-offset-4 hover:text-taupe">
              Chamar no WhatsApp →
            </a>
          </p>
        </div>

        <div className="reveal relative border border-white/12 bg-ink-2/80 p-6 backdrop-blur-xl sm:p-10" style={{ ["--d" as string]: "150ms" }}>
          <span className="absolute -top-px left-0 h-px w-24 bg-taupe" />
          <p className="display mb-8 text-[1rem] tracking-[0.14em] text-white">Quero acesso prioritário.</p>
          <LeadForm listen />
        </div>
      </div>
    </section>
  );
}
