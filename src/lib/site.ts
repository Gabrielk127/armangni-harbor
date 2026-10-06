/**
 * Conteúdo do site em um só lugar: contatos, textos e imagens.
 *
 * As imagens são os renders oficiais do Harbor 360° (harborlondrina.com.br),
 * salvos em /public/images/harbor. A distribuição pelas seções é diferente
 * da do site original de propósito.
 */

const img = (file: string) => `/images/harbor/${file}`;

export const BRAND = {
  name: "Armangni Negócios Imobiliários",
  short: "Armangni",
  creci: "CRECI 8328",
  phone: "5543991708520",
  phoneFormatted: "(43) 99170-8520",
  email: "contato.armangni@gmail.com",
  social: {
    instagram: "https://www.instagram.com/armangni.imoveis/",
    facebook: "https://www.facebook.com/imoveisarmangni/?locale=pt_BR",
    youtube: "https://www.youtube.com/channel/UC9wtZuavR6-xkmxBVvbyr1g",
    linkedin: "https://www.linkedin.com/company/armangni-neg%C3%B3cios-imobili%C3%A1rios/",
  },
} as const;

export const PROJECT = {
  name: "Harbor 360°",
  conversionIdentifier: "harbor-360",
  address: "Av. Terras de Santana, 650 · Terra Bonita",
  city: "Londrina · PR",
  cep: "86047-612",
  mapsQuery: "Av. Terras de Santana, 650 - Terra Bonita, Londrina - PR, 86047-612",
  developer: "AVIV Construtora e Incorporadora",
  registro:
    "Registro de Incorporação nº R.4/147.470, do 1º Cartório de Registro de Imóveis da Comarca de Londrina, PR.",
} as const;

export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(PROJECT.mapsQuery)}&z=15&output=embed`;

export function whatsappLink(message = "Olá! Vi o site do Harbor 360° e quero receber mais informações.") {
  return `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Localização", href: "#localizacao" },
  { label: "O projeto", href: "#conceito" },
  { label: "Experiências", href: "#experiencias" },
  { label: "Studios", href: "#studios" },
  { label: "Contato", href: "#contato" },
] as const;

export const IMAGES = {
  hero: img("complexo-2600.webp"),
  vistaAerea: img("vista-faixa.webp"),
  peopleFirst: img("pessoas-1000.webp"),
  urbanHub: img("hero-empreendimento-3000.webp"),
  mall: img("mall-dia-2600.webp"),
  conexao: img("mall-patio-1400.webp"),
  boulevard: img("mall-letreiro-1400.webp"),
  convivencia: img("ancoragem-1900.webp"),
  rooftop: img("rooftop-2600.webp"),
  studiosFacade: img("studios-1400.webp"),
  studioInterior: img("studio-interior-1400.webp"),
  detalhes: img("detalhes-1000.webp"),
  shortStay: img("shortstay-estar-2400.webp"),
  construtora: img("aviv-traco-1600.webp"),
  leadBg: img("complexo-2600.webp"),
  logoHarbor: img("logo-harbor360-hd.png"),
  logoAviv: img("logo-aviv.png"),
} as const;

// ordem própria (diferente da do site oficial)
export const AMENITIES = [
  { name: "Piscina climatizada", tag: "Rooftop", img: img("piscina-1200.webp") },
  { name: "Lobby", tag: "Recepção", img: img("lobby-1200.webp") },
  { name: "Café lounge e coworking", tag: "Trabalho", img: img("cafe-1200.webp") },
  { name: "Skybar", tag: "Rooftop", img: img("amb-skybar-1800.webp") },
  { name: "Pet place", tag: "Convivência", img: img("petplace-1200.webp") },
  { name: "Spa", tag: "Bem-estar", img: img("amb-spa-1800.webp") },
  { name: "Espaço gourmet", tag: "Convivência", img: img("amb-gourmet-1800.webp") },
  { name: "Fitness", tag: "Bem-estar", img: img("amb-fitness-1800.webp") },
  { name: "Brinquedoteca", tag: "Família", img: img("brinquedoteca-1200.webp") },
  { name: "Mercado autônomo", tag: "Conveniência", img: img("amb-mercado-1800.webp") },
  { name: "Sala de jogos", tag: "Lazer", img: img("jogos-1200.webp") },
  { name: "Sala de reuniões", tag: "Trabalho", img: img("reunioes-1200.webp") },
  { name: "Lavanderia", tag: "Conveniência", img: img("lavanderia-1200.webp") },
] as const;

/** Pontos do entorno. `angle` em graus (0 = norte da vista), `ring` 1 = mais perto. */
export const SURROUNDINGS = [
  { name: "Catuaí Shopping", detail: "Ao lado", angle: -28, ring: 1 },
  { name: "Gleba Palhano", detail: "Bairro", angle: 11, ring: 3 },
  { name: "PR-445", detail: "Rodovia", angle: 32, ring: 2 },
  { name: "Faculdade Anhanguera", detail: "Educação", angle: 58, ring: 2 },
  { name: "Faculdade Positivo", detail: "Educação", angle: 97, ring: 3 },
  { name: "Hospital Unimed", detail: "Saúde", angle: 123, ring: 3 },
  { name: "Catuaí Parque Residence", detail: "Condomínio", angle: 175, ring: 1 },
  { name: "Alphaville", detail: "Condomínio", angle: -104, ring: 2 },
] as const;

export const STUDIO_FEATURES = [
  "Studios com sacada",
  "Fechadura eletrônica",
  "Piso porcelanato",
  "Medição individual de água e gás",
  "Infraestrutura para ar-condicionado",
  "Infraestrutura para aquecedor a gás",
] as const;

export const CREDITS = [
  { role: "Arquitetura", name: "Renato Viani", photo: img("quem-assina/renato-repouso-720.webp") },
  { role: "Arquitetura", name: "Alegna Monroy", photo: img("quem-assina/alegna-repouso-720.webp") },
  { role: "Luminotécnica", name: "Tâmara Carvalho", photo: img("quem-assina/tamara-repouso-720.webp") },
  { role: "Engenharia", name: "Evaristo Queiroz", photo: img("quem-assina/evaristo-repouso-720.webp") },
  { role: "Engenharia estrutural", name: "Luiz Fernando Zocco", photo: img("quem-assina/zocco-repouso-720.webp") },
  { role: "Artes plásticas", name: "Carlos Sato", photo: img("quem-assina/sato-repouso-720.webp") },
  { role: "Paisagismo", name: "Samanta Carvalho & Vitor Moraes", photo: img("quem-assina/samanta-vitor-repouso-720.webp") },
] as const;

export const BUILDER_STATS = [
  { value: 20, prefix: "+", label: "Cidades" },
  { value: 1000, prefix: "+", label: "Chaves entregues" },
  { value: 8, prefix: "+", label: "Anos" },
] as const;
