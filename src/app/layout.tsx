import type { Metadata, Viewport } from "next";
import { Lexend_Exa, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const lexend = Lexend_Exa({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-lexend",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harbor 360° · Studios ao lado do Catuaí | Armangni Negócios Imobiliários",
  description:
    "Harbor 360° em Londrina: studios pensados para o short stay, mall no térreo e rooftop com vista para a cidade, ao lado do Catuaí Shopping. Entre na lista prioritária com a Armangni.",
  openGraph: {
    title: "Harbor 360° · Armangni Negócios Imobiliários",
    description:
      "Studios, mall e rooftop em um só endereço, ao lado do Catuaí. Garanta acesso antecipado ao lançamento.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1c1c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${lexend.variable} ${outfit.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "#262626",
              border: "1px solid rgba(191,180,170,.35)",
              color: "#f2efeb",
              borderRadius: 2,
            },
          }}
        />
      </body>
    </html>
  );
}
