import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ChangeEvent } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Filter,
  Image as ImageIcon,
  Languages,
  Layers,
  Lock,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useTempleStore, type GalleryItem, type PujaEventItem, type PrasadamItem } from "@/lib/templeStore";
import { useLang, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Temple Admin Portal – Sri Durga Varahi Amma Devalayam" },
      { name: "description", content: "Administrative management portal for gallery images, pujas & festival events, and anna prasadam." },
    ],
  }),
  component: AdminPage,
});

const adminI18n = {
  en: {
    backToSite: "Back to Public Site",
    securePortalBadge: "Secure Admin Portal v2.0",
    templeTitle: "Sri Durga Varahi Amma Devalayam",
    adminDashboardTitle: "ADMIN DASHBOARD",
    adminSubtitle: "Pisini Sri Durga Varahi Temple Management Portal",
    credsTitle: "Admin Login Credentials:",
    autoFillBtn: "⚡ Auto-fill Credentials",
    emailLabel: "Admin Email *",
    passwordLabel: "Admin Password *",
    passwordPlaceholder: "Enter admin password...",
    loginButton: "Login to Admin Dashboard",
    invalidCreds: "Invalid Email or Password! (Please check default credentials above)",
    welcomeToast: "Welcome, Temple Administrator!",
    loginSuccessToast: "Welcome, ",
    logoutToast: "Logged out successfully.",
    logoutBtn: "Logout",
    viewLiveSite: "View Live Site",
    overviewTab: "Overview",
    galleryTab: "Gallery Photos",
    pujasTab: "Pujas & Events",
    prasadamTab: "Anna Prasadam",
    badgeAdministration: "Temple Administration Console",
    bannerHeading: "Sri Durga Varahi Amma Devalayam Admin Dashboard",
    bannerDesc: "Manage sacred temple gallery photos, daily sevas, Navaratri festival events, and daily Maha Annadanam distribution. Changes made here automatically update on the public website in real time.",
    addPhotoQuick: "Add Gallery Photo",
    addPujaQuick: "Add Puja / Event",
    addPrasadamQuick: "Add Prasadam Item",
    cardGalleryTitle: "Gallery Photos",
    cardGalleryDesc: "High-resolution sacred temple photos",
    cardPujasTitle: "Pujas & Festivals",
    cardPujasDesc: "Daily sevas, festivals and special rituals",
    cardPrasadamTitle: "Anna Prasadam",
    cardPrasadamDesc: "Maha Annadanam and sacred recipes",
    cardSystemTitle: "System Status",
    cardSystemDesc: "Real-time sync to public devotee site",
    activeSyncedBadge: "Active & Synced",
    resetFactoryBtn: "Reset to Factory Defaults",
    resetFactoryConfirm: "Are you sure you want to reset all temple data to initial defaults?",
    resetSuccessToast: "All temple records have been reset to factory defaults.",
    galleryHeading: "Temple Photo Gallery Management",
    galleryCountText: "photos registered. You can upload new photos or remove existing ones.",
    addNewPhotoBtn: "Add New Photo",
    deletePhotoConfirm: "Are you sure you want to delete this photo?",
    photoDeletedToast: "Photo deleted successfully.",
    pujasHeading: "Pujas, Sevas & Festival Events Management",
    pujasCountText: "pujas and festival events registered. Manage timings, dakshina and display state.",
    addNewPujaBtn: "Add New Puja / Event",
    deletePujaConfirm: "Are you sure you want to delete this puja?",
    pujaDeletedToast: "Puja deleted successfully.",
    activeOnWebsite: "Active on Website",
    hiddenOnWebsite: "Hidden",
    prasadamHeading: "Anna Prasadam & Seva Management",
    prasadamCountText: "prasadam items registered. Manage timings, distribution and daily counts.",
    addNewPrasadamBtn: "Add New Prasadam",
    deletePrasadamConfirm: "Are you sure you want to delete this prasadam item?",
    prasadamDeletedToast: "Prasadam item deleted successfully.",
    dailyAnnadanamHeading: "Daily Maha Annadanam Program",
    dailyAnnadanamSub: "Sacred free meal distribution conducted daily for all pilgrims and devotees at Pisini Temple.",
    devoteesPerDay: "Devotees Served Daily",
    annadanamTiming: "Annadanam Timing",
    specialOccasions: "Special Days / Festivals",
    dailyFreeMeals: "Daily Free Meals",
    editSchemeBtn: "Edit Scheme Details",
    saveSchemeBtn: "Save Scheme Changes",
    cancelBtn: "Cancel",
    editItem: "Edit",
    editPrasadamModalTitle: "Edit Prasadam Item",
    updatePrasadamBtn: "Save Changes",
    editPujaModalTitle: "Edit Puja / Event Details",
    updatePujaBtn: "Save Changes",
    editGalleryModalTitle: "Edit Gallery Photo Details",
    updateGalleryBtn: "Save Changes",
  },
  te: {
    backToSite: "భక్తుల పోర్టల్‌కి తిరిగి వెళ్ళండి (Back to Public Site)",
    securePortalBadge: "సురక్షిత అడ్మిన్ పోర్టల్ v2.0",
    templeTitle: "శ్రీ దుర్గా వారాహి అమ్మవారి దేవస్థానం",
    adminDashboardTitle: "అడ్మిన్ డాష్‌బోర్డ్ (ADMIN DASHBOARD)",
    adminSubtitle: "పిసిని శ్రీ దుర్గా వారాహి ఆలయ నిర్వహణ పోర్టల్",
    credsTitle: "అడ్మిన్ లాగిన్ వివరాలు (Admin Credentials):",
    autoFillBtn: "⚡ ఆటోమేటిక్‌గా నింపండి (Click to Auto-fill)",
    emailLabel: "ఈమెయిల్ అడ్రస్ (Admin Email) *",
    passwordLabel: "పాస్‌వర్డ్ (Admin Password) *",
    passwordPlaceholder: "అడ్మిన్ పాస్‌వర్డ్ నమోదు చేయండి...",
    loginButton: "లాగిన్ అవ్వండి (Login to Admin Dashboard)",
    invalidCreds: "ఈమెయిల్ లేదా పాస్‌వర్డ్ సరైనది కాదు! (పై వివరాలు సరిచూసుకోండి)",
    welcomeToast: "స్వాగతం! ఆలయ నిర్వహణ విభాగానికి స్వాగతం.",
    loginSuccessToast: "స్వాగతం! Welcome, ",
    logoutToast: "లాగౌట్ విజయవంతమైంది.",
    logoutBtn: "లాగౌట్ (Logout)",
    viewLiveSite: "భక్తుల సైట్ చూడండి (Live Site)",
    overviewTab: "ఓవర్‌వ్యూ (Overview)",
    galleryTab: "గ్యాలరీ ఫొటోస్ (Gallery)",
    pujasTab: "పూజలు & ఉత్సవాలు (Pujas & Events)",
    prasadamTab: "అన్న ప్రసాదం (Anna Prasadam)",
    badgeAdministration: "ఆలయ పరిపాలనా విభాగం (Administration)",
    bannerHeading: "శ్రీ దుర్గా వారాహి అమ్మవారి దేవస్థానం డాష్‌బోర్డ్",
    bannerDesc: "ఆలయ గ్యాలరీ చిత్రాలు, నిత్య పూజలు, దసరా నవరాత్రులు & విశేష ఉత్సవాలు మరియు నిత్య అన్నప్రసాద వివరాలను నిర్వహించండి. ఇక్కడ చేసే మార్పులు భక్తుల వెబ్‌సైట్‌లో వెంటనే అప్‌డేట్ అవుతాయి.",
    addPhotoQuick: "ఫొటో జోడించండి (Add Photo)",
    addPujaQuick: "పూజ / ఉత్సవం జోడించండి (Add Puja)",
    addPrasadamQuick: "ప్రసాదం జోడించండి (Add Prasadam)",
    cardGalleryTitle: "గ్యాలరీ ఫొటోలు (Photos)",
    cardGalleryDesc: "అధిక నాణ్యత గల ఆలయ దివ్య దర్శనాలు",
    cardPujasTitle: "పూజలు & ఉత్సవాలు (Pujas)",
    cardPujasDesc: "నిత్య సేవలు, ఉత్సవాలు మరియు విశేష పూజలు",
    cardPrasadamTitle: "అన్న ప్రసాదాలు (Prasadam)",
    cardPrasadamDesc: "మహా అన్నదానం మరియు ఆలయ ప్రసాదాలు",
    cardSystemTitle: "సిస్టమ్ స్టేటస్ (System)",
    cardSystemDesc: "లైవ్ వెబ్‌సైట్‌తో రియల్-టైమ్ సింక్",
    activeSyncedBadge: "సింక్ అయి ఉంది (Active & Synced)",
    resetFactoryBtn: "ప్రారంభ సెట్టింగులకు రీసెట్ చేయండి (Reset Defaults)",
    resetFactoryConfirm: "మీరు నిజంగానే అన్ని డేటాను ఆలయ ప్రారంభ సెట్టింగులకు రీసెట్ చేయాలనుకుంటున్నారా?",
    resetSuccessToast: "అన్ని రికార్డులు డీఫాల్ట్‌కి రీసెట్ చేయబడ్డాయి.",
    galleryHeading: "ఆలయ ఫొటో గ్యాలరీ నిర్వహణ (Gallery Images)",
    galleryCountText: "ఫొటోలు ఉన్నాయి. కొత్త చిత్రాలను జోడించవచ్చు లేదా మార్చవచ్చు.",
    addNewPhotoBtn: "కొత్త ఫొటో జోడించండి (Add Image)",
    deletePhotoConfirm: "ఈ ఫొటోను ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?",
    photoDeletedToast: "ఫొటో విజయవంతంగా తొలగించబడింది.",
    pujasHeading: "పూజలు, సేవలు & విశేష ఉత్సవాలు (Pujas & Events)",
    pujasCountText: "పూజలు మరియు ఉత్సవాలు ఉన్నాయి. సమయాలు, దక్షిణ వివరాలు నిర్వహించండి.",
    addNewPujaBtn: "కొత్త పూజ / ఉత్సవం జోడించండి (Add Puja)",
    deletePujaConfirm: "ఈ పూజను ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?",
    pujaDeletedToast: "పూజా రికార్డు తొలగించబడింది.",
    activeOnWebsite: "వెబ్‌సైట్‌లో కనిపిస్తుంది (Active)",
    hiddenOnWebsite: "దాచబడింది (Hidden)",
    prasadamHeading: "అన్న ప్రసాదం & సేవా విభాగం (Anna Prasadam)",
    prasadamCountText: "ప్రసాద రకాలు ఉన్నాయి. నిత్య అన్నదాన వివరాలు నిర్వహించండి.",
    addNewPrasadamBtn: "కొత్త ప్రసాదం జోడించండి (Add Prasadam)",
    deletePrasadamConfirm: "ఈ ప్రసాదాన్ని ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?",
    prasadamDeletedToast: "ప్రసాదం తొలగించబడింది.",
    dailyAnnadanamHeading: "నిత్య మహా అన్నదాన పథకం (Daily Maha Annadanam)",
    dailyAnnadanamSub: "పిసిని క్షేత్రానికి వచ్చే భక్తులందరికీ నిత్యం అన్నప్రసాద వితరణ జరుగుతుంది.",
    devoteesPerDay: "ప్రతిరోజూ భక్తుల సంఖ్య",
    annadanamTiming: "అన్నదాన సమయం",
    specialOccasions: "విశేష పర్వదినాలు",
    dailyFreeMeals: "నిత్య ఉచిత భోజనం",
    editSchemeBtn: "వివరాలు మార్చండి (Edit)",
    saveSchemeBtn: "సేవ్ చేయండి (Save)",
    cancelBtn: "రద్దు చేయండి (Cancel)",
    editItem: "సవరించండి (Edit)",
    editPrasadamModalTitle: "ప్రసాదం వివరాలు సవరించండి (Edit Prasadam)",
    updatePrasadamBtn: "మార్పులను సేవ్ చేయండి (Save Changes)",
    editPujaModalTitle: "పూజా వివరాలు సవరించండి (Edit Puja)",
    updatePujaBtn: "మార్పులను సేవ్ చేయండి (Save Changes)",
    editGalleryModalTitle: "ఫొటో వివరాలు సవరించండి (Edit Photo)",
    updateGalleryBtn: "మార్పులను సేవ్ చేయండి (Save Changes)",
  },
};

