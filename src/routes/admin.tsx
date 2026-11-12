import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, type ChangeEvent } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  ExternalLink,
  Eye,
  Filter,
  Image as ImageIcon,
  Layers,
  Lock,
  LogOut,
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
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Temple Admin Portal – Sri Durga Varahi Amma Devalayam" },
      { name: "description", content: "Administrative management portal for gallery images, pujas & festival events, and anna prasadam." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { lang, toggle } = useLang();
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

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("varahi_admin_auth") === "true";
  });
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState(false);

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
    // Default master passkey for temple administration
    if (passkeyInput === "varahi2026" || passkeyInput === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("varahi_admin_auth", "true");
      setAuthError(false);
      showToast("స్వాగతం! Welcome to Sri Durga Varahi Amma Devalayam Admin Portal");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("varahi_admin_auth");
    setPasskeyInput("");
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

  // If not logged in, render the secure authentication gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-b from-maroon via-maroon/90 to-black text-primary-foreground flex flex-col justify-between p-4 sm:p-6">
        {/* Header bar */}
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full pt-4">
          <Link to="/" className="flex items-center gap-2 text-gold hover:underline text-sm font-medium">
            <ChevronRight className="h-4 w-4 rotate-180" />
            <span>భక్తుల పోర్టల్‌కి తిరిగి వెళ్ళండి (Back to Public Site)</span>
          </Link>
          <span className="text-xs text-gold/70 bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
            Secure Admin Portal v2.0
          </span>
        </div>

        {/* Login Box */}
        <div className="max-w-md w-full mx-auto my-auto bg-card text-foreground rounded-2xl border-2 border-gold shadow-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="text-center">
            <span className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-saffron text-primary-foreground font-display text-3xl shadow-temple ring-4 ring-gold/70">
              ॐ
            </span>
            <p className="mt-4 font-serif text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Sri Durga Varahi Amma Devalayam
            </p>
            <h1 className="mt-1 font-display text-2xl font-black tracking-wide text-foreground">
              ADMIN DASHBOARD
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              పిసిని శ్రీ దుర్గా వారాహి ఆలయ నిర్వహణ పోర్టల్
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center justify-between">
                <span>అడ్మిన్ పాస్‌కీ (Admin Passkey)</span>
                <span className="text-[11px] text-primary font-normal cursor-pointer hover:underline" onClick={() => setPasskeyInput("varahi2026")}>
                  Use Default: <code className="bg-muted px-1 rounded font-bold">varahi2026</code>
                </span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter administrator passkey..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 pl-11 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
              {authError && (
                <p className="mt-2 text-xs text-destructive font-medium flex items-center gap-1.5 animate-in fade-in">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>తప్పు పాస్‌కీ! Incorrect passkey. (Hint: varahi2026)</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary hover:brightness-110 text-primary-foreground py-3 text-sm font-bold shadow-temple transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>లాగిన్ అవ్వండి (Enter Admin Console)</span>
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
                పిసిని దేవస్థానం – అడ్మినిస్ట్రేటివ్ మేనేజ్‌మెంట్ కన్సోల్
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-full border border-gold/60 bg-gold/10 hover:bg-gold hover:text-maroon px-3 py-1.5 text-xs font-semibold text-gold transition-colors shadow-2xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">భక్తుల వెబ్‌సైట్ చూడండి (View Live Site)</span>
              <span className="sm:hidden">Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-full bg-destructive/80 hover:bg-destructive px-3 py-1.5 text-xs font-semibold text-destructive-foreground transition-colors shadow-2xs cursor-pointer"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">లాగౌట్ (Logout)</span>
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
            <span>ఓవర్‌వ్యూ (Dashboard Overview)</span>
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
            <span>గ్యాలరీ ఫొటోస్ (Gallery Manager - {gallery.length})</span>
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
            <span>పూజలు & ఉత్సవాలు (Pujas & Events - {pujas.length})</span>
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
            <span>అన్న ప్రసాదం (Anna Prasadam - {prasadams.length})</span>
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
                  ఆలయ పరిపాలనా విభాగం (Temple Administration)
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                  శ్రీ దుర్గా వారాహి అమ్మవారి దేవస్థానం డాష్‌బోర్డ్
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                  Manage temple gallery photos, daily pujas, Navaratri and festival events, and daily Anna Prasadam distributions. Changes made here will automatically reflect on the public devotee website in real time.
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
                    <span>ఫొటో జోడించండి (Add Gallery Photo)</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("pujas");
                      setPujaModalOpen(true);
                    }}
                    className="rounded-xl border border-primary text-primary px-4 py-2 text-xs sm:text-sm font-bold hover:bg-primary/10 flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>పూజ / ఉత్సవం జోడించండి (Add Puja)</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("prasadam");
                      setPrasadamModalOpen(true);
                    }}
                    className="rounded-xl border border-gold/70 text-amber-800 dark:text-gold px-4 py-2 text-xs sm:text-sm font-bold hover:bg-gold/15 flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>ప్రసాదం జోడించండి (Add Prasadam)</span>
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
                <h3 className="mt-3 font-bold text-sm text-foreground">గ్యాలరీ ఫొటోలు (Photos)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">High-resolution holy temple images</p>
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
                <h3 className="mt-3 font-bold text-sm text-foreground">పూజలు & ఉత్సవాలు (Pujas)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Daily sevas, festivals and special homams</p>
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
                <h3 className="mt-3 font-bold text-sm text-foreground">అన్న ప్రసాదాలు (Prasadam)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Maha Annadanam and sacred recipes</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold/20 text-amber-800 dark:text-gold">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold bg-green-500/20 text-green-700 dark:text-green-400 px-2.5 py-0.5 rounded-full">
                    Active & Synced
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-sm text-foreground">సిస్టమ్ స్టేటస్ (System)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Real-time sync to public devotee site</p>
              </div>
            </div>

            {/* Quick Actions & Reset Row */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                All updates are saved locally in the database and immediately visible on <code className="bg-muted px-1.5 py-0.5 rounded font-mono">http://localhost:8080/</code>.
              </p>
              <button
                onClick={() => {
                  if (confirm("మీరు నిజంగానే అన్ని డేటాను ఆలయ ప్రారంభ సెట్టింగులకు రీసెట్ చేయాలనుకుంటున్నారా? Reset all to default temple data?")) {
                    resetAll();
                    showToast("అన్ని రికార్డులు డీఫాల్ట్‌కి రీసెట్ చేయబడ్డాయి (All reset to defaults)");
                  }
                }}
                className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset to Factory Defaults</span>
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
                  ఆలయ ఫొటో గ్యాలరీ (Gallery Images Management)
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  మొత్తం {gallery.length} ఫొటోలు ఉన్నాయి. ఇక్కడి నుండి కొత్త ఫొటోలు జోడించవచ్చు లేదా తొలగించవచ్చు.
                </p>
              </div>
              <button
                onClick={() => setGalleryModalOpen(true)}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-xs sm:text-sm font-bold shadow-temple hover:brightness-110 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>కొత్త ఫొటో జోడించండి (Add Image)</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className="group rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:border-gold hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                        {item.title}
                      </h4>
                      <p className="font-serif text-xs text-foreground/80 font-medium line-clamp-1 mt-0.5">
                        {item.titleTe}
                      </p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-border/80 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-muted-foreground">{item.dateAdded}</span>
                      <button
                        onClick={() => {
                          if (confirm(`ఈ ఫొటోను తొలగించాలా? Delete photo "${item.title}"?`)) {
                            deleteGalleryItem(item.id);
                            showToast("ఫొటో తొలగించబడింది! Image deleted.");
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
                  పూజలు & ఉత్సవాల నిర్వహణ (Pujas & Events Management)
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  నిత్య పూజలు, విశేష అర్చనలు, మరియు వార్షిక నవరాత్రి మహోత్సవాల వివరాలను నిర్వహించండి.
                </p>
              </div>
              <button
                onClick={() => setPujaModalOpen(true)}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-xs sm:text-sm font-bold shadow-temple hover:brightness-110 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>కొత్త పూజ / ఉత్సవం జోడించండి (Add Puja)</span>
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

                    <h3 className="font-display text-base font-bold text-primary">{p.name}</h3>
                    <p className="text-xs font-semibold text-foreground/80 mt-0.5">{p.nameTe}</p>

                    <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>{p.time}</span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {p.desc}
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
                      {p.active ? "Active on Website" : "Hidden"}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`ఈ పూజను తొలగించాలా? Delete puja "${p.name}"?`)) {
                          deletePuja(p.id);
                          showToast("పూజ రికార్డు తొలగించబడింది! Puja deleted.");
                        }
                      }}
                      className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors cursor-pointer"
                      title="Delete Puja"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
                  అన్న ప్రసాదాల నిర్వహణ (Anna Prasadam Management)
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  నిత్య అన్నదానం మరియు ఆలయ కౌంటర్ ప్రసాదాల వివరాలను అప్‌డేట్ చేయండి.
                </p>
              </div>
              <button
                onClick={() => setPrasadamModalOpen(true)}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-xs sm:text-sm font-bold shadow-temple hover:brightness-110 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>కొత్త ప్రసాదం జోడించండి (Add Prasadam)</span>
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
                      {annadanamInfo.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium">
                      {annadanamInfo.titleTe}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingAnnadanam(!isEditingAnnadanam)}
                  className="rounded-lg border border-primary/40 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>{isEditingAnnadanam ? "Cancel" : "Edit Scheme Details"}</span>
                </button>
              </div>

              {isEditingAnnadanam ? (
                <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Daily Devotee Serving Count</label>
                    <input
                      value={annaCount}
                      onChange={(e) => setAnnaCount(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Annadanam Serving Timing</label>
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
                      సేవ్ చేయండి (Save Scheme Info)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-border/80 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Daily Devotee Count:</span>
                    <span className="font-bold text-foreground text-sm">{annadanamInfo.dailyCount}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Distribution Timing:</span>
                    <span className="font-bold text-foreground text-sm">{annadanamInfo.timing}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Sponsorship Status:</span>
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

                    <h3 className="font-display text-base font-bold text-primary">{p.name}</h3>
                    <p className="text-xs font-semibold text-foreground/80 mt-0.5">{p.nameTe}</p>

                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>{p.timing}</span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {p.desc}
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
                      {p.isAvailable ? "Available Today" : "Not Available"}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`ఈ ప్రసాదాన్ని తొలగించాలా? Delete prasadam "${p.name}"?`)) {
                          deletePrasadam(p.id);
                          showToast("ప్రసాదం తొలగించబడింది! Prasadam item deleted.");
                        }
                      }}
                      className="text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors cursor-pointer"
                      title="Delete Prasadam"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
    </div>
  );
}
