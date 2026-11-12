import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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
import varahiMain from "@/assets/hero-varahi-main.jpg";
import varahiGreen from "@/assets/hero-varahi-green.jpg";
import navaratriBanner from "@/assets/navaratri-banner.jpg";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  titleTe: string;
  desc: string;
  descTe: string;
  category: string;
  dateAdded: string;
}

export interface PujaEventItem {
  id: string;
  name: string;
  nameTe: string;
  time: string;
  desc: string;
  descTe: string;
  dakshina: string;
  type: "puja" | "event";
  category?: string;
  bannerUrl?: string;
  startDate?: string;
  endDate?: string;
  active: boolean;
}

export interface PrasadamItem {
  id: string;
  name: string;
  nameTe: string;
  desc: string;
  descTe: string;
  timing: string;
  category: "annadanam" | "special_prasadam" | "daily";
  isAvailable: boolean;
  price?: string;
  imageUrl?: string;
}

export interface AnnadanamInfo {
  title: string;
  titleTe: string;
  timing: string;
  dailyCount: string;
  desc: string;
  descTe: string;
  sponsorInfo: string;
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    src: gallery1,
    title: "Goddess Sri Durga Varahi Idol",
    titleTe: "శ్రీ దుర్గా వారాహి అమ్మవారి దివ్య విగ్రహం",
    desc: "Sacred darshan in magnificent red silk saree and golden ornaments at Pisini temple sanctum.",
    descTe: "పిసిని క్షేత్ర గర్భగుడిలో పట్టుచీర మరియు స్వర్ణాలంకరణతో విరాజిల్లుతున్న అమ్మవారి దివ్య దర్శనం.",
    category: "Sanctum",
    dateAdded: "2026-10-01",
  },
  {
    id: "gal-2",
    src: gallery2,
    title: "Maha Abhishekam Alankaram",
    titleTe: "మహా అభిషేక విశేష అలంకారం",
    desc: "Holy panchamrita abhishekam performed during auspicious Panchami tithi.",
    descTe: "పంచమి తిథి పర్వదినాన పంచామృతాలతో అమ్మవారికి నిర్వహించిన మహాభిషేకం.",
    category: "Alankaram",
    dateAdded: "2026-10-02",
  },
  {
    id: "gal-3",
    src: gallery3,
    title: "Raja Rajeswari Swaroopam",
    titleTe: "రాజరాజేశ్వరి స్వరూపం",
    desc: "Ammavaru adorned in majestic jewels and fragrant flower garland.",
    descTe: "రాచరిక వైభవంతో పూలమాలలు, స్వర్ణాభరణాలతో దివ్య దర్శనం.",
    category: "Alankaram",
    dateAdded: "2026-10-03",
  },
  {
    id: "gal-4",
    src: gallery4,
    title: "Simha Vahana Utsavam",
    titleTe: "సింహ వాహన ఉత్సవం",
    desc: "Warrior goddess Varahi on sacred lion mount symbolizing triumph over obstacles.",
    descTe: "విఘ్నాలు నశింపజేసి విజయం చేకూర్చే సింహ వాహనారూఢ వారాహి అమ్మవారు.",
    category: "Utsavam",
    dateAdded: "2026-10-04",
  },
  {
    id: "gal-5",
    src: gallery5,
    title: "Kumkumarchana Seva",
    titleTe: "కుంకుమార్చన సేవ",
    desc: "Devotees offering sacred vermilion and Lalitha Sahasranama chanting.",
    descTe: "భక్తులు భక్తిశ్రద్ధలతో సమర్పించే కుంకుమార్చన సేవ.",
    category: "Sanctum",
    dateAdded: "2026-10-05",
  },
  {
    id: "gal-6",
    src: gallery6,
    title: "Deeparadhana Aarti",
    titleTe: "దీపారాధన హారతి",
    desc: "Divine evening aarti with holy brass lamps illuminating the sanctum.",
    descTe: "సంధ్యా వేళ దివ్య దీపకాంతులతో అమ్మవారికి సమర్పించే మహా మంగళహారతి.",
    category: "Utsavam",
    dateAdded: "2026-10-06",
  },
  {
    id: "gal-7",
    src: gallery7,
    title: "Panchami Vishesha Darshanam",
    titleTe: "పంచమి విశేష దర్శనం",
    desc: "Thousands of pilgrims thronging Pisini temple on Shukla Panchami.",
    descTe: "శుక్ల పంచమి రోజున భక్తజన సందోహం నడుమ అమ్మవారి విశేష దర్శనం.",
    category: "Sanctum",
    dateAdded: "2026-10-07",
  },
  {
    id: "gal-8",
    src: gallery8,
    title: "Golden Kavacham Alankaram",
    titleTe: "స్వర్ణ కవచాలంకారం",
    desc: "Radiant golden armour adornment during annual Brahmotsavam.",
    descTe: "వార్షిక బ్రహ్మోత్సవాలలో ధరింపజేసిన దివ్య స్వర్ణ కవచం.",
    category: "Alankaram",
    dateAdded: "2026-10-08",
  },
  {
    id: "gal-9",
    src: gallery9,
    title: "Chandi Homam",
    titleTe: "చండీ హోమం",
    desc: "Vedic priests performing Maha Chandi Yagnam for universal peace and protection.",
    descTe: "లోక కళ్యాణార్థం వేద పండితులచే నిర్వహించిన మహా చండీ హోమం.",
    category: "Utsavam",
    dateAdded: "2026-10-09",
  },
  {
    id: "gal-10",
    src: gallery10,
    title: "Nitya Annadanam Mandapam",
    titleTe: "నిత్య అన్నదాన మండపం",
    desc: "Hot holy meals distributed with reverence to all visiting devotees.",
    descTe: "ఆలయానికి వచ్చే ప్రతి భక్తునికి ఆప్యాయంగా అందించే నిత్య అన్నప్రసాద వితరణ.",
    category: "Devotees",
    dateAdded: "2026-10-10",
  },
  {
    id: "gal-11",
    src: varahiMain,
    title: "Sri Durga Varahi Moola Murti",
    titleTe: "శ్రీ దుర్గా వారాహి మూలమూర్తి",
    desc: "Principal deity with sacred lotus, conch, discus and abhaya mudra.",
    descTe: "శంఖ, చక్ర, అభయ ముద్రలతో పిసిని క్షేత్రంలో కొలువైన మూలవిరాట్.",
    category: "Sanctum",
    dateAdded: "2026-10-11",
  },
  {
    id: "gal-12",
    src: varahiGreen,
    title: "Green Silk Alankaram",
    titleTe: "పచ్చని పట్టుచీర అలంకారం",
    desc: "Auspicious emerald green saree adornment bestowing health and prosperity.",
    descTe: "ఆయురారోగ్యాలు, ఐశ్వర్యాన్ని ప్రసాదించే పచ్చపట్టు అలంకారంలో అమ్మవారు.",
    category: "Alankaram",
    dateAdded: "2026-10-12",
  },
];

