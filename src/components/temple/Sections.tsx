import { useState, type ReactNode } from "react";
import { CalendarDays, Clock, Flower2, Mail, MapPin, MessageSquare, Phone, Send, Sparkles, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useTempleStore } from "@/lib/templeStore";
import temple from "@/assets/hero-temple.jpg";
import goddess from "@/assets/hero-goddess.jpg";
import aarti from "@/assets/hero-aarti.jpg";
import prasadam from "@/assets/prasadam.jpg";
import navaratriBanner from "@/assets/navaratri-banner.jpg";
import varahiMain from "@/assets/hero-varahi-main.jpg";
import varahiGreen from "@/assets/hero-varahi-green.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";

export function SectionTitle({
  children,
  className = "mb-3 sm:mb-4",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "sm";
}) {
  return (
    <div className={`text-center ${className}`}>
      <Flower2 className={`mx-auto text-gold ${size === "sm" ? "h-5 w-5" : "h-6 w-6"}`} />
      <h2
        className={`mt-1 font-display font-bold text-primary ${
          size === "sm" ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
        }`}
      >
        {children}
      </h2>
      <div className="mx-auto mt-1.5 flex items-center justify-center gap-2">
        <span className={`h-px bg-gold ${size === "sm" ? "w-10" : "w-14"}`} />
        <span className={`rotate-45 bg-primary ${size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2"}`} />
        <span className={`h-px bg-gold ${size === "sm" ? "w-10" : "w-14"}`} />
      </div>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="kolam-bg py-5 md:py-6 border-b border-border/60">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-12 md:gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column: Responsive Sacred Arch Image */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[240px] sm:max-w-[270px] md:max-w-[290px] lg:max-w-[340px] xl:max-w-[380px]">
              <div className="absolute -inset-2 rounded-t-full border-2 border-gold/80 shadow-xs" />
              <img
                src={varahiMain}
                alt="Goddess Sri Durga Varahi"
                loading="lazy"
                width={600}
                height={750}
                className="relative aspect-[3.8/5] max-h-[340px] lg:max-h-[390px] xl:max-h-[440px] w-full rounded-t-full object-cover object-center shadow-temple"
              />
            </div>
          </div>

          {/* Right Column: Information & Points (Screen-fitted for all display sizes) */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-primary tracking-wide">
              {t.aboutTitle}
            </h2>
            <div className="my-2 sm:my-2.5 flex items-center gap-1.5">
              <span className="h-0.5 w-12 bg-gold" />
              <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
              <span className="h-0.5 w-6 bg-gold/60" />
            </div>
            <p className="font-serif text-sm sm:text-base lg:text-lg leading-relaxed text-foreground/90 text-justify">
              {t.aboutText}
            </p>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-sm lg:text-base font-medium text-foreground/85">
              {t.aboutPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gold/15 text-gold shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function History() {
  const { t } = useLang();
  return (
    <section id="history" className="bg-secondary py-5 md:py-6">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <SectionTitle className="mb-3 sm:mb-4">{t.historyTitle}</SectionTitle>
        <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {t.history.map((h) => (
            <div key={h.year} className="temple-border rounded-xl bg-card p-3.5 sm:p-4 text-center shadow-temple">
              <p className="font-display text-base sm:text-lg font-bold text-primary">{h.year}</p>
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed text-justify">{h.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pujas() {
  const { t, lang } = useLang();
  const { pujas } = useTempleStore();
  const ev = t.navaratriEvent;
  const regularPujas = pujas.filter((p) => p.type === "puja" && p.active);

  return (
    <section id="puja" className="py-5 md:py-7">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <SectionTitle size="sm" className="mb-3 sm:mb-4">{t.pujaTitle}</SectionTitle>

        {/* Featured Navaratri Festival Banner & Bilingual Details Card */}
        <div className="mb-5 sm:mb-6 overflow-hidden rounded-2xl border-2 border-gold/70 bg-card shadow-temple transition-all">
          {/* Header Banner Image - Perfect Fit with Zero Cropping */}
          <div className="relative w-full overflow-hidden bg-maroon/10">
            <img
              src={navaratriBanner}
              alt={ev.eventTitle}
              width={1024}
              height={512}
              className="w-full h-auto block select-none transition-transform duration-500 hover:scale-[1.008]"
            />
          </div>

          {/* Detailed Content in English/Telugu */}
          <div className="p-4 sm:p-5 md:p-6 space-y-4">
            {/* Titles, Badge & Date Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/80 pb-3.5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-saffron px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-xs">
                    <Sparkles className="h-3 w-3" />
                    {ev.badge}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {ev.templeHeading}
                  </p>
                </div>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                  {ev.eventTitle}
                </h3>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/40 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-primary shadow-xs">
                  <CalendarDays className="h-4 w-4 text-gold shrink-0" />
                  <span>{ev.dateBadge}</span>
                </span>
              </div>
            </div>

            {/* Description & Rituals Points */}
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 items-start">
              {/* Left Column: Rituals & Annadanam */}
              <div className="space-y-3">
                <h4 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Flower2 className="h-4 w-4 text-gold" />
                  <span>{ev.ritualsTitle}</span>
                </h4>

                <ul className="space-y-1.5">
                  {ev.rituals.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-primary shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                {/* Annadanam Pill */}
                <div className="rounded-xl border border-gold/50 bg-saffron/10 p-3.5 flex items-center gap-3 text-xs sm:text-sm font-semibold text-primary">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-saffron text-primary-foreground shadow-xs">
                    🍚
                  </span>
                  <div>
                    <p className="font-bold">{ev.annadanamTitle}</p>
                    <p className="text-xs font-normal text-muted-foreground mt-0.5">{ev.annadanamText}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Location & Organizer Card */}
              <div className="space-y-3.5 rounded-xl border border-border bg-secondary/50 p-3.5 sm:p-4">
                {/* Location */}
                <div className="flex items-start gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4 text-gold" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{ev.locationLabel}</p>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground leading-snug">{ev.location}</p>
                  </div>
                </div>

                <div className="h-px bg-border/80" />

                {/* Organizer */}
                <div className="flex items-start gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4 text-gold" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{ev.organizerLabel}</p>
                    <p className="mt-0.5 text-xs sm:text-sm font-bold text-foreground">{ev.organizer}</p>
                    <p className="text-xs text-primary font-semibold mt-0.5">సెల్ / Phone: {ev.phone}</p>
                  </div>
                </div>

                {/* Call & Book Buttons */}
                <div className="pt-1 flex flex-wrap gap-2">
                  <a
                    href={`tel:${ev.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary py-1.5 px-3.5 text-center text-xs font-semibold text-primary-foreground transition hover:opacity-95 shadow-sm"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{ev.callButton}</span>
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-primary py-1.5 px-3.5 text-center text-xs font-semibold text-primary transition hover:bg-primary/10"
                  >
                    <span>{ev.enquireButton}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Daily & Monthly Sevas Header */}
        <div className="mb-3.5 flex items-center justify-between">
          <h4 className="font-display text-base sm:text-lg font-bold text-primary flex items-center gap-2">
            <CalendarDays className="h-4.5 w-4.5 text-gold" />
            <span>{t.regularPujasTitle}</span>
          </h4>
          <span className="h-px flex-1 bg-border/80 ml-4 hidden sm:block" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {regularPujas.map((p) => {
            const displayName = lang === "te" ? (p.nameTe || p.name) : p.name;
            const displayDesc = lang === "te" ? (p.descTe || p.desc) : p.desc;
            return (
              <div
                key={p.id}
                className="group flex flex-col rounded-xl border border-border bg-card p-3 sm:p-4 transition hover:-translate-y-0.5 hover:shadow-temple"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-saffron text-primary-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                  </span>
                  {p.dakshina && (
                    <span className="rounded-full bg-primary/10 border border-primary/30 px-2 py-0.5 text-[11px] font-bold text-primary">
                      {p.dakshina}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-sm sm:text-base font-bold text-primary">{displayName}</h3>
                <p className="mt-1 flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-accent-foreground">
                  <Clock className="h-3 w-3 text-gold" />
                  {p.time}
                </p>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground text-justify">{displayDesc}</p>
                <a
                  href="#contact"
                  className="mt-3 rounded-full border border-primary py-1 text-center text-xs font-semibold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  {t.bookNow}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const { t, lang } = useLang();
  const { gallery } = useTempleStore();
  const [activeImg, setActiveImg] = useState<{ src: string; title: string; desc: string } | null>(null);

  const galleryList = gallery.map((item) => ({
    src: item.src,
    title: lang === "te" ? (item.titleTe || item.title) : item.title,
    desc: lang === "te" ? (item.descTe || item.desc) : item.desc,
  }));

  return (
    <section id="gallery" className="bg-maroon py-6 md:py-8 text-primary-foreground">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-4 sm:mb-5 text-center">
          <Flower2 className="mx-auto h-5 w-5 text-gold" />
          <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl font-bold text-gold">{t.templeTitle}</h2>
          <p className="mt-1 text-xs sm:text-sm text-gold/80 max-w-lg mx-auto">{t.gallerySub}</p>
          <div className="mx-auto mt-2 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-gold/60" /><span className="h-1.5 w-1.5 rotate-45 bg-gold" /><span className="h-px w-10 bg-gold/60" />
          </div>
        </div>

        {/* Gallery Grid - 12 Sacred Temple Photos */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 md:gap-4 xl:gap-5">
          {galleryList.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveImg(item)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-gold/40 bg-card/10 shadow-md transition-all duration-300 hover:border-gold hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>

              {/* Hover Caption */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-maroon/95 via-maroon/40 to-transparent p-2.5 sm:p-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-display text-xs sm:text-sm font-bold text-gold leading-tight">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] text-primary-foreground/80 line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Corner badge */}
              <div className="absolute top-2 right-2 rounded-full bg-maroon/80 px-2 py-0.5 text-[10px] font-semibold text-gold border border-gold/40">
                #{i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Timings */}
        <div className="mt-5 sm:mt-6 grid gap-3 rounded-xl border border-gold/40 bg-card/5 backdrop-blur-xs p-3.5 sm:p-4 text-center sm:grid-cols-4">
          <p className="font-display text-base font-bold text-gold sm:text-left flex items-center justify-center sm:justify-start">{t.timingsTitle}</p>
          {t.timings.map(([a, b]) => (
            <div key={a} className="rounded-lg bg-gold/10 p-2 sm:bg-transparent sm:p-0">
              <p className="font-semibold text-xs sm:text-sm text-gold">{a}</p>
              <p className="text-[11px] sm:text-xs opacity-85 mt-0.5">{b}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImg && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveImg(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl border-2 border-gold/80 bg-maroon p-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImg(null)}
              className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-gold hover:bg-gold hover:text-maroon transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="overflow-hidden rounded-xl border border-gold/40 max-h-[75vh] flex items-center justify-center bg-black/40">
              <img
                src={activeImg.src}
                alt={activeImg.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="mt-4">
              <h4 className="font-display text-lg font-bold text-gold">{activeImg.title}</h4>
              <p className="text-xs sm:text-sm text-primary-foreground/80 mt-1">{activeImg.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function Prasadam() {
  const { t, lang } = useLang();
  const { prasadams, annadanamInfo } = useTempleStore();
  const availablePrasadams = prasadams.filter((p) => p.isAvailable);

  const mainPrasadamText = lang === "te" ? (annadanamInfo.descTe || t.prasadamText) : (annadanamInfo.desc || t.prasadamText);

  return (
    <section id="prasadam" className="kolam-bg py-5 md:py-7">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <SectionTitle size="sm" className="mb-3 sm:mb-4">{t.prasadamTitle}</SectionTitle>
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="mx-auto w-full max-w-md lg:max-w-lg">
            <img
              src={prasadam}
              alt="Prasadam"
              loading="lazy"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full rounded-xl border-2 border-gold/60 object-cover shadow-temple max-h-[300px] lg:max-h-[360px]"
            />
          </div>
          <div>
            <p className="font-serif text-sm sm:text-base lg:text-lg leading-relaxed text-foreground text-justify">{mainPrasadamText}</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {availablePrasadams.map((p) => {
                const displayName = lang === "te" ? (p.nameTe || p.name) : p.name;
                const displayDesc = lang === "te" ? (p.descTe || p.desc) : p.desc;
                return (
                  <div key={p.id} className="rounded-lg border-l-4 border-primary bg-card p-3 shadow-xs">
                    <p className="font-display text-xs sm:text-sm font-bold text-primary">{displayName}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{displayDesc}</p>
                    {p.price && (
                      <span className="mt-1 inline-block text-[10px] font-bold text-gold">
                        {p.price}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Slokhas() {
  const { t } = useLang();
  return (
    <section id="info" className="bg-secondary py-5 md:py-7">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <SectionTitle className="mb-3 sm:mb-4">{t.slokhaTitle}</SectionTitle>
        <div className="grid gap-3.5 sm:gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {t.slokhas.map((s) => (
            <div key={s.title} className="temple-border rounded-xl bg-card p-4 sm:p-5 text-center">
              <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">{s.title}</p>
              <p className="mt-2.5 font-serif text-base sm:text-lg italic leading-relaxed">“{s.text}”</p>
              <p className="mt-2.5 text-xs text-muted-foreground text-justify">{s.meaning}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  const c = t.contactSection;
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-6 md:py-8 kolam-bg">
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Card: Get in touch */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            {/* Watermark ॐ */}
            <span className="pointer-events-none absolute -bottom-6 -right-4 font-display text-9xl text-gold/10 select-none">
              ॐ
            </span>

            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                {c.getInTouch}
              </h3>
              <div className="my-3 h-0.5 w-12 bg-gold" />

              <div className="mt-6 space-y-6">
                {/* Location / Executive Officer */}
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary border border-gold/30 shadow-xs">
                    <MapPin className="h-5 w-5 text-primary" />
                  </span>
                  <div className="text-xs sm:text-sm">
                    <p className="font-bold text-foreground">{c.officerTitle}</p>
                    <p className="font-semibold text-primary">{c.devasthanamName}</p>
                    <p className="mt-0.5 text-muted-foreground leading-snug">{c.addressDetails}</p>
                    <a
                      href="https://maps.google.com/?q=Pisini+Ranasthalam+Srikakulam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-block rounded-md border border-primary/50 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground shadow-2xs"
                    >
                      {c.getDirections}
                    </a>
                  </div>
                </div>

                {/* Phone / Information Center */}
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary border border-gold/30 shadow-xs">
                    <Phone className="h-4.5 w-4.5 text-primary" />
                  </span>
                  <div className="text-xs sm:text-sm">
                    <p className="text-muted-foreground">{c.queriesText}</p>
                    <p className="mt-1 font-bold text-foreground tracking-wide">
                      <a href="tel:8919418447" className="hover:text-primary transition-colors">
                        {c.phoneNumbers}
                      </a>
                    </p>
                    <p className="text-muted-foreground mt-0.5 font-medium">{c.fax}</p>
                    <p className="font-bold text-primary mt-0.5">{c.tollFree}</p>
                  </div>
                </div>

                {/* Friendly team message */}
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary border border-gold/30 shadow-xs">
                    <MessageSquare className="h-4.5 w-4.5 text-primary" />
                  </span>
                  <p className="text-xs sm:text-sm text-muted-foreground pt-1.5 leading-relaxed text-justify">
                    {c.friendlyTeam}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary border border-gold/30 shadow-xs">
                    <Mail className="h-4.5 w-4.5 text-primary" />
                  </span>
                  <div className="text-xs sm:text-sm pt-0.5">
                    <p className="text-muted-foreground">{c.dropLine}</p>
                    <a
                      href={`mailto:${c.email}`}
                      className="font-semibold text-primary hover:underline mt-0.5 block"
                    >
                      {c.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Send Us A Message */}
          <div className="lg:col-span-7 rounded-2xl border border-gold/40 bg-card p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-primary tracking-wide">
                {c.sendMsgTitle}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {c.sendMsgSub}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  (e.target as HTMLFormElement).reset();
                }}
                className="mt-6 space-y-4"
              >
                {/* 2-column grid inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {c.firstName} <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      placeholder={c.firstNamePh}
                      className="w-full rounded-lg border border-input bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {c.lastName} <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      placeholder={c.lastNamePh}
                      className="w-full rounded-lg border border-input bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {c.mobile} <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder={c.mobilePh}
                      className="w-full rounded-lg border border-input bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {c.emailLabel} <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder={c.emailPh}
                      className="w-full rounded-lg border border-input bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Contact Type Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {c.contactType} <span className="text-destructive">*</span>
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-input bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        {c.selectContactType}
                      </option>
                      {c.contactTypes.map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[11px] text-muted-foreground">{c.contactTypeHelper}</p>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {c.service} <span className="text-destructive">*</span>
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-input bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>
                        {c.selectService}
                      </option>
                      {c.services.map((sv) => (
                        <option key={sv} value={sv}>
                          {sv}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[11px] text-muted-foreground">{c.serviceHelper}</p>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {c.message} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={c.messagePh}
                    className="w-full rounded-lg border border-input bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div>
                    {sent && (
                      <p className="text-xs sm:text-sm font-semibold text-primary animate-in fade-in">
                        {c.sentSuccess}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-temple transition hover:brightness-110 active:scale-95"
                  >
                    <span>{c.sendMessage}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
