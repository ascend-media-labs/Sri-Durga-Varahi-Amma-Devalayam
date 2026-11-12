import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        if (!item) continue;
        const [, id] = item;
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header className="sticky top-0 z-50 border-b-2 border-gold/60 bg-background/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-18 max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 lg:px-8 py-2.5">
        {/* Logo / Sacred Temple Branding (Vijayawada Devasthanam Style) */}
        <a href="#home" className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0 transition-opacity hover:opacity-95">
          <span className="grid h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 place-items-center rounded-full bg-saffron font-display text-lg sm:text-xl lg:text-2xl text-primary-foreground shadow-temple ring-2 ring-gold/70 shrink-0">
            ॐ
          </span>
          <div className="flex flex-col text-left">
            <span className="font-serif text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-[0.14em] text-amber-700 dark:text-gold uppercase leading-tight">
              {t.templeLine1}
            </span>
            <span className="font-display text-xs sm:text-sm lg:text-base font-extrabold tracking-wider text-primary uppercase leading-tight mt-0.5">
              {t.templeLine2}
            </span>
            <div className="flex items-center gap-1 text-[7.5px] sm:text-[8.5px] lg:text-[9.5px] font-semibold tracking-[0.14em] text-amber-800/80 dark:text-gold/90 uppercase leading-none mt-0.5">
              <span className="h-px w-2 sm:w-2.5 lg:w-3 bg-gold/80" />
              <span>{t.templeLocation}</span>
              <span className="h-px w-2 sm:w-2.5 lg:w-3 bg-gold/80" />
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links - Responsive for 13", 14", 15", 16", 17"+ screens */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1.5 2xl:gap-2">
          {navItems.map(([k, id]) => {
            const isActive = active === id;
            return (
              <a
                key={k}
                href={`#${id}`}
                className={`relative rounded-full px-2 py-1 text-xs lg:px-2.5 lg:py-1 xl:px-3.5 xl:py-1.5 xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold ring-1 ring-gold/50 shadow-xs"
                    : "text-foreground/80 hover:bg-gold/15 hover:text-primary"
                }`}
              >
                {t.nav[k]}
              </a>
            );
          })}
        </nav>

        {/* Right CTA / Dual Language Selector */}
        <div className="hidden items-center lg:flex shrink-0">
          <div
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 p-1 shadow-xs select-none"
            role="group"
            aria-label="Language selection"
          >
            <span className="pl-2 pr-1.5 text-gold flex items-center">
              <Languages className="h-4 w-4" />
            </span>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-primary text-primary-foreground shadow-xs font-extrabold"
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
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                lang === "te"
                  ? "bg-primary text-primary-foreground shadow-xs font-extrabold"
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
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-primary transition-colors hover:bg-secondary lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="border-t border-border/80 bg-background/98 px-4 py-3 backdrop-blur-lg lg:hidden animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg">
          <div className="space-y-1">
            {navItems.map(([k, id]) => {
              const Icon = navIcons[k];
              const isActive = active === id;
              return (
                <a
                  key={k}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary pl-2.5"
                      : "text-foreground/80 hover:bg-gold/10 hover:text-primary"
                  }`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{t.nav[k]}</span>
                </a>
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
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    lang === "en" ? "bg-primary text-primary-foreground shadow-xs font-extrabold" : "text-foreground/70"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("te")}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
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
