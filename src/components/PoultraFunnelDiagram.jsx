import React, { useState } from 'react';
import { ShoppingBag, Globe, ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Lock, Truck } from 'lucide-react';

export default function PoultraFunnelDiagram({ isLight = true }) {
  const [lang, setLang] = useState('ta'); // 'en' | 'ta' | 'hi'

  const langContent = {
    en: {
      catalogTitle: "Broiler Chicks (Grade A)",
      price: "₹34 / chick · Min order 500",
      cta: "Instant Escrow Lock",
      disclaimer: "Protected by SafeHatch Escrow",
      badge: "English (Direct)"
    },
    ta: {
      catalogTitle: "தரமான பிராய்லர் குஞ்சுகள் (தரம் A)",
      price: "₹34 / குஞ்சு · குறைந்தபட்சம் 500",
      cta: "பாதுகாப்பான எஸ்க்ரோ முன்பதிவு",
      disclaimer: "SafeHatch எஸ்க்ரோ மூலம் பாதுகாக்கப்பட்டது",
      badge: "தமிழ் (Tamil 1-Tap)"
    },
    hi: {
      catalogTitle: "ब्रायलर चूजे (ग्रेड A)",
      price: "₹34 / चूजा · न्यूनतम 500",
      cta: "सुरक्षित एस्क्रो बुक करें",
      disclaimer: "SafeHatch एस्क्रो द्वारा सुरक्षित",
      badge: "हिंदी (Hindi 1-Tap)"
    }
  };

  const curr = langContent[lang];

  return (
    <div className={`p-6 sm:p-8 border my-6 transition-all ${isLight ? 'bg-white border-black/10 shadow-sm' : 'bg-[#0e0e12] border-white/10'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d9623d]"></span>
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#d9623d] font-bold">
              B2B Marketplace Architecture · Funnel Teardown
            </span>
          </div>
          <h4 className={`text-xl font-display font-black uppercase mt-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            Poultra 7 Frictionless Escrow Funnel
          </h4>
        </div>

        {/* Vernacular Language Switcher Demo */}
        <div className={`flex items-center gap-1.5 border p-1 ${isLight ? 'bg-white border-black/20 shadow-sm' : 'bg-black/40 border-white/10'}`}>
          <Globe className="w-3.5 h-3.5 text-[#d9623d] ml-1" />
          <button
            onClick={() => setLang('ta')}
            className={`px-2.5 py-1 text-[10px] font-mono-tech uppercase font-bold transition-all rounded-[2px] ${
              lang === 'ta' ? 'bg-[#d9623d] text-white shadow-sm' : isLight ? 'text-[#141418] hover:bg-black/5' : 'text-white/70 hover:text-white'
            }`}
          >
            தமிழ் (TA)
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-2.5 py-1 text-[10px] font-mono-tech uppercase font-bold transition-all rounded-[2px] ${
              lang === 'hi' ? 'bg-[#d9623d] text-white shadow-sm' : isLight ? 'text-[#141418] hover:bg-black/5' : 'text-white/70 hover:text-white'
            }`}
          >
            हिंदी (HI)
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 text-[10px] font-mono-tech uppercase font-bold transition-all rounded-[2px] ${
              lang === 'en' ? 'bg-[#d9623d] text-white shadow-sm' : isLight ? 'text-[#141418] hover:bg-black/5' : 'text-white/70 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* 4-Stage Visual Funnel Diagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        
        {/* Stage 1: Open Guest Catalog */}
        <div className={`p-4 border flex flex-col justify-between ${isLight ? 'bg-[#faf7f2] border-black/15 shadow-sm' : 'bg-white/[0.02] border-white/10'}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-tech text-[10px] uppercase text-[#d9623d] font-bold">01 · LAZY AUTH CATALOG</span>
              <ShoppingBag className="w-3.5 h-3.5 text-[#d9623d]" />
            </div>
            <div className={`font-mono-tech text-xs font-bold mb-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>Open Browsing</div>
            <p className={`text-[11px] leading-snug mb-3 font-medium ${isLight ? 'text-[#141418]' : 'text-white/80'}`}>
              Zero signup wall at Step 0. Farm operators inspect live daily hatch prices without credentials.
            </p>
            <div className={`p-2 border rounded text-[11px] font-mono-tech ${isLight ? 'bg-white border-black/15 text-[#141418]' : 'bg-black/30 border-white/10 text-white'}`}>
              <div className="font-bold truncate">{curr.catalogTitle}</div>
              <div className="text-[#d9623d] text-[10px] font-bold">{curr.price}</div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-black/10 text-[10px] font-mono-tech text-emerald-600 font-bold">
            Drop-off: 68% → 14% (-54%)
          </div>
        </div>

        {/* Stage 2: 1-Tap Vernacular UI */}
        <div className={`p-4 border flex flex-col justify-between ${isLight ? 'bg-[#faf7f2] border-black/15 shadow-sm' : 'bg-white/[0.02] border-white/10'}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-mono-tech text-[10px] uppercase font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>02 · VERNACULAR UX</span>
              <Globe className="w-3.5 h-3.5 text-[#d9623d]" />
            </div>
            <div className={`font-mono-tech text-xs font-bold mb-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>Regional Adaptation</div>
            <p className={`text-[11px] leading-snug mb-3 font-medium ${isLight ? 'text-[#141418]' : 'text-white/80'}`}>
              1-tap language toggle switches terminology into regional Tamil/Hindi farm idioms with zero page reload.
            </p>
            <div className={`p-2 border rounded text-[11px] font-mono-tech text-center ${isLight ? 'bg-white border-black/15 text-[#141418]' : 'bg-black/30 border-white/10 text-white'}`}>
              Active: <span className="font-bold text-[#d9623d]">{curr.badge}</span>
            </div>
          </div>
          <div className={`mt-3 pt-2 border-t border-black/10 text-[10px] font-mono-tech ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            Cognitive Friction: <span className="font-bold">Eliminated</span>
          </div>
        </div>

        {/* Stage 3: JIT 1-Step OTP */}
        <div className={`p-4 border flex flex-col justify-between ${isLight ? 'bg-[#faf7f2] border-black/15 shadow-sm' : 'bg-white/[0.02] border-white/10'}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-mono-tech text-[10px] uppercase font-bold ${isLight ? 'text-[#141418]' : 'text-white/60'}`}>03 · CHECKOUT AUTH</span>
              <UserCheck className="w-3.5 h-3.5 text-[#d9623d]" />
            </div>
            <div className={`font-mono-tech text-xs font-bold mb-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>Just-In-Time OTP</div>
            <p className={`text-[11px] leading-snug mb-3 font-medium ${isLight ? 'text-[#141418]' : 'text-white/80'}`}>
              Phone number captured only upon clicking order. Auto-submits on 4th OTP digit.
            </p>
            <div className={`p-2 border rounded text-[11px] font-mono-tech text-center font-bold text-emerald-600 ${isLight ? 'bg-white border-black/15' : 'bg-black/30 border-white/10'}`}>
              79% Checkout Auth Rate
            </div>
          </div>
          <div className={`mt-3 pt-2 border-t border-black/10 text-[10px] font-mono-tech ${isLight ? 'text-[#141418]' : 'text-white'}`}>
            Time-to-Order: <span className="font-bold">1.2 min</span> (was 8.5m)
          </div>
        </div>

        {/* Stage 4: Milestone Escrow Release */}
        <div className={`p-4 border flex flex-col justify-between ${isLight ? 'bg-[#faf7f2] border-black/15 shadow-sm' : 'bg-white/[0.02] border-white/10'}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-tech text-[10px] uppercase text-emerald-600 font-bold">04 · SAFE HATCH ESCROW</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className={`font-mono-tech text-xs font-bold mb-1 ${isLight ? 'text-[#141418]' : 'text-white'}`}>Milestone Smart Vault</div>
            <p className={`text-[11px] leading-snug mb-3 font-medium ${isLight ? 'text-[#141418]' : 'text-white/80'}`}>
              Funds locked in escrow vault upon booking; released to hatchery only after live transit mortality inspection.
            </p>
            <div className="p-2 border border-emerald-500/20 bg-emerald-500/10 rounded text-[10.5px] font-mono-tech text-center font-bold text-emerald-700 dark:text-emerald-300">
              {curr.disclaimer}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-black/10 text-[10px] font-mono-tech text-emerald-600 font-bold">
            92% Escrow Adoption Rate
          </div>
        </div>

      </div>

      {/* Metric Highlights */}
      <div className={`p-4 border text-xs font-mono-tech flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isLight ? 'bg-white border-black/15 text-[#141418] shadow-sm' : 'bg-white/5 border-white/10 text-gray-200'}`}>
        <div className="flex items-start sm:items-center gap-2">
          <span className="font-bold text-[#d9623d] uppercase tracking-wider whitespace-nowrap">Core PM Decision:</span>
          <span className={isLight ? 'text-[#141418] font-medium' : 'text-gray-200'}>Deferred mandatory identity capture until purchase confirmation, unlocking 4.8x higher throughput from rural farm operators.</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 ${isLight ? 'border-black/20 bg-black/5 text-[#141418]' : 'border-white/10 bg-white/5 text-white/70'}`}>
          Live B2B Platform
        </span>
      </div>
    </div>
  );
}
