import React, { useState, useRef } from 'react';
import {
  PortfolioData,
  PersonalProfile,
  Skill,
  Project,
  ServicePlan,
  SkillCategory,
  ContactMessage
} from '../../types';
import {
  Lock,
  Unlock,
  X,
  Save,
  Trash2,
  Plus,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Download,
  FileCode2,
  Layers,
  User,
  Zap,
  FolderGit2,
  DollarSign,
  Mail,
  ShieldCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DjangoAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSaveData: (newData: PortfolioData) => void;
  onResetData: () => void;
}

type AdminSection = 'auth' | 'dashboard' | 'profile' | 'skills' | 'projects' | 'services' | 'messages' | 'backup';

export const DjangoAdminModal: React.FC<DjangoAdminModalProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetData,
}) => {
  // Authentication state - strictly requires "8m7n6b5v"
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active section
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');

  // Editable local copies
  const [localProfile, setLocalProfile] = useState<PersonalProfile>({ ...data.profile });
  const [localSkills, setLocalSkills] = useState<Skill[]>([...data.skills]);
  const [localProjects, setLocalProjects] = useState<Project[]>([...data.projects]);
  const [localServices, setLocalServices] = useState<ServicePlan[]>([...data.services]);
  const [localMessages, setLocalMessages] = useState<ContactMessage[]>([...data.messages]);

  // Editing items state
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // File input refs for uploading from computer storage
  const profileAvatarInputRef = useRef<HTMLInputElement>(null);
  const projectImageInputRef = useRef<HTMLInputElement>(null);
  const jsonImportInputRef = useRef<HTMLInputElement>(null);

  // Sync state when opened
  React.useEffect(() => {
    if (isOpen) {
      setLocalProfile({ ...data.profile });
      setLocalSkills([...data.skills]);
      setLocalProjects([...data.projects]);
      setLocalServices([...data.services]);
      setLocalMessages([...data.messages]);
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Check Django Admin Password: ONLY "8m7n6b5v"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword.trim() === '8m7n6b5v') {
      setIsAuthenticated(true);
      setAuthError(null);
      setCurrentSection('dashboard');
      showToast("Django Admin paneliga muvaffaqiyatli kirdingiz!");
    } else {
      setAuthError("Noto'g'ri parol! Iltimos, administrator parolini to'g'ri kiriting.");
    }
  };

  const handleGlobalSave = () => {
    const updated: PortfolioData = {
      profile: localProfile,
      skills: localSkills,
      projects: localProjects,
      services: localServices,
      messages: localMessages,
    };
    onSaveData(updated);
    showToast("Barcha o'zgarishlar saqlandi va saytga qo'llanildi! ✅");
  };

  // Helper to read file from computer storage as Base64 image
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoadBase64: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit ~5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Rasm hajmi juda katta (maksimal 5MB). Iltimos, kichikroq rasm tanlang.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoadBase64(reader.result);
        showToast("Rasm kompyuterdan muvaffaqiyatli yuklandi!");
      }
    };
    reader.readAsDataURL(file);
  };

  // SKILL HANDLERS
  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: "Yangi Dasturlash Tili",
      category: "backend",
      percent: 85,
      experienceYears: 1,
      icon: "Code2",
      color: "#f97316",
      description: "Ushbu texnologiya bo'yicha imkoniyatlarim...",
      highlight: false,
    };
    setLocalSkills([newSkill, ...localSkills]);
    setEditingSkillId(newSkill.id);
  };

  const handleDeleteSkill = (id: string) => {
    setLocalSkills(localSkills.filter((s) => s.id !== id));
    showToast("Ko'nikma o'chirildi.");
  };

  const handleUpdateSkill = (id: string, updates: Partial<Skill>) => {
    setLocalSkills(
      localSkills.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  // PROJECT HANDLERS
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "Yangi Django / Vibe Loyiha",
      subtitle: "Python + Django REST + React",
      description: "Loyiha haqida to'liq ma'lumot...",
      category: "backend",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      techStack: ["Django", "PostgreSQL", "Docker"],
      priceEstimate: "$40",
      features: ["Xavfsiz Auth", "To'lovlar", "REST API"],
      featured: true,
      completedDate: "2024",
    };
    setLocalProjects([newProj, ...localProjects]);
    setEditingProjectId(newProj.id);
  };

  const handleDeleteProject = (id: string) => {
    setLocalProjects(localProjects.filter((p) => p.id !== id));
    showToast("Loyiha o'chirildi.");
  };

  const handleUpdateProject = (id: string, updates: Partial<Project>) => {
    setLocalProjects(
      localProjects.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  // JSON EXPORT / IMPORT
  const handleExportJSON = () => {
    const currentData: PortfolioData = {
      profile: localProfile,
      skills: localSkills,
      projects: localProjects,
      services: localServices,
      messages: localMessages,
    };
    const blob = new Blob([JSON.stringify(currentData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `django_portfolio_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Zaxira nusxa JSON fayl yuklab olindi!");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string) as PortfolioData;
        if (parsed.profile && parsed.skills && parsed.projects) {
          setLocalProfile(parsed.profile);
          setLocalSkills(parsed.skills);
          setLocalProjects(parsed.projects);
          setLocalServices(parsed.services || localServices);
          setLocalMessages(parsed.messages || localMessages);
          onSaveData(parsed);
          showToast("Zaxira nusxa muvaffaqiyatli tiklandi!");
        } else {
          alert("Fayl formati noto'g'ri!");
        }
      } catch (err) {
        alert("JSON faylni o'qishda xatolik yuz berdi.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-60 px-4 py-3 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold shadow-2xl flex items-center space-x-2 border border-emerald-400/50 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Django Admin Window Container */}
      <div className="w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/50 bg-[#0f172a] text-slate-100 font-sans">
        
        {/* DJANGO ADMIN TOP HEADER (Classic Django Style Header) */}
        <div className="bg-[#092e20] px-4 py-3 flex items-center justify-between border-b border-emerald-800 shrink-0 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded bg-emerald-500 text-slate-950 flex items-center justify-center font-bold font-mono text-xs shadow">
              dj
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-emerald-100 tracking-tight">
                Django boshqaruvi
              </span>
              <span className="hidden sm:inline text-xs text-emerald-300/80 font-mono ml-2">
                | 14-Yoshli Dev Portfoliosi (Admin)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button
                onClick={handleGlobalSave}
                className="px-3.5 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Barchasini Saqlash</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-emerald-900/60 text-emerald-200 transition-colors"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION GATEWAY (Only asks password `8m7n6b5v`) */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-[#092e20]/20 to-slate-950">
            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/90 border border-emerald-700/40 shadow-2xl space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Lock className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-white">Django Admin Kirish</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sayt ma'lumotlarini o'zgartirish uchun parolni kiriting.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-300 text-xs font-mono flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-medium text-slate-300">
                      Admin Paroli:
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      🔒 Maxfiy kalit
                    </span>
                  </div>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Parolni kiriting..."
                    value={enteredPassword}
                    onChange={(e) => {
                      setEnteredPassword(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-emerald-600/50 text-sm text-emerald-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-slate-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-sm font-mono flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-900/50"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Admin Panelga Kirish</span>
                </button>
              </form>

              <div className="text-center pt-2 text-[11px] text-slate-500 font-mono">
                Django Administration 5.x LTS &bull; Secure Auth
              </div>

            </div>
          </div>
        ) : (
          /* AUTHENTICATED DJANGO ADMIN DASHBOARD & EDITORS */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Django Admin Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#0a1420] border-r border-slate-800 flex flex-col justify-between shrink-0 overflow-y-auto">
              
              <div className="p-3 space-y-1">
                <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-emerald-400/80 font-bold border-b border-slate-800/80 mb-2">
                  MODELS (MA'LUMOTLAR)
                </div>

                <button
                  onClick={() => setCurrentSection('dashboard')}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center space-x-2.5 transition-colors ${
                    currentSection === 'dashboard'
                      ? 'bg-emerald-900/80 text-emerald-200 font-bold border-l-4 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Dashboard (Umumiy)</span>
                </button>

                <button
                  onClick={() => setCurrentSection('profile')}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-colors ${
                    currentSection === 'profile'
                      ? 'bg-emerald-900/80 text-emerald-200 font-bold border-l-4 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Profil & Yosh ({localProfile.age})</span>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentSection('skills')}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-colors ${
                    currentSection === 'skills'
                      ? 'bg-emerald-900/80 text-emerald-200 font-bold border-l-4 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span>Dasturlash Tillari</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {localSkills.length}
                  </span>
                </button>

                <button
                  onClick={() => setCurrentSection('projects')}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-colors ${
                    currentSection === 'projects'
                      ? 'bg-emerald-900/80 text-emerald-200 font-bold border-l-4 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <FolderGit2 className="w-4 h-4 text-sky-400" />
                    <span>Loyihalar (Rasmlar)</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {localProjects.length}
                  </span>
                </button>

                <button
                  onClick={() => setCurrentSection('services')}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-colors ${
                    currentSection === 'services'
                      ? 'bg-emerald-900/80 text-emerald-200 font-bold border-l-4 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Xizmatlar & Narxlar</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {localServices.length}
                  </span>
                </button>

                <button
                  onClick={() => setCurrentSection('messages')}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center justify-between transition-colors ${
                    currentSection === 'messages'
                      ? 'bg-emerald-900/80 text-emerald-200 font-bold border-l-4 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-4 h-4 text-rose-400" />
                    <span>Xabarlar (Inbox)</span>
                  </div>
                  {localMessages.length > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-600 text-white font-bold">
                      {localMessages.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentSection('backup')}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center space-x-2.5 transition-colors ${
                    currentSection === 'backup'
                      ? 'bg-emerald-900/80 text-emerald-200 font-bold border-l-4 border-emerald-400'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Download className="w-4 h-4 text-purple-400" />
                  <span>Zaxira / Eksport (JSON)</span>
                </button>
              </div>

              {/* Sidebar Footer */}
              <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] font-mono text-slate-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Foydalanuvchi:</span>
                  <span className="text-emerald-400 font-bold">superadmin</span>
                </div>
                <button
                  onClick={handleGlobalSave}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Saqlash & Yangilash</span>
                </button>
              </div>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-slate-900/90 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* BREADCRUMB NAVIGATION */}
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span className="text-emerald-400 cursor-pointer hover:underline" onClick={() => setCurrentSection('dashboard')}>
                  Bosh sahifa
                </span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-slate-200 capitalize font-bold">
                  {currentSection === 'dashboard'
                    ? 'Dashboard'
                    : currentSection === 'profile'
                    ? 'Shaxsiy Profil & Yosh'
                    : currentSection === 'skills'
                    ? 'Dasturlash Tillari & Foizlar'
                    : currentSection === 'projects'
                    ? 'Loyihalar & Kompyuter Rasmlari'
                    : currentSection === 'services'
                    ? 'Xizmatlar & Arzon Tariflar'
                    : currentSection === 'messages'
                    ? 'Kelgan Xabarlar'
                    : 'Zaxira Nusxa'}
                </span>
              </div>

              {/* SECTION: DASHBOARD */}
              {currentSection === 'dashboard' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-700/40 space-y-2">
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>Xush kelibsiz, Samandar (14-yoshli Vibe Coder)!</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Ushbu Django Admin paneli orqali saytdagi barcha ma'lumotlarni o'zgartirishingiz mumkin: yoshingiz, telefon raqamingiz, qaysi dasturlash tilini necha foiz bilishingiz, loyihalaringiz va kompyuteringiz xotirasidan rasmlar yuklashingiz mumkin.
                    </p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      onClick={() => setCurrentSection('skills')}
                      className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group"
                    >
                      <div className="text-xs font-mono text-slate-400">Dasturlash Tillari</div>
                      <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
                        {localSkills.length} ta til
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-2 flex items-center space-x-1 group-hover:underline">
                        <span>Foizlar va yillarni boshqarish</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>

                    <div
                      onClick={() => setCurrentSection('projects')}
                      className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group"
                    >
                      <div className="text-xs font-mono text-slate-400">Loyihalar</div>
                      <div className="text-2xl font-extrabold text-sky-400 font-mono mt-1">
                        {localProjects.length} ta loyiha
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-2 flex items-center space-x-1 group-hover:underline">
                        <span>Kompyuterdan rasm yuklash</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>

                    <div
                      onClick={() => setCurrentSection('messages')}
                      className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all group"
                    >
                      <div className="text-xs font-mono text-slate-400">Kelgan Xabarlar</div>
                      <div className="text-2xl font-extrabold text-rose-400 font-mono mt-1">
                        {localMessages.length} ta xabar
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-2 flex items-center space-x-1 group-hover:underline">
                        <span>Xabarlarni o'qish</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Profile Summary */}
                  <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono text-slate-300 font-bold uppercase">
                        Hozirgi Profil Holati
                      </h4>
                      <button
                        onClick={() => setCurrentSection('profile')}
                        className="text-xs text-emerald-400 font-mono hover:underline"
                      >
                        Profilni tahrirlash &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-lg">
                        <span className="text-slate-500 block text-[10px]">Ism:</span>
                        <strong className="text-white">{localProfile.name}</strong>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg">
                        <span className="text-slate-500 block text-[10px]">Yosh:</span>
                        <strong className="text-amber-400">{localProfile.age} yosh</strong>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg">
                        <span className="text-slate-500 block text-[10px]">Telefon:</span>
                        <strong className="text-emerald-400">{localProfile.phone}</strong>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg">
                        <span className="text-slate-500 block text-[10px]">Telegram:</span>
                        <strong className="text-sky-400">{localProfile.telegram}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: PROFILE (Ism, Yosh=14, Telefon, Rasm yuklash, Bio) */}
              {currentSection === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Shaxsiy Profil Ma'lumotlari</h3>
                      <p className="text-xs text-slate-400">Yoshingiz, telefon raqamingiz, bio va rasmingizni o'zgartiring.</p>
                    </div>
                    <button
                      onClick={handleGlobalSave}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs font-mono flex items-center space-x-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Saqlash</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                    
                    {/* Avatar Upload from Computer */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-5 border-b border-slate-800">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500/50 shrink-0">
                        <img
                          src={localProfile.avatar}
                          alt={localProfile.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-2 text-center sm:text-left">
                        <label className="text-xs font-bold text-white block">
                          Profil Rasmi (Kompyuter xotirasidan yuklash)
                        </label>
                        <input
                          type="file"
                          ref={profileAvatarInputRef}
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, (base64) =>
                              setLocalProfile({ ...localProfile, avatar: base64 })
                            )
                          }
                          className="hidden"
                        />
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          <button
                            type="button"
                            onClick={() => profileAvatarInputRef.current?.click()}
                            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Kompyuterdan rasm tanlash</span>
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          PNG, JPG, WEBP formatlari qo'llab-quvvatlanadi.
                        </p>
                      </div>
                    </div>

                    {/* Name, Age, Phone, Telegram Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Ism & Familiya:</label>
                        <input
                          type="text"
                          value={localProfile.name}
                          onChange={(e) =>
                            setLocalProfile({ ...localProfile, name: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-amber-400 font-bold">
                          Yosh (Masalan: 14):
                        </label>
                        <input
                          type="number"
                          value={localProfile.age}
                          onChange={(e) =>
                            setLocalProfile({
                              ...localProfile,
                              age: parseInt(e.target.value) || 14,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-amber-500/50 text-xs text-amber-300 font-bold focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-emerald-400">Telefon raqam:</label>
                        <input
                          type="text"
                          value={localProfile.phone}
                          onChange={(e) =>
                            setLocalProfile({ ...localProfile, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-emerald-300 font-mono focus:border-emerald-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-sky-400">Telegram Username:</label>
                        <input
                          type="text"
                          value={localProfile.telegram}
                          onChange={(e) =>
                            setLocalProfile({ ...localProfile, telegram: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-sky-300 font-mono focus:border-emerald-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Elektron Pochta:</label>
                        <input
                          type="email"
                          value={localProfile.email}
                          onChange={(e) =>
                            setLocalProfile({ ...localProfile, email: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">GitHub Profil Link:</label>
                        <input
                          type="text"
                          value={localProfile.github}
                          onChange={(e) =>
                            setLocalProfile({ ...localProfile, github: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none"
                        />
                      </div>

                    </div>

                    {/* Role title, Tagline, Discount badge */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Kasb Sarlavhasi (Role):</label>
                        <input
                          type="text"
                          value={localProfile.roleTitle}
                          onChange={(e) =>
                            setLocalProfile({ ...localProfile, roleTitle: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-400">Arzon Narx / Chegirma matni:</label>
                        <input
                          type="text"
                          value={localProfile.discountText}
                          onChange={(e) =>
                            setLocalProfile({ ...localProfile, discountText: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-emerald-300 focus:border-emerald-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Short Bio */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-400">Qisqa Bio (Bosh sahifa uchun):</label>
                      <textarea
                        rows={2}
                        value={localProfile.bio}
                        onChange={(e) =>
                          setLocalProfile({ ...localProfile, bio: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 focus:outline-none resize-none"
                      />
                    </div>

                    {/* Detailed Bio */}
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-400">Batafsil Hikoya (Men haqimda sahifasi uchun):</label>
                      <textarea
                        rows={4}
                        value={localProfile.detailedAbout}
                        onChange={(e) =>
                          setLocalProfile({ ...localProfile, detailedAbout: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 focus:outline-none"
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* SECTION: SKILLS (Qaysi til, necha % foiz bilish, necha yil tajriba) */}
              {currentSection === 'skills' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white">Dasturlash Tillari & Foizlar</h3>
                      <p className="text-xs text-slate-400">
                        Qaysi tilni necha foiz bilishingiz va necha yil tajribangiz borligini belgilang.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleAddSkill}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs font-mono flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Yangi Til Qo'shish</span>
                      </button>
                      <button
                        onClick={handleGlobalSave}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold rounded-lg text-xs font-mono flex items-center space-x-1 border border-emerald-500/40"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Saqlash</span>
                      </button>
                    </div>
                  </div>

                  {/* Skills List in Django Table / Form style */}
                  <div className="space-y-4">
                    {localSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                          
                          {/* Skill Name */}
                          <div className="sm:col-span-4 space-y-1">
                            <label className="text-[10px] font-mono text-slate-400">Til / Texnologiya nomi:</label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) =>
                                handleUpdateSkill(skill.id, { name: e.target.value })
                              }
                              className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white font-bold focus:border-emerald-400 focus:outline-none"
                            />
                          </div>

                          {/* Percentage Slider & Input */}
                          <div className="sm:col-span-3 space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-amber-400">
                              <span>Bilish foizi:</span>
                              <strong className="text-xs">{skill.percent}%</strong>
                            </div>
                            <input
                              type="range"
                              min={10}
                              max={100}
                              value={skill.percent}
                              onChange={(e) =>
                                handleUpdateSkill(skill.id, {
                                  percent: parseInt(e.target.value),
                                })
                              }
                              className="w-full accent-amber-400 cursor-pointer"
                            />
                          </div>

                          {/* Experience Years */}
                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-mono text-slate-400">Tajriba (yil):</label>
                            <input
                              type="number"
                              step="0.5"
                              value={skill.experienceYears}
                              onChange={(e) =>
                                handleUpdateSkill(skill.id, {
                                  experienceYears: parseFloat(e.target.value) || 1,
                                })
                              }
                              className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none"
                            />
                          </div>

                          {/* Category */}
                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-mono text-slate-400">Kategoriya:</label>
                            <select
                              value={skill.category}
                              onChange={(e) =>
                                handleUpdateSkill(skill.id, {
                                  category: e.target.value as SkillCategory,
                                })
                              }
                              className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none"
                            >
                              <option value="backend">Backend</option>
                              <option value="frontend">Frontend</option>
                              <option value="database">Database</option>
                              <option value="tools">Tools / DevOps</option>
                              <option value="vibe">Vibe / AI</option>
                            </select>
                          </div>

                          {/* Delete Button */}
                          <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                            <button
                              onClick={() => handleDeleteSkill(skill.id)}
                              className="p-1.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                        </div>

                        {/* Description field */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500">Qisqa tavsif:</label>
                          <input
                            type="text"
                            value={skill.description}
                            onChange={(e) =>
                              handleUpdateSkill(skill.id, { description: e.target.value })
                            }
                            className="w-full px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: PROJECTS (Rasm kompyuterdan, nom, tavsif, texnologiyalar, narx) */}
              {currentSection === 'projects' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white">Loyihalar & Kompyuterdan Rasmlar</h3>
                      <p className="text-xs text-slate-400">
                        Yangi loyihalar qo'shing va rasmlarini to'g'ridan-to'g'ri kompyuteringizdan yuklang.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleAddProject}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs font-mono flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Yangi Loyiha</span>
                      </button>
                      <button
                        onClick={handleGlobalSave}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold rounded-lg text-xs font-mono flex items-center space-x-1 border border-emerald-500/40"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Saqlash</span>
                      </button>
                    </div>
                  </div>

                  {/* Projects List with Computer File Uploader */}
                  <div className="space-y-6">
                    {localProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center space-x-2">
                            <FolderGit2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-bold text-sm text-white">{project.title}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Loyihani o'chirish</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                          
                          {/* Project Image Preview & Computer Upload */}
                          <div className="md:col-span-4 space-y-3">
                            <div className="h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 relative group">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Hidden file input for this specific project */}
                            <label className="w-full py-2 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Kompyuterdan Rasm Yuklash</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(e, (base64) =>
                                    handleUpdateProject(project.id, { image: base64 })
                                  )
                                }
                              />
                            </label>
                          </div>

                          {/* Project Details Fields */}
                          <div className="md:col-span-8 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-slate-400">Loyiha Nomi:</label>
                                <input
                                  type="text"
                                  value={project.title}
                                  onChange={(e) =>
                                    handleUpdateProject(project.id, { title: e.target.value })
                                  }
                                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white font-bold focus:border-emerald-400 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-slate-400">Qisqa Subtitr:</label>
                                <input
                                  type="text"
                                  value={project.subtitle}
                                  onChange={(e) =>
                                    handleUpdateProject(project.id, { subtitle: e.target.value })
                                  }
                                  className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-amber-300 focus:border-emerald-400 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-slate-400">Kategoriya:</label>
                                <select
                                  value={project.category}
                                  onChange={(e) =>
                                    handleUpdateProject(project.id, {
                                      category: e.target.value as any,
                                    })
                                  }
                                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none"
                                >
                                  <option value="backend">Backend & API</option>
                                  <option value="fullstack">Full-stack</option>
                                  <option value="telegram">Telegram Bot</option>
                                  <option value="vibe">Vibe Web</option>
                                </select>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-emerald-400">Narx / Byudjet:</label>
                                <input
                                  type="text"
                                  value={project.priceEstimate || ''}
                                  onChange={(e) =>
                                    handleUpdateProject(project.id, { priceEstimate: e.target.value })
                                  }
                                  placeholder="$40 (bozorda $150)"
                                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-emerald-300 font-mono focus:border-emerald-400 focus:outline-none"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono text-slate-400">Demo Havola:</label>
                                <input
                                  type="text"
                                  value={project.demoUrl || ''}
                                  onChange={(e) =>
                                    handleUpdateProject(project.id, { demoUrl: e.target.value })
                                  }
                                  placeholder="https://..."
                                  className="w-full px-2 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-slate-400">
                                Texnologiyalar (vergul bilan):
                              </label>
                              <input
                                type="text"
                                value={project.techStack.join(', ')}
                                onChange={(e) =>
                                  handleUpdateProject(project.id, {
                                    techStack: e.target.value.split(',').map((t) => t.trim()),
                                  })
                                }
                                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-sky-300 font-mono focus:border-emerald-400 focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-slate-400">Loyiha Tavsifi:</label>
                              <textarea
                                rows={2}
                                value={project.description}
                                onChange={(e) =>
                                  handleUpdateProject(project.id, { description: e.target.value })
                                }
                                className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:border-emerald-400 focus:outline-none resize-none"
                              />
                            </div>

                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: SERVICES & PRICING */}
              {currentSection === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Xizmatlar & Arzon Narxlar</h3>
                      <p className="text-xs text-slate-400">Tarif rejalari va narxlarni boshqaring.</p>
                    </div>
                    <button
                      onClick={handleGlobalSave}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs font-mono flex items-center space-x-1"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Saqlash</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localServices.map((srv) => (
                      <div
                        key={srv.id}
                        className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400">Tarif Nomi:</label>
                            <input
                              type="text"
                              value={srv.title}
                              onChange={(e) =>
                                setLocalServices(
                                  localServices.map((s) =>
                                    s.id === srv.id ? { ...s, title: e.target.value } : s
                                  )
                                )
                              }
                              className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-white font-bold focus:border-emerald-400 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-emerald-400 font-bold">
                              Chegirmali Narx ($):
                            </label>
                            <input
                              type="number"
                              value={srv.discountedPrice}
                              onChange={(e) =>
                                setLocalServices(
                                  localServices.map((s) =>
                                    s.id === srv.id
                                      ? { ...s, discountedPrice: parseInt(e.target.value) || 0 }
                                      : s
                                  )
                                )
                              }
                              className="w-full px-3 py-1.5 rounded bg-slate-900 border border-emerald-500/50 text-xs text-emerald-300 font-bold font-mono focus:border-emerald-400 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-400">Yetkazish Muddati:</label>
                            <input
                              type="text"
                              value={srv.deliveryDays}
                              onChange={(e) =>
                                setLocalServices(
                                  localServices.map((s) =>
                                    s.id === srv.id ? { ...s, deliveryDays: e.target.value } : s
                                  )
                                )
                              }
                              className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-emerald-400 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400">Tavsif:</label>
                          <input
                            type="text"
                            value={srv.description}
                            onChange={(e) =>
                              setLocalServices(
                                localServices.map((s) =>
                                  s.id === srv.id ? { ...s, description: e.target.value } : s
                                )
                              )
                            }
                            className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: MESSAGES (INBOX) */}
              {currentSection === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Kelgan Xabarlar (Inbox)</h3>
                      <p className="text-xs text-slate-400">
                        Mijozlar tomonidan qoldirilgan buyurtma va xabarlar ro'yxati.
                      </p>
                    </div>
                  </div>

                  {localMessages.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 bg-slate-950 rounded-2xl border border-slate-800">
                      Hozircha yangi xabarlar yo'q.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {localMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm text-white">{msg.senderName}</span>
                              <span className="text-xs text-emerald-400 font-mono">
                                ({msg.senderContact})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] text-slate-400">{msg.date}</span>
                              <button
                                onClick={() => {
                                  setLocalMessages(localMessages.filter((m) => m.id !== msg.id));
                                  showToast("Xabar o'chirildi.");
                                }}
                                className="p-1 rounded text-rose-400 hover:bg-rose-950"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs font-mono">
                            <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-300">
                              Loyiha: {msg.projectType}
                            </span>
                            {msg.budget && (
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                                Byudjet: {msg.budget}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: BACKUP & RESET */}
              {currentSection === 'backup' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Zaxira Nusxa & Eksport (JSON)</h3>
                    <p className="text-xs text-slate-400">
                      Barcha ma'lumotlaringizni fayl sifatida saqlang yoki avvalgi holatiga qaytaring.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white">JSON Nusxani Yuklab Olish</h4>
                      <p className="text-xs text-slate-400">
                        Barcha rasmlar, matnlar, loyihalar va ko'nikmalar to'liq JSON faylga yoziladi.
                      </p>
                      <button
                        onClick={handleExportJSON}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs font-mono flex items-center justify-center space-x-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Faylni Yuklab Olish</span>
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white">JSON Nusxani Yuklash</h4>
                      <p className="text-xs text-slate-400">
                        Avval saqlangan JSON faylni tanlab ma'lumotlarni qayta tiklang.
                      </p>
                      <input
                        type="file"
                        ref={jsonImportInputRef}
                        accept=".json"
                        onChange={handleImportJSON}
                        className="hidden"
                      />
                      <button
                        onClick={() => jsonImportInputRef.current?.click()}
                        className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs font-mono flex items-center justify-center space-x-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>JSON Fayl Tanlash</span>
                      </button>
                    </div>

                  </div>

                  {/* Reset to initial state */}
                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                    <h4 className="text-xs font-bold text-rose-300 font-mono uppercase">
                      Xavfli Hudud
                    </h4>
                    <p className="text-xs text-slate-400">
                      Barcha o'zgarishlarni o'chirib, dastlabki standart holatga qaytarish.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm("Rostdan ham barcha ma'lumotlarni dastlabki holatga qaytarmoqchimisiz?")) {
                          onResetData();
                          onClose();
                        }
                      }}
                      className="px-4 py-2 bg-rose-800 hover:bg-rose-700 text-white font-bold text-xs rounded-lg font-mono flex items-center space-x-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Standart Ma'lumotlarga Qaytish</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
