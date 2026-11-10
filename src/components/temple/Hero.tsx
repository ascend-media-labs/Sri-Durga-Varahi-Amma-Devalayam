import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import varahiMain from "@/assets/hero-varahi-main.jpg";
import goddess from "@/assets/hero-varahi-green.jpg";
import temple from "@/assets/hero-temple.jpg";
import aarti from "@/assets/hero-aarti.jpg";

const images = [varahiMain, goddess, temple, aarti];

export function Hero() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const n = images.length;
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % n), 5500);
    return () => clearInterval(id);
  }, [n]);

  return (
    <section id="home" className="relative h-[78vh] sm:h-[82vh] md:h-[85vh] min-h-[480px] sm:min-h-[520px] max-h-[850px] overflow-hidden">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={t.slides[idx]?.title}
          width={1920}
          height={1088}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1500ms] ${idx === i ? "scale-100 opacity-100" : "scale-108 opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/40 to-maroon/20" />
      <div key={i} className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 sm:px-6 text-center text-primary-foreground">
        <p className="fade-up text-sm sm:text-base md:text-lg tracking-wider text-gold font-medium">ॐ श्री वाराह्यै नमः</p>
        <h1 className="fade-up mt-2 sm:mt-3 md:mt-4 font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg leading-tight">
          {t.slides[i]?.title}
        </h1>
        <div className="fade-up my-3 sm:my-4 md:my-5 h-px w-28 sm:w-36 md:w-44 bg-gold" />
        <p className="fade-up font-serif text-base sm:text-lg md:text-xl lg:text-2xl italic max-w-3xl leading-relaxed">
          {t.slides[i]?.tag}
        </p>
        <div className="fade-up mt-5 sm:mt-7 md:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          <a href="#puja" className="rounded-full bg-saffron px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold shadow-temple ring-2 ring-gold/70 hover:opacity-90 transition-opacity">
            {t.bookPuja}
          </a>
          <a href="#gallery" className="rounded-full border-2 border-gold px-5 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold text-gold hover:bg-gold hover:text-maroon transition-colors">
            {t.explore}
          </a>
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
