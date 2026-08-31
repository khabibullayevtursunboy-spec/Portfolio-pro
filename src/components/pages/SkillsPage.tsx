import React, { useState, useMemo } from 'react';
import { PortfolioData, PageTab, SkillCategory } from '../../types';
import { BloodDripText } from '../BloodDripText';
import {
  Zap,
  Code2,
  Database,
  Layout,
  Server,
  Sparkles,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  PlusCircle,
  Terminal,
  Layers
} from 'lucide-react';

interface SkillsPageProps {
  data: PortfolioData;
  setActiveTab: (tab: PageTab) => void;
  onOpenAdmin: () => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({
  data,
  setActiveTab,
  onOpenAdmin,
}) => {
  const { skills } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Barchasi', icon: <Layers className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend & Python', icon: <Code2 className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend Vibe', icon: <Layout className="w-4 h-4" /> },
    { id: 'database', label: "Ma'lumotlar Bazasi", icon: <Database className="w-4 h-4" /> },
    { id: 'tools', label: 'DevOps & Asboblar', icon: <Server className="w-4 h-4" /> },
    { id: 'vibe', label: 'AI & Vibe Tools', icon: <Sparkles className="w-4 h-4" /> },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchCat = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  // Calculate average proficiency and overall stats
  const averageProficiency = useMemo(() => {
    if (skills.length === 0) return 0;
    const total = skills.reduce((acc, s) => acc + s.percent, 0);
    return Math.round(total / skills.length);
  }, [skills]);

  return (
    <div className="w-full space-y-10 pb-16 animate-in fade-in duration-500">
      
      {/* PAGE HEADER */}
      <section className="text-center space-y-3 pt-4 sm:pt-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white/10 text-yellow-300 border border-white/20">
          ⚡ TEXNOLOGIK KO'NIKMALAR & FOIZLAR
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          <BloodDripText
            text="Biladigan Dasturlash Tillari &"
            highlightText="Tajriba"
            highlightClassName="text-yellow-400"
          />
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto font-light">
          Har bir texnologiya bo'yicha necha foiz o'zlashtirganim va amaliy tajriba yillari. Barcha ko'rsatkichlarni Django Admin orqali o'zgartirish mumkin.
        </p>
      </section>

      {/* OVERALL STACK STATS BAR */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 text-center shadow-lg">
          <div className="text-2xl sm:text-3xl font-extrabold text-yellow-300 font-mono">
            {skills.length} ta
          </div>
          <div className="text-xs text-white/70 mt-1">O'rganilgan Texnologiya</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 text-center shadow-lg">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
            {averageProficiency}%
          </div>
          <div className="text-xs text-white/70 mt-1">O'rtacha Bilish Foizi</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 text-center shadow-lg">
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
            3+ Yil
          </div>
          <div className="text-xs text-white/70 mt-1">Umumiy Tajriba</div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 text-center shadow-lg">
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
            Django + API
          </div>
          <div className="text-xs text-white/70 mt-1">Asosiy Mutaxassislik</div>
        </div>

      </section>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search input + Admin edit button */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Tilni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-black/30 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            onClick={onOpenAdmin}
            title="Ko'nikmalarni qo'shish yoki o'zgartirish"
            className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1 shrink-0 shadow transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Yangi til</span>
          </button>
        </div>

      </div>

      {/* SKILLS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => {
          // Progress bar color based on percentage
          const isSuperHigh = skill.percent >= 90;
          const isHigh = skill.percent >= 80 && skill.percent < 90;

          return (
            <div
              key={skill.id}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 space-y-4 relative overflow-hidden group hover:border-yellow-400/60 transition-all shadow-xl"
            >
              {/* Top Row: Name, Tag, Percentage */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-sm text-yellow-300 group-hover:scale-105 transition-transform shadow">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors">
                        {skill.name}
                      </h3>
                      {skill.highlight && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-yellow-400 text-slate-950 shadow-sm">
                          TOP
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-white/60 capitalize font-mono">
                      Kategoriya: {skill.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-extrabold text-yellow-300 font-mono tracking-tight">
                    {skill.percent}%
                  </div>
                  <span className="text-[10px] text-white/60">
                    {skill.experienceYears} yil tajriba
                  </span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-3 rounded-full bg-black/40 p-0.5 border border-white/10 overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isSuperHigh
                        ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500'
                        : isHigh
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                        : 'bg-gradient-to-r from-sky-400 to-indigo-400'
                    }`}
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-[10px] text-white/50 font-mono">
                  <span>Boshlang'ich (0%)</span>
                  <span>O'rta (50%)</span>
                  <span>Senior Vibe (100%)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-white/80 leading-relaxed font-light">
                {skill.description}
              </p>

            </div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center text-white/70 space-y-3 border border-white/20">
          <p className="text-sm">Qidiruv bo'yicha hech qanday dasturlash tili topilmadi.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-yellow-400 text-slate-950 rounded-full text-xs font-bold shadow"
          >
            Filtrlarni tozalash
          </button>
        </div>
      )}

      {/* CALLOUT TO ADMIN */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <Terminal className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">Yangi texnologiya o'rgandingizmi?</h4>
            <p className="text-xs text-white/70">
              Django Admin paneli orqali yangi tillar, foizlar va tajriba yillarini bir zumda qo'shing.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenAdmin}
          className="px-5 py-2.5 bg-white text-indigo-950 hover:bg-yellow-400 hover:text-slate-950 rounded-full text-xs font-bold font-mono flex items-center space-x-1.5 shadow-lg shrink-0 transition-all"
        >
          <span>Django Admin boshqaruvi</span>
        </button>
      </div>

    </div>
  );
};
