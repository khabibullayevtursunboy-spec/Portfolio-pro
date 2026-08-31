import React, { useState, useEffect } from 'react';
import { PageTab, PortfolioData, ContactMessage } from './types';
import { loadPortfolioData, savePortfolioData, resetPortfolioData } from './data/initialData';
import { AnimatedLandscape, LandscapeScene } from './components/AnimatedLandscape';
import { CrawlingSpider } from './components/CrawlingSpider';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { SkillsPage } from './components/pages/SkillsPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ServicesContactPage } from './components/pages/ServicesContactPage';
import { DjangoAdminModal } from './components/admin/DjangoAdminModal';
import {
  Lock,
  Heart,
  Send,
  MessageCircle,
  Phone,
  Code2,
  Terminal,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData);
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [currentLandscape, setCurrentLandscape] = useState<LandscapeScene>('desert');
  const [timeMode, setTimeMode] = useState<'sunset' | 'twilight' | 'golden'>('sunset');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
  };

  const handleResetData = () => {
    const defaultData = resetPortfolioData();
    setData(defaultData);
  };

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString('uz-UZ', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      read: false,
    };
    const updatedMessages = [newMsg, ...data.messages];
    const updatedData: PortfolioData = {
      ...data,
      messages: updatedMessages,
    };
    handleSaveData(updatedData);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. LIVING ANIMATED LANDSCAPES (Cho'llar, Qorli Tog'lar, O'rmonlar, Quyosh Botishi) */}
      <AnimatedLandscape
        scene={currentLandscape}
        autoRotate={true}
        onSceneChange={(newScene) => setCurrentLandscape(newScene)}
      />

      {/* 2. CRAWLING INTERACTIVE SPIDER (Ekranda yugirib yuruvchi jonli kiber o'rgimchak) */}
      <CrawlingSpider />

      {/* 3. MAIN APPLICATION CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Floating Top Navbar (5 Pages Navigation + Django Admin trigger) */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAdmin={() => setAdminModalOpen(true)}
          timeMode={timeMode}
          setTimeMode={setTimeMode}
          discountText={data.profile.discountText}
          availableForWork={data.profile.availableForWork}
        />

        {/* 5 Distinct Pages Viewport Container */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full mt-4 sm:mt-6">
          {activeTab === 'home' && (
            <HomePage
              data={data}
              setActiveTab={setActiveTab}
              onOpenAdmin={() => setAdminModalOpen(true)}
            />
          )}

          {activeTab === 'about' && (
            <AboutPage
              data={data}
              setActiveTab={setActiveTab}
              onOpenAdmin={() => setAdminModalOpen(true)}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsPage
              data={data}
              setActiveTab={setActiveTab}
              onOpenAdmin={() => setAdminModalOpen(true)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsPage
              data={data}
              setActiveTab={setActiveTab}
              onOpenAdmin={() => setAdminModalOpen(true)}
            />
          )}

          {activeTab === 'services_contact' && (
            <ServicesContactPage
              data={data}
              setActiveTab={setActiveTab}
              onSendMessage={handleSendMessage}
            />
          )}
        </main>

        {/* FOOTER */}
        <footer className="w-full mt-12 border-t border-white/20 bg-white/10 backdrop-blur-xl relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/70">
            
            {/* Left Brand info */}
            <div className="flex items-center space-x-3 text-center md:text-left">
              <div className="w-9 h-9 rounded-full bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-300 font-mono font-bold text-xs shadow-inner">
                14
              </div>
              <div>
                <div className="text-white font-bold text-sm">{data.profile.name}</div>
                <div className="text-[11px] text-white/60">
                  {data.profile.age} yoshli Backend Dasturchi & Frontend Vibe Coder
                </div>
              </div>
            </div>

            {/* Middle Nav Links */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-white/80 font-medium">
              <button onClick={() => setActiveTab('home')} className="hover:text-yellow-300 transition-colors">
                Bosh sahifa
              </button>
              <button onClick={() => setActiveTab('about')} className="hover:text-yellow-300 transition-colors">
                Men haqimda
              </button>
              <button onClick={() => setActiveTab('skills')} className="hover:text-yellow-300 transition-colors">
                Ko'nikmalar
              </button>
              <button onClick={() => setActiveTab('projects')} className="hover:text-yellow-300 transition-colors">
                Loyihalar
              </button>
              <button onClick={() => setActiveTab('services_contact')} className="hover:text-yellow-300 transition-colors">
                Xizmatlar & Narxlar
              </button>
            </div>

            {/* Right: Django Admin link & status (No password shown) */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-4 py-2 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 border border-emerald-400/40 text-xs font-mono flex items-center space-x-1.5 transition-all shadow"
                title="Django Admin boshqaruv paneli"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-300" />
                <span>Django Admin</span>
              </button>
            </div>

          </div>
        </footer>

      </div>

      {/* BACK TO TOP FLOATING BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 shadow-2xl border border-white/30 backdrop-blur-md transition-all transform hover:scale-110 active:scale-95"
          title="Yuqoriga qaytish"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}

      {/* 4. DJANGO ADMIN MODAL (KOMPYUTERDAN RASMLAR YUKLASH VA TAHRIRLASH) */}
      <DjangoAdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />

    </div>
  );
}
