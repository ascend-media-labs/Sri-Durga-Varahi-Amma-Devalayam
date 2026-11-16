import { useState } from "react";
import { Check, Copy, HeartHandshake, Lock, QrCode, ShieldCheck, Sparkles, X, ExternalLink } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useNav } from "@/lib/navContext";
import { TEMPLE_CONFIG } from "@/lib/constants/templeConfig";
import { WhatsAppIcon } from "./Footer";

// Authentic Brand SVGs
export function PhonePeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.215 15.352c-.528.293-1.196.44-1.984.44h-2.126v2.857h-1.89V6.351h4.153c.96 0 1.745.247 2.333.734.588.487.892 1.157.892 1.99 0 .614-.176 1.153-.523 1.602-.347.449-.838.775-1.464.966v.056c.742.146 1.332.487 1.754 1.015.422.528.638 1.187.638 1.961 0 .805-.261 1.488-.783 2.036-.522.548-1.229.932-2.122 1.15l1.122-2.509zm-2.073-6.527c0-.361-.115-.648-.342-.853-.227-.205-.562-.31-1.002-.31h-2.038v2.366h1.967c.468 0 .825-.107 1.06-.318.235-.211.355-.506.355-.885zm.366 4.382c0-.411-.131-.734-.39- Macdonald.389-.259-.226-.64-.342-1.134-.342h-2.223v2.548h2.247c.484 0 .858-.112 1.111-.333.253-.221.389-.556.389-1.004z" />
    </svg>
  );
}

export function GooglePayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.24 10.285v3.428h5.367c-.244 1.464-1.624 4.286-5.367 4.286-3.23 0-5.864-2.673-5.864-5.999 0-3.327 2.634-6 5.864-6 1.838 0 3.072.784 3.774 1.455l2.713-2.613C16.98 3.167 14.814 2 12.24 2 6.58 2 2 6.58 2 12.24s4.58 10.24 10.24 10.24c5.918 0 9.839-4.163 9.839-10.013 0-.673-.071-1.184-.163-1.682H12.24z" />
    </svg>
  );
}

export function PaytmIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.75 3.75H2.25A2.25 2.25 0 000 6v12a2.25 2.25 0 002.25 2.25h19.5A2.25 2.25 0 0024 18V6a2.25 2.25 0 00-2.25-2.25zM6 15.75H3.75v-7.5H6zm7.5 0h-2.25v-7.5h2.25zm6.75-4.5h-4.5v-3h4.5z" />
    </svg>
  );
}

export function BHIMIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

const PRESET_AMOUNTS = ["101", "251", "501", "1116", "2500", "5000"];

