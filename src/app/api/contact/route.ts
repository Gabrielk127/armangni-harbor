import { Resend } from "resend"

// Mesmo padrão dos outros projetos da casa (armangni-imoveis-page, ax-indicacao, ax-mercado-real):
// RESEND_API_KEY + CONTACT_EMAIL_FROM (domínio verificado armangniimoveis.com.br) + CONTACT_EMAIL_TO.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INTERESSES: Record<string, string> = {
  hero: "Capa do site",
  header: "Menu do topo",
  menu: "Menu do celular",
  localizacao: "Seção de localização",
  form_localizacao: "Formulário após a localização",
  form_meio: "Formulário do meio da página",
  studios: "Seção de studios",
  short_stay: "Short stay",
  armangni: "Falar com um consultor",
  barra_mobile: "Barra fixa do celular",
  geral: "Formulário final (lista prioritária)",
}

function sanitize(value: string) {
  return value.trim().replace(/[<>]/g, "")
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const { name, email, phone, message, conversionIdentifier, interest, company } = data

    // honeypot anti-bot: campo invisível que pessoas não preenchem
    if (company) {
      return json({ success: true }, 200)
    }

    if (!name || !email || !phone || !conversionIdentifier) {
      return json({ error: "Campos obrigatórios ausentes: nome, e-mail, telefone e origem." }, 400)
    }

    if (!EMAIL_REGEX.test(email)) {
      return json({ error: "E-mail inválido." }, 400)
    }

    const phoneDigits = String(phone).replace(/\D/g, "")
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      return json({ error: "Telefone inválido." }, 400)
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY não encontrado nas variáveis de ambiente")
      return json({ error: "Serviço de e-mail não configurado." }, 500)
    }

    const safeName = sanitize(String(name))
    const safeEmail = sanitize(String(email))
    const safeOrigin = sanitize(String(conversionIdentifier))
    const safeInterest = INTERESSES[String(interest)] ?? INTERESSES.geral

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM ?? "Armangni Imóveis <contato@armangniimoveis.com.br>",
      to: process.env.CONTACT_EMAIL_TO ?? "contato.armangni@gmail.com",
      replyTo: safeEmail,
      subject: `Novo contato: ${safeName} — ${safeOrigin}`,
      html: `
        <h2>Novo contato pelo site Harbor 360°</h2>
        <p><strong>Origem:</strong> ${safeOrigin}</p>
        <p><strong>Formulário / botão:</strong> ${safeInterest}</p>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Telefone:</strong> <a href="https://wa.me/55${phoneDigits}">${phoneDigits}</a></p>
        ${message ? `<p><strong>Mensagem:</strong><br/>${sanitize(String(message))}</p>` : ""}
      `,
    })

    if (error) {
      console.error("Erro ao enviar e-mail via Resend:", error)
      return json({ error: "Erro ao enviar e-mail." }, 500)
    }

    // Integração RD Station desativada — mantida como referência caso queira reativar.
    // const rdToken = process.env.RD_STATION_TOKEN
    // if (rdToken) {
    //   await fetch(`https://api.rd.services/platform/conversions?api_key=${rdToken}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       event_type: "CONVERSION",
    //       event_family: "CDP",
    //       payload: {
    //         conversion_identifier: conversionIdentifier,
    //         name: safeName,
    //         email: safeEmail,
    //         mobile_phone: phoneDigits,
    //         cf_mensagem: message || "",
    //       },
    //     }),
    //   })
    // }

    return json({ success: true }, 200)
  } catch (error) {
    console.error("Erro interno do servidor:", error)
    return json({ error: "Erro interno do servidor" }, 500)
  }
}
