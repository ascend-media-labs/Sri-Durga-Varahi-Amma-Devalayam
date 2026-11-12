import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/navContext";
import varahiMain from "@/assets/hero-varahi-main.jpg";
import goddess from "@/assets/hero-varahi-green.jpg";
import temple from "@/assets/hero-temple.jpg";
import aarti from "@/assets/hero-aarti.jpg";

const images = [varahiMain, goddess, temple, aarti];

export function Hero() {
  const { t } = useLang();
  const { setActiveTab } = useNav();
  const [i, setI] = useState(0);
  const n = images.length;
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % n), 5500);
    return () => clearInterval(id);
  }, [n]);

  return (
    <section id="home" className="relative h-[76vh] sm:h-[80vh] md:h-[84vh] lg:h-[88vh] min-h-[480px] sm:min-h-[520px] max-h-[840px] overflow-hidden">
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
      <div key={i} className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-end pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 px-4 sm:px-6 text-center text-primary-foreground">
        <p className="fade-up text-xs sm:text-sm md:text-base lg:text-lg tracking-wider text-gold font-medium">ॐ श्री वाराह्यै नमः</p>
        <h1 className="fade-up mt-1.5 sm:mt-2.5 md:mt-3 font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-lg leading-tight">
          {t.slides[i]?.title}
        </h1>
        <div className="fade-up my-2.5 sm:my-3.5 md:my-4 h-px w-24 sm:w-32 md:w-40 bg-gold" />
        <p className="fade-up font-serif text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl italic max-w-3xl leading-relaxed">
          {t.slides[i]?.tag}
        </p>
        <div className="fade-up mt-4 sm:mt-6 md:mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
          <button
            type="button"
            onClick={() => setActiveTab("puja")}
            className="rounded-full bg-saffron px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 text-xs sm:text-sm md:text-base font-semibold shadow-temple ring-2 ring-gold/70 hover:opacity-90 transition-opacity cursor-pointer"
          >
            {t.bookPuja}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className="rounded-full border-2 border-gold px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-gold hover:bg-gold hover:text-maroon transition-colors cursor-pointer"
          >
            {t.explore}
          </button>
        </div>
      </div>
      <button aria-label="Previous" onClick={() => setI((i - 1 + n) % n)} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/60 bg-maroon/40 p-3 text-gold hover:bg-primary">
        <ChevronLeft />
      </button>
      <button aria-label="Next" onClick={() => setI((i + 1) % n)} className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/60 bg-maroon/40 p-3 text-gold hover:bg-primary">
        <ChevronRight />
      </button>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, idx) => (
          <button key={idx} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2.5 bg-primary-foreground/60"}`} />
        ))}
      </div>
    </section>
  );
}