const defaultPujas: PujaEventItem[] = [
  {
    id: "puja-1",
    name: "Kumkuma Puja",
    nameTe: "కుంకుమ పూజ",
    time: "07:00 AM - 08:30 AM",
    desc: "Auspicious archana with consecrated vermilion for harmony, good health and family prosperity.",
    descTe: "సౌభాగ్యం, ఆయురారోగ్యాల కొరకు పవిత్ర కుంకుమతో అమ్మవారికి నిర్వహించే అర్చన.",
    dakshina: "₹150",
    type: "puja",
    active: true,
  },
  {
    id: "puja-2",
    name: "Nitya Abhishekam",
    nameTe: "నిత్య అభిషేకం",
    time: "08:30 AM - 10:00 AM",
    desc: "Sacred milk, honey, sandalwood and panchamrita bath offered to Goddess Varahi.",
    descTe: "పాలు, తేనె, గంధం, పంచామృతాలతో శ్రీ దుర్గా వారాహి అమ్మవారికి పవిత్ర అభిషేకం.",
    dakshina: "₹250",
    type: "puja",
    active: true,
  },
  {
    id: "puja-3",
    name: "Sahasranama Archana",
    nameTe: "సహస్రనామార్చన",
    time: "11:00 AM - 12:30 PM",
    desc: "Chanting 1000 sacred names of Mother Varahi with fragrant bilva and lotus flowers.",
    descTe: "1008 పవిత్ర దివ్య నామాలతో బిల్వదళాలు, కమలాలతో నిర్వహించే సహస్రనామార్చన.",
    dakshina: "₹300",
    type: "puja",
    active: true,
  },
  {
    id: "puja-4",
    name: "Rahu Kala Puja",
    nameTe: "రాహుకాల పూజ",
    time: "04:30 PM - 06:00 PM",
    desc: "Special evening worship to remove evil eye, planetary doshas and negative forces.",
    descTe: "దృష్టి దోషాలు, నవగ్రహ బాధలు తొలగించి విజయం చేకూర్చే సాయంత్రం రాహుకాల పూజ.",
    dakshina: "₹500",
    type: "puja",
    active: true,
  },
  {
    id: "puja-5",
    name: "Panchami Vishesha Puja",
    nameTe: "పంచమి విశేష పూజ",
    time: "Panchami Tithi (All Day)",
    desc: "Exclusive monthly festival puja on Shukla & Krishna Panchami with special homam.",
    descTe: "వారాహి అమ్మవారికి అత్యంత ప్రీతిపాత్రమైన పంచమి తిథి రోజున జరిగే విశేష హోమం, పూజలు.",
    dakshina: "₹516",
    type: "puja",
    active: true,
  },
  {
    id: "event-1",
    name: "Sri Durga Varahi Navaratri Utsavalu",
    nameTe: "శ్రీ దుర్గా వారాహి అమ్మవారి నవరాత్రి వేడుకలు",
    time: "11.10.2026 to 20.10.2026",
    desc: "Grand 9-day annual festival featuring daily Kumkumarchana, Sahasranama rituals and continuous Annadanam.",
    descTe: "తొమ్మిది రోజులు అత్యంత ఘనంగా జరిగే వార్షిక నవరాత్రి మహోత్సవాలు, నిత్య కుంకుమార్చన మరియు భారీ అన్నదానం.",
    dakshina: "Sarva Darshan Free",
    type: "event",
    category: "Grand Festival",
    bannerUrl: navaratriBanner,
    startDate: "2026-10-11",
    endDate: "2026-10-20",
    active: true,
  },
];

