import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, HeartHandshake } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/navContext";
import varahiMain from "@/assets/hero-varahi-main.jpg";
import goddess from "@/assets/hero-varahi-green.jpg";
import temple from "@/assets/hero-temple.jpg";
import aarti from "@/assets/hero-aarti.jpg";

const images = [varahiMain, goddess, temple, aarti];

export function Hero() {
  const { t, lang } = useLang();
  const { setActiveTab, openDonation } = useNav();
  const [i, setI] = useState(0);
  const n = images.length;

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % n), 5500);
    return () => clearInterval(id);
  }, [n]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches && e.targetTouches[0]) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      // Swiped left -> next slide
      setI((prev) => (prev + 1) % n);
    } else if (distance < -50) {
      // Swiped right -> prev slide
      setI((prev) => (prev - 1 + n) % n);
    }
  };

  return (
    <section
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="relative h-[74vh] sm:h-[80vh] md:h-[84vh] lg:h-[88vh] min-h-[460px] sm:min-h-[520px] max-h-[840px] overflow-hidden select-none"
    >
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={t.slides[idx]?.title}
          width={1920}
          height={1088}
          className={`absolute inset-0 h-full w-full object-cover object-top origin-top transition-all duration-[1500ms] ${idx === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-maroon/95 via-maroon/30 to-maroon/10" />
      <div key={i} className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-end pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 px-3.5 sm:px-6 text-center text-primary-foreground">
        <p className="fade-up text-xs sm:text-sm md:text-base lg:text-lg tracking-wider text-gold font-medium">ॐ श्री वाराह्यै नमः</p>
        <h1 className="fade-up mt-1.5 sm:mt-2.5 md:mt-3 font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-lg leading-tight px-1">
          {t.slides[i]?.title}
        </h1>
        <div className="fade-up my-2 sm:my-3.5 md:my-4 h-px w-20 sm:w-32 md:w-40 bg-gold" />
        <p className="fade-up font-serif text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl italic max-w-3xl leading-relaxed px-2">
          {t.slides[i]?.tag}
        </p>
        <div className="fade-up mt-4 sm:mt-6 md:mt-7 flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 w-full max-w-md sm:max-w-none">
          <button
            type="button"
            onClick={() => openDonation()}
            className="rounded-full bg-gradient-to-r from-amber-600 via-saffron to-amber-700 px-5 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm md:text-base font-black text-white shadow-temple ring-2 ring-gold hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_28px_rgba(234,179,8,0.7)] cursor-pointer flex items-center gap-2"
          >
            <HeartHandshake className="h-4 w-4 text-gold animate-pulse" />
            <span>{lang === "te" ? "విరాళం సమర్పించండి (Donate)" : "Devotional Offerings (Donate)"}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("puja")}
            className="rounded-full border-2 border-gold bg-black/25 backdrop-blur-xs px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-gold hover:bg-gold hover:text-maroon hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_28px_rgba(234,179,8,0.5)] cursor-pointer"
          >
            {lang === "te" ? "నిత్య పూజలు & సేవలు" : "Daily Sevas & Timings"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className="rounded-full border border-gold/70 bg-black/20 backdrop-blur-xs px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm md:text-base font-semibold text-primary-foreground/90 hover:bg-gold/20 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {t.explore}
          </button>
        </div>
      </div>
      <button
        aria-label="Previous"
        onClick={() => setI((i - 1 + n) % n)}
        className="absolute left-2 sm:left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/70 bg-maroon/60 backdrop-blur-xs p-2 sm:p-3 text-gold hover:bg-gold hover:text-maroon hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer shadow-lg hidden xs:grid sm:grid place-items-center"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={() => setI((i + 1) % n)}
        className="absolute right-2 sm:right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/70 bg-maroon/60 backdrop-blur-xs p-2 sm:p-3 text-gold hover:bg-gold hover:text-maroon hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer shadow-lg hidden xs:grid sm:grid place-items-center"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:gap-2">
        {images.map((_, idx) => (
          <button key={idx} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-2 sm:h-2.5 rounded-full transition-all ${idx === i ? "w-6 sm:w-8 bg-gold" : "w-2 sm:w-2.5 bg-primary-foreground/60"}`} />
        ))}
      </div>
    </section>
  );
}
