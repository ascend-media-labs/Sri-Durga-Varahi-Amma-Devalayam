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
          el.scrollIntoView({ behavior: "smooth" });
        }
      }

      if (window.history?.replaceState) {
        window.history.replaceState(null, "", tab === "home" ? window.location.pathname : `#${tab}`);
      }

      clickTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 850);
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
          const sections: { id: NavSection; el: HTMLElement }[] = [
            { id: "contact" as const, el: document.getElementById("contact")! },
            { id: "info" as const, el: document.getElementById("info")! },
            { id: "prasadam" as const, el: document.getElementById("prasadam")! },
            { id: "gallery" as const, el: document.getElementById("gallery")! },
            { id: "puja" as const, el: document.getElementById("puja")! },
            { id: "history" as const, el: document.getElementById("history")! },
          ].filter((s) => s.el !== null);

          // If sections are not present on the current page (e.g. /admin), do not alter activeTab
          if (sections.length === 0) {
            ticking = false;
            return;
          }

          // Check if scrolled near the bottom of page
          const scrollBottom = window.innerHeight + window.scrollY;
          const docHeight = document.documentElement.scrollHeight;
          if (docHeight - scrollBottom < 120) {
            setActiveTabState("contact");
            ticking = false;
            return;
          }

          // Check sections top-to-bottom offset with navbar compensation
          const scrollPos = window.scrollY + 180;
          let current: NavSection = "home";

          for (const s of sections) {
            if (scrollPos >= s.el.offsetTop) {
              current = s.id;
              break;
            }
          }

          setActiveTabState((prev) => (prev !== current ? current : prev));
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
        setTimeout(() => {
          document.getElementById(initial)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
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