export function DonationModal() {
  const { lang } = useLang();
  const { donationOpen, setDonationOpen, presetAmount } = useNav();

  const [selectedAmount, setSelectedAmount] = useState<string>(presetAmount || "501");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"qr" | "apps">("apps");

  if (!donationOpen) return null;

  // Official Immutable Constants (Tamper-proof & Locked)
  const phonePeNumber = TEMPLE_CONFIG.PHONEPE_NUMBER;
  const upiId = TEMPLE_CONFIG.UPI_ID;
  const payeeName = TEMPLE_CONFIG.PAYEE_NAME;
  const note = TEMPLE_CONFIG.NOTE;

  const effectiveAmount = customAmount ? customAmount : selectedAmount;

  // Universal UPI Deep Link (Opens PhonePe, GPay, Paytm, BHIM or any UPI app chooser on mobile)
  const upiDeepLink = effectiveAmount
    ? `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(note)}`
    : `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=${encodeURIComponent(note)}`;

  // PhonePe specific intent with fallback to universal upi
  const phonePeIntentLink = effectiveAmount
    ? `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(note)}`
    : `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=${encodeURIComponent(note)}`;

  // Google Pay specific intent
  const gpayIntentLink = effectiveAmount
    ? `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(note)}`
    : `gpay://upi/pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=${encodeURIComponent(note)}`;

  // Paytm specific intent
  const paytmIntentLink = effectiveAmount
    ? `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${effectiveAmount}&cu=INR&tn=${encodeURIComponent(note)}`
    : `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&cu=INR&tn=${encodeURIComponent(note)}`;

  // QR Code generator URL using standard high-res QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(upiDeepLink)}`;

  const handleCopy = (text: string, field: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handlePayClick = (url: string) => {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-2.5 sm:p-4 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={() => setDonationOpen(false)}
    >
      <div
        className="relative my-auto w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-gold/80 bg-gradient-to-b from-[#2a0808] via-card to-[#1a0505] text-foreground p-4 sm:p-6 shadow-2xl animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setDonationOpen(false)}
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-gold hover:bg-gold hover:text-maroon transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-md z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center relative">
          <span className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-saffron text-primary-foreground font-display text-2xl shadow-temple ring-3 ring-gold/80">
            ॐ
          </span>
          <p className="mt-2.5 font-serif text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-gold">
            {lang === "te" ? "పిసిని శ్రీ దుర్గా వారాహి దేవస్థానం" : "Sri Durga Varahi Amma Devalayam, Pisini"}
          </p>
          <h2 className="mt-1 font-display text-xl sm:text-2xl font-black text-white tracking-wide">
            {lang === "te" ? "ఆలయ విరాళ సమర్పణ" : "Temple Devotional Offerings"}
          </h2>
          <p className="mt-1 text-xs text-gold/80 max-w-sm mx-auto">
            {lang === "te"
              ? "నిత్య అన్నదానం & ఆలయ పునర్నిర్మాణ కైంకర్యాల కొరకు భక్తితో సమర్పించండి."
              : "Support Daily Maha Annadanam and Temple Consecration of Mother Varahi."}
          </p>

          {/* Official Security Lock & Restriction Badge */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/50 px-3 py-1.5 text-[11px] text-emerald-300 shadow-inner">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-white">
              {lang === "te" ? "అధికారిక లాక్ చేయబడిన ఆలయ ఖాతా" : "Official Verified & Locked Account"}
            </span>
            <span className="text-[10px] text-gold font-mono flex items-center gap-1 border-l border-emerald-500/40 pl-2">
              <Lock className="h-3 w-3" />
              <span>{phonePeNumber}</span>
            </span>
          </div>
        </div>

        {/* Amount Selector */}
        <div className="mt-5 rounded-2xl border border-gold/30 bg-black/30 p-3.5 sm:p-4">
          <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-2">
            {lang === "te" ? "విరాళ మొత్తం ఎంచుకోండి (Select Amount)" : "Choose Donation Amount (₹)"}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = selectedAmount === amt && !customAmount;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`rounded-xl py-2 px-1 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                    isSelected
                      ? "bg-saffron text-white ring-2 ring-gold shadow-md font-black scale-102"
                      : "bg-white/10 text-white/90 hover:bg-white/20 border border-gold/30"
                  }`}
                >
                  ₹{parseInt(amt).toLocaleString("en-IN")}
                </button>
              );
            })}
          </div>

          {/* Custom Amount Field */}
          <div className="mt-3 relative">
            <span className="absolute left-3.5 top-2.5 text-xs font-bold text-gold">₹</span>
            <input
              type="number"
              min="1"
              placeholder={lang === "te" ? "లేదా వేరే మొత్తం నమోదు చేయండి (Custom Amount)" : "Or enter custom amount (e.g. 5000)"}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full rounded-xl border border-gold/40 bg-white/5 px-4 py-2 pl-8 text-xs font-bold text-white placeholder:text-muted-foreground/70 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>

        {/* Tab Switcher: Pay via App / Scan QR */}
        <div className="mt-4 flex rounded-xl border border-gold/30 bg-black/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("apps")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "apps"
                ? "bg-primary text-white shadow-xs font-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <PhonePeIcon className="h-4 w-4" />
            <span>{lang === "te" ? "యూపీఐ యాప్స్ ద్వారా (Pay via Apps)" : "Pay via UPI Apps"}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("qr")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "qr"
                ? "bg-primary text-white shadow-xs font-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <QrCode className="h-4 w-4 text-gold" />
            <span>{lang === "te" ? "క్యూఆర్ కోడ్ స్కాన్ (Scan QR Code)" : "Scan QR Code"}</span>
          </button>
        </div>

        {/* Option 1: Direct UPI Apps (PhonePe, GPay, Paytm, Any UPI) */}
        {activeTab === "apps" && (
          <div className="mt-4 space-y-2.5 animate-in fade-in duration-200">
            {/* PhonePe Button (Primary) */}
            <button
              type="button"
              onClick={() => handlePayClick(phonePeIntentLink)}
              className="w-full flex items-center justify-between rounded-xl bg-[#5f259f] hover:bg-[#521e8c] text-white p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer ring-1 ring-white/20"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[#5f259f] font-black text-sm shadow-xs">
                  पे
                </span>
                <div className="text-left">
                  <p className="text-xs font-black leading-tight">Pay with PhonePe</p>
                  <p className="text-[10px] text-white/80">
                    {effectiveAmount ? `Pay ₹${parseInt(effectiveAmount).toLocaleString("en-IN")}` : "Enter amount in PhonePe"}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/70 mr-1" />
            </button>

            {/* Google Pay Button */}
            <button
              type="button"
              onClick={() => handlePayClick(gpayIntentLink)}
              className="w-full flex items-center justify-between rounded-xl bg-[#1f1f1f] hover:bg-[#2d2d2d] text-white p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer border border-white/20"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[#4285F4] shadow-xs">
                  <GooglePayIcon className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-black leading-tight">Pay with Google Pay (GPay)</p>
                  <p className="text-[10px] text-white/80">
                    {effectiveAmount ? `Pay ₹${parseInt(effectiveAmount).toLocaleString("en-IN")}` : "Enter amount in Google Pay"}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/70 mr-1" />
            </button>

            {/* Paytm Button */}
            <button
              type="button"
              onClick={() => handlePayClick(paytmIntentLink)}
              className="w-full flex items-center justify-between rounded-xl bg-[#002e6e] hover:bg-[#002559] text-white p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer ring-1 ring-cyan-400/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-[#00b9f5] font-black text-xs shadow-xs">
                  Paytm
                </span>
                <div className="text-left">
                  <p className="text-xs font-black leading-tight">Pay with Paytm</p>
                  <p className="text-[10px] text-white/80">
                    {effectiveAmount ? `Pay ₹${parseInt(effectiveAmount).toLocaleString("en-IN")}` : "Enter amount in Paytm"}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/70 mr-1" />
            </button>

            {/* Any UPI App (BHIM, Cred, Banking Apps) */}
            <button
              type="button"
              onClick={() => handlePayClick(upiDeepLink)}
              className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-primary to-amber-600 hover:brightness-110 text-white p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer ring-1 ring-gold/70"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/20 text-gold shadow-xs">
                  <BHIMIcon className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-black leading-tight">
                    {lang === "te" ? "ఇతర యూపీఐ యాప్స్ (BHIM / Cred / Any UPI)" : "Pay via Any UPI App (BHIM / Cred)"}
                  </p>
                  <p className="text-[10px] text-white/80">
                    {effectiveAmount ? `Pay ₹${parseInt(effectiveAmount).toLocaleString("en-IN")}` : "Opens native UPI app chooser"}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-white/70 mr-1" />
            </button>
          </div>
        )}

        {/* Option 2: QR Code Scanning */}
        {activeTab === "qr" && (
          <div className="mt-4 text-center space-y-3 animate-in fade-in duration-200">
            <div className="mx-auto w-56 h-56 p-2 rounded-2xl bg-white border-4 border-gold shadow-2xl flex items-center justify-center">
              <img
                src={qrCodeUrl}
                alt="Donation UPI QR Code"
                width={240}
                height={240}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gold font-bold">
              {effectiveAmount ? `Amount: ₹${parseInt(effectiveAmount).toLocaleString("en-IN")}` : "Scan & enter amount"}
            </p>
            <p className="text-[11px] text-white/80 max-w-xs mx-auto leading-relaxed">
              {lang === "te"
                ? "PhonePe, Google Pay, లేదా Paytm కెమెరాతో ఈ QR కోడ్‌ను స్కాన్ చేసి నేరుగా విరాళాన్ని సమర్పించండి."
                : "Scan this QR code with PhonePe, Google Pay, or Paytm scanner on your phone to complete your donation."}
            </p>
          </div>
        )}

        {/* Copy UPI Details Card - Verified & Tamper-Proof */}
        <div className="mt-4 rounded-2xl border border-gold/40 bg-black/50 p-3.5 space-y-2.5 text-xs shadow-inner">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-wider font-bold">
                <Lock className="h-3 w-3 text-gold" />
                <span>PhonePe / UPI Number (శాశ్వతంగా లాక్ చేయబడింది):</span>
              </div>
              <span className="font-mono text-sm font-black text-white">{phonePeNumber}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(phonePeNumber, "phone")}
              className="flex items-center gap-1 rounded-lg border border-gold/50 bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold hover:bg-gold hover:text-maroon transition-colors cursor-pointer"
            >
              {copiedField === "phone" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedField === "phone" ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="h-px bg-gold/20" />

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-wider font-bold">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span>UPI ID / VPA (రక్షిత ఖాతా):</span>
              </div>
              <span className="font-mono text-xs font-bold text-white/90">{upiId}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(upiId, "upi")}
              className="flex items-center gap-1 rounded-lg border border-gold/50 bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold hover:bg-gold hover:text-maroon transition-colors cursor-pointer"
            >
              {copiedField === "upi" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedField === "upi" ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Receipt & Confirmation Notice */}
        <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="h-5 w-5 text-[#25D366] shrink-0" />
            <p className="text-[11px] text-emerald-200 leading-snug">
              {lang === "te"
                ? "పేమెంట్ పూర్తయిన తర్వాత రసీదు కోసం స్క్రీన్‌షాట్‌ను మా అధికారిక వాట్సాప్‌కు పంపగలరు."
                : "After payment, please share the screenshot on WhatsApp for temple blessings & receipt."}
            </p>
          </div>
          <a
            href={`https://wa.me/91${TEMPLE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(`నమస్కారం, శ్రీ దుర్గా వారాహి అమ్మవారి ఆలయ విరాళం సమర్పించాను. నా పేరిట సంకల్ప పూజ రసీదు వివరాలు పంపగలరు.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-[#25D366] text-white px-2.5 py-1.5 text-[10.5px] font-bold hover:brightness-110 transition shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
