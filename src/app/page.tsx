import Header from "@/components/header";
import PageEffects from "@/components/page-effects";
import FloatingCta from "@/components/floating-cta";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import Location from "@/components/sections/location";
import Concept from "@/components/sections/concept";
import Complex from "@/components/sections/complex";
import Urban from "@/components/sections/urban";
import Amenities from "@/components/sections/amenities";
import Studios from "@/components/sections/studios";
import ShortStay from "@/components/sections/short-stay";
import Credits from "@/components/sections/credits";
import Builder from "@/components/sections/builder";
import Lead from "@/components/sections/lead";
import LeadStrip from "@/components/sections/lead-strip";
import LeadMid from "@/components/sections/lead-mid";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Location />
        <LeadStrip />
        <Concept />
        <Complex />
        <Urban />
        <Amenities />
        <LeadMid />
        <Studios />
        <ShortStay />
        <Credits />
        <Builder />
        <Lead />
      </main>
      <Footer />
      <FloatingCta />
      <PageEffects />
    </>
  );
}
