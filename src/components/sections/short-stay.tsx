import Image from "next/image";
import { BedDouble, Building, Wallet } from "lucide-react";
import { IMAGES } from "@/lib/site";
import { ArrowRight } from "../icons";

const PILARES = ["Tecnologia", "Gestão", "Hospitalidade", "Experiência"];

const PUBLICOS = [
  {
    icon: Wallet,
    titulo: "Para quem investe",
    texto: "Uma operação estruturada para simplificar a gestão da sua unidade.",
  },
  {
    icon: BedDouble,
    titulo: "Para quem se hospeda",
    texto: "Mais praticidade, conforto e consistência em toda a estadia.",
  },
  {
    icon: Building,
    titulo: "Para o Harbor",
    texto: "Uma operação pensada para integrar o short stay ao padrão do empreendimento.",
  },
];

export default function ShortStay() {
  return (
    <section id="short-stay" className="section bg-ink-2">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div className="reveal">
            <p className="kicker">Short stay</p>
            <h2 className="display mt-6 text-[clamp(1.6rem,4.2vw,2.6rem)] leading-[1.15] text-white">
              Nasceu pronto
              <br />
              <strong>para o short stay.</strong>
            </h2>
            <p className="mt-6 max-w-md text-pearl/80">
              Studios, áreas comuns e operação foram pensados juntos para a locação de curta temporada: praticidade
              para o hóspede, previsibilidade para quem investe.
            </p>
            <p className="mt-5 max-w-md border-l border-taupe/60 pl-4 text-[0.95rem] italic text-pearl/60">
              Uma gestão profissional fará parte do ecossistema do empreendimento.
            </p>
            <a href="#contato" data-interesse="short_stay" className="link-seta mt-9 text-white">
              Quero saber mais <ArrowRight />
            </a>
          </div>

          <div className="reveal" style={{ ["--d" as string]: "150ms" }}>
            <div className="reveal-img relative aspect-[16/11] overflow-hidden">
              <Image src={IMAGES.shortStay} alt="Hall de estar com sofá, poltronas e jardim vertical" fill sizes="(min-width:1024px) 55vw, 100vw" className="img-zoom object-cover" />
            </div>
          </div>
        </div>

        {/* pilares ligados por uma linha que se desenha */}
        <div className="reveal relative mt-16 border-y border-white/10 py-7 md:mt-24">
          <span className="absolute left-0 top-1/2 hidden h-px w-full origin-left scale-x-0 bg-gradient-to-r from-taupe/0 via-taupe/50 to-taupe/0 transition-transform duration-[1.8s] ease-[cubic-bezier(.25,.7,.2,1)] md:block [.reveal.in_&]:scale-x-100" />
          <ul className="relative grid grid-cols-2 gap-y-4 md:flex md:justify-between">
            {PILARES.map((p, i) => (
              <li
                key={p}
                className="reveal flex items-center gap-3 font-display text-[0.62rem] uppercase tracking-[0.3em] text-pearl md:bg-ink-2 md:px-4"
                style={{ ["--d" as string]: `${300 + i * 160}ms` }}
              >
                <span className="text-taupe">{String(i + 1).padStart(2, "0")}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PUBLICOS.map(({ icon: Icon, titulo, texto }, i) => (
            <article
              key={titulo}
              className="reveal group relative overflow-hidden border border-white/10 bg-ink-3/60 p-7 transition-colors duration-500 hover:border-taupe/50"
              style={{ ["--d" as string]: `${i * 120}ms` }}
            >
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-taupe transition-transform duration-700 group-hover:scale-x-100" />
              <Icon className="h-6 w-6 text-taupe" strokeWidth={1.1} />
              <h3 className="mt-8 font-display text-[0.75rem] font-normal uppercase tracking-[0.18em] text-white">{titulo}</h3>
              <p className="mt-3 text-pearl/70">{texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