const defaultPrasadams: PrasadamItem[] = [
  {
    id: "pras-1",
    name: "Maha Anna Prasadam",
    nameTe: "మహా అన్నప్రసాదం",
    desc: "Holy hot rice served with aromatic sambhar, rasam, curd and traditional vegetable curry.",
    descTe: "సాంబారు, రసం, పెరుగు మరియు కూరలతో భక్తులందరికీ అందించే పవిత్ర అన్నప్రసాదం.",
    timing: "12:30 PM - 03:00 PM Daily",
    category: "annadanam",
    isAvailable: true,
    price: "Free (ఉచితం)",
  },
  {
    id: "pras-2",
    name: "Pulihora (Tamarind Rice)",
    nameTe: "పులిహోర ప్రసాదం",
    desc: "Auspicious temple tamarind rice seasoned with mustard, groundnuts, curry leaves and green chillies.",
    descTe: "ఆవాలు, వేరుశెనగలు, కరివేపాకు తిరగమాతతో రుచికరంగా తయారుచేసిన పవిత్ర పులిహోర.",
    timing: "Available Daily at Counter",
    category: "daily",
    isAvailable: true,
    price: "₹20 / Packet",
  },
  {
    id: "pras-3",
    name: "Chakkara Pongali",
    nameTe: "చక్కెర పొంగలి",
    desc: "Divine sweet rice cooked with pure desi cow ghee, organic jaggery, cardamom and roasted cashews.",
    descTe: "స్వచ్ఛమైన దేశవాళీ ఆవునెయ్యి, బెల్లం, జీడిపప్పు, యాలకులతో తయారుచేసిన తీపి ప్రసాదం.",
    timing: "Available on Festival Days & Friday",
    category: "special_prasadam",
    isAvailable: true,
    price: "₹30 / Bowl",
  },
  {
    id: "pras-4",
    name: "Daddojanam (Curd Rice)",
    nameTe: "దద్దోజనం",
    desc: "Cooling tempered curd rice with ginger, cumin and hing, beloved of Mother Varahi.",
    descTe: "అల్లం, జీలకర్ర, ఇంగువ తిరగమాతతో చలువ చేసే దివ్య దద్దోజనం.",
    timing: "Morning & Afternoon Sevas",
    category: "daily",
    isAvailable: true,
    price: "₹20 / Bowl",
  },
  {
    id: "pras-5",
    name: "Devasthanam Ghee Laddu",
    nameTe: "దేవస్థానం నెయ్యి లడ్డూ",
    desc: "Traditional rich gram-flour laddu prepared with pure cow ghee and fragrant cardamom.",
    descTe: "ఆవునెయ్యి, శనగపిండి, యాలకుల సువాసనతో తయారుచేసిన పవిత్రమైన ఆలయ లడ్డూ.",
    timing: "All Day at Prasadam Counter",
    category: "special_prasadam",
    isAvailable: true,
    price: "₹25 / Laddu",
  },
];

