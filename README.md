# Harbor 360° · Armangni

Landing page do Harbor 360° com a marca da Armangni Negócios Imobiliários. A estrutura e as animações seguem
harborlondrina.com.br; as cores e os logos vêm do `armangni-imoveis`.

## Rodar

```bash
npm install
npm run dev   # http://localhost:3010
```

## Formulário (Resend)

O padrão é o mesmo dos outros projetos da casa (armangni-imoveis-page, ax-indicacao, ax-mercado-real). A rota
`src/app/api/contact/route.ts` envia pelo Resend com:

- `RESEND_API_KEY`: a mesma chave daqueles projetos.
- `CONTACT_EMAIL_FROM`: `contato@armangniimoveis.com.br`, o domínio verificado.
- `CONTACT_EMAIL_TO`: `contato.armangni@gmail.com`.

Tudo isso já está no `.env.local`. No deploy, cadastre as três variáveis na Vercel (modelo em `.env.example`).

A página tem três pontos de captura, todos nessa rota:

1. Faixa logo após a localização (`lead-strip.tsx`).
2. Seção "Pré-lançamento" no meio da página (`lead-mid.tsx`).
3. Lista prioritária no final (`lead.tsx`).

O e-mail diz de qual formulário ou botão o lead veio.

## Onde editar

- **Textos, contatos e imagens:** `src/lib/site.ts`.
- **Seções:** `src/components/sections/*`, uma por arquivo, na ordem de `src/app/page.tsx`.
- **Cores e animações:** `src/app/globals.css`, nos tokens `@theme` e nas classes `.reveal`, `.mask-line`,
  `.rule-tick` e `.marquee-track`.

## Pendências antes de publicar

- As imagens são os renders oficiais de harborlondrina.com.br, em `public/images/harbor/`. A distribuição pelas
  seções foi feita de propósito numa ordem diferente da do site original. As plantas não foram usadas, porque
  no site oficial a seção delas ainda está oculta.
- O radar de localização usa posições aproximadas. Confira os pontos em `SURROUNDINGS`.
- Confira com a construtora os números (`BUILDER_STATS`) e o registro de incorporação.
- Para enviar de um domínio próprio (e não do `onboarding@resend.dev`), verifique o domínio no Resend e troque
  `FROM` na rota.
