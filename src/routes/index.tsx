import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, X } from "lucide-react";
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
  component: () => (
    <LangProvider>
      <Page />
    </LangProvider>
  ),
});

function Page() {
  const { t, lang } = useLang();
  const [login, setLogin] = useState(false);
  return (
    <div lang={lang} className="min-h-screen bg-background">
      <Navbar onLogin={() => setLogin(true)} />
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
      {login && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-maroon/70 p-4" onClick={() => setLogin(false)}>
          <div className="fade-up w-full max-w-sm rounded-2xl border-2 border-gold bg-card p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLogin(false)} aria-label={t.close} className="float-right text-muted-foreground"><X /></button>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-saffron text-primary-foreground"><User /></span>
            <h3 className="mt-4 font-display text-xl font-bold text-primary">{t.loginTitle}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{t.loginNote}</p>
            <a href="#contact" onClick={() => setLogin(false)} className="mt-6 inline-block rounded-full bg-saffron px-6 py-2 font-semibold text-primary-foreground">{t.contact}</a>
          </div>
        </div>
      )}
    </div>
  );
}
