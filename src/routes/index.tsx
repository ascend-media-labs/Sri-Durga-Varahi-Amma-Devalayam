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

function HomeExploreCards() {
  const { setActiveTab } = useNav();
  const { lang } = useLang();

  const cards = [
    {
      id: "history" as const,
      title: lang === "te" ? "ఆలయ చరిత్ర" : "Temple History",
      desc: lang === "te" ? "స్థల మహాత్యం, వేద ప్రతిష్ట మరియు అమ్మవారి సజీవ లీలా విశేషాలు." : "Sthala Mahatyam, Vedic consecration and sacred lore of Pisini shrine.",
      icon: "🏛️",
      action: lang === "te" ? "చరిత్ర చూడండి →" : "View History →",
    },
    {
      id: "puja" as const,
      title: lang === "te" ? "పూజలు & నవరాత్రులు" : "Pujas & Festivals",
      desc: lang === "te" ? "దసరా నవరాత్రి ఉత్సవాలు, నిత్య కుంకుమార్చనలు & సేవల వివరాలు." : "Navaratri Brahmotsavams, daily kumkuma pujas and sacred sevas.",
      icon: "🪔",
      action: lang === "te" ? "పూజలు చూడండి →" : "Explore Pujas →",
    },
    {
      id: "gallery" as const,
      title: lang === "te" ? "దివ్య దర్శన గ్యాలరీ" : "Sacred Gallery",
      desc: lang === "te" ? "అమ్మవారి పట్టుచీర అలంకారాలు, స్వర్ణ కిరీట దర్శనాలు & విశేష చిత్రాలు." : "Divine silk saree alankarams, gold crowns and high-res darshan photos.",
      icon: "📸",
      action: lang === "te" ? "గ్యాలరీ తెరవండి →" : "Open Gallery →",
    },
    {
      id: "prasadam" as const,
      title: lang === "te" ? "నిత్య అన్న ప్రసాదం" : "Anna Prasadam",
      desc: lang === "te" ? "ప్రతిరోజూ భక్తులకు ఉచిత మహా అన్నదానం మరియు ఆలయ పవిత్ర ప్రసాదాలు." : "Daily free Maha Annadanam for all pilgrims and sacred counter offerings.",
      icon: "🍚",
      action: lang === "te" ? "ప్రసాదం వివరాలు →" : "View Prasadam →",
    },
    {
      id: "info" as const,
      title: lang === "te" ? "ఆలయ విశేషాలు & స్తోత్రాలు" : "Timings & Slokhas",
      desc: lang === "te" ? "రోజూ పఠించవలసిన వారాహి మంత్రాలు, దర్శన వేళలు మరియు ఫలశ్రుతి." : "Sacred Varahi slokhas, daily chanting hymns and darshan schedules.",
      icon: "📜",
      action: lang === "te" ? "స్తోత్రాలు చూడండి →" : "Read Slokhas →",
    },
    {
      id: "contact" as const,
      title: lang === "te" ? "సంప్రదించండి & మార్గం" : "Contact & Location",
      desc: lang === "te" ? "పిసిని క్షేత్రం చిరునామా, ఫోన్ నంబర్లు మరియు గూగుల్ మ్యాప్ రూట్." : "Pisini temple office, priest contact details, and directions.",
      icon: "📍",
      action: lang === "te" ? "రూట్ మ్యాప్ & వివరాలు →" : "Get Directions →",
    },
  ];

  return (
    <section className="bg-secondary/40 py-8 md:py-10 border-b border-border/60">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="text-center mb-6 sm:mb-8">
          <p className="font-serif text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-gold">
            {lang === "te" ? "దేవస్థానం విశేషాలు" : "Sacred Devasthanam Sections"}
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-primary">
            {lang === "te" ? "ఆలయ సేవలు & దర్శన విభాగాలు" : "Explore Temple Offerings & Services"}
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 bg-gold" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className="group rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:border-gold hover:shadow-temple transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform origin-left">
                  {c.icon}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed text-justify">
                  {c.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs sm:text-sm font-bold text-primary group-hover:text-amber-700">
                <span>{c.action}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
              <HomeExploreCards />
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
