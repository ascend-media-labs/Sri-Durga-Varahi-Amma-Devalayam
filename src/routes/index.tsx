import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav, type NavSection } from "@/lib/navContext";
import { Navbar, navItems } from "@/components/temple/Navbar";
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

function SectionBreadcrumb({ currentTitle }: { currentTitle: string }) {
  const { setActiveTab } = useNav();
  const { lang } = useLang();

  return (
    <div className="bg-secondary/70 border-b border-border/80 py-3 shadow-2xs">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-amber-700 transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{lang === "te" ? "ముఖ్య పేజీకి (Back to Home)" : "Back to Home"}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            {lang === "te" ? "ముఖ్య పేజీ" : "Home"}
          </button>
          <span>/</span>
          <span className="text-primary font-bold">{currentTitle}</span>
        </div>
      </div>
    </div>
  );
}

function SectionNavFooter() {
  const { activeTab, setActiveTab } = useNav();
  const { t, lang } = useLang();

  return (
    <div className="bg-secondary/40 border-t border-border/60 py-6">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-xs sm:text-sm font-bold shadow-sm hover:brightness-110 cursor-pointer flex items-center gap-1.5"
        >
          <span>{lang === "te" ? "← ముఖ్య పేజీకి వెళ్ళండి (Home)" : "← Back to Home"}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.filter(([, id]) => id !== activeTab && id !== "home").map(([k, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id as NavSection)}
              className="rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-gold/15 hover:text-primary transition-colors cursor-pointer"
            >
              {t.nav[k]} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Page() {
  const { lang, t } = useLang();
  const { activeTab } = useNav();

  return (
    <div lang={lang} className="min-h-screen bg-background flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="transition-all duration-300">
          {activeTab === "home" && (
            <div className="animate-in fade-in duration-300">
              <Hero />
              <About />
              <History />
              <Pujas />
              <Gallery />
              <Prasadam />
              <Slokhas />
              <Contact />
            </div>
          )}

          {activeTab === "history" && (
            <div className="animate-in fade-in duration-300">
              <SectionBreadcrumb currentTitle={t.nav.history} />
              <History />
              <SectionNavFooter />
            </div>
          )}

          {activeTab === "puja" && (
            <div className="animate-in fade-in duration-300">
              <SectionBreadcrumb currentTitle={t.nav.puja} />
              <Pujas />
              <SectionNavFooter />
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="animate-in fade-in duration-300">
              <SectionBreadcrumb currentTitle={t.nav.gallery} />
              <Gallery />
              <SectionNavFooter />
            </div>
          )}

          {activeTab === "prasadam" && (
            <div className="animate-in fade-in duration-300">
              <SectionBreadcrumb currentTitle={t.nav.prasadam} />
              <Prasadam />
              <SectionNavFooter />
            </div>
          )}

          {activeTab === "info" && (
            <div className="animate-in fade-in duration-300">
              <SectionBreadcrumb currentTitle={t.nav.info} />
              <Slokhas />
              <SectionNavFooter />
            </div>
          )}

          {activeTab === "contact" && (
            <div className="animate-in fade-in duration-300">
              <SectionBreadcrumb currentTitle={t.nav.contact} />
              <Contact />
              <SectionNavFooter />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
