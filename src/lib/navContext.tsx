import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type NavSection = "home" | "history" | "puja" | "gallery" | "prasadam" | "info" | "contact";

interface NavContextType {
  activeTab: NavSection;
  setActiveTab: (tab: NavSection) => void;
  donationOpen: boolean;
  setDonationOpen: (open: boolean) => void;
  presetAmount: string;
  openDonation: (amount?: string) => void;
}

const VALID_TABS: NavSection[] = ["home", "history", "puja", "gallery", "prasadam", "info", "contact"];

const NavContext = createContext<NavContextType>({
  activeTab: "home",
  setActiveTab: () => {},
  donationOpen: false,
  setDonationOpen: () => {},
  presetAmount: "501",
  openDonation: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  // Always start at "home" so the site opens from the sacred top banner & hero
  const [activeTab, setActiveTabState] = useState<NavSection>("home");
  const [donationOpen, setDonationOpen] = useState(false);
  const [presetAmount, setPresetAmount] = useState<string>("501");

  const openDonation = (amount?: string) => {
    if (amount) {
      setPresetAmount(amount);
    }
    setDonationOpen(true);
  };

  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setActiveTab = (tab: NavSection) => {
    setActiveTabState(tab);

    if (typeof window !== "undefined") {
      isClickScrollingRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

      if (tab === "home") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(tab);
        if (el) {
          const navEl = document.querySelector("header");
          const headerHeight = navEl ? navEl.offsetHeight : 72;
          const offset = headerHeight + 16;
          const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }

      // Re-enable scrollspy only after smooth scrolling has settled
      const onScrollEnd = () => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scrollend", onScrollEnd);
      };
      if ("onscrollend" in window) {
        window.addEventListener("scrollend", onScrollEnd, { once: true });
      }
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable browser's automatic middle-of-page scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Clean up any stale hash from previous visits so page always opens from top
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Strictly ensure site opens from the very top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const topTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 60);

    // Scrollspy to move the active navbar bubble as user scrolls the website
    let ticking = false;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If at the very top of page
          if (window.scrollY < 120) {
            setActiveTabState("home");
            ticking = false;
            return;
          }

          // If scrolled near bottom of page
          const scrollBottom = window.innerHeight + window.scrollY;
          const docHeight = document.documentElement.scrollHeight;
          if (docHeight - scrollBottom < 140) {
            setActiveTabState("contact");
            ticking = false;
            return;
          }

          // Check sections in top-to-bottom reading order
          const orderedSections: NavSection[] = ["history", "puja", "gallery", "prasadam", "info", "contact"];
          const navEl = document.querySelector("header");
          const triggerLine = (navEl ? navEl.offsetHeight : 72) + 60; // Just below sticky header

          let activeSection: NavSection = "home";

          for (const id of orderedSections) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            // A section is active if its top is above or near the trigger line, and its bottom is still below it
            if (rect.top <= triggerLine && rect.bottom > triggerLine) {
              activeSection = id;
              break;
            }
          }

          setActiveTabState((prev) => (prev !== activeSection ? activeSection : prev));
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(topTimer);
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <NavContext.Provider
      value={{
        activeTab,
        setActiveTab,
        donationOpen,
        setDonationOpen,
        presetAmount,
        openDonation,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
