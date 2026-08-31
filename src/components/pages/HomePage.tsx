import React, { useState, useEffect } from 'react';
import { PortfolioData, PageTab } from '../../types';
import { BloodDripText } from '../BloodDripText';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Terminal,
  Zap,
  DollarSign,
  Clock,
  ShieldCheck,
  Send,
  Layers,
  ChevronRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  Flame,
  Award,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomePageProps {
  data: PortfolioData;
  setActiveTab: (tab: PageTab) => void;
  onOpenAdmin: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  data,
  setActiveTab,
  onOpenAdmin,
}) => {
  const { profile, skills, projects, services } = data;
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    "14-Yoshli Backend Dasturchi",
    "Frontend Vibe Coder",
    "Django & FastAPI Arxitektori",
    "Bozor narxidan 50% arzonroq",
    "Telegram Bot & AI Yechimlari"
  ];

  // Dynamic typewriter effect
  useEffect(() => {
    const currentFullText = titles[typedIndex % titles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        if (typedText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setTypedIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, typedIndex]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fbbf24', '#ec4899', '#10b981']
    });
  };

  const topSkills = skills.filter(s => s.highlight).slice(0, 4);
  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16 animate-in fade-in duration-500">
      
      {/* HERO SECTION */}
      <section className="relative pt-4 sm:pt-8" id="home-hero-section">
        
        {/* Glassmorphic Hero Container with Natural Tones aesthetic */}
        <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-yellow-400/20 via-rose-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-600/20 via-indigo-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
            
            {/* Left Column: Text Info, Badges, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Natural Tones Subtitle */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-yellow-300 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>{profile.badge || "14-YOSHLI DEVELOPER & VIBE CODER"}</span>
                </span>
                
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-emerald-400/30">
                  <Flame className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  {profile.discountText || "50% Hamyonbop Narxlar"}
                </span>
              </div>

              {/* Main Headline with Blood Drip Effect */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                  <BloodDripText
                    text="Backend Vibe"
                    highlightText="Master"
                    highlightClassName="text-yellow-400"
                    intensity="heavy"
                  />
                </h1>

                {/* Animated Typewriter Subtitle */}
                <div className="h-12 flex items-center justify-center lg:justify-start pt-2">
                  <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-yellow-300 flex items-center">
                    <span>{typedText}</span>
                    <span className="w-0.5 h-7 ml-1 bg-yellow-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Bio & Vibe pitch */}
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                {profile.bio}
              </p>

              {/* Admin Panel Security Card */}
              <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-white/60 font-mono uppercase tracking-wider">Django Admin Security</div>
                    <div className="text-xs text-white font-mono font-bold">
                      Barcha ma'lumotlar boshqaruvi: <span className="text-emerald-400 font-semibold">🔒 Himoyalangan</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onOpenAdmin}
                  className="px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all shrink-0"
                >
                  Admin Panelni Ochish &rarr;
                </button>
              </div>

              {/* Action Buttons styled to Natural Tones tokens */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="btn-hero-projects"
                  onClick={() => setActiveTab('projects')}
                  className="bg-white text-indigo-950 px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-yellow-400 hover:text-slate-950 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center space-x-2 text-sm"
                >
                  <span>Loyihalarni ko'rish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="btn-hero-contact"
                  onClick={() => {
                    triggerConfetti();
                    setActiveTab('services_contact');
                  }}
                  className="border border-white/40 px-8 py-3.5 rounded-full font-medium hover:bg-white/10 text-white transition-all flex items-center space-x-2 text-sm"
                >
                  <Send className="w-4 h-4 text-yellow-300" />
                  <span>Xizmatlar & Narxlar</span>
                </button>
              </div>

            </div>

            {/* Right Column: Natural Tones Technical Specs Card */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              
              {/* Technical Stack Progress Card */}
              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/60">
                    Texnik Imkoniyatlar
                  </span>
                  <span className="text-xs text-yellow-300 font-mono font-bold">14 yosh &bull; Vibe</span>
                </div>

                <div className="space-y-4">
                  {topSkills.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-white/90">
                        <span>{skill.name}</span>
                        <span className="text-yellow-300 font-bold">{skill.percent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 shadow-[0_0_10px_#facc15] transition-all duration-1000"
                          style={{ width: `${skill.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-white/70 font-mono">
                  <span>⚡ Tajriba: {profile.yearsOfExperience}+ yil</span>
                  <span className="text-emerald-400">📁 {profile.completedProjectsCount}+ loyihalar</span>
                </div>
              </div>

              {/* Pricing Advantage Feature Card */}
              <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Hamyonbop Ishlash Narxi</h4>
                  <p className="text-xs text-white/70 mt-0.5">Bozor narxidan 50% arzonroq va 10x tezroq</p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-2xl font-black text-yellow-300">$20 - $50</div>
                  <div className="text-[10px] text-white/50 line-through">Bozorda: $150+</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE ME (14-yoshli Vibe Coder afzalliklari) */}
      <section className="space-y-6" id="why-choose-me-section">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-white/10 text-yellow-300 border border-white/20">
            ⚡ NEGA AYNAN MEN BILAN ISHLASH FOYDALI?
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Yoshlik G'ayrati + Hamyonbop Narx + Yuqori Sifat
          </h2>
          <p className="text-white/70 text-sm max-w-2xl mx-auto font-light">
            14 yoshdaman, tajriba to'plash va yaxshi portfolio yig'ish men uchun puldan muhimroq. Shuning uchun ishim sifatli va narxim juda qulay!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3 relative overflow-hidden group hover:bg-white/10 hover:border-yellow-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-yellow-400/30 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-slate-950" />
            </div>
            <h3 className="text-lg font-bold text-white">Bozordan 2 Barobar Arzon</h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Katta studiyalar yoki katta dasturchilar 500$ so'raydigan loyihalarni men sizga 50$-100$ ga, to'liq ishlaydigan holatda qilib beraman.
            </p>
            <div className="pt-2 text-yellow-300 text-xs font-semibold flex items-center space-x-1">
              <span>Maksimal tejash imkoniyati</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3 relative overflow-hidden group hover:bg-white/10 hover:border-yellow-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-400/30 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-slate-950" />
            </div>
            <h3 className="text-lg font-bold text-white">Vibe Coding & Tezkorlik</h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Zamonaviy texnologiyalar, AI vositalar va toza backend arxitektura yordamida loyihani haftalab emas, bir necha kunda topshiraman.
            </p>
            <div className="pt-2 text-emerald-300 text-xs font-semibold flex items-center space-x-1">
              <span>2-4 kunda birinchi natija</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3 relative overflow-hidden group hover:bg-white/10 hover:border-yellow-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-purple-400/30 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            <h3 className="text-lg font-bold text-white">Django & Toza Backend</h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Xavfsiz ma'lumotlar bazasi, qulay Django Admin paneli, avtorizatsiya va to'lov tizimlari to'liq qoidalar asosida quriladi.
            </p>
            <div className="pt-2 text-purple-300 text-xs font-semibold flex items-center space-x-1">
              <span>100% ishonchli arxitektura</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* TOP SKILLS PREVIEW */}
      <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-yellow-300 uppercase tracking-[0.2em]">Texnologik Stack</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Asosiy Dasturlash Tillari & Foizlar</h2>
          </div>
          <button
            onClick={() => setActiveTab('skills')}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center space-x-1.5 transition-all border border-white/20"
          >
            <span>Barcha ko'nikmalarni ko'rish</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topSkills.map((skill) => (
            <div key={skill.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 space-y-3 hover:border-yellow-400/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{skill.name}</span>
                <span className="text-xs font-mono font-extrabold text-yellow-300">{skill.percent}%</span>
              </div>
              {/* Glowing progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] transition-all duration-1000"
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>{skill.experienceYears} yil tajriba</span>
                <span className="text-yellow-300 capitalize">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-yellow-300 uppercase tracking-[0.2em]">Tanlangan Ishlar</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Oxirgi Yaratilgan Loyihalar</h2>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="px-6 py-3 rounded-full bg-white text-indigo-950 hover:bg-yellow-400 hover:text-slate-950 text-xs font-bold flex items-center space-x-2 transition-all shadow-lg"
          >
            <span>Barcha loyihalar ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/15 flex flex-col group hover:border-yellow-400/40 transition-all"
            >
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {project.priceEstimate && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-yellow-400 text-slate-950 font-bold text-xs shadow">
                    {project.priceEstimate}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-black/60 text-yellow-300 text-[10px] font-mono border border-white/10 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-xs text-yellow-300 hover:text-yellow-200 font-bold flex items-center space-x-1"
                  >
                    <span>Batafsil ko'rish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-white/50 font-mono">
                    Kategoriya: {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AFFORDABLE PRICING & CALL TO ACTION BANNER */}
      <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-rose-600/10 to-purple-600/10 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 text-yellow-300 text-xs font-bold border border-white/20 font-mono tracking-widest uppercase">
            💰 HAMYONBOP BUYURTMA
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Sizga Backend yoki Veb-Sayt Kerakmi?
          </h2>
          
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            Men bilan bog'laning. Loyihangizni noldan qilib beraman yoki mavjud kodni yangilab beraman. Telegram orqali 5 daqiqa ichida javob beraman!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                triggerConfetti();
                setActiveTab('services_contact');
              }}
              className="px-8 py-3.5 rounded-full bg-white text-indigo-950 hover:bg-yellow-400 hover:text-slate-950 font-extrabold text-sm shadow-xl flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <Send className="w-4 h-4 text-indigo-950" />
              <span>Narxlarni Ko'rish va Buyurtma</span>
            </button>

            <a
              href={`https://t.me/${profile.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-white/40 hover:bg-white/10 text-white font-bold text-sm flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-yellow-300" />
              <span>Telegramda yozish</span>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center space-x-6 text-xs text-white/60 font-mono">
            <span>📞 {profile.phone}</span>
            <span>✉️ {profile.email}</span>
          </div>
        </div>
      </section>

    </div>
  );
};
