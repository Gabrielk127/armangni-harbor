import { PROJECT } from "./site";

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  message?: string;
  interest?: string;
  company?: string;
}

/** Envia o lead para /api/contact (Resend). Lança Error com a mensagem do servidor. */
export async function sendLead(data: LeadPayload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, conversionIdentifier: PROJECT.conversionIdentifier }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Falha ao enviar os dados.");
  }
}
