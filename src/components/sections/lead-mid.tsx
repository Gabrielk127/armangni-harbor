import { ArmangniMark } from "../icons";
import LeadForm from "../lead-form";

const PASSOS = [
  ["Cadastre-se", "Leva menos de um minuto e não tem compromisso."],
  ["Receba primeiro", "Informações oficiais, plantas e condições de lançamento antes do mercado."],
  ["Converse com a Armangni", "Um consultor tira suas dúvidas e acompanha você em cada etapa."],
];

/** Seção de conversão no meio da página (depois das experiências). */
export default function LeadMid() {
  return (
    <section id="pre-lancamento" data-lead-form className="section relative overflow-hidden bg-taupe-100 text-ink-2">
      <ArmangniMark className="pointer-events-none absolute -right-24 top-10 hidden h-[520px] w-auto text-ink-2/[0.05] lg:block" strokeWidth={10} />
      <div className="wrap relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
        <div className="reveal">
          <p className="kicker !text-taupe-800">Pré-lançamento · Armangni</p>
          <h2 className="display mt-6 text-[clamp(1.6rem,4.4vw,2.8rem)] leading-[1.14]">
            {["Condições especiais", <strong key="b">para quem chega primeiro.</strong>].map((l, i) => (
              <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] text-taupe-800">
            Deixe seu contato e receba as novidades oficiais do Harbor 360° com o atendimento da Armangni.
          </p>
          <ol className="mt-10 border-t border-ink-2/12">
            {PASSOS.map(([t, d], i) => (
              <li key={t} className="reveal flex gap-5 border-b border-ink-2/12 py-5" style={{ ["--d" as string]: `${200 + i * 110}ms` }}>
                <span className="font-display text-[0.62rem] tracking-[0.2em] text-taupe-700">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-display text-[0.7rem] font-normal uppercase tracking-[0.18em]">{t}</p>
                  <p className="mt-1.5 text-taupe-800">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="reveal relative bg-ink-2 p-6 text-pearl shadow-[0_40px_80px_-30px_rgba(28,28,28,.55)] sm:p-10" style={{ ["--d" as string]: "150ms" }}>
          <span className="absolute -top-px left-0 h-px w-24 bg-taupe" />
          <p className="display mb-8 text-[1rem] tracking-[0.14em] text-white">Quero receber primeiro.</p>
          <LeadForm variant="stacked" source="form_meio" submitLabel="Quero receber as condições" />
        </div>
      </div>
    </section>
  );
}