const defaultAnnadanamInfo: AnnadanamInfo = {
  title: "Sri Durga Varahi Nitya Annadanam Scheme",
  titleTe: "శ్రీ దుర్గా వారాహి నిత్య అన్నదాన పథకం",
  timing: "12:30 PM - 03:00 PM Daily",
  dailyCount: "1,500+ Devotees Served Daily",
  desc: "At Sri Durga Varahi Amma Devalayam, Pisini, every devotee who visits is treated as a guest of Goddess Varahi and served hot sanctified meals.",
  descTe: "పిసిని శ్రీ దుర్గా వారాహి అమ్మవారి ఆలయానికి విచ్చేసే ప్రతి భక్తునికి అమ్మవారి అనుగ్రహంతో కడుపునిండా పవిత్ర అన్నప్రసాదం అందజేయబడుతుంది.",
  sponsorInfo: "Devotees can sponsor Annadanam on birthdays, anniversaries, and memorial days.",
};

interface TempleStoreContextType {
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, "id" | "dateAdded">) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  resetGallery: () => void;

  pujas: PujaEventItem[];
  addPuja: (item: Omit<PujaEventItem, "id">) => void;
  updatePuja: (id: string, item: Partial<PujaEventItem>) => void;
  deletePuja: (id: string) => void;
  resetPujas: () => void;

  prasadams: PrasadamItem[];
  addPrasadam: (item: Omit<PrasadamItem, "id">) => void;
  updatePrasadam: (id: string, item: Partial<PrasadamItem>) => void;
  deletePrasadam: (id: string) => void;
  resetPrasadams: () => void;

  annadanamInfo: AnnadanamInfo;
  updateAnnadanamInfo: (info: Partial<AnnadanamInfo>) => void;
  resetAll: () => void;
}

const TempleStoreContext = createContext<TempleStoreContextType | null>(null);

const STORAGE_KEYS = {
  GALLERY: "varahi_temple_gallery_v1",
  PUJAS: "varahi_temple_pujas_v1",
  PRASADAM: "varahi_temple_prasadam_v1",
  ANNADANAM: "varahi_temple_annadanam_v1",
};

