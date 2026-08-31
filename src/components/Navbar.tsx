import React, { useState } from 'react';
import { PageTab } from '../types';
import {
  Home,
  User,
  Zap,
  FolderGit2,
  PhoneCall,
  Lock,
  Sparkles,
  Menu,
  X,
  SunMedium,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenAdmin: () => void;
  timeMode: 'sunset' | 'twilight' | 'golden';
  setTimeMode: (mode: 'sunset' | 'twilight' | 'golden') => void;
  discountText: string;
  availableForWork: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdmin,
  timeMode,
  setTimeMode,
  discountText,
  availableForWork,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Bosh sahifa', icon: <Home className="w-4 h-4" /> },
    { id: 'about', label: 'Men haqimda', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: "Ko'nikmalar", icon: <Zap className="w-4 h-4" />, badge: 'Stack' },
    { id: 'projects', label: 'Loyihalar', icon: <FolderGit2 className="w-4 h-4" />, badge: 'Portfolio' },
    { id: 'services_contact', label: 'Xizmatlar & Aloqa', icon: <PhoneCall className="w-4 h-4" />, badge: 'Arzon' },
  ];

  const handleTabClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cycleTimeMode = () => {
    if (timeMode === 'sunset') setTimeMode('golden');
    else if (timeMode === 'golden') setTimeMode('twilight');
    else setTimeMode('sunset');
  };

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto w-full transition-all">
      <div className="glass-panel rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-2xl border border-white/15">
        
        {/* Brand & Vibe Coder Identity */}
        <div 
          onClick={() => handleTabClick('home')}
          className="flex items-center space-x-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
              <span className="font-mono text-yellow-300 font-extrabold text-sm">14</span>
            </div>
            {availableForWork && (
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-light uppercase italic tracking-widest text-sm sm:text-base text-white group-hover:text-yellow-200 transition-colors">
                <span className="font-extrabold text-yellow-300">SAMANDAR</span> CODER
              </span>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-yellow-300 border border-white/20">
                14 yosh • Vibe
              </span>
            </div>
            <span className="text-[11px] text-white/70 font-mono flex items-center space-x-1">
              <span className="text-emerald-400">django</span> &bull; <span>fastapi</span> &bull; <span>react</span>
            </span>
          </div>
        </div>

        {/* Desktop 5 Page Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1.5 p-1 bg-black/20 backdrop-blur-md rounded-full border border-white/15" id="desktop-nav-tabs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-yellow-300 font-bold border border-yellow-400/40 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-yellow-400/20 text-yellow-300 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side Controls: Sunset Atmosphere Toggle & Django Admin Button */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Sunset Vibe Atmosphere cycle */}
          <button
            onClick={cycleTimeMode}
            title={`Atmosfera: ${timeMode === 'sunset' ? 'Quyosh botishi' : timeMode === 'golden' ? 'Oltin shafaq' : 'Binafsha shom'}`}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-yellow-300 border border-white/20 transition-all shadow-inner flex items-center justify-center group"
            id="btn-time-mode-toggle"
          >
            <SunMedium className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>

          {/* Django Admin Panel Trigger Button */}
          <button
            onClick={onOpenAdmin}
            id="btn-django-admin-open"
            className="px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md hover:bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-lg flex items-center space-x-1.5 text-xs font-mono font-medium transition-all group"
            title="Django Admin boshqaruv paneli"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-bold">Django Admin</span>
            <span className="sm:hidden font-bold">Admin</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
            id="btn-mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (5 pages) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-3 border border-white/20 shadow-2xl flex flex-col space-y-1 animate-in fade-in slide-in-from-top-3 duration-200" id="mobile-nav-menu">
          <div className="px-3 py-1.5 text-[11px] text-amber-400 font-mono flex items-center justify-between border-b border-white/10 mb-1">
            <span>🔥 {discountText || '50% Arzon Narxlar'}</span>
            <span className="text-slate-400">5 Sahifali Vibe Portfolio</span>
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full px-4 py-2.5 rounded-xl text-left text-sm font-semibold flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {isActive ? (
                  <CheckCircle2 className="w-4 h-4 text-amber-200" />
                ) : item.badge ? (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-amber-300 font-mono">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
            <span className="text-xs text-slate-400">Django Admin kirish:</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-full text-xs font-mono font-bold flex items-center space-x-1"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
