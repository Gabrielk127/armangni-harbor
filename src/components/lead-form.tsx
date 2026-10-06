"use client";

import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { sendLead } from "@/lib/lead";
import { cn, maskPhone } from "@/lib/utils";
import { INTEREST_EVENT } from "./page-effects";
import { ArrowRight } from "./icons";

const ROTULOS: Record<string, string> = {
  short_stay: "Short stay",
  studios: "Studios",
  armangni: "Falar com um consultor",
};

const VAZIO = { name: "", email: "", phone: "", message: "", company: "" };

interface LeadFormProps {
  /** full: com mensagem · stacked: sem mensagem · inline: campos em linha (faixa) */
  variant?: "full" | "stacked" | "inline";
  /** de qual formulário veio o lead (vai no e-mail) */
  source?: string;
  /** só o formulário final escuta os botões "Quero ser avisado", "Quero saber mais"... */
  listen?: boolean;
  submitLabel?: string;
}

export default function LeadForm({
  variant = "full",
  source = "geral",
  listen = false,
  submitLabel = "Entrar na lista prioritária",
}: LeadFormProps) {
  const uid = useId();
  const [formData, setFormData] = useState(VAZIO);
  const [interest, setInterest] = useState(source);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const inline = variant === "inline";

  // botões com data-interesse (ex.: "Quero saber mais" do short stay) dizem de onde veio o lead
  useEffect(() => {
    if (!listen) return;
    const onInterest = (e: Event) => setInterest(String((e as CustomEvent).detail || source));
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, [listen, source]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "phone" ? maskPhone(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (formData.name.trim().length < 3) return setFeedback({ ok: false, text: "Informe seu nome completo." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      return setFeedback({ ok: false, text: "Informe um e-mail válido." });
    if (formData.phone.replace(/\D/g, "").length < 10)
      return setFeedback({ ok: false, text: "Informe um telefone válido com DDD." });

    setIsSubmitting(true);
    try {
      await sendLead({ ...formData, interest });
      toast.success("Mensagem enviada! ✅", { description: "Entraremos em contato em breve. Obrigado!" });
      setFeedback({ ok: true, text: "Cadastro recebido! Você está na lista prioritária. Nossa equipe vai falar com você." });
      setFormData(VAZIO);
    } catch (error) {
      const text = error instanceof Error ? error.message : "Não foi possível enviar sua mensagem.";
      toast.error("Ops! Algo deu errado.", { description: text });
      setFeedback({ ok: false, text });
    } finally {
      setIsSubmitting(false);
    }
  };

  const id = (n: string) => `${uid}-${n}`;
  const labelCls = inline ? "sr-only" : "field-label";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("relative", inline ? "space-y-4" : "space-y-5")}>
      {listen && ROTULOS[interest] && (
        <p className="flex items-center gap-3 border border-taupe/40 bg-taupe/10 px-4 py-3 font-display text-[0.55rem] uppercase tracking-[0.22em] text-taupe">
          Interesse: {ROTULOS[interest]}
          <button type="button" onClick={() => setInterest(source)} aria-label="Remover interesse" className="ml-auto text-base leading-none text-pearl/70 hover:text-white">
            ×
          </button>
        </p>
      )}

      <div className={cn(inline ? "grid gap-3 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]" : "space-y-5")}>
        <div>
          <label htmlFor={id("nome")} className={labelCls}>Nome</label>
          <input id={id("nome")} type="text" name="name" autoComplete="name" placeholder={inline ? "Nome" : "Seu nome completo"} value={formData.name} onChange={handleChange} required className="field" />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelCls}>E-mail</label>
          <input id={id("email")} type="email" name="email" autoComplete="email" inputMode="email" placeholder={inline ? "E-mail" : "voce@email.com"} value={formData.email} onChange={handleChange} required className="field" />
        </div>
        <div>
          <label htmlFor={id("tel")} className={labelCls}>Telefone / WhatsApp</label>
          <input id={id("tel")} type="tel" name="phone" autoComplete="tel-national" inputMode="tel" placeholder={inline ? "WhatsApp com DDD" : "(43) 99999-9999"} value={formData.phone} onChange={handleChange} required className="field" />
        </div>
        {variant === "full" && (
          <div>
            <label htmlFor={id("msg")} className={labelCls}>Mensagem (opcional)</label>
            <textarea id={id("msg")} name="message" rows={3} placeholder="Conte o que você procura" value={formData.message} onChange={handleChange} className="field resize-none" />
          </div>
        )}
        {inline && (
          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:col-span-3 lg:col-span-1 lg:w-auto">
            {isSubmitting ? "Enviando..." : (
              <>
                {submitLabel} <ArrowRight />
              </>
            )}
          </button>
        )}
      </div>

      {/* honeypot: invisível para pessoas */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={id("empresa")}>Empresa</label>
        <input id={id("empresa")} type="text" name="company" tabIndex={-1} autoComplete="off" value={formData.company} onChange={handleChange} />
      </div>

      {!inline && (
        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full !py-5">
          {isSubmitting ? "Enviando..." : (
            <>
              {submitLabel} <ArrowRight />
            </>
          )}
        </button>
      )}

      <p role="status" aria-live="polite" className={cn("text-sm", inline ? "min-h-0" : "min-h-[1.2em]", feedback?.ok ? "text-taupe" : "text-red-300")}>
        {feedback?.text}
      </p>
      <p className="text-[0.75rem] leading-relaxed text-mist/80">
        Ao enviar, você concorda em receber contato da Armangni sobre o Harbor 360°. Seus dados são tratados conforme a
        LGPD.
      </p>
    </form>
  );
}