export function TempleStoreProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    if (typeof window === "undefined") return defaultGalleryItems;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : defaultGalleryItems;
    } catch {
      return defaultGalleryItems;
    }
  });

  const [pujas, setPujas] = useState<PujaEventItem[]>(() => {
    if (typeof window === "undefined") return defaultPujas;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PUJAS);
      return saved ? JSON.parse(saved) : defaultPujas;
    } catch {
      return defaultPujas;
    }
  });

  const [prasadams, setPrasadams] = useState<PrasadamItem[]>(() => {
    if (typeof window === "undefined") return defaultPrasadams;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRASADAM);
      return saved ? JSON.parse(saved) : defaultPrasadams;
    } catch {
      return defaultPrasadams;
    }
  });

  const [annadanamInfo, setAnnadanamInfo] = useState<AnnadanamInfo>(() => {
    if (typeof window === "undefined") return defaultAnnadanamInfo;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNADANAM);
      return saved ? JSON.parse(saved) : defaultAnnadanamInfo;
    } catch {
      return defaultAnnadanamInfo;
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PUJAS, JSON.stringify(pujas));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [pujas]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRASADAM, JSON.stringify(prasadams));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [prasadams]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNADANAM, JSON.stringify(annadanamInfo));
    } catch (e) {
      console.warn("Storage save error", e);
    }
  }, [annadanamInfo]);

  // Gallery methods
  const addGalleryItem = (item: Omit<GalleryItem, "id" | "dateAdded">) => {
    const newItem: GalleryItem = {
      ...item,
      id: "gal-" + Date.now(),
      dateAdded: new Date().toISOString().split("T")[0] || "",
    };
    setGallery((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  const resetGallery = () => {
    setGallery(defaultGalleryItems);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
  };

  // Puja methods
  const addPuja = (item: Omit<PujaEventItem, "id">) => {
    const newPuja: PujaEventItem = {
      ...item,
      id: "puja-" + Date.now(),
    };
    setPujas((prev) => [newPuja, ...prev]);
  };

  const updatePuja = (id: string, updated: Partial<PujaEventItem>) => {
    setPujas((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  };

  const deletePuja = (id: string) => {
    setPujas((prev) => prev.filter((item) => item.id !== id));
  };

  const resetPujas = () => {
    setPujas(defaultPujas);
    localStorage.removeItem(STORAGE_KEYS.PUJAS);
  };

  // Prasadam methods
  const addPrasadam = (item: Omit<PrasadamItem, "id">) => {
    const newPrasadam: PrasadamItem = {
      ...item,
      id: "pras-" + Date.now(),
    };
    setPrasadams((prev) => [newPrasadam, ...prev]);
  };

  const updatePrasadam = (id: string, updated: Partial<PrasadamItem>) => {
    setPrasadams((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  };

  const deletePrasadam = (id: string) => {
    setPrasadams((prev) => prev.filter((item) => item.id !== id));
  };

  const resetPrasadams = () => {
    setPrasadams(defaultPrasadams);
    localStorage.removeItem(STORAGE_KEYS.PRASADAM);
  };

  // Annadanam info
  const updateAnnadanamInfo = (info: Partial<AnnadanamInfo>) => {
    setAnnadanamInfo((prev) => ({ ...prev, ...info }));
  };

  const resetAll = () => {
    setGallery(defaultGalleryItems);
    setPujas(defaultPujas);
    setPrasadams(defaultPrasadams);
    setAnnadanamInfo(defaultAnnadanamInfo);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.PUJAS);
    localStorage.removeItem(STORAGE_KEYS.PRASADAM);
    localStorage.removeItem(STORAGE_KEYS.ANNADANAM);
  };

  return (
    <TempleStoreContext.Provider
      value={{
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        resetGallery,
        pujas,
        addPuja,
        updatePuja,
        deletePuja,
        resetPujas,
        prasadams,
        addPrasadam,
        updatePrasadam,
        deletePrasadam,
        resetPrasadams,
        annadanamInfo,
        updateAnnadanamInfo,
        resetAll,
      }}
    >
      {children}
    </TempleStoreContext.Provider>
  );
}

export function useTempleStore() {
  const ctx = useContext(TempleStoreContext);
  if (!ctx) {
    // Return default values gracefully if outside provider
    return {
      gallery: defaultGalleryItems,
      addGalleryItem: () => {},
      updateGalleryItem: () => {},
      deleteGalleryItem: () => {},
      resetGallery: () => {},
      pujas: defaultPujas,
      addPuja: () => {},
      updatePuja: () => {},
      deletePuja: () => {},
      resetPujas: () => {},
      prasadams: defaultPrasadams,
      addPrasadam: () => {},
      updatePrasadam: () => {},
      deletePrasadam: () => {},
      resetPrasadams: () => {},
      annadanamInfo: defaultAnnadanamInfo,
      updateAnnadanamInfo: () => {},
      resetAll: () => {},
    };
  }
  return ctx;
}

