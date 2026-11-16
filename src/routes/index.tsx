import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { Navbar } from "@/components/temple/Navbar";
import { Hero } from "@/components/temple/Hero";
import { About, Contact, Gallery, History, Prasadam, Pujas, Slokhas } from "@/components/temple/Sections";
import { Footer, WhatsAppIcon } from "@/components/temple/Footer";
import { DonationModal } from "@/components/temple/DonationModal";
import { TEMPLE_CONFIG } from "@/lib/constants/templeConfig";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Durga Varahi Amma Devalayam – Darshan, Puja & Prasadam" },
      { name: "description", content: "Sri Durga Varahi Amma Devalayam, Pisini Village, Ranasthalam Mandal, Srikakulam District: darshan timings, daily sevas, navaratri celebrations, and daily annadanam." },
      { property: "og:title", content: "Sri Durga Varahi Amma Devalayam" },
      { property: "og:description", content: "Darshan, puja, festivals, prasadam and daily slokhas of Sri Durga Varahi Amma Devalayam, Pisini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { lang } = useLang();

  return (
    <div lang={lang} className="min-h-screen bg-background flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="transition-all duration-300">
          <div id="home" className="scroll-mt-24 sm:scroll-mt-28">
            <Hero />
            <About />
          </div>
          <History />
          <Pujas />
          <Gallery />
          <Prasadam />
          <Slokhas />
          <Contact />
        </main>
      </div>
      <Footer />
      <DonationModal />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/91${TEMPLE_CONFIG.WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sri Durga Varahi Temple on WhatsApp"
        title={`WhatsApp: ${TEMPLE_CONFIG.PHONE_PRIMARY}`}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xl hover:bg-[#20BA5A] hover:scale-108 active:scale-95 transition-all duration-300 ring-2 ring-white/90 shadow-emerald-950/40 cursor-pointer"
      >
        <WhatsAppIcon className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
        <span className="text-xs sm:text-sm font-bold hidden sm:inline tracking-wide">WhatsApp</span>
      </a>
    </div>
  );
}
