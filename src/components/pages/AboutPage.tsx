import React, { useState } from 'react';
import { PortfolioData, PageTab } from '../../types';
import { BloodDripText } from '../BloodDripText';
import {
  User,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Send,
  Github,
  Terminal,
  CheckCircle,
  Zap,
  Code2,
  Cpu,
  Coffee,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Play
} from 'lucide-react';

interface AboutPageProps {
  data: PortfolioData;
  setActiveTab: (tab: PageTab) => void;
  onOpenAdmin: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  data,
  setActiveTab,
  onOpenAdmin,
}) => {
  const { profile } = data;

  const [activeTerminalCmd, setActiveTerminalCmd] = useState<'info' | 'why_cheap' | 'vibe_stack' | 'django'>('info');

  return (
    <div className="w-full space-y-12 pb-16 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <section className="text-center space-y-3 pt-4 sm:pt-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white/10 text-yellow-300 border border-white/20">
          👨‍💻 14-YOSHLI DEVELOPER TARIXI
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          <BloodDripText
            text="Men Haqimda &"
            highlightText="Ishlash Falsafam"
            highlightClassName="text-yellow-400"
          />
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto font-light">
          Kimman, nega dasturlashni tanlaganman va nega narxlarim boshqalarnikidan ancha arzon ekanligi haqida.
        </p>
      </section>

      {/* MAIN BIO & PROFILE CARD GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Big Glass Card with Avatar & Quick Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 space-y-6 shadow-2xl relative overflow-hidden">
            
            {/* Avatar & Glow */}
            <div className="relative mx-auto w-44 h-44 rounded-3xl overflow-hidden p-1 bg-white/20 border border-white/30 shadow-2xl">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[22px]"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-slate-950 rounded-full font-mono font-bold text-xs shadow">
                {profile.age} yosh
              </div>
            </div>

            {/* Name & Subtitle */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-white">{profile.name}</h2>
              <p className="text-xs text-yellow-300 font-mono tracking-wider">{profile.roleTitle}</p>
              <p className="text-xs text-white/60 font-light">{profile.roleSubtitle}</p>
            </div>

            {/* Quick Contact & Info List */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-white/70 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Yosh:</span>
                </span>
                <span className="font-bold text-yellow-300">{profile.age} yoshda</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-white/70 flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Telefon:</span>
                </span>
                <a href={`tel:${profile.phone}`} className="font-mono text-emerald-300 hover:underline">
                  {profile.phone}
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-white/70 flex items-center space-x-1.5">
                  <Send className="w-3.5 h-3.5 text-sky-400" />
                  <span>Telegram:</span>
                </span>
                <a
                  href={`https://t.me/${profile.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sky-300 hover:underline font-bold"
                >
                  {profile.telegram}
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-white/70 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                  <span>Email:</span>
                </span>
                <a href={`mailto:${profile.email}`} className="font-mono text-slate-200 hover:underline text-[11px]">
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-white/70 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Manzil:</span>
                </span>
                <span className="text-slate-200">{profile.location}</span>
              </div>
            </div>

            {/* Quick Admin notice */}
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full py-2.5 px-4 rounded-full bg-black/30 hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Django Adminda tahrirlash (8m7n6b5v)</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Detailed Story, Why Cheap, Vibe Coding philosophy */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Detailed Bio card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 space-y-5 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Dasturchilik Yo'lim va Maqsadim</span>
            </h3>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
              {profile.detailedAbout}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="flex items-center space-x-2 text-yellow-300 font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>Backendga Muhabbat</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Python va Django orqali murakkab ma'lumotlar bazasi, to'lov tizimlari va xavfsiz API qurish menga haqiqiy zavq bag'ishlaydi.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 space-y-2">
                <div className="flex items-center space-x-2 text-sky-300 font-bold text-sm">
                  <Code2 className="w-4 h-4" />
                  <span>Frontend Vibe Coder</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Faqat quruq backend emas, balki shaffof glassmorphism, zo'r animatsiyalar va zamonaviy UI interfeyslar qilishni yoqtiraman.
                </p>
              </div>
            </div>
          </div>

          {/* NEGA NARXIM ARZON? (CRITICAL SECTION) */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-emerald-500/40 space-y-4 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                💰
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Nega ishlash narxim qolganlarnikidan arzon?</h3>
                <p className="text-xs text-yellow-300 font-mono">100% Shaffof va Haqiqiy Sabab</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed">
              <p>
                Ko'pchilik "Nega narxing bunchalik arzon, sifati past bo'lmaydimi?" deb so'raydi. Javob juda oddiy:
              </p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Yoshim 14 da</strong>: Men uchun hozirgi asosiy maqsad - katta pul ishlab topish emas, balki kuchli tajriba to'plash va nufuzli portfolio yig'ishdir.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Vibe Coding Tezligi</strong>: Men eng so'nggi zamonaviy frameworklar va AI yordamchi vositalaridan unumli foydalanaman, shuning uchun ishni 3 barobar tezroq bitiraman.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Mijoz ishonchi</strong>: Siz arzon narxga mukammal natija olasiz, men esa o'z portfoliomga yana bitta ajoyib loyiha qo'shaman!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* INTERACTIVE TERMINAL COMPONENT */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-white font-bold ml-2">vibe_terminal@14yo-dev:~</span>
              </div>
              <span className="text-[10px] text-yellow-300 font-mono">Bash / Python Interactive</span>
            </div>

            {/* Terminal Command Switchers */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <button
                onClick={() => setActiveTerminalCmd('info')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeTerminalCmd === 'info' ? 'bg-yellow-400 text-slate-950 font-bold shadow' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                $ whoami
              </button>
              <button
                onClick={() => setActiveTerminalCmd('why_cheap')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeTerminalCmd === 'why_cheap' ? 'bg-yellow-400 text-slate-950 font-bold shadow' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                $ cat pricing_strategy.py
              </button>
              <button
                onClick={() => setActiveTerminalCmd('vibe_stack')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeTerminalCmd === 'vibe_stack' ? 'bg-yellow-400 text-slate-950 font-bold shadow' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                $ python -m vibe_coder
              </button>
              <button
                onClick={() => setActiveTerminalCmd('django')}
                className={`px-3 py-1 rounded-full transition-all ${
                  activeTerminalCmd === 'django' ? 'bg-yellow-400 text-slate-950 font-bold shadow' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                $ django-admin status
              </button>
            </div>

            {/* Terminal Output Screen */}
            <div className="rounded-2xl bg-black/40 p-4 font-mono text-xs text-slate-200 border border-white/10 shadow-inner min-h-[140px] space-y-2">
              {activeTerminalCmd === 'info' && (
                <div className="space-y-1">
                  <div className="text-emerald-400">$ whoami --full</div>
                  <div className="text-slate-300">Name: {profile.name}</div>
                  <div className="text-slate-300">Age: 14 years old</div>
                  <div className="text-slate-300">Role: Backend Developer & Frontend Vibe Coder</div>
                  <div className="text-yellow-300">Experience: {profile.yearsOfExperience} yillik amaliy kod yozish tajribasi</div>
                  <div className="text-sky-300">Status: ✅ Yangi loyihalarni qabul qilmoqda!</div>
                </div>
              )}

              {activeTerminalCmd === 'why_cheap' && (
                <div className="space-y-1">
                  <div className="text-emerald-400">$ cat pricing_strategy.py</div>
                  <div className="text-purple-300">def calculate_price(market_price):</div>
                  <div className="pl-4 text-slate-300">my_discount = 0.50 # 50% arzonroq!</div>
                  <div className="pl-4 text-slate-300">quality = "100% Maximal (Toza arxitektura)"</div>
                  <div className="pl-4 text-yellow-300">return market_price * (1 - my_discount)</div>
                  <div className="text-emerald-300 font-bold pt-1"># Natija: Mijoz xursand, byudjet tejalgan!</div>
                </div>
              )}

              {activeTerminalCmd === 'vibe_stack' && (
                <div className="space-y-1">
                  <div className="text-emerald-400">$ python -m vibe_coder --boost</div>
                  <div className="text-slate-300">[+] Initializing React 19 + Tailwind v4 + Motion...</div>
                  <div className="text-slate-300">[+] Connecting Django REST API & PostgreSQL...</div>
                  <div className="text-slate-300">[+] Glassmorphism & Sunset Canvas active!</div>
                  <div className="text-yellow-300">[SUCCESS] Vibe Coding tezligi: 10x unumdorlik!</div>
                </div>
              )}

              {activeTerminalCmd === 'django' && (
                <div className="space-y-1">
                  <div className="text-emerald-400">$ django-admin status</div>
                  <div className="text-slate-300">Django version: 5.x LTS</div>
                  <div className="text-slate-300">Admin security: Maxfiy parol bilan himoyalangan</div>
                  <div className="text-slate-300">Models: Profile, Skills, Projects, Services, Messages</div>
                  <div className="text-emerald-400">Database: Sinxronlangan va to'liq tahrirlashga tayyor!</div>
                </div>
              )}
            </div>

          </div>

        </div>

      </section>

      {/* BOTTOM CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Ko'nikmalar va bilish foizlarini ko'rmoqchimisiz?</h4>
          <p className="text-xs text-white/70">Har bir dasturlash tili bo'yicha necha foiz bilishim va tajribam.</p>
        </div>
        <button
          onClick={() => setActiveTab('skills')}
          className="px-6 py-3 rounded-full bg-white text-indigo-950 hover:bg-yellow-400 hover:text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shrink-0"
        >
          <span>Ko'nikmalar sahifasiga o'tish</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
