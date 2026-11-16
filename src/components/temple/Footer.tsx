import { Clock, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav, type NavSection } from "@/lib/navContext";
import { TEMPLE_CONFIG } from "@/lib/constants/templeConfig";
import { navItems } from "./Navbar";

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.5-.14-2.75-.14-2.8 0-4.75 1.7-4.75 4.89V9.5H7v4h3v9.5h4V13.5z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}

function YouTubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function XIcon({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const { t, lang } = useLang();
  const { setActiveTab } = useNav();

  return (
    <footer className="relative border-t-2 border-gold/70 bg-gradient-to-b from-[#2d0909] via-maroon to-[#1c0505] text-primary-foreground select-none overflow-hidden">
      {/* Devotional Top Golden Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-gold/10 via-gold to-gold/10" />

      {/* Sacred Mantra & Blessing Strip */}
      <div className="border-b border-gold/25 bg-black/25 py-2 px-4 text-center">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gold font-serif font-semibold tracking-wider">
          <span className="text-gold/80">✦</span>
          <span>
            {lang === "te"
              ? "|| ఓం శ్రీ దుర్గా వారాహి దేవ్యై నమః || సర్వే జనాః సుఖినో భవంతు ||"
              : "|| Om Sri Durga Varahi Devyai Namaha || Sarve Jana Sukhino Bhavantu ||"}
          </span>
          <span className="text-gold/80">✦</span>
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] px-4 sm:px-6 md:px-8 lg:px-10 py-9 sm:py-11">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Column 1: Temple Branding & Divine Presence (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="group flex items-center gap-3 text-left cursor-pointer transition-transform duration-200 hover:scale-[1.01] active:scale-95"
            >
              <span className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-saffron font-display text-2xl sm:text-3xl text-primary-foreground shadow-temple ring-2 ring-gold/80 shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                ॐ
              </span>
              <div className="flex flex-col text-left">
                <span className="font-serif text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-gold uppercase leading-tight">
                  {t.templeLine1}
                </span>
                <span className="font-display text-base sm:text-lg font-black tracking-wide text-white uppercase leading-tight mt-0.5 whitespace-nowrap">
                  {t.templeLine2}
                </span>
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] text-gold/90 uppercase leading-none mt-1">
                  <span className="h-px w-3 bg-gold/70" />
                  <span>{t.templeLocation}</span>
                  <span className="h-px w-3 bg-gold/70" />
                </div>
              </div>
            </button>

            <p className="text-xs sm:text-[13px] text-primary-foreground/85 font-serif leading-relaxed text-justify">
              {lang === "te"
                ? "శ్రీ దుర్గా వారాహి అమ్మవారి దివ్య క్షేత్రం (పిసిని గ్రామం, రణస్థలం మండలం). భక్తులందరికీ ఆయురారోగ్యాలు, విజయాలు, నిర్భయత్వం మరియు రక్షణ ప్రసాదించే పవిత్ర పుణ్యక్షేత్రం."
                : "Sacred abode of Sri Durga Varahi Devi at Pisini Village, Ranasthalam Mandal, Srikakulam District. Mother Varahi removes all obstacles, bestowing divine courage, victory and prosperity."}
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs text-gold font-medium shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
              <span>{t.footerTag}</span>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-gold" />
              <h4 className="font-display text-sm sm:text-base font-bold text-gold tracking-wider uppercase">
                {t.quick}
              </h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              {navItems.map(([k, id]) => (
                <li key={k}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(id as NavSection)}
                    className="group flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-all duration-200 cursor-pointer text-left py-0.5"
                  >
                    <span className="text-gold/50 group-hover:text-gold transition-colors text-[9px]">✦</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{t.nav[k]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Darshan & Seva Timings (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-gold" />
              <h4 className="font-display text-sm sm:text-base font-bold text-gold tracking-wider uppercase flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gold shrink-0" />
                <span>{t.timingsTitle}</span>
              </h4>
            </div>
            <div className="rounded-xl border border-gold/30 bg-black/35 p-3.5 space-y-2.5 text-xs sm:text-[13px] shadow-sm">
              <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                <span className="text-gold font-medium">{lang === "te" ? "ఉదయం దర్శనం" : "Morning Darshan"}</span>
                <span className="text-white font-semibold">05:30 AM – 12:30 PM</span>
              </div>
              <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                <span className="text-gold font-medium">{lang === "te" ? "సాయంత్రం దర్శనం" : "Evening Darshan"}</span>
                <span className="text-white font-semibold">04:00 PM – 09:00 PM</span>
              </div>
              <div className="flex items-center justify-between border-b border-gold/15 pb-2">
                <span className="text-gold font-medium">{lang === "te" ? "పంచమి విశేష పూజ" : "Panchami Tithi"}</span>
                <span className="text-white font-semibold">{lang === "te" ? "రాత్రి 11:00 వరకు" : "Open till 11:00 PM"}</span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-gold font-medium">{lang === "te" ? "నిత్య మహా అన్నదానం" : "Maha Annadanam"}</span>
                <span className="text-amber-300 font-bold">12:30 PM – 03:00 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Social Connect (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-gold" />
              <h4 className="font-display text-sm sm:text-base font-bold text-gold tracking-wider uppercase">
                {t.contact}
              </h4>
            </div>

            <div className="space-y-3 text-xs sm:text-[13px] text-primary-foreground/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <span className="leading-snug">{t.address}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <div className="flex flex-wrap items-center gap-1.5 font-bold">
                  <a href={`tel:${TEMPLE_CONFIG.WHATSAPP_NUMBER}`} className="hover:text-gold transition-colors underline decoration-gold/50 underline-offset-2">
                    {TEMPLE_CONFIG.PHONE_PRIMARY}
                  </a>
                  <span className="text-gold/60 font-normal">/</span>
                  <a href={`tel:${TEMPLE_CONFIG.PHONE_SECONDARY.replace(/[^0-9]/g, "").slice(-10)}`} className="hover:text-gold transition-colors underline decoration-gold/50 underline-offset-2">
                    {TEMPLE_CONFIG.PHONE_SECONDARY}
                  </a>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                <a
                  href={`https://wa.me/91${TEMPLE_CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors font-bold flex items-center gap-1.5"
                  title={`WhatsApp: ${TEMPLE_CONFIG.PHONE_PRIMARY}`}
                >
                  <span className="text-[#25D366]">WhatsApp:</span>
                  <span className="text-white underline decoration-[#25D366] underline-offset-2">{TEMPLE_CONFIG.PHONE_PRIMARY}</span>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${TEMPLE_CONFIG.TEMPLE_EMAIL}`} className="hover:text-gold transition-colors font-medium">
                  {TEMPLE_CONFIG.TEMPLE_EMAIL}
                </a>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-2 border-t border-gold/20">
              <p className="text-[11px] font-bold text-gold uppercase tracking-wider mb-2.5">
                {t.follow}
              </p>
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/91${TEMPLE_CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title={`WhatsApp: ${TEMPLE_CONFIG.PHONE_PRIMARY}`}
                  className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-[#25D366] text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:brightness-110 cursor-pointer"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </a>

                {/* Facebook */}
                <a
                  href={TEMPLE_CONFIG.FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook: Sri Durga Varahi Ammavaru Pisini"
                  className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-[#1877F2] text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:brightness-110 cursor-pointer"
                >
                  <FacebookIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </a>

                {/* Instagram */}
                <a
                  href={TEMPLE_CONFIG.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram: @sridurgavarahiammapisini"
                  className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:brightness-110 cursor-pointer"
                >
                  <InstagramIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                  className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-[#FF0000] text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:brightness-110 cursor-pointer"
                >
                  <YouTubeIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  title="X"
                  className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-black text-white border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-white/50 cursor-pointer"
                >
                  <XIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Admin Portal */}
      <div className="border-t border-gold/30 bg-black/40 py-4 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-primary-foreground/80">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {t.templeName}. {t.rights}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gold/75 hidden md:inline">
              {lang === "te" ? "పిసిని గ్రామ దేవస్థాన పాలక మండలి" : "Sri Durga Varahi Devasthanam Trust, Pisini"}
            </span>
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-gold hover:text-white text-xs font-semibold px-3.5 py-1.5 rounded-full bg-gold/15 hover:bg-gold/25 border border-gold/40 transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <span>{lang === "te" ? "ఆలయ పరిపాలన (Admin Portal)" : "Admin Portal"}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
