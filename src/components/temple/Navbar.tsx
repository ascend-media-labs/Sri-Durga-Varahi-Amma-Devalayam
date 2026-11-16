import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  HeartHandshake,
  Home,
  Image,
  Landmark,
  Languages,
  Menu,
  PhoneCall,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav, type NavSection } from "@/lib/navContext";

export const navItems = [
  ["home", "home"],
  ["history", "history"],
  ["puja", "puja"],
  ["gallery", "gallery"],
  ["prasadam", "prasadam"],
  ["info", "info"],
  ["contact", "contact"],
] as const;

const navIcons = {
  home: Home,
  history: Landmark,
  puja: CalendarDays,
  gallery: Image,
  prasadam: UtensilsCrossed,
  info: BookOpen,
  contact: PhoneCall,
};

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const { activeTab, setActiveTab, openDonation } = useNav();
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [bubbleStyle, setBubbleStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  useEffect(() => {
    const updateBubble = () => {
      const activeBtn = buttonRefs.current[activeTab];
      if (activeBtn) {
        setBubbleStyle({
          left: activeBtn.offsetLeft,
          top: activeBtn.offsetTop,
          width: activeBtn.offsetWidth,
          height: activeBtn.offsetHeight,
          opacity: 1,
        });
      }
    };

    updateBubble();
    const timer = setTimeout(updateBubble, 60);
    const timer2 = setTimeout(updateBubble, 250);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateBubble);
    }
    window.addEventListener("resize", updateBubble);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener("resize", updateBubble);
    };
  }, [activeTab, lang]);

  return (
    <>
      {/* Top Devotional Scrolling Notice Bar */}
      <div className="relative flex items-center overflow-hidden bg-maroon text-gold border-b border-gold/40 text-[11px] sm:text-xs py-1 shadow-inner select-none">
        {/* Continuous Seamless Full-Width Scrolling Marquee */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-0.5 font-medium tracking-wide">
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">✨</span>
              <span>{t.noticeText}</span>
            </span>
            <span className="text-gold/50">✦</span>
            <button
              type="button"
              onClick={() => openDonation()}
              className="inline-flex items-center gap-1 text-amber-200 hover:text-white font-bold cursor-pointer transition-colors underline decoration-gold/60 underline-offset-2"
            >
              <span>🙏</span>
              <span>{lang === "te" ? "నిత్య అన్నదాన కైంకర్య విరాళాలు (PhonePe / UPI: 7569386212) ➔" : "Support Temple Annadanam (PhonePe / UPI: 7569386212) ➔"}</span>
            </button>
            <span className="text-gold/50">✦</span>
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">✨</span>
              <span>{t.noticeText}</span>
            </span>
            <span className="text-gold/50">✦</span>
            <button
              type="button"
              onClick={() => openDonation()}
              className="inline-flex items-center gap-1 text-amber-200 hover:text-white font-bold cursor-pointer transition-colors underline decoration-gold/60 underline-offset-2"
            >
              <span>🙏</span>
              <span>{lang === "te" ? "నిత్య అన్నదాన కైంకర్య విరాళాలు (PhonePe / UPI: 7569386212) ➔" : "Support Temple Annadanam (PhonePe / UPI: 7569386212) ➔"}</span>
            </button>
            <span className="text-gold/50">✦</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-gold/60 bg-background/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-18 w-full max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] items-center justify-between gap-1 sm:gap-2 lg:gap-1 xl:gap-3 px-2.5 sm:px-4 md:px-5 lg:px-2.5 xl:px-6 2xl:px-8 py-2.5">
        {/* Logo / Sacred Temple Branding (Vijayawada Devasthanam Style) */}
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="group flex items-center gap-1.5 sm:gap-2 lg:gap-1.5 xl:gap-2.5 2xl:gap-3 shrink-0 transition-all duration-200 hover:scale-[1.01] active:scale-95 text-left cursor-pointer"
        >
          <span className="grid h-9 w-9 sm:h-10 sm:w-10 lg:h-8.5 lg:w-8.5 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12 place-items-center rounded-full bg-saffron font-display text-base sm:text-lg lg:text-base xl:text-xl 2xl:text-2xl text-primary-foreground shadow-temple ring-2 ring-gold/70 shrink-0 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
            ॐ
          </span>
          <div className="flex flex-col text-left min-w-0">
            <span className="font-serif text-[7.5px] sm:text-[9px] lg:text-[7.5px] xl:text-[9.5px] 2xl:text-[11px] font-bold tracking-[0.04em] xl:tracking-[0.14em] text-amber-700 dark:text-gold uppercase leading-tight truncate">
              {t.templeLine1}
            </span>
            <span className="font-display text-[10.5px] sm:text-xs lg:text-[10.5px] xl:text-sm 2xl:text-base font-extrabold tracking-tight xl:tracking-wider text-primary uppercase leading-tight mt-0.5 whitespace-nowrap">
              {t.templeLine2}
            </span>
            <div className="flex items-center gap-1 text-[6.5px] sm:text-[7.5px] lg:text-[6.5px] xl:text-[8.5px] 2xl:text-[9.5px] font-semibold tracking-[0.04em] xl:tracking-[0.14em] text-amber-800/80 dark:text-gold/90 uppercase leading-none mt-0.5">
              <span className="h-px w-2 sm:w-2.5 bg-gold/80 shrink-0" />
              <span className="truncate">{t.templeLocation}</span>
              <span className="h-px w-2 sm:w-2.5 bg-gold/80 shrink-0" />
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links - Responsive with Animated Sliding Pill Bubble */}
        <nav
          ref={navRef}
          className="relative hidden items-center gap-0.5 lg:flex xl:gap-1 2xl:gap-1.5 shrink-0"
        >
          {/* Animated Moving Bubble */}
          <div
            className="pointer-events-none absolute rounded-full bg-primary shadow-md ring-1 ring-gold/80 shadow-gold/25 transition-all duration-300 ease-out"
            style={{
              transform: `translate3d(${bubbleStyle.left}px, ${bubbleStyle.top}px, 0px)`,
              width: `${bubbleStyle.width}px`,
              height: `${bubbleStyle.height}px`,
              opacity: bubbleStyle.opacity,
            }}
          />

          {navItems.map(([k, id]) => {
            const isActive = activeTab === id;
            return (
              <button
                key={k}
                ref={(el) => {
                  buttonRefs.current[id] = el;
                }}
                type="button"
                onClick={() => setActiveTab(id as NavSection)}
                className={`relative z-10 rounded-full px-2 py-1 text-xs lg:px-2 lg:py-1 lg:text-[11px] xl:px-3 xl:py-1.5 xl:text-xs 2xl:px-4 2xl:py-1.5 2xl:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer active:scale-95 ${
                  isActive
                    ? "text-primary-foreground font-bold"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {t.nav[k]}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Dual Language Selector & Premium Devotional Donate */}
        <div className="hidden items-center gap-1.5 xl:gap-3 lg:flex shrink-0">
          {/* Royal Golden Temple Donation CTA Button */}
          <button
            type="button"
            onClick={() => openDonation()}
            className="relative group overflow-hidden flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-600 via-saffron to-amber-700 px-2.5 py-1.5 xl:px-3.5 xl:py-2 shadow-[0_2px_12px_rgba(217,119,6,0.35)] ring-2 ring-gold hover:ring-amber-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shrink-0"
            title={lang === "te" ? "శ్రీ దుర్గా వారాహి అమ్మవారి ఆలయ విరాళ సమర్పణ (PhonePe / Google Pay / UPI)" : "Donate to Sri Durga Varahi Temple via PhonePe / GPay / Any UPI"}
          >
            {/* Shimmer Sheen Reflection Effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none" />

            {/* Glowing Golden Emblem */}
            <span className="grid h-5 w-5 xl:h-6 xl:w-6 place-items-center rounded-full bg-black/25 ring-1 ring-gold/90 text-gold shadow-inner group-hover:rotate-12 transition-transform shrink-0">
              <HeartHandshake className="h-3 w-3 xl:h-3.5 xl:w-3.5 text-gold animate-pulse" />
            </span>

            {/* Devotional Typography */}
            <span className="text-xs xl:text-sm font-black tracking-wide text-white drop-shadow-sm whitespace-nowrap">
              {lang === "te" ? "విరాళం (Donate)" : "Donate"}
            </span>

            <Sparkles className="h-3 w-3 xl:h-3.5 xl:w-3.5 text-gold/90 group-hover:scale-125 transition-transform shrink-0" />
          </button>

          <div
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 p-0.5 xl:p-1 shadow-xs select-none shrink-0"
            role="group"
            aria-label="Language selection"
          >
            <span className="pl-1 pr-0.5 xl:pl-1.5 xl:pr-1 text-gold flex items-center">
              <Languages className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
            </span>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`rounded-full px-1.5 py-0.5 xl:px-2.5 xl:py-1 text-[10px] xl:text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-xs font-extrabold scale-102"
                  : "text-foreground/75 hover:text-primary hover:bg-primary/10"
              }`}
              title="Switch to English"
            >
              EN<span className="hidden xl:inline">glish</span>
            </button>
            <button
              type="button"
              onClick={() => setLang("te")}
              aria-pressed={lang === "te"}
              className={`rounded-full px-1.5 py-0.5 xl:px-2.5 xl:py-1 text-[10px] xl:text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                lang === "te"
                  ? "bg-primary text-primary-foreground shadow-xs font-extrabold scale-102"
                  : "text-foreground/75 hover:text-primary hover:bg-primary/10"
              }`}
              title="తెలుగు భాషలోకి మార్చండి"
            >
              తెలుగు
            </button>
          </div>
        </div>

        {/* Mobile Header Right Actions: Premium Devotional Donate + Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => openDonation()}
            className="relative group overflow-hidden flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-600 via-saffron to-amber-700 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-black text-white shadow-[0_2px_10px_rgba(217,119,6,0.45)] ring-2 ring-gold hover:ring-amber-300 active:scale-95 transition-all cursor-pointer"
            title={lang === "te" ? "ఆలయ విరాళ సమర్పణ (PhonePe / UPI)" : "Donate to Temple via PhonePe / UPI"}
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none" />

            <span className="grid h-5 w-5 place-items-center rounded-full bg-black/25 text-gold ring-1 ring-gold/80 shadow-inner">
              <HeartHandshake className="h-3 w-3 text-gold animate-pulse" />
            </span>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[7px] font-bold text-amber-100 uppercase tracking-widest flex items-center gap-0.5">
                <span className="h-1 w-1 rounded-full bg-emerald-400 inline-block" />
                <span>UPI</span>
              </span>
              <span className="text-[11.5px] font-black tracking-tight text-white whitespace-nowrap">
                {lang === "te" ? "విరాళం" : "Donate"}
              </span>
            </div>
            <Sparkles className="h-3 w-3 text-gold shrink-0" />
          </button>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-border text-primary transition-all duration-200 hover:bg-secondary active:scale-90 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="border-t border-border/80 bg-background/98 px-4 py-3 backdrop-blur-lg lg:hidden animate-in fade-in slide-in-from-top-3 duration-300 shadow-xl">
          <div className="space-y-1">
            {navItems.map(([k, id]) => {
              const Icon = navIcons[k];
              const isActive = activeTab === id;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => {
                      setActiveTab(id as NavSection);
                    }, 80);
                  }}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-98 cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-foreground/80 hover:bg-gold/10 hover:text-primary"
                  }`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{t.nav[k]}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Premium Devotional Donate */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openDonation();
              }}
              className="relative group overflow-hidden w-full flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-600 via-saffron to-amber-700 p-3.5 text-sm font-black text-white shadow-xl ring-2 ring-gold hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none" />

              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-black/25 text-gold ring-1 ring-gold/90 shadow-inner shrink-0">
                  <HeartHandshake className="h-5 w-5 text-gold animate-pulse" />
                </span>
                <div className="text-left leading-tight">
                  <span className="text-[10px] font-bold text-amber-100 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>PhonePe • Google Pay • Paytm • UPI</span>
                  </span>
                  <span className="text-sm font-black text-white mt-1 block">
                    {lang === "te" ? "శ్రీ దుర్గా వారాహి ఆలయ విరాళ సమర్పణ" : "Devotional Offerings & Donations"}
                  </span>
                </div>
              </div>

              <Sparkles className="h-5 w-5 text-gold shrink-0" />
            </button>
          </div>

          <div className="mt-3 border-t border-border pt-3">
            <div className="flex items-center justify-between rounded-full border border-primary/30 bg-primary/5 p-1">
              <div className="flex items-center gap-2 pl-3 text-gold">
                <Languages className="h-4 w-4" />
                <span className="text-xs font-semibold text-foreground/80">భాష / Lang:</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                    lang === "en" ? "bg-primary text-primary-foreground shadow-xs font-extrabold" : "text-foreground/70"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("te")}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                    lang === "te" ? "bg-primary text-primary-foreground shadow-xs font-extrabold" : "text-foreground/70"
                  }`}
                >
                  తెలుగు
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
