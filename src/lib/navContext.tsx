import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type NavSection = "home" | "history" | "puja" | "gallery" | "prasadam" | "info" | "contact";

interface NavContextType {
  activeTab: NavSection;
  setActiveTab: (tab: NavSection) => void;
}

const VALID_TABS: NavSection[] = ["home", "history", "puja", "gallery", "prasadam", "info", "contact"];

const NavContext = createContext<NavContextType>({
  activeTab: "home",
  setActiveTab: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<NavSection>(() => {
    if (typeof window === "undefined") return "home";
    const initialHash = window.location.hash.replace("#", "") as NavSection;
    return VALID_TABS.includes(initialHash) ? initialHash : "home";
  });

  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setActiveTab = (tab: NavSection) => {
    setActiveTabState(tab);

    if (typeof window !== "undefined") {
      isClickScrollingRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

      if (tab === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(tab);
        if (el) {
          const navEl = document.querySelector("header");
          const headerHeight = navEl ? navEl.offsetHeight + 16 : 96;
          const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerHeight);
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }

      if (window.history?.replaceState) {
        window.history.replaceState(null, "", tab === "home" ? window.location.pathname : `#${tab}`);
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
      }, 1200);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Handle deep linking hash change (browser back/forward)
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace("#", "") as NavSection;
      if (VALID_TABS.includes(currentHash)) {
        setActiveTab(currentHash);
      } else if (!window.location.hash || window.location.hash === "#") {
        setActiveTab("home");
      }
    };

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
          if (docHeight - scrollBottom < 120) {
            setActiveTabState("contact");
            ticking = false;
            return;
          }

          // Check sections in top-to-bottom reading order
          const orderedSections: NavSection[] = ["history", "puja", "gallery", "prasadam", "info", "contact"];
          const navEl = document.querySelector("header");
          const triggerLine = (navEl ? navEl.offsetHeight : 80) + 60; // Just below the sticky header

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
    window.addEventListener("hashchange", handleHashChange);

    // Initial check on page load if hash exists
    if (window.location.hash) {
      const initial = window.location.hash.replace("#", "") as NavSection;
      if (VALID_TABS.includes(initial) && initial !== "home") {
        const scrollToInitial = () => {
          const el = document.getElementById(initial);
          if (el) {
            const navEl = document.querySelector("header");
            const headerHeight = navEl ? navEl.offsetHeight + 16 : 96;
            const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerHeight);
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
        };
        setTimeout(scrollToInitial, 150);
        setTimeout(scrollToInitial, 600);
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
