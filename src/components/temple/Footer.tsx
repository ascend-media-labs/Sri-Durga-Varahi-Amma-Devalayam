import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav, type NavSection } from "@/lib/navContext";
import { navItems } from "./Navbar";

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.5-.14-2.75-.14-2.8 0-4.75 1.7-4.75 4.89V9.5H7v4h3v9.5h4V13.5z" />
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
  const { t } = useLang();
  const { setActiveTab } = useNav();
  return (
    <footer className="border-t-4 border-gold bg-maroon text-primary-foreground">
      <div className="mx-auto grid max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className="group flex items-center gap-3 text-left cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-saffron font-display text-2xl text-primary-foreground shadow-temple ring-2 ring-gold/70 shrink-0 transition-transform duration-300 group-hover:rotate-6">
              ॐ
            </span>
            <div className="flex flex-col text-left">
              <span className="font-serif text-[11px] font-bold tracking-[0.16em] text-gold uppercase leading-tight">
                {t.templeLine1}
              </span>
              <span className="font-display text-base font-extrabold tracking-wider text-white uppercase leading-tight mt-0.5">
                {t.templeLine2}
              </span>
              <div className="flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[0.18em] text-gold/90 uppercase leading-none mt-1">
                <span className="h-px w-3 bg-gold/70" />
                <span>{t.templeLocation}</span>
                <span className="h-px w-3 bg-gold/70" />
              </div>
            </div>
          </button>
          <p className="mt-4 font-serif text-base italic text-gold/95">{t.footerTag}</p>
        </div>
        <div>
          <h4 className="font-display text-gold font-bold">{t.quick}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map(([k, id]) => (
              <li key={k}>
                <button
                  type="button"
                  onClick={() => setActiveTab(id as NavSection)}
                  className="opacity-85 hover:opacity-100 hover:text-gold hover:translate-x-1.5 cursor-pointer text-left transition-all duration-200 inline-block"
                >
                  {t.nav[k]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold">{t.contact}</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{t.address}</li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold mt-0.5" />
              <div className="flex flex-wrap items-center gap-1.5">
                <a href="tel:8919418447" className="hover:text-gold transition-colors underline decoration-gold/40 underline-offset-2">
                  +91 89194 18447
                </a>
                <span className="text-gold/60">/</span>
                <a href="tel:9642749187" className="hover:text-gold transition-colors underline decoration-gold/40 underline-offset-2">
                  +91 96427 49187
                </a>
              </div>
            </li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold" /><a href="mailto:info@varahiammatemple.org">info@varahiammatemple.org</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold">{t.follow}</h4>
          <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-[#1877F2] text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:brightness-110"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:brightness-110"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-[#FF0000] text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:brightness-110"
            >
              <YouTubeIcon className="h-5 w-5" />
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              title="X"
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-black text-white border border-white/20 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-white/50"
            >
              <XIcon className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/30 py-5 px-4 text-center text-xs sm:text-sm opacity-90 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-3">
        <div>
          © {new Date().getFullYear()} {t.templeName}. {t.rights}
        </div>
        <div>
          <a
            href="/admin"
            className="inline-flex items-center gap-1.5 text-gold hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full bg-gold/15 hover:bg-gold/25 border border-gold/40 transition-colors shadow-2xs"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ఆలయ పరిపాలన (Admin Portal)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
