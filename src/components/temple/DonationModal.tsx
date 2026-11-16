import { useState } from "react";
import { Check, Copy, HeartHandshake, Lock, ShieldCheck, Sparkles, X, ExternalLink } from "lucide-react";
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

  const formattedAmount = effectiveAmount ? parseInt(effectiveAmount).toLocaleString("en-IN") : "";

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      onClick={() => setDonationOpen(false)}
    >
      <div
        className="relative my-auto w-full max-w-lg rounded-3xl border-2 border-gold/80 bg-gradient-to-b from-[#240505] via-[#1a0303] to-[#120202] text-white p-5 sm:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(217,119,6,0.25)] animate-modal-in max-h-[92vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setDonationOpen(false)}
          className="absolute top-3.5 right-3.5 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-gold hover:bg-gold hover:text-maroon transition-all duration-200 hover:scale-110 active:scale-90 cursor-pointer shadow-md z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center relative">
          <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-saffron text-primary-foreground font-display text-xl shadow-temple ring-2 ring-gold/90">
            ॐ
          </span>
          <p className="mt-2 font-serif text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
            {lang === "te" ? "పిసిని శ్రీ దుర్గా వారాహి దేవస్థానం" : "Sri Durga Varahi Amma Devalayam, Pisini"}
          </p>
          <h2 className="mt-0.5 font-display text-lg sm:text-xl font-black text-white tracking-wide">
            {lang === "te" ? "ఆలయ విరాళ సమర్పణ" : "Temple Devotional Offerings"}
          </h2>
          <p className="text-[11px] text-amber-200/80 max-w-sm mx-auto leading-tight mt-0.5">
            {lang === "te"
              ? "నిత్య అన్నదానం & ఆలయ పునర్నిర్మాణ కైంకర్యాల కొరకు భక్తితో సమర్పించండి."
              : "Support Daily Maha Annadanam and Temple Consecration of Mother Varahi."}
          </p>

          {/* Official Security Lock Badge */}
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3 py-1 text-[10.5px] text-emerald-300 shadow-inner">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold text-white">
              {lang === "te" ? "అధికారిక లాక్ చేయబడిన ఖాతా" : "Official Verified Account"}
            </span>
            <span className="text-[10px] text-gold font-mono flex items-center gap-0.5 border-l border-emerald-500/40 pl-1.5">
              <Lock className="h-2.5 w-2.5" />
              <span>{phonePeNumber}</span>
            </span>
          </div>
        </div>

        {/* Amount Selector */}
        <div className="mt-3.5 rounded-2xl border border-gold/30 bg-black/40 p-3 sm:p-3.5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-bold text-gold uppercase tracking-wider">
              {lang === "te" ? "విరాళ మొత్తం ఎంచుకోండి:" : "Select Amount (₹):"}
            </label>
            {formattedAmount && (
              <span className="text-xs font-black text-amber-300 font-mono">
                ₹{formattedAmount}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
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
                  className={`rounded-xl py-1.5 px-1 text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-saffron to-amber-600 text-white ring-2 ring-gold shadow-md font-black scale-102"
                      : "bg-white/10 text-white/90 hover:bg-white/20 border border-gold/30"
                  }`}
                >
                  ₹{parseInt(amt).toLocaleString("en-IN")}
                </button>
              );
            })}
          </div>

          {/* Custom Amount Field */}
          <div className="mt-2.5 relative">
            <span className="absolute left-3 top-2 text-xs font-bold text-gold">₹</span>
            <input
              type="number"
              min="1"
              placeholder={lang === "te" ? "లేదా వేరే మొత్తం నమోదు చేయండి (Custom Amount)" : "Or enter custom amount (e.g. 5000)"}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full rounded-xl border border-gold/40 bg-white/5 py-1.5 pl-7 pr-3 text-xs font-bold text-white placeholder:text-zinc-400 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>

        {/* Instant UPI Payment Apps Grid */}
        <div className="mt-3.5">
          <p className="text-[10px] font-bold text-gold/90 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{lang === "te" ? "యూపీఐ యాప్ ద్వారా చెల్లించండి:" : "Pay Instantly via UPI App:"}</span>
            <span className="text-emerald-400 lowercase font-normal text-[9.5px]">tap to open app</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* PhonePe Button (Primary) */}
            <button
              type="button"
              onClick={() => handlePayClick(phonePeIntentLink)}
              className="group flex items-center justify-between rounded-xl bg-[#5f259f] hover:bg-[#501c87] text-white p-2.5 sm:p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer ring-1 ring-white/20"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-[#5f259f] font-black text-sm shadow-xs shrink-0">
                  पे
                </span>
                <div className="text-left leading-tight">
                  <p className="text-xs font-black">PhonePe</p>
                  <p className="text-[10px] text-white/80">
                    {formattedAmount ? `Pay ₹${formattedAmount}` : "Pay with PhonePe"}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* Google Pay Button */}
            <button
              type="button"
              onClick={() => handlePayClick(gpayIntentLink)}
              className="group flex items-center justify-between rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 p-2.5 sm:p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer ring-1 ring-zinc-300"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-100 text-[#4285F4] shadow-xs shrink-0">
                  <GooglePayIcon className="h-5 w-5" />
                </span>
                <div className="text-left leading-tight">
                  <p className="text-xs font-black text-zinc-900">Google Pay (GPay)</p>
                  <p className="text-[10px] text-zinc-600">
                    {formattedAmount ? `Pay ₹${formattedAmount}` : "Pay with GPay"}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* Paytm Button */}
            <button
              type="button"
              onClick={() => handlePayClick(paytmIntentLink)}
              className="group flex items-center justify-between rounded-xl bg-[#002e6e] hover:bg-[#002354] text-white p-2.5 sm:p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer ring-1 ring-cyan-400/40"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-[#00b9f5] font-black text-[11px] shadow-xs shrink-0">
                  Paytm
                </span>
                <div className="text-left leading-tight">
                  <p className="text-xs font-black">Paytm UPI</p>
                  <p className="text-[10px] text-white/80">
                    {formattedAmount ? `Pay ₹${formattedAmount}` : "Pay with Paytm"}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {/* Any Other UPI App (BHIM, Cred, Banking Apps) */}
            <button
              type="button"
              onClick={() => handlePayClick(upiDeepLink)}
              className="group flex items-center justify-between rounded-xl bg-gradient-to-r from-primary to-amber-600 hover:brightness-110 text-white p-2.5 sm:p-3 font-bold shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-98 cursor-pointer ring-1 ring-gold/70"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-black/20 text-gold shadow-xs shrink-0">
                  <BHIMIcon className="h-4.5 w-4.5" />
                </span>
                <div className="text-left leading-tight">
                  <p className="text-xs font-black">
                    {lang === "te" ? "ఇతర యూపీఐ యాప్స్" : "Any UPI App"}
                  </p>
                  <p className="text-[10px] text-white/80">
                    BHIM • Cred • All Apps
                  </p>
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          </div>
        </div>

        {/* Copy UPI Details Card - Clean & Tamper-Proof */}
        <div className="mt-3.5 rounded-2xl border border-gold/40 bg-black/50 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-[10px] text-gold uppercase tracking-wider font-semibold">
                <Lock className="h-2.5 w-2.5 text-gold" />
                <span>PhonePe / UPI Number:</span>
              </div>
              <span className="font-mono text-sm font-black text-white">{phonePeNumber}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(phonePeNumber, "phone")}
              className="flex items-center gap-1 rounded-lg border border-gold/50 bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold hover:bg-gold hover:text-maroon transition-colors cursor-pointer"
            >
              {copiedField === "phone" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copiedField === "phone" ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="h-px bg-gold/20" />

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-[10px] text-gold uppercase tracking-wider font-semibold">
                <ShieldCheck className="h-2.5 w-2.5 text-emerald-400" />
                <span>UPI ID (VPA):</span>
              </div>
              <span className="font-mono text-xs font-bold text-white/90">{upiId}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(upiId, "upi")}
              className="flex items-center gap-1 rounded-lg border border-gold/50 bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold hover:bg-gold hover:text-maroon transition-colors cursor-pointer"
            >
              {copiedField === "upi" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copiedField === "upi" ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Receipt Notice */}
        <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-2.5 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366] shrink-0" />
            <p className="text-[10.5px] text-emerald-200 leading-snug">
              {lang === "te"
                ? "పేమెంట్ స్క్రీన్‌షాట్‌ను రసీదు కోసం మా వాట్సాప్‌కు పంపగలరు."
                : "Share payment screenshot on WhatsApp for temple blessings & receipt."}
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
