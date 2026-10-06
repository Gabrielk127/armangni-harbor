import Image from "next/image";
import { IMAGES } from "@/lib/site";

const ROOFTOP = ["Piscina climatizada", "Solarium", "Spa", "Fitness", "Lounge", "Skybar"];

export default function Urban() {
  return (
    <section id="viver" className="overflow-hidden bg-ink-3">
      <div className="wrap section">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="reveal">
            <p className="kicker">Urban hub · Onde Londrina se encontra</p>
            <h2 className="display mt-6 text-[clamp(1.7rem,4.8vw,3.2rem)] leading-[1.1] text-white">
              {["A calçada volta a ser", <strong key="b">ponto de encontro.</strong>].map((l, i) => (
                <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                  <span>{l}</span>
                </span>
              ))}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {["Boulevard aberto", "Paisagismo", "Convivência"].map((c, i) => (
              <span key={c} className="chip reveal text-pearl" style={{ ["--d" as string]: `${300 + i * 110}ms` }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* colagem editorial */}
        <div className="relative mt-14 grid grid-cols-12 gap-4 md:mt-20">
          <div className="reveal col-span-12 md:col-span-8">
            <div className="reveal-img relative aspect-[16/11] overflow-hidden">
              <div className="absolute inset-[-10%_0]" data-parallax="0.06">
                <Image src={IMAGES.boulevard} alt="Letreiro HARBOR no boulevard, com mesas e paisagismo" fill sizes="(min-width:768px) 66vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
          <div className="reveal col-span-8 col-start-5 -mt-16 md:col-span-4 md:col-start-auto md:mt-40" style={{ ["--d" as string]: "200ms" }}>
            <div className="reveal-img relative aspect-[3/4] overflow-hidden border-4 border-ink-3 md:border-0" data-parallax="-0.1">
              <Image src={IMAGES.convivencia} alt="Boulevard do Harbor 360° à noite, com pessoas reunidas" fill sizes="(min-width:768px) 33vw, 66vw" className="img-zoom object-cover object-[62%_center]" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-16">
          {[
            ["Valor que permanece.", "Endereços que reúnem gente, serviço e paisagem não perdem relevância com o tempo. Eles ganham."],
            ["Feito para ficar.", "Um lugar para chegar sem pressa: tomar um café, encontrar alguém, voltar para casa a pé."],
          ].map(([t, d], i) => (
            <div key={t} className="reveal border-t border-white/15 pt-6" style={{ ["--d" as string]: `${i * 140}ms` }}>
              <h3 className="display text-[0.95rem] tracking-[0.14em] text-white">
                <strong>{t}</strong>
              </h3>
              <p className="mt-3 max-w-md text-pearl/70">{d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* rooftop */}
      <div className="relative isolate flex min-h-[92svh] items-end overflow-hidden md:items-center">
        <div className="absolute inset-[-8%_0] -z-10" data-parallax="0.1">
          <Image src={IMAGES.rooftop} alt="Rooftop do Harbor 360° ao entardecer, com piscina, lounge e vista da cidade" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-1 via-ink-1/50 to-ink-1/10 md:bg-gradient-to-l md:from-ink-1/95 md:via-ink-1/55 md:to-transparent" />

        <div className="wrap flex justify-end pb-16 pt-40 md:py-24">
          <div className="reveal max-w-md">
            <p className="kicker !text-taupe">Rooftop</p>
            <h2 className="display mt-6 text-[clamp(1.6rem,4.2vw,2.6rem)] leading-[1.15] text-white">
              Todo fim de tarde,
              <br />
              <strong>a cidade aos seus pés.</strong>
            </h2>
            <p className="mt-6 text-pearl/80">
              No último pavimento, piscina climatizada, solarium, spa, fitness, lounge e skybar formam um clube particular
              com vista aberta para Londrina.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t border-white/15 pt-6">
              {ROOFTOP.map((r, i) => (
                <li
                  key={r}
                  className="reveal flex items-center gap-3 border-b border-white/10 py-3 font-display text-[0.58rem] uppercase tracking-[0.2em] text-pearl/85"
                  style={{ ["--d" as string]: `${200 + i * 80}ms` }}
                >
                  <span className="font-display text-[0.5rem] text-taupe">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
