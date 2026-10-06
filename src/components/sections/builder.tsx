import Image from "next/image";
import { BRAND, BUILDER_STATS, IMAGES, PROJECT } from "@/lib/site";
import CountUp from "../count-up";
import { ArmangniMark } from "../icons";

export default function Builder() {
  return (
    <section id="construtora" className="bg-ink-3">
      <div className="grid lg:grid-cols-2">
        <div className="relative flex min-h-[420px] items-end overflow-hidden bg-taupe-100 p-8 text-ink-2 sm:p-12 lg:min-h-[560px] lg:p-16">
          <div className="absolute inset-0 opacity-60 mix-blend-multiply" data-parallax="0.05">
            <Image src={IMAGES.construtora} alt="Desenho em traço da arquitetura do Harbor 360°" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-taupe-100 via-taupe-100/40 to-transparent" />
          <h2 className="reveal display relative text-[clamp(1.6rem,4vw,2.7rem)] leading-[1.12]">
            {["Visão só vale", "quando vira", <strong key="b">obra entregue.</strong>].map((l, i) => (
              <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="reveal">
            <p className="kicker">Realização</p>
            <Image src={IMAGES.logoAviv} alt={PROJECT.developer} width={500} height={164} className="mt-5 h-auto w-[170px] sm:w-[200px]" />
            <p className="mt-8 max-w-md text-pearl/75">
              Experiência, solidez e capacidade de execução que já se traduzem em números.
            </p>
          </div>
          <dl className="mt-10 grid grid-cols-3 border-t border-white/12 pt-8">
            {BUILDER_STATS.map((s, i) => (
              <div key={s.label} className="reveal flex flex-col-reverse border-l border-white/12 pl-4 first:border-l-0 first:pl-0" style={{ ["--d" as string]: `${i * 120}ms` }}>
                <dt className="mt-3 font-display text-[0.52rem] uppercase tracking-[0.24em] text-mist">{s.label}</dt>
                <dd className="font-display text-[clamp(1.3rem,5.2vw,2.8rem)] font-extralight leading-none text-white">
                  <CountUp value={s.value} prefix={s.prefix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* faixa Armangni */}
      <div className="border-t border-white/10 bg-ink-2">
        <div className="wrap reveal grid items-center gap-8 py-14 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-16">
          <ArmangniMark className="h-14 w-auto text-taupe" strokeWidth={20} />
          <div>
            <p className="kicker !text-taupe">Atendimento {BRAND.short}</p>
            <p className="mt-3 max-w-2xl text-[1.05rem] text-pearl/85">
              Do primeiro contato à entrega das chaves, a {BRAND.name} acompanha cada etapa da sua compra com
              transparência e leitura de mercado de quem conhece Londrina.
            </p>
          </div>
          <a href="#contato" data-interesse="armangni" className="btn btn-outline">
            Falar com um consultor
          </a>
        </div>
      </div>
    </section>
  );
}
