import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

  const setActiveTab = (tab: NavSection) => {
    setActiveTabState(tab);
    if (typeof window !== "undefined") {
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const currentHash = window.location.hash.replace("#", "") as NavSection;
      if (VALID_TABS.includes(currentHash)) {
        setActiveTabState(currentHash);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (!window.location.hash || window.location.hash === "#") {
        setActiveTabState("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
