import { createFileRoute } from "@tanstack/react-router";
import { LangProvider, useLang } from "@/lib/i18n";
import { Navbar } from "@/components/temple/Navbar";
import { Hero } from "@/components/temple/Hero";
import { About, Contact, Gallery, History, Prasadam, Pujas, Slokhas } from "@/components/temple/Sections";
import { Footer } from "@/components/temple/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sri Durga Varahi Amma Devalayam – Darshan, Puja & Prasadam" },
      { name: "description", content: "Sri Durga Varahi Amma Devalayam, Pisini Village, Ranasthalam Mandal, Srikakulam District: darshan timings, puja bookings, navaratri celebrations, and daily annadanam." },
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
    <div lang={lang} className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <History />
        <Pujas />
        <Gallery />
        <Prasadam />
        <Slokhas />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
