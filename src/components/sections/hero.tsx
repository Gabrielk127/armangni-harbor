import Image from "next/image";
import { IMAGES, whatsappLink } from "@/lib/site";
import { ArmangniMark, ArrowRight, WhatsAppIcon } from "../icons";
import Marquee from "../marquee";

const rise = (delay: number) => ({ animation: `rise 1.2s cubic-bezier(.2,.65,.25,1) ${delay}s both` });

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-1">
      {/* foto com zoom lento e parallax */}
      <div className="absolute inset-0 -z-10" data-parallax="-0.14">
        <div className="absolute inset-[-6%] animate-kenburns">
          <Image
            src={IMAGES.hero}
            alt="Torre de studios do Harbor 360° sobre o Harbor Mall, ao anoitecer"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[36%_center] lg:object-[58%_center]"
          />
        </div>
      </div>
      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-ink-1/15 lg:bg-ink-1/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-1/70 via-ink-1/5 to-ink-1" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-1/30 via-transparent to-ink-1/40 lg:from-ink-1/70 lg:via-ink-1/10 lg:to-ink-1/75" />

      <div className="wrap relative flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-36 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:content-center lg:items-center lg:justify-normal lg:gap-16 lg:pb-32 lg:pt-36">
        {/* lado da marca (desktop) */}
        <div className="hidden lg:block" style={rise(0.2)}>
          <p className="kicker mb-6 flex items-center gap-4 !text-pearl/80">
            <ArmangniMark draw className="h-8 w-auto text-taupe" strokeWidth={26} />
            Armangni apresenta
          </p>
          <Image
            src={IMAGES.logoHarbor}
            alt="Harbor 360°"
            width={1600}
            height={234}
            priority
            className="h-auto w-[clamp(300px,30vw,440px)]"
          />
          <div className="rule-tick mt-8 text-taupe" />
        </div>

        <div className="max-w-xl lg:justify-self-end">
          <p className="eyebrow mb-5 text-pearl" style={rise(0.35)}>
            <span className="h-px w-8 bg-taupe" /> Em breve · Londrina
          </p>
          <h1
            className="display text-[clamp(1.45rem,5.6vw,2.15rem)] leading-[1.22] text-white [text-shadow:0_2px_22px_rgba(14,14,14,.45)]"
            style={rise(0.5)}
          >
            Morar, investir
            <br /> e viver no mesmo lugar,
            <br />
            <strong className="text-taupe">ao lado do Catuaí.</strong>
          </h1>
          <p className="mt-5 max-w-md text-[0.98rem] text-pearl/85 md:text-base" style={rise(0.7)}>
            Harbor 360°: studios pensados para o short stay, um mall que movimenta o térreo e um rooftop
            aberto para a cidade. Com o atendimento da Armangni.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" style={rise(0.85)}>
            <a href="#contato" data-interesse="hero" className="btn btn-primary lg:!px-6">
              Antecipe-se ao lançamento <ArrowRight />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-glass lg:!px-6">
              <WhatsAppIcon className="h-4 w-4 text-wa" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* indicador de rolagem */}
      <div className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex lg:bottom-28" style={rise(1.3)}>
        <span className="relative h-12 w-px overflow-hidden bg-white/20">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scrollcue_2.2s_ease-in-out_infinite] bg-taupe" />
        </span>
      </div>

      <Marquee
        className="relative md:absolute md:inset-x-0 md:bottom-0"
        items={["Em breve", "Harbor 360°", "Ao lado do Catuaí", "Studios · Mall · Rooftop", "Armangni Negócios Imobiliários"]}
      />
    </section>
  );
}
