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
  User,
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

export function Navbar({ onLogin }: { onLogin: () => void }) {
  const { t, toggle } = useLang();
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
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo / Sacred Temple Branding (Vijayawada Devasthanam Style) */}
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 shrink-0 transition-opacity hover:opacity-95">
          <span className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-saffron font-display text-xl sm:text-2xl text-primary-foreground shadow-temple ring-2 ring-gold/70 shrink-0">
            ॐ
          </span>
          <div className="flex flex-col text-left">
            <span className="font-serif text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-amber-700 dark:text-gold uppercase leading-tight">
              {t.templeLine1}
            </span>
            <span className="font-display text-sm sm:text-base font-extrabold tracking-wider text-primary uppercase leading-tight mt-0.5">
              {t.templeLine2}
            </span>
            <div className="flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.14em] text-amber-800/80 dark:text-gold/90 uppercase leading-none mt-0.5">
              <span className="h-px w-2.5 sm:w-3 bg-gold/80" />
              <span>{t.templeLocation}</span>
              <span className="h-px w-2.5 sm:w-3 bg-gold/80" />
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 lg:flex xl:gap-2">
          {navItems.map(([k, id]) => {
            const isActive = active === id;
            return (
              <a
                key={k}
                href={`#${id}`}
                className={`relative rounded-full px-3 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 ${
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

        {/* Right CTA / Language & Login */}
        <div className="hidden items-center gap-2 lg:flex shrink-0">
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs xl:text-sm font-medium text-primary transition-colors hover:bg-secondary"
          >
            <Languages className="h-3.5 w-3.5 text-gold" />
            <span>{t.langLabel}</span>
          </button>
          <button
            onClick={onLogin}
            className="flex items-center gap-1.5 rounded-full bg-saffron px-4 py-1.5 text-xs xl:text-sm font-semibold text-primary-foreground shadow-temple transition-all hover:brightness-105"
          >
            <User className="h-3.5 w-3.5" />
            <span>{t.login}</span>
          </button>
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

          <div className="mt-4 flex gap-2 border-t border-border pt-3">
            <button
              onClick={toggle}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-primary/40 py-2 text-sm font-medium text-primary hover:bg-secondary"
            >
              <Languages className="h-4 w-4 text-gold" />
              <span>{t.langLabel}</span>
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onLogin();
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-saffron py-2 text-sm font-semibold text-primary-foreground shadow-temple"
            >
              <User className="h-4 w-4" />
              <span>{t.login}</span>
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
