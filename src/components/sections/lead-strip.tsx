import LeadForm from "../lead-form";

/** Faixa curta com formulário em linha, logo depois da localização. */
export default function LeadStrip() {
  return (
    <section id="cadastro-rapido" data-lead-form className="border-y border-white/10 bg-ink-2">
      <div className="wrap reveal grid gap-8 py-12 md:py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:items-start lg:gap-12">
        <div>
          <p className="kicker !text-taupe">Lista prioritária</p>
          <p className="display mt-3 text-[clamp(1.05rem,2.4vw,1.35rem)] leading-[1.3] text-white">
            Gostou da localização?
            <br />
            <strong>Saia na frente.</strong>
          </p>
        </div>
        <LeadForm variant="inline" source="form_localizacao" submitLabel="Quero prioridade" />
      </div>
    </section>
  );
}
