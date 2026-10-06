import Image from "next/image";
import { IMAGES } from "@/lib/site";
import { ArrowRight } from "../icons";

const CAMADAS = [
  { n: "03", nome: "Rooftop", uso: "Lazer, bem-estar e a vista da cidade", altura: "h-[86px] md:h-[96px]" },
  { n: "02", nome: "Studios", uso: "Morar, hospedar e investir", altura: "h-[150px] md:h-[176px]" },
  { n: "01", nome: "Harbor Mall", uso: "Gastronomia, serviços e encontros", altura: "h-[104px] md:h-[118px]" },
];

const TAGS = ["Gastronomia", "Saúde", "Bem-estar", "Serviços", "Lifestyle"];

export default function Complex() {
  return (
    <section id="complexo" className="bg-ink-1">
      {/* faixa de impacto em tela cheia */}
      <div className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
        <div className="absolute inset-[-8%_0] -z-10" data-parallax="0.12">
          <Image src={IMAGES.mall} alt="Harbor Mall durante o dia, com lojas e a torre ao fundo" fill sizes="100vw" className="object-cover object-[center_40%]" />
        </div>
        <div className="grain absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-ink-1/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-1 via-ink-1/55 to-ink-1/40" />

        <div className="wrap reveal pb-16 pt-32 md:pb-24">
          <p className="kicker !text-pearl">O complexo · Harbor Mall</p>
          <h2 className="display mt-6 text-[clamp(2.4rem,9vw,6rem)] leading-[0.98] text-white">
            {["O térreo", "que move", <strong key="b">o bairro.</strong>].map((l, i) => (
              <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {["Eventos", "Gastronomia", "Encontros"].map((c, i) => (
              <span key={c} className="chip reveal text-pearl" style={{ ["--d" as string]: `${500 + i * 120}ms` }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* conexão */}
      <div className="wrap section grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="reveal relative">
          <div className="reveal-img relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
            <Image src={IMAGES.conexao} alt="Pátio do Harbor Mall com mesas e pessoas" fill sizes="(min-width:1024px) 55vw, 100vw" className="img-zoom object-cover" />
          </div>
          <span className="absolute -bottom-5 right-5 bg-taupe px-4 py-3 font-display text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-ink-2 md:-right-5">
            Térreo aberto à cidade
          </span>
        </div>

        <div className="reveal" style={{ ["--d" as string]: "160ms" }}>
          <p className="kicker">Conexão</p>
          <p className="mt-6 font-display text-[clamp(1.15rem,2.3vw,1.55rem)] font-extralight leading-[1.5] tracking-[-0.01em] text-white [&_strong]:font-normal [&_strong]:text-taupe">
            Quem mora em cima ganha <strong>conveniência</strong>. Quem empreende embaixo ganha <strong>fluxo</strong>.
            Um alimenta o outro, e o endereço inteiro se valoriza.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {TAGS.map((t) => (
              <li key={t} className="flex items-center gap-2.5 font-display text-[0.6rem] uppercase tracking-[0.22em] text-pearl/80">
                <span className="h-1 w-1 rounded-full bg-taupe" />
                {t}
              </li>
            ))}
          </ul>
          <a href="#experiencias" className="link-seta mt-10 text-white">
            Tudo conectado <ArrowRight />
          </a>
        </div>
      </div>

      {/* 360° de uso: as três camadas do prédio */}
      <div className="wrap pb-[clamp(80px,10vw,150px)]">
        <div className="grid gap-12 border-t border-white/10 pt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <p className="kicker">360° de uso</p>
            <h3 className="display mt-5 text-[clamp(1.4rem,3vw,2rem)] leading-[1.2] text-white">
              Três camadas,
              <br />
              <strong>um só endereço.</strong>
            </h3>
            <p className="mt-5 max-w-sm text-pearl/70">
              O que acontece no térreo fortalece quem mora em cima, e quem mora em cima dá vida ao térreo. No topo, o
              clube que coroa tudo.
            </p>
          </div>

          <div className="reveal flex flex-col gap-1.5" style={{ ["--d" as string]: "150ms" }}>
            {CAMADAS.map((c, i) => (
              <div
                key={c.nome}
                className={`reveal-up group relative flex items-end justify-between overflow-hidden border border-white/12 bg-ink-3/70 px-5 pb-4 transition-colors duration-500 hover:border-taupe/60 hover:bg-ink-4 ${c.altura}`}
                style={{ ["--d" as string]: `${(CAMADAS.length - i) * 220}ms` }}
              >
                <span className="absolute inset-y-0 left-0 w-px origin-bottom scale-y-0 bg-taupe transition-transform duration-500 group-hover:scale-y-100" />
                <div>
                  <span className="font-display text-[0.55rem] tracking-[0.2em] text-taupe">{c.n}</span>
                  <p className="display mt-1 text-[clamp(1rem,2.4vw,1.35rem)] text-white">{c.nome}</p>
                </div>
                <p className="max-w-[48%] text-right text-[0.85rem] text-pearl/65">{c.uso}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
