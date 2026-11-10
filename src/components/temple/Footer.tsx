import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { navItems } from "./Navbar";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t-4 border-gold bg-maroon text-primary-foreground">
      <div className="mx-auto grid max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1520px] gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-saffron font-display text-2xl text-primary-foreground shadow-temple ring-2 ring-gold/70 shrink-0">
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
          </div>
          <p className="mt-4 font-serif text-base italic text-gold/95">{t.footerTag}</p>
        </div>
        <div>
          <h4 className="font-display text-gold">{t.quick}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map(([k, id]) => (
              <li key={k}><a href={`#${id}`} className="opacity-85 hover:text-gold">{t.nav[k]}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold">{t.contact}</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{t.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold" /><a href="tel:8919418447">+91 89194 18447</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold" /><a href="mailto:info@varahiammatemple.org">info@varahiammatemple.org</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold">{t.follow}</h4>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Youtube].map((I, i) => (
              <a key={i} href="#" aria-label="Social" className="grid h-10 w-10 place-items-center rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-maroon"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gold/30 py-5 text-center text-sm opacity-80">
        © {new Date().getFullYear()} {t.templeName}. {t.rights}
      </div>
    </footer>
  );
}
