import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  CalendarDays,
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
  const { activeTab, setActiveTab } = useNav();
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
    window.addEventListener("resize", updateBubble);
    return () => {
      clearTimeout(timer);
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
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">✨</span>
              <span>{t.noticeText}</span>
            </span>
            <span className="text-gold/50">✦</span>
            <span className="flex items-center gap-2">
              <span className="text-gold font-bold">✨</span>
              <span>{t.noticeText}</span>
            </span>
            <span className="text-gold/50">✦</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-gold/60 bg-background/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-18 w-full max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] items-center justify-between gap-1 sm:gap-2 lg:gap-1.5 xl:gap-3 px-3 sm:px-4 md:px-5 lg:px-3 xl:px-6 2xl:px-8 py-2.5">
        {/* Logo / Sacred Temple Branding (Vijayawada Devasthanam Style) */}
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="group flex items-center gap-1.5 sm:gap-2 lg:gap-2 xl:gap-2.5 2xl:gap-3 shrink-0 transition-all duration-200 hover:scale-[1.01] active:scale-95 text-left cursor-pointer"
        >
          <span className="grid h-9 w-9 sm:h-10 sm:w-10 lg:h-9 lg:w-9 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12 place-items-center rounded-full bg-saffron font-display text-base sm:text-lg lg:text-base xl:text-xl 2xl:text-2xl text-primary-foreground shadow-temple ring-2 ring-gold/70 shrink-0 transition-all duration-300 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
            ॐ
          </span>
          <div className="flex flex-col text-left">
            <span className="font-serif text-[8px] sm:text-[9px] lg:text-[7.5px] xl:text-[9.5px] 2xl:text-[11px] font-bold tracking-[0.08em] xl:tracking-[0.14em] text-amber-700 dark:text-gold uppercase leading-tight">
              {t.templeLine1}
            </span>
            <span className="font-display text-[11px] sm:text-xs lg:text-[11px] xl:text-sm 2xl:text-base font-extrabold tracking-tight xl:tracking-wider text-primary uppercase leading-tight mt-0.5 whitespace-nowrap">
              {t.templeLine2}
            </span>
            <div className="flex items-center gap-1 text-[7px] sm:text-[7.5px] lg:text-[6.5px] xl:text-[8.5px] 2xl:text-[9.5px] font-semibold tracking-[0.08em] xl:tracking-[0.14em] text-amber-800/80 dark:text-gold/90 uppercase leading-none mt-0.5">
              <span className="h-px w-2 sm:w-2.5 bg-gold/80" />
              <span>{t.templeLocation}</span>
              <span className="h-px w-2 sm:w-2.5 bg-gold/80" />
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links - Responsive with Animated Sliding Pill Bubble */}
        <nav
          ref={navRef}
          className="relative hidden items-center gap-0.5 lg:flex xl:gap-1 2xl:gap-1.5 shrink min-w-0"
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
                className={`relative z-10 rounded-full px-2 py-1 text-xs lg:px-1.5 lg:py-1 lg:text-[11px] xl:px-3 xl:py-1.5 xl:text-xs 2xl:px-4 2xl:py-1.5 2xl:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer active:scale-95 ${
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

        {/* Right CTA / Dual Language Selector */}
        <div className="hidden items-center lg:flex shrink-0">
          <div
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 p-0.5 xl:p-1 shadow-xs select-none"
            role="group"
            aria-label="Language selection"
          >
            <span className="pl-1.5 pr-1 xl:pl-2 xl:pr-1.5 text-gold flex items-center">
              <Languages className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
            </span>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`rounded-full px-2 py-0.5 xl:px-3 xl:py-1 text-[11px] xl:text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-xs font-extrabold scale-102"
                  : "text-foreground/75 hover:text-primary hover:bg-primary/10"
              }`}
              title="Switch to English"
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("te")}
              aria-pressed={lang === "te"}
              className={`rounded-full px-2 py-0.5 xl:px-3 xl:py-1 text-[11px] xl:text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
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

        {/* Mobile Hamburger Button */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-primary transition-all duration-200 hover:bg-secondary active:scale-90 lg:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
                    setActiveTab(id as NavSection);
                    setOpen(false);
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

          <div className="mt-4 border-t border-border pt-3">
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