function AdminLanguageSwitcher({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "card" }) {
  const { lang, setLang } = useLang();

  if (variant === "card") {
    return (
      <div
        className={`inline-flex items-center rounded-full border border-primary/30 bg-primary/5 p-1 shadow-xs select-none transition-all ${className}`}
        role="group"
        aria-label="Admin Language Selector"
      >
        <div className="flex items-center pl-2 pr-1.5 text-primary shrink-0" title="Language / భాష">
          <Languages className="h-4 w-4 text-gold" />
        </div>
        <button
          type="button"
          onClick={() => setLang("en")}
          aria-pressed={lang === "en"}
          className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
            lang === "en"
              ? "bg-primary text-primary-foreground font-extrabold shadow-xs scale-102"
              : "text-foreground/75 hover:text-primary hover:bg-primary/10"
          }`}
          title="Switch language to English"
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLang("te")}
          aria-pressed={lang === "te"}
          className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
            lang === "te"
              ? "bg-primary text-primary-foreground font-extrabold shadow-xs scale-102"
              : "text-foreground/75 hover:text-primary hover:bg-primary/10"
          }`}
          title="తెలుగు భాషకు మార్చండి"
        >
          తెలుగు
        </button>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gold/50 bg-black/45 p-1 shadow-inner backdrop-blur-md select-none transition-all ${className}`}
      role="group"
      aria-label="Admin Language Selector"
    >
      <div className="flex items-center pl-2 pr-1.5 text-gold shrink-0" title="Language / భాష">
        <Languages className="h-4 w-4" />
      </div>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
          lang === "en"
            ? "bg-gold text-maroon font-black shadow-md scale-102"
            : "text-gold/80 hover:text-gold hover:bg-gold/15"
        }`}
        title="Switch language to English"
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLang("te")}
        aria-pressed={lang === "te"}
        className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
          lang === "te"
            ? "bg-gold text-maroon font-black shadow-md scale-102"
            : "text-gold/80 hover:text-gold hover:bg-gold/15"
        }`}
        title="తెలుగు భాషకు మార్చండి"
      >
        తెలుగు
      </button>
    </div>
  );
}

function AdminPage() {
  const { lang, setLang } = useLang();
  const tAdmin = adminI18n[lang] || adminI18n.en;
  const {
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    updateGalleryItem,
    resetGallery,
    pujas,
    addPuja,
    deletePuja,
    updatePuja,
    resetPujas,
    prasadams,
    addPrasadam,
    deletePrasadam,
    updatePrasadam,
    resetPrasadams,
    annadanamInfo,
    updateAnnadanamInfo,
    resetAll,
  } = useTempleStore();

  // Auth State (Email & Password)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("varahi_admin_auth") === "true";
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    if (typeof window === "undefined") return "admin@varahiammatemple.org";
    return localStorage.getItem("varahi_saved_admin_email") || "admin@varahiammatemple.org";
  });
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "gallery" | "pujas" | "prasadam">("overview");

  // Notifications
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPassword = adminPassword.trim();

    // Check credentials:
    // Accept valid temple admin emails:
    // admin@varahiammatemple.org, admin@gmail.com, or any valid email
    // Password: Varahi@2026, varahi2026, admin123, or admin
    const isEmailValid = cleanEmail.length > 3 && (cleanEmail.includes("@") || cleanEmail === "admin");
    const isPasswordValid =
      cleanPassword === "Varahi@2026" ||
      cleanPassword === "varahi2026" ||
      cleanPassword === "admin123" ||
      cleanPassword === "admin";

    if (isEmailValid && isPasswordValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem("varahi_admin_auth", "true");
      sessionStorage.setItem("varahi_admin_email", cleanEmail);
      localStorage.setItem("varahi_saved_admin_email", cleanEmail);
      setAuthError(null);
      showToast(`స్వాగతం! Welcome, ${cleanEmail}`);
    } else {
      setAuthError("ఈమెయిల్ లేదా పాస్‌వర్డ్ సరైనది కాదు! Invalid Email or Password. (Check default credentials below)");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("varahi_admin_auth");
    sessionStorage.removeItem("varahi_admin_email");
    setAdminPassword("");
  };

  // Modals
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [pujaModalOpen, setPujaModalOpen] = useState(false);
  const [prasadamModalOpen, setPrasadamModalOpen] = useState(false);

  // Gallery Form State
  const [newGalTitle, setNewGalTitle] = useState("");
  const [newGalTitleTe, setNewGalTitleTe] = useState("");
  const [newGalDesc, setNewGalDesc] = useState("");
  const [newGalDescTe, setNewGalDescTe] = useState("");
  const [newGalCategory, setNewGalCategory] = useState("Alankaram");
  const [newGalUrl, setNewGalUrl] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setNewGalUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalUrl && !previewImage) {
      alert("Please upload a photo or provide an image URL.");
      return;
    }
    addGalleryItem({
      src: newGalUrl || previewImage || "",
      title: newGalTitle || "Sri Durga Varahi Amma Darshan",
      titleTe: newGalTitleTe || newGalTitle || "శ్రీ దుర్గా వారాహి అమ్మవారి దివ్య దర్శనం",
      desc: newGalDesc || "Sacred temple photo of Goddess Varahi at Pisini devalayam.",
      descTe: newGalDescTe || newGalDesc || "పిసిని క్షేత్రంలో అమ్మవారి దివ్య మంగళ దర్శనం.",
      category: newGalCategory,
    });
    setGalleryModalOpen(false);
    setNewGalTitle("");
    setNewGalTitleTe("");
    setNewGalDesc("");
    setNewGalDescTe("");
    setNewGalUrl("");
    setPreviewImage(null);
    showToast("ఫొటో విజయవంతంగా జోడించబడింది! Gallery photo added successfully.");
  };

  // Puja Form State
  const [newPujaName, setNewPujaName] = useState("");
  const [newPujaNameTe, setNewPujaNameTe] = useState("");
  const [newPujaTime, setNewPujaTime] = useState("");
  const [newPujaDakshina, setNewPujaDakshina] = useState("");
  const [newPujaDesc, setNewPujaDesc] = useState("");
  const [newPujaDescTe, setNewPujaDescTe] = useState("");
  const [newPujaType, setNewPujaType] = useState<"puja" | "event">("puja");

  const handleSavePuja = (e: React.FormEvent) => {
    e.preventDefault();
    addPuja({
      name: newPujaName,
      nameTe: newPujaNameTe || newPujaName,
      time: newPujaTime || "Daily 07:00 AM - 08:30 AM",
      dakshina: newPujaDakshina || "₹250",
      desc: newPujaDesc,
      descTe: newPujaDescTe || newPujaDesc,
      type: newPujaType,
      active: true,
    });
    setPujaModalOpen(false);
    setNewPujaName("");
    setNewPujaNameTe("");
    setNewPujaTime("");
    setNewPujaDakshina("");
    setNewPujaDesc("");
    setNewPujaDescTe("");
    showToast("పూజా వివరాలు విజయవంతంగా జోడించబడ్డాయి! Puja/Event saved.");
  };

  // Prasadam Form State
  const [newPrasName, setNewPrasName] = useState("");
  const [newPrasNameTe, setNewPrasNameTe] = useState("");
  const [newPrasTiming, setNewPrasTiming] = useState("");
  const [newPrasPrice, setNewPrasPrice] = useState("Free (ఉచితం)");
  const [newPrasDesc, setNewPrasDesc] = useState("");
  const [newPrasDescTe, setNewPrasDescTe] = useState("");
  const [newPrasCategory, setNewPrasCategory] = useState<"daily" | "special_prasadam" | "annadanam">("daily");

  const handleSavePrasadam = (e: React.FormEvent) => {
    e.preventDefault();
    addPrasadam({
      name: newPrasName,
      nameTe: newPrasNameTe || newPrasName,
      timing: newPrasTiming || "Available Daily",
      price: newPrasPrice,
      desc: newPrasDesc,
      descTe: newPrasDescTe || newPrasDesc,
      category: newPrasCategory,
      isAvailable: true,
    });
    setPrasadamModalOpen(false);
    setNewPrasName("");
    setNewPrasNameTe("");
    setNewPrasTiming("");
    setNewPrasPrice("Free (ఉచితం)");
    setNewPrasDesc("");
    setNewPrasDescTe("");
    showToast("ప్రసాదం విజయవంతంగా జోడించబడింది! Prasadam item saved.");
  };

  // Annadanam scheme state
  const [isEditingAnnadanam, setIsEditingAnnadanam] = useState(false);
  const [annaCount, setAnnaCount] = useState(annadanamInfo.dailyCount);
  const [annaTime, setAnnaTime] = useState(annadanamInfo.timing);

  // Edit Prasadam State & Handlers
  const [editingPrasadam, setEditingPrasadam] = useState<PrasadamItem | null>(null);
  const [editPrasName, setEditPrasName] = useState("");
  const [editPrasNameTe, setEditPrasNameTe] = useState("");
  const [editPrasTiming, setEditPrasTiming] = useState("");
  const [editPrasPrice, setEditPrasPrice] = useState("");
  const [editPrasDesc, setEditPrasDesc] = useState("");
  const [editPrasDescTe, setEditPrasDescTe] = useState("");
  const [editPrasCategory, setEditPrasCategory] = useState<"daily" | "special_prasadam" | "annadanam">("daily");

  const handleOpenEditPrasadam = (p: PrasadamItem) => {
    setEditingPrasadam(p);
    setEditPrasName(p.name);
    setEditPrasNameTe(p.nameTe || p.name);
    setEditPrasTiming(p.timing || "");
    setEditPrasPrice(p.price || "");
    setEditPrasDesc(p.desc || "");
    setEditPrasDescTe(p.descTe || p.desc || "");
    setEditPrasCategory(p.category);
  };

  const handleUpdatePrasadam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrasadam) return;
    updatePrasadam(editingPrasadam.id, {
      name: editPrasName,
      nameTe: editPrasNameTe,
      timing: editPrasTiming,
      price: editPrasPrice,
      desc: editPrasDesc,
      descTe: editPrasDescTe,
      category: editPrasCategory,
    });
    setEditingPrasadam(null);
    showToast(lang === "te" ? "ప్రసాదం వివరాలు అప్‌డేట్ చేయబడ్డాయి! Updated successfully." : "Prasadam item updated successfully.");
  };

  // Edit Puja State & Handlers
  const [editingPuja, setEditingPuja] = useState<PujaEventItem | null>(null);
  const [editPujaName, setEditPujaName] = useState("");
  const [editPujaNameTe, setEditPujaNameTe] = useState("");
  const [editPujaTime, setEditPujaTime] = useState("");
  const [editPujaDakshina, setEditPujaDakshina] = useState("");
  const [editPujaDesc, setEditPujaDesc] = useState("");
  const [editPujaDescTe, setEditPujaDescTe] = useState("");
  const [editPujaType, setEditPujaType] = useState<"puja" | "event">("puja");

  const handleOpenEditPuja = (p: PujaEventItem) => {
    setEditingPuja(p);
    setEditPujaName(p.name);
    setEditPujaNameTe(p.nameTe || p.name);
    setEditPujaTime(p.time || "");
    setEditPujaDakshina(p.dakshina || "");
    setEditPujaDesc(p.desc || "");
    setEditPujaDescTe(p.descTe || p.desc || "");
    setEditPujaType(p.type);
  };

  const handleUpdatePuja = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPuja) return;
    updatePuja(editingPuja.id, {
      name: editPujaName,
      nameTe: editPujaNameTe,
      time: editPujaTime,
      dakshina: editPujaDakshina,
      desc: editPujaDesc,
      descTe: editPujaDescTe,
      type: editPujaType,
    });
    setEditingPuja(null);
    showToast(lang === "te" ? "పూజా వివరాలు అప్‌డేట్ చేయబడ్డాయి! Updated successfully." : "Puja details updated successfully.");
  };

  // Edit Gallery State & Handlers
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [editGalTitle, setEditGalTitle] = useState("");
  const [editGalTitleTe, setEditGalTitleTe] = useState("");
  const [editGalDesc, setEditGalDesc] = useState("");
  const [editGalDescTe, setEditGalDescTe] = useState("");
  const [editGalCategory, setEditGalCategory] = useState("Alankaram");
  const [editGalUrl, setEditGalUrl] = useState("");
  const [editPreviewImage, setEditPreviewImage] = useState<string | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenEditGallery = (item: GalleryItem) => {
    setEditingGallery(item);
    setEditGalTitle(item.title);
    setEditGalTitleTe(item.titleTe || item.title);
    setEditGalDesc(item.desc || "");
    setEditGalDescTe(item.descTe || item.desc || "");
    setEditGalCategory(item.category || "Alankaram");
    setEditGalUrl(item.src || "");
    setEditPreviewImage(item.src || null);
  };

  const handleEditImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEditPreviewImage(result);
        setEditGalUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    updateGalleryItem(editingGallery.id, {
      title: editGalTitle,
      titleTe: editGalTitleTe,
      desc: editGalDesc,
      descTe: editGalDescTe,
      category: editGalCategory,
      src: editGalUrl || editPreviewImage || editingGallery.src,
    });
    setEditingGallery(null);
    showToast(lang === "te" ? "ఫొటో వివరాలు అప్‌డేట్ చేయబడ్డాయి! Updated successfully." : "Gallery photo updated successfully.");
  };

  // If not logged in, render the secure authentication gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-b from-maroon via-maroon/90 to-black text-primary-foreground flex flex-col justify-between p-4 sm:p-6">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between max-w-5xl mx-auto w-full pt-4 gap-3 px-2">
          <Link to="/" className="flex items-center gap-2 text-gold hover:underline text-sm font-medium">
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>{tAdmin.backToSite}</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <AdminLanguageSwitcher />
            <span className="hidden sm:inline-block text-xs text-gold/80 bg-gold/15 px-3 py-1 rounded-full border border-gold/40 font-medium">
              {tAdmin.securePortalBadge}
            </span>
          </div>
        </div>

        {/* Login Box */}
        <div className="max-w-md w-full mx-auto my-auto bg-card text-foreground rounded-2xl border-2 border-gold shadow-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="text-center">
            <span className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-saffron text-primary-foreground font-display text-3xl shadow-temple ring-4 ring-gold/70">
              ॐ
            </span>
            <p className="mt-4 font-serif text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {tAdmin.templeTitle}
            </p>
            <h1 className="mt-1 font-display text-2xl font-black tracking-wide text-foreground">
              {tAdmin.adminDashboardTitle}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {tAdmin.adminSubtitle}
            </p>
            {/* Center Language Switcher in Card Header */}
            <div className="mt-4 flex justify-center">
              <AdminLanguageSwitcher variant="card" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            {/* Quick credentials hint */}
            <div className="rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs text-amber-950 dark:text-gold flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block text-primary">{tAdmin.credsTitle}</span>
                <p className="mt-1 text-[11.5px] font-mono leading-relaxed">
                  Email: <b className="text-foreground">admin@varahiammatemple.org</b><br />
                  Password: <b className="text-foreground">Varahi@2026</b>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAdminEmail("admin@varahiammatemple.org");
                    setAdminPassword("Varahi@2026");
                  }}
                  className="mt-1.5 text-[11px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{tAdmin.autoFillBtn}</span>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                {tAdmin.emailLabel}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@varahiammatemple.org"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium"
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                {tAdmin.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder={tAdmin.passwordPlaceholder}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive font-medium flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-primary hover:brightness-110 text-primary-foreground py-3 text-sm font-bold shadow-temple transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{tAdmin.loginButton}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center text-[11px] text-muted-foreground">
            <p>Protected administrative interface for Sri Durga Varahi Temple Trustees & Staff.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gold/60 py-2">
          © {new Date().getFullYear()} Sri Durga Varahi Amma Devalayam, Pisini. All rights reserved.
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard View
  return (
    <div className="min-h-screen bg-muted/30 text-foreground flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-primary text-primary-foreground px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 border border-gold/50 text-sm font-semibold">
          <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-maroon text-primary-foreground border-b-2 border-gold shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-primary-foreground font-display text-xl shadow-temple ring-2 ring-gold/70 shrink-0">
              ॐ
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-sm sm:text-base font-bold text-gold tracking-wide leading-none">
                  SRI DURGA VARAHI DEVALAYAM
                </h1>
                <span className="hidden sm:inline-block text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded font-bold border border-gold/40">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-[11px] text-gold/80 mt-0.5 hidden sm:block">
                {lang === "te" ? "పిసిని దేవస్థానం – అడ్మినిస్ట్రేటివ్ మేనేజ్‌మెంట్ కన్సోల్" : "Pisini Devasthanam – Administrative Management Console"}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dual Language Switcher */}
            <AdminLanguageSwitcher />

            <div className="hidden xl:flex items-center gap-1.5 bg-gold/15 border border-gold/40 rounded-full px-3 py-1 text-xs text-gold font-medium">
              <Mail className="h-3 w-3 text-gold" />
              <span className="truncate max-w-[180px]">{adminEmail || "admin@varahiammatemple.org"}</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/10 hover:bg-gold hover:text-maroon px-3 py-1.5 text-xs font-semibold text-gold transition-colors shadow-2xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tAdmin.viewLiveSite}</span>
              <span className="sm:hidden">Live</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-full bg-destructive/80 hover:bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground transition-colors shadow-2xs cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tAdmin.logoutBtn}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-gold/30 bg-maroon/90 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2.5 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "overview"
                ? "border-gold text-gold font-bold bg-gold/10"
                : "border-transparent text-primary-foreground/75 hover:text-gold"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>{tAdmin.overviewTab}</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`py-2.5 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "gallery"
                ? "border-gold text-gold font-bold bg-gold/10"
                : "border-transparent text-primary-foreground/75 hover:text-gold"
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            <span>{tAdmin.galleryTab} ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("pujas")}
            className={`py-2.5 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "pujas"
                ? "border-gold text-gold font-bold bg-gold/10"
                : "border-transparent text-primary-foreground/75 hover:text-gold"
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            <span>{tAdmin.pujasTab} ({pujas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("prasadam")}
            className={`py-2.5 px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "prasadam"
                ? "border-gold text-gold font-bold bg-gold/10"
                : "border-transparent text-primary-foreground/75 hover:text-gold"
            }`}
          >
            <UtensilsCrossed className="h-4 w-4" />
            <span>{tAdmin.prasadamTab} ({prasadams.length})</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="rounded-2xl border border-gold/40 bg-card p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/20 border border-gold/40 px-3 py-1 text-xs font-bold text-primary mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  {tAdmin.badgeAdministration}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                  {tAdmin.bannerHeading}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  {tAdmin.bannerDesc}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("gallery");
                      setGalleryModalOpen(true);
                    }}
                    className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-xs sm:text-sm font-bold shadow-temple hover:brightness-110 flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{tAdmin.addPhotoQuick}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("pujas");
                      setPujaModalOpen(true);
                    }}
                    className="rounded-xl border border-primary text-primary px-4 py-2 text-xs sm:text-sm font-bold hover:bg-primary/10 flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{tAdmin.addPujaQuick}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("prasadam");
                      setPrasadamModalOpen(true);
                    }}
                    className="rounded-xl border border-gold/70 text-amber-800 dark:text-gold px-4 py-2 text-xs sm:text-sm font-bold hover:bg-gold/15 flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{tAdmin.addPrasadamQuick}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab("gallery")}
                className="rounded-xl border border-border bg-card p-5 shadow-xs hover:border-gold cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <ImageIcon className="h-5 w-5" />
                  </span>
                  <span className="text-2xl font-black font-display text-primary">{gallery.length}</span>
                </div>
                <h3 className="mt-3 font-bold text-sm text-foreground">{tAdmin.cardGalleryTitle}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{tAdmin.cardGalleryDesc}</p>
              </div>

              <div
                onClick={() => setActiveTab("pujas")}
                className="rounded-xl border border-border bg-card p-5 shadow-xs hover:border-gold cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-saffron/20 text-primary">
                    <CalendarDays className="h-5 w-5 text-saffron" />
                  </span>
                  <span className="text-2xl font-black font-display text-primary">{pujas.length}</span>
                </div>
                <h3 className="mt-3 font-bold text-sm text-foreground">{tAdmin.cardPujasTitle}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{tAdmin.cardPujasDesc}</p>
              </div>

              <div
                onClick={() => setActiveTab("prasadam")}
                className="rounded-xl border border-border bg-card p-5 shadow-xs hover:border-gold cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <UtensilsCrossed className="h-5 w-5" />
                  </span>
                  <span className="text-2xl font-black font-display text-primary">{prasadams.length}</span>
                </div>
                <h3 className="mt-3 font-bold text-sm text-foreground">{tAdmin.cardPrasadamTitle}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{tAdmin.cardPrasadamDesc}</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/20 text-amber-800 dark:text-gold">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold bg-green-500/20 text-green-700 dark:text-green-400 px-2.5 py-0.5 rounded-full">
                    {tAdmin.activeSyncedBadge}
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-sm text-foreground">{tAdmin.cardSystemTitle}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{tAdmin.cardSystemDesc}</p>
              </div>
            </div>

            {/* Quick Actions & Reset Row */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                All updates are saved locally in the database and immediately visible on <code className="bg-muted px-1.5 py-0.5 rounded font-mono">http://localhost:8080/</code>.
              </p>
              <button
                onClick={() => {
                  if (confirm(tAdmin.resetFactoryConfirm)) {
                    resetAll();
                    showToast(tAdmin.resetSuccessToast);
                  }
                }}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{tAdmin.resetFactoryBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= GALLERY TAB ================= */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-primary">
                  {tAdmin.galleryHeading}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {gallery.length} {tAdmin.galleryCountText}
                </p>
              </div>
              <button
                onClick={() => setGalleryModalOpen(true)}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-xs sm:text-sm font-bold shadow-temple hover:brightness-110 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{tAdmin.addNewPhotoBtn}</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className="group rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:border-gold hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-muted/60 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover object-top origin-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-maroon/90 text-gold px-2 py-0.5 rounded text-[10px] font-bold border border-gold/40">
                      #{idx + 1}
                    </div>
                    <div className="absolute top-2 right-2 bg-card/90 text-foreground px-2 py-0.5 rounded text-[10px] font-semibold border border-border">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold text-primary line-clamp-1">
                        {lang === "te" ? (item.titleTe || item.title) : item.title}
                      </h4>
                      <p className="font-serif text-xs text-foreground/80 font-medium line-clamp-1 mt-0.5">
                        {lang === "te" ? item.title : (item.titleTe || item.title)}
                      </p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                        {lang === "te" ? (item.descTe || item.desc) : item.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-border/80 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-muted-foreground">{item.dateAdded}</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditGallery(item)}
                          className="text-primary hover:bg-primary/10 p-1.5 rounded-md transition-colors cursor-pointer"
                          title={lang === "te" ? "ఫొటో వివరాలు మార్చండి (Edit Photo)" : "Edit Photo"}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`${tAdmin.deletePhotoConfirm} "${item.title}"?`)) {
                              deleteGalleryItem(item.id);
                              showToast(tAdmin.photoDeletedToast);
                            }
                          }}
                          className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PUJAS & EVENTS TAB ================= */}
        {activeTab === "pujas" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-primary">
                  {tAdmin.pujasHeading}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {pujas.length} {tAdmin.pujasCountText}
                </p>
              </div>
              <button
                onClick={() => setPujaModalOpen(true)}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-xs sm:text-sm font-bold shadow-temple hover:brightness-110 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{tAdmin.addNewPujaBtn}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pujas.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-border bg-card p-5 shadow-xs hover:border-gold hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        p.type === "event" ? "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30" : "bg-primary/10 text-primary border border-primary/20"
                      }`}>
                        {p.type === "event" ? "Grand Festival" : "Daily Puja"}
                      </span>
                      <span className="text-xs font-bold text-gold bg-maroon/10 px-2 py-0.5 rounded border border-gold/40">
                        {p.dakshina}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold text-primary">
                      {lang === "te" ? (p.nameTe || p.name) : p.name}
                    </h3>
                    <p className="text-xs font-semibold text-foreground/80 mt-0.5">
                      {lang === "te" ? p.name : (p.nameTe || p.name)}
                    </p>

                    <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>{p.time}</span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {lang === "te" ? (p.descTe || p.desc) : p.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <button
                      onClick={() => {
                        updatePuja(p.id, { active: !p.active });
                        showToast(`స్టేటస్ అప్‌డేట్ చేయబడింది! Status updated.`);
                      }}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        p.active
                          ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {p.active ? tAdmin.activeOnWebsite : tAdmin.hiddenOnWebsite}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditPuja(p)}
                        className="text-primary hover:bg-primary/10 p-1.5 rounded-md transition-colors cursor-pointer"
                        title={lang === "te" ? "పూజ వివరాలు మార్చండి (Edit Puja)" : "Edit Puja"}
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`${tAdmin.deletePujaConfirm} "${p.name}"?`)) {
                            deletePuja(p.id);
                            showToast(tAdmin.pujaDeletedToast);
                          }
                        }}
                        className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors cursor-pointer"
                        title="Delete Puja"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PRASADAM TAB ================= */}
        {activeTab === "prasadam" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-primary">
                  {tAdmin.prasadamHeading}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {prasadams.length} {tAdmin.prasadamCountText}
                </p>
              </div>
              <button
                onClick={() => setPrasadamModalOpen(true)}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-xs sm:text-sm font-bold shadow-temple hover:brightness-110 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>{tAdmin.addNewPrasadamBtn}</span>
              </button>
            </div>

            {/* Annadanam Scheme Control Box */}
            <div className="rounded-xl border-2 border-gold/60 bg-card p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-saffron text-primary-foreground text-xl">
                    🍚
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-primary">
                      {lang === "te" ? annadanamInfo.titleTe : annadanamInfo.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      {lang === "te" ? annadanamInfo.title : annadanamInfo.titleTe}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingAnnadanam(!isEditingAnnadanam)}
                  className="rounded-lg border border-primary/40 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>{isEditingAnnadanam ? tAdmin.cancelBtn : tAdmin.editSchemeBtn}</span>
                </button>
              </div>

              {isEditingAnnadanam ? (
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">{tAdmin.devoteesPerDay}</label>
                    <input
                      value={annaCount}
                      onChange={(e) => setAnnaCount(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">{tAdmin.annadanamTiming}</label>
                    <input
                      value={annaTime}
                      onChange={(e) => setAnnaTime(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      onClick={() => {
                        updateAnnadanamInfo({ dailyCount: annaCount, timing: annaTime });
                        setIsEditingAnnadanam(false);
                        showToast("అన్నదానం వివరాలు అప్‌డేట్ చేయబడ్డాయి! Updated successfully.");
                      }}
                      className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-xs font-bold shadow-sm hover:brightness-110 cursor-pointer"
                    >
                      {tAdmin.saveSchemeBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-border/80 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">{tAdmin.devoteesPerDay}:</span>
                    <span className="font-bold text-foreground text-sm">{annadanamInfo.dailyCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">{tAdmin.annadanamTiming}:</span>
                    <span className="font-bold text-foreground text-sm">{annadanamInfo.timing}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">{tAdmin.dailyFreeMeals}:</span>
                    <span className="font-bold text-green-700 dark:text-green-400 text-sm">Open for Devotees</span>
                  </div>
                </div>
              )}
            </div>

            {/* Prasadam Items Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {prasadams.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-border bg-card p-5 shadow-xs hover:border-gold hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {p.category.replace("_", " ")}
                      </span>
                      {p.price && (
                        <span className="text-xs font-bold text-gold bg-maroon/10 px-2 py-0.5 rounded border border-gold/40">
                          {p.price}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-base font-bold text-primary">
                      {lang === "te" ? (p.nameTe || p.name) : p.name}
                    </h3>
                    <p className="text-xs font-semibold text-foreground/80 mt-0.5">
                      {lang === "te" ? p.name : (p.nameTe || p.name)}
                    </p>

                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>{p.timing}</span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {lang === "te" ? (p.descTe || p.desc) : p.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <button
                      onClick={() => {
                        updatePrasadam(p.id, { isAvailable: !p.isAvailable });
                        showToast("లభ్యత స్టేటస్ మార్చబడింది! Availability toggled.");
                      }}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        p.isAvailable
                          ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                          : "bg-destructive/10 text-destructive border-destructive/30"
                      }`}
                    >
                      {p.isAvailable ? tAdmin.activeOnWebsite : tAdmin.hiddenOnWebsite}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditPrasadam(p)}
                        className="text-primary hover:bg-primary/10 p-1.5 rounded-md transition-colors cursor-pointer"
                        title={lang === "te" ? "ప్రసాదం వివరాలు మార్చండి (Edit Prasadam)" : "Edit Prasadam"}
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`${tAdmin.deletePrasadamConfirm} "${p.name}"?`)) {
                            deletePrasadam(p.id);
                            showToast(tAdmin.prasadamDeletedToast);
                          }
                        }}
                        className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors cursor-pointer"
                        title="Delete Prasadam"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: ADD GALLERY PHOTO ================= */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs grid place-items-center p-4 animate-in fade-in">
          <div className="bg-card text-foreground max-w-lg w-full rounded-2xl border-2 border-gold shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-gold" />
              <span>కొత్త ఫొటో జోడించండి (Add Temple Photo)</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Upload from your device or provide a link to the holy image.
            </p>

            <form onSubmit={handleSaveGallery} className="mt-5 space-y-4">
              {/* File Upload & Live Preview */}
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  1. కంప్యూటర్ / మొబైల్ నుండి అప్‌లోడ్ చేయండి (Upload Image File)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gold/60 rounded-xl p-4 text-center cursor-pointer hover:bg-muted/40 transition-colors flex flex-col items-center justify-center min-h-[120px]"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-36 rounded-lg object-contain mx-auto shadow-md"
                      />
                      <span className="text-[11px] text-primary font-bold mt-1.5 block">Click to change photo</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="h-8 w-8 text-gold mx-auto" />
                      <p className="text-xs font-semibold text-foreground">Click to upload photo (JPEG, PNG, WebP)</p>
                      <p className="text-[10px] text-muted-foreground">Directly saved into temple gallery</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Or URL */}
              <div>
                <label className="block text-xs font-bold mb-1">
                  లేదా ఇమేజ్ URL (Or Image Web URL)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={newGalUrl}
                  onChange={(e) => {
                    setNewGalUrl(e.target.value);
                    if (e.target.value) setPreviewImage(e.target.value);
                  }}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Title (English) *</label>
                  <input
                    required
                    placeholder="e.g. Swarna Alankaram"
                    value={newGalTitle}
                    onChange={(e) => setNewGalTitle(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">శీర్షిక (తెలుగు Title)</label>
                  <input
                    placeholder="ఉదా: స్వర్ణాలంకరణ దర్శనం"
                    value={newGalTitleTe}
                    onChange={(e) => setNewGalTitleTe(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold mb-1">విభాగం (Category)</label>
                <select
                  value={newGalCategory}
                  onChange={(e) => setNewGalCategory(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="Sanctum">Sanctum (గర్భగుడి దర్శనం)</option>
                  <option value="Alankaram">Alankaram (విశేష అలంకారం)</option>
                  <option value="Utsavam">Utsavam (ఉత్సవాలు & ఊరేగింపు)</option>
                  <option value="Devotees">Devotees (భక్తులు & పూజలు)</option>
                </select>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-semibold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  placeholder="Sacred description..."
                  value={newGalDesc}
                  onChange={(e) => setNewGalDesc(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">వివరణ (తెలుగు)</label>
                <textarea
                  rows={2}
                  placeholder="అమ్మవారి దర్శన విశేషాలు..."
                  value={newGalDescTe}
                  onChange={(e) => setNewGalDescTe(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  రద్దు (Cancel)
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-xs font-bold shadow-temple hover:brightness-110 cursor-pointer"
                >
                  గ్యాలరీలో చేర్చండి (Save Photo)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD PUJA / EVENT ================= */}
      {pujaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs grid place-items-center p-4 animate-in fade-in">
          <div className="bg-card text-foreground max-w-lg w-full rounded-2xl border-2 border-gold shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPujaModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-gold" />
              <span>కొత్త పూజ / ఉత్సవం జోడించండి (Add Puja or Event)</span>
            </h3>

            <form onSubmit={handleSavePuja} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">రకం (Type) *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="pujatype"
                      checked={newPujaType === "puja"}
                      onChange={() => setNewPujaType("puja")}
                    />
                    <span>నిత్య పూజ / సేవ (Regular Daily Puja)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="pujatype"
                      checked={newPujaType === "event"}
                      onChange={() => setNewPujaType("event")}
                    />
                    <span>విశేష ఉత్సవం (Grand Festival Event)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Puja Name (English) *</label>
                  <input
                    required
                    placeholder="e.g. Chandi Homam"
                    value={newPujaName}
                    onChange={(e) => setNewPujaName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">పూజ పేరు (తెలుగు) *</label>
                  <input
                    required
                    placeholder="ఉదా: చండీ హోమం"
                    value={newPujaNameTe}
                    onChange={(e) => setNewPujaNameTe(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">సమయం (Timing) *</label>
                  <input
                    required
                    placeholder="e.g. 06:00 AM - 07:30 AM"
                    value={newPujaTime}
                    onChange={(e) => setNewPujaTime(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">దక్షిణ / రుసుము (Dakshina)</label>
                  <input
                    placeholder="e.g. ₹516 or Free"
                    value={newPujaDakshina}
                    onChange={(e) => setNewPujaDakshina(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  placeholder="Details of the sacred puja rituals..."
                  value={newPujaDesc}
                  onChange={(e) => setNewPujaDesc(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">వివరణ (తెలుగు)</label>
                <textarea
                  rows={2}
                  placeholder="పూజా విధానం మరియు విశిష్టత..."
                  value={newPujaDescTe}
                  onChange={(e) => setNewPujaDescTe(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPujaModalOpen(false)}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  రద్దు (Cancel)
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-xs font-bold shadow-temple hover:brightness-110 cursor-pointer"
                >
                  పూజను చేర్చండి (Save Puja)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD PRASADAM ================= */}
      {prasadamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs grid place-items-center p-4 animate-in fade-in">
          <div className="bg-card text-foreground max-w-lg w-full rounded-2xl border-2 border-gold shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setPrasadamModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-gold" />
              <span>కొత్త ప్రసాదం జోడించండి (Add Prasadam Item)</span>
            </h3>

            <form onSubmit={handleSavePrasadam} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Prasadam Name (English) *</label>
                  <input
                    required
                    placeholder="e.g. Ravva Kesari"
                    value={newPrasName}
                    onChange={(e) => setNewPrasName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">ప్రసాదం పేరు (తెలుగు) *</label>
                  <input
                    required
                    placeholder="ఉదా: రవ్వ కేసరి"
                    value={newPrasNameTe}
                    onChange={(e) => setNewPrasNameTe(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Category (విభాగం)</label>
                  <select
                    value={newPrasCategory}
                    onChange={(e) => setNewPrasCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  >
                    <option value="daily">Daily Counter Prasadam</option>
                    <option value="annadanam">Maha Annadanam Item</option>
                    <option value="special_prasadam">Festival Special</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">ధర / Contribution (Price)</label>
                  <input
                    placeholder="e.g. Free or ₹20"
                    value={newPrasPrice}
                    onChange={(e) => setNewPrasPrice(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">లభ్యత సమయం (Timing)</label>
                <input
                  placeholder="e.g. 11:30 AM onwards Daily"
                  value={newPrasTiming}
                  onChange={(e) => setNewPrasTiming(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  placeholder="Ingredients and sacred preparation details..."
                  value={newPrasDesc}
                  onChange={(e) => setNewPrasDesc(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">వివరణ (తెలుగు)</label>
                <textarea
                  rows={2}
                  placeholder="ప్రసాద విశిష్టత మరియు తయారీ వివరాలు..."
                  value={newPrasDescTe}
                  onChange={(e) => setNewPrasDescTe(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPrasadamModalOpen(false)}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  రద్దు (Cancel)
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-xs font-bold shadow-temple hover:brightness-110 cursor-pointer"
                >
                  ప్రసాదాన్ని చేర్చండి (Save Prasadam)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT PRASADAM ================= */}
      {editingPrasadam && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs grid place-items-center p-4 animate-in fade-in">
          <div className="bg-card text-foreground max-w-lg w-full rounded-2xl border-2 border-gold shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingPrasadam(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-gold" />
              <span>{tAdmin.editPrasadamModalTitle}</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {lang === "te" ? "ప్రసాదం పేరు, విభాగం, సమయం మరియు ధర వివరాలను సవరించండి." : "Update prasadam name, category, timing and contribution details."}
            </p>

            <form onSubmit={handleUpdatePrasadam} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Prasadam Name (English) *</label>
                  <input
                    required
                    value={editPrasName}
                    onChange={(e) => setEditPrasName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">ప్రసాదం పేరు (తెలుగు) *</label>
                  <input
                    required
                    value={editPrasNameTe}
                    onChange={(e) => setEditPrasNameTe(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Category (విభాగం)</label>
                  <select
                    value={editPrasCategory}
                    onChange={(e) => setEditPrasCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  >
                    <option value="daily">Daily Counter Prasadam</option>
                    <option value="annadanam">Maha Annadanam Item</option>
                    <option value="special_prasadam">Festival Special</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">ధర / Contribution (Price)</label>
                  <input
                    value={editPrasPrice}
                    onChange={(e) => setEditPrasPrice(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">లభ్యత సమయం (Timing)</label>
                <input
                  value={editPrasTiming}
                  onChange={(e) => setEditPrasTiming(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={editPrasDesc}
                  onChange={(e) => setEditPrasDesc(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">వివరణ (తెలుగు)</label>
                <textarea
                  rows={2}
                  value={editPrasDescTe}
                  onChange={(e) => setEditPrasDescTe(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPrasadam(null)}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  {tAdmin.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-xs font-bold shadow-temple hover:brightness-110 cursor-pointer"
                >
                  {tAdmin.updatePrasadamBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT PUJA / EVENT ================= */}
      {editingPuja && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs grid place-items-center p-4 animate-in fade-in">
          <div className="bg-card text-foreground max-w-lg w-full rounded-2xl border-2 border-gold shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingPuja(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-gold" />
              <span>{tAdmin.editPujaModalTitle}</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {lang === "te" ? "పూజ పేరు, సమయం, దక్షిణ మరియు వివరణ వివరాలను సవరించండి." : "Update puja name, timings, dakshina and ritual descriptions."}
            </p>

            <form onSubmit={handleUpdatePuja} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">రకం (Type) *</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="editpujatype"
                      checked={editPujaType === "puja"}
                      onChange={() => setEditPujaType("puja")}
                    />
                    <span>నిత్య పూజ / సేవ (Regular Daily Puja)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="editpujatype"
                      checked={editPujaType === "event"}
                      onChange={() => setEditPujaType("event")}
                    />
                    <span>విశేష ఉత్సవం (Grand Festival Event)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Puja Name (English) *</label>
                  <input
                    required
                    value={editPujaName}
                    onChange={(e) => setEditPujaName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">పూజ పేరు (తెలుగు) *</label>
                  <input
                    required
                    value={editPujaNameTe}
                    onChange={(e) => setEditPujaNameTe(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">సమయం (Timing) *</label>
                  <input
                    required
                    value={editPujaTime}
                    onChange={(e) => setEditPujaTime(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">దక్షిణ / రుసుము (Dakshina)</label>
                  <input
                    value={editPujaDakshina}
                    onChange={(e) => setEditPujaDakshina(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={editPujaDesc}
                  onChange={(e) => setEditPujaDesc(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">వివరణ (తెలుగు)</label>
                <textarea
                  rows={2}
                  value={editPujaDescTe}
                  onChange={(e) => setEditPujaDescTe(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPuja(null)}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  {tAdmin.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-xs font-bold shadow-temple hover:brightness-110 cursor-pointer"
                >
                  {tAdmin.updatePujaBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT GALLERY PHOTO ================= */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs grid place-items-center p-4 animate-in fade-in">
          <div className="bg-card text-foreground max-w-lg w-full rounded-2xl border-2 border-gold shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingGallery(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-gold" />
              <span>{tAdmin.editGalleryModalTitle}</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {lang === "te" ? "ఫొటో శీర్షిక, విభాగం మరియు వివరణ వివరాలను సవరించండి." : "Update photo title, category and sacred description."}
            </p>

            <form onSubmit={handleUpdateGallery} className="mt-5 space-y-4">
              {/* Photo preview / change */}
              <div>
                <label className="block text-xs font-bold mb-1.5">
                  ఫొటో ప్రివ్యూ (Photo Preview / Change)
                </label>
                <div
                  onClick={() => editFileInputRef.current?.click()}
                  className="border-2 border-dashed border-gold/60 rounded-xl p-3 text-center cursor-pointer hover:bg-muted/40 transition-colors flex flex-col items-center justify-center min-h-[100px]"
                >
                  <input
                    type="file"
                    ref={editFileInputRef}
                    accept="image/*"
                    onChange={handleEditImageFileChange}
                    className="hidden"
                  />
                  {editPreviewImage || editGalUrl ? (
                    <div>
                      <img
                        src={editPreviewImage || editGalUrl}
                        alt="Preview"
                        className="max-h-32 rounded-lg object-contain mx-auto shadow-md"
                      />
                      <span className="text-[11px] text-primary font-bold mt-1.5 block">Click to replace photo</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="h-6 w-6 text-gold mx-auto" />
                      <p className="text-xs font-semibold text-foreground">Click to upload new photo</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={editGalUrl}
                  onChange={(e) => {
                    setEditGalUrl(e.target.value);
                    if (e.target.value) setEditPreviewImage(e.target.value);
                  }}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Title (English) *</label>
                  <input
                    required
                    value={editGalTitle}
                    onChange={(e) => setEditGalTitle(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">శీర్షిక (తెలుగు Title)</label>
                  <input
                    value={editGalTitleTe}
                    onChange={(e) => setEditGalTitleTe(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">విభాగం (Category)</label>
                <select
                  value={editGalCategory}
                  onChange={(e) => setEditGalCategory(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                >
                  <option value="Sanctum">Sanctum (గర్భగుడి దర్శనం)</option>
                  <option value="Alankaram">Alankaram (విశేష అలంకారం)</option>
                  <option value="Utsavam">Utsavam (ఉత్సవాలు & ఊరేగింపు)</option>
                  <option value="Devotees">Devotees (భక్తులు & పూజలు)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={editGalDesc}
                  onChange={(e) => setEditGalDesc(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">వివరణ (తెలుగు)</label>
                <textarea
                  rows={2}
                  value={editGalDescTe}
                  onChange={(e) => setEditGalDescTe(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  {tAdmin.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary text-primary-foreground px-5 py-2 text-xs font-bold shadow-temple hover:brightness-110 cursor-pointer"
                >
                  {tAdmin.updateGalleryBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

