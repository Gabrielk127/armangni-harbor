import Image from "next/image";
import { IMAGES } from "@/lib/site";

const LINHAS = [
  <>Harbor é porto.</>,
  <>É chegada,</>,
  <>
    é <strong>pausa</strong>,
  </>,
  <>
    é <strong>ponto de encontro.</strong>
  </>,
];

const ONDE = [
  <>
    Onde a rotina encontra <strong>calma</strong>.
  </>,
  <>
    Onde <strong>vizinhos</strong> viram encontros.
  </>,
  <>
    Onde os <strong>negócios</strong> ganham fluxo.
  </>,
  <>
    Onde <strong>cada dia</strong> rende mais.
  </>,
];

const PILARES = [
  {
    titulo: ["People", "first"],
    texto:
      "Projetado a partir de quem vai usar: circulação, convivência e serviços pensados na escala das pessoas, antes da escala do concreto.",
    img: IMAGES.peopleFirst,
    pos: "object-[center_22%]",
    alt: "Casal conversando em um café do boulevard",
  },
  {
    titulo: ["Urban", "hub"],
    texto:
      "Morar, trabalhar, comer bem e se cuidar sem tirar o carro da garagem. É a cidade inteira, condensada em um só endereço.",
    img: IMAGES.urbanHub,
    pos: "object-[60%_center]",
    alt: "Torre do Harbor 360° sobre o mall, ao entardecer",
  },
];

export default function Concept() {
  return (
    <section id="conceito" className="section bg-taupe-100 text-ink-2">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <p className="kicker !text-taupe-800">O conceito · A ancoragem</p>
            <h2 className="display mt-6 text-[clamp(2rem,6vw,3.6rem)] leading-[1.08] text-ink-2">
              {LINHAS.map((l, i) => (
                <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                  <span>{l}</span>
                </span>
              ))}
            </h2>
          </div>

          <div className="reveal lg:pt-14" style={{ ["--d" as string]: "200ms" }}>
            <p className="font-display text-[0.8rem] font-normal uppercase leading-relaxed tracking-[0.16em]">
              <strong className="font-semibold">Todo movimento</strong> precisa de um lugar para{" "}
              <strong className="font-semibold">voltar.</strong>
            </p>
            <div className="rule-tick my-7 text-ink-2" />
            <ul className="divide-y divide-ink-2/12 border-y border-ink-2/12">
              {ONDE.map((t, i) => (
                <li
                  key={i}
                  className="reveal py-4 text-[1.02rem] text-taupe-800 [&_strong]:font-medium [&_strong]:text-ink-2"
                  style={{ ["--d" as string]: `${300 + i * 90}ms` }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:mt-28 lg:gap-8">
          {PILARES.map((p, i) => (
            <article key={p.titulo.join()} className="reveal group" style={{ ["--d" as string]: `${i * 140}ms` }}>
              <div className="reveal-img relative aspect-[4/3] overflow-hidden bg-taupe-200">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`img-zoom object-cover transition-transform duration-[1.6s] group-hover:scale-[1.04] ${p.pos}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-2/70 via-transparent" />
                <h3 className="display absolute bottom-6 left-6 text-[clamp(1.5rem,3.4vw,2.3rem)] leading-none text-white">
                  {p.titulo[0]}
                  <br />
                  <strong>{p.titulo[1]}</strong>
                </h3>
              </div>
              <p className="mt-6 max-w-md text-[1.02rem] text-taupe-800">{p.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
