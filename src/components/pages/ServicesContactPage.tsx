import React, { useState } from 'react';
import { PortfolioData, PageTab, ContactMessage } from '../../types';
import { BloodDripText } from '../BloodDripText';
import {
  DollarSign,
  Send,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  Calculator,
  MessageCircle,
  Clock,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ServicesContactPageProps {
  data: PortfolioData;
  setActiveTab: (tab: PageTab) => void;
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
}

export const ServicesContactPage: React.FC<ServicesContactPageProps> = ({
  data,
  setActiveTab,
  onSendMessage,
}) => {
  const { profile, services } = data;

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [projectType, setProjectType] = useState('Telegram Bot');
  const [budget, setBudget] = useState('$30 - $60');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Interactive Project Cost Calculator state
  const [calcBaseType, setCalcBaseType] = useState<number>(25); // base price
  const [calcSelectedAddons, setCalcSelectedAddons] = useState<string[]>([
    'admin_panel',
    'mobile_responsive',
  ]);

  const addonOptions = [
    { id: 'admin_panel', label: "Django Admin Paneli", price: 15 },
    { id: 'mobile_responsive', label: "Moslashuvchan Vibe Dizayn", price: 10 },
    { id: 'payment_systems', label: "Click / Payme Integratsiya", price: 20 },
    { id: 'telegram_sync', label: "Telegram Bot Bilan Bog'lash", price: 15 },
    { id: 'fast_delivery', label: "2 Kunda Tezkor Yetkazish ⚡", price: 15 },
  ];

  const toggleAddon = (id: string) => {
    if (calcSelectedAddons.includes(id)) {
      setCalcSelectedAddons(calcSelectedAddons.filter((a) => a !== id));
    } else {
      setCalcSelectedAddons([...calcSelectedAddons, id]);
    }
  };

  const calculatedTotal = React.useMemo(() => {
    const addonsTotal = calcSelectedAddons.reduce((acc, addonId) => {
      const found = addonOptions.find((o) => o.id === addonId);
      return acc + (found ? found.price : 0);
    }, 0);
    return calcBaseType + addonsTotal;
  }, [calcBaseType, calcSelectedAddons]);

  const estimatedMarketPrice = calculatedTotal * 2.8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderContact.trim()) return;

    onSendMessage({
      senderName,
      senderContact,
      projectType,
      budget,
      message,
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f97316', '#10b981', '#38bdf8', '#f59e0b'],
    });

    setFormSubmitted(true);
  };

  return (
    <div className="w-full space-y-12 pb-16 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <section className="text-center space-y-3 pt-4 sm:pt-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white/10 text-yellow-300 border border-white/20">
          🔥 50% ARZON NARXLAR KAFOLATI
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          <BloodDripText
            text="Xizmatlar, Tariflar &"
            highlightText="Aloqa"
            highlightClassName="text-yellow-400"
          />
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto font-light">
          14 yoshli dasturchidan eng sifatli va eng hamyonbop yechimlar. Byudjetingizga mos tarifni tanlang yoki shaxsiy narx hisoblang!
        </p>
      </section>

      {/* 3 PRICING TIERS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {services.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 shadow-2xl ${
                plan.popular
                  ? 'border-2 border-yellow-400 bg-white/15 scale-102 z-10 shadow-yellow-500/10'
                  : 'border border-white/20 hover:border-yellow-400/60'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{plan.badge || 'Eng Ko\'p Tanlangan'}</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                  <p className="text-xs text-white/70 mt-1 font-light">{plan.description}</p>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-yellow-300 font-mono">
                      {plan.currency}{plan.discountedPrice}
                    </span>
                    <span className="text-sm text-white/40 line-through font-mono">
                      {plan.currency}{plan.originalPrice}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                      -50% Chegirma
                    </span>
                  </div>
                  <div className="text-[11px] text-white/70 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-yellow-300" />
                    <span>Yetkazish muddati: <strong>{plan.deliveryDays}</strong></span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-yellow-300">
                    Kiritilgan imkoniyatlar:
                  </span>
                  <ul className="space-y-2 text-xs text-white/80">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    setProjectType(plan.title);
                    setBudget(`$${plan.discountedPrice}`);
                    const contactElem = document.getElementById('contact-form-section');
                    if (contactElem) {
                      contactElem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-full py-3.5 rounded-full font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg ${
                    plan.popular
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-yellow-400/20'
                      : 'bg-white text-indigo-950 hover:bg-yellow-400 hover:text-slate-950'
                  }`}
                >
                  <span>Tanlash & Buyurtma qilish</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </section>

      {/* INTERACTIVE PRICE ESTIMATOR (KALKULYATOR) */}
      <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-yellow-300 font-mono text-xs font-bold">
              <Calculator className="w-4 h-4" />
              <span>INTERAKTIV KALKULYATOR</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Loyiha Narxini Hisoblash</h2>
            <p className="text-xs text-white/70">Kerakli funksiyalarni belgilang va yakuniy narxni ko'ring.</p>
          </div>

          <div className="p-3.5 px-5 rounded-2xl bg-black/40 border border-emerald-500/40 text-right">
            <div className="text-[10px] text-emerald-400 font-mono">14-yoshli Vibe narxi:</div>
            <div className="text-2xl font-extrabold text-emerald-300 font-mono">
              ${calculatedTotal}
            </div>
            <div className="text-[10px] text-white/40 line-through">
              Bozor narxi: ~${Math.round(estimatedMarketPrice)}
            </div>
          </div>
        </div>

        {/* Calculator Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Base Type Select */}
          <div className="lg:col-span-5 space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-yellow-300">
              1. Asosiy Loyiha Turi:
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setCalcBaseType(20)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  calcBaseType === 20
                    ? 'bg-yellow-400/20 border-yellow-400 text-white font-bold'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">Oddiy Telegram Bot</div>
                  <div className="text-[10px] text-white/60">Menyu, avto-javob va buyurtma</div>
                </div>
                <span className="font-mono text-yellow-300 text-xs font-bold">$20</span>
              </button>

              <button
                type="button"
                onClick={() => setCalcBaseType(35)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  calcBaseType === 35
                    ? 'bg-yellow-400/20 border-yellow-400 text-white font-bold'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">FastAPI / Django REST API</div>
                  <div className="text-[10px] text-white/60">Ma'lumotlar bazasi va CRUD endpointlar</div>
                </div>
                <span className="font-mono text-yellow-300 text-xs font-bold">$35</span>
              </button>

              <button
                type="button"
                onClick={() => setCalcBaseType(50)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  calcBaseType === 50
                    ? 'bg-yellow-400/20 border-yellow-400 text-white font-bold'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">To'liq Web Sayt (Frontend + Backend)</div>
                  <div className="text-[10px] text-white/60">React + Django + Glassmorphism</div>
                </div>
                <span className="font-mono text-yellow-300 text-xs font-bold">$50</span>
              </button>
            </div>
          </div>

          {/* Add-ons Select */}
          <div className="lg:col-span-7 space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-yellow-300">
              2. Qo'shimcha Imkoniyatlar:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {addonOptions.map((opt) => {
                const isSelected = calcSelectedAddons.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleAddon(opt.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-yellow-400/20 border-yellow-400 text-white'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isSelected ? 'bg-yellow-400 text-slate-950 font-bold' : 'border border-white/30'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className="text-xs font-medium">{opt.label}</span>
                    </div>
                    <span className="font-mono text-xs text-yellow-300 font-bold">+${opt.price}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-xs text-white/70">
                Ushbu hisob-kitob bilan buyurtma berishni istaysizmi?
              </span>
              <button
                onClick={() => {
                  setBudget(`$${calculatedTotal}`);
                  const contactElem = document.getElementById('contact-form-section');
                  if (contactElem) {
                    contactElem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1 shadow transition-all"
              >
                <span>Shaklga o'tkazish</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & DIRECT CHANNELS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="contact-form-section">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-yellow-300 font-bold">
                XABAR QALDIRISH
              </span>
              <h3 className="text-2xl font-bold text-white">Loyihangiz Bo'yicha Bog'laning</h3>
              <p className="text-xs text-white/70">
                Xabaringiz to'g'ridan-to'g'ri Django Admin paneliga yuboriladi va tezda javob qaytaraman.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-3xl bg-black/40 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Xabaringiz Qabul Qilindi!</h4>
                <p className="text-xs text-white/80 max-w-md mx-auto">
                  Rahmat! Xabaringiz Django Admin paneli xabarlar qutisiga saqlandi. Tez orada siz bilan Telegram yoki telefon orqali bog'lanaman.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 bg-yellow-400 text-slate-950 rounded-full text-xs font-bold shadow"
                >
                  Yana boshqa xabar yozish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Ismingiz *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Sardor"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-3 rounded-full bg-black/30 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Telefon / Telegram *</label>
                    <input
                      type="text"
                      required
                      placeholder="+998 90 ... yoki @username"
                      value={senderContact}
                      onChange={(e) => setSenderContact(e.target.value)}
                      className="w-full px-4 py-3 rounded-full bg-black/30 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Loyiha turi</label>
                    <input
                      type="text"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      placeholder="Telegram Bot, Django Web, API..."
                      className="w-full px-4 py-3 rounded-full bg-black/30 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Mo'ljallangan byudjet</label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="Masalan: $35 yoki $50"
                      className="w-full px-4 py-3 rounded-full bg-black/30 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/80">Loyiha haqida qisqacha</label>
                  <textarea
                    rows={3}
                    placeholder="Loyiha qanday ishlashi kerakligi haqida yozing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-yellow-400/20 flex items-center justify-center space-x-2 transition-transform transform active:scale-98"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Xabarni Yuborish</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Direct Channels & Phone */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 space-y-6 shadow-2xl">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-300 font-bold">
                TO'G'RIDAN-TO'G'RI ALOQA
              </span>
              <h3 className="text-xl font-bold text-white">Tezkor Bog'lanish</h3>
              <p className="text-xs text-white/70">
                Shoshilinch buyurtmalar uchun Telegram yoki telefon orqali to'g'ridan-to'g'ri aloqaga chiqing.
              </p>
            </div>

            <div className="space-y-3">
              {/* Telegram Card */}
              <a
                href={`https://t.me/${profile.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-sky-400/30 flex items-center space-x-3 group hover:bg-sky-500/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white">Telegram orqali yozish</div>
                  <div className="text-xs text-sky-300 font-mono">{profile.telegram}</div>
                </div>
                <Send className="w-4 h-4 text-sky-400 opacity-70 group-hover:opacity-100" />
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${profile.phone}`}
                className="p-4 rounded-2xl bg-white/5 border border-emerald-400/30 flex items-center space-x-3 group hover:bg-emerald-500/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white">Telefon qo'ng'iroq</div>
                  <div className="text-xs text-emerald-300 font-mono">{profile.phone}</div>
                </div>
                <Phone className="w-4 h-4 text-emerald-400 opacity-70 group-hover:opacity-100" />
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${profile.email}`}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3 group hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white">Elektron Pochta</div>
                  <div className="text-[11px] text-slate-200 font-mono">{profile.email}</div>
                </div>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-[11px] text-white/70 space-y-1">
              <div className="text-yellow-300 font-bold">⚡ Javob berish vaqti:</div>
              <div>Telegramda: <strong>5-15 daqiqa</strong> ichida</div>
              <div>Ish vaqti: Dushanba - Yakshanba (Doimiy aloqada)</div>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
