import React, { useState, useMemo } from 'react';
import { PortfolioData, PageTab, Project } from '../../types';
import { BloodDripText } from '../BloodDripText';
import {
  FolderGit2,
  ExternalLink,
  Github,
  PlusCircle,
  Tag,
  Layers,
  Code2,
  Send,
  Sparkles,
  Search,
  CheckCircle2,
  DollarSign,
  Calendar,
  X
} from 'lucide-react';

interface ProjectsPageProps {
  data: PortfolioData;
  setActiveTab: (tab: PageTab) => void;
  onOpenAdmin: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  data,
  setActiveTab,
  onOpenAdmin,
}) => {
  const { projects } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Barchasi', icon: <Layers className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend & API', icon: <Code2 className="w-4 h-4" /> },
    { id: 'fullstack', label: 'Full-stack Vibe', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'telegram', label: 'Telegram Botlar', icon: <Send className="w-4 h-4" /> },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat = selectedCategory === 'all' || project.category === selectedCategory;
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-10 pb-16 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <section className="text-center space-y-3 pt-4 sm:pt-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-white/10 text-yellow-300 border border-white/20">
          🚀 MENING AMALIY ISHLARIM
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          <BloodDripText
            text="Yaratgan"
            highlightText="Loyihalarim"
            highlightClassName="text-yellow-400"
          />
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto font-light">
          Django, FastAPI, Telegram Botlar va zamonaviy Vibe Frontend ilovalari. Har bir loyiha rasmini kompyuter xotirasidan Django Admin orqali yuklash mumkin.
        </p>
      </section>

      {/* FILTER & SEARCH */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Categories */}
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

        {/* Search + Add Project */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Loyiha yoki texnologiya..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-black/30 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1 shrink-0 shadow transition-all"
            title="Yangi loyiha qo'shish (Django Admin)"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Loyiha yuklash</span>
          </button>
        </div>

      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 flex flex-col justify-between group hover:border-yellow-400/60 transition-all shadow-xl"
          >
            <div>
              {/* Project Image Box with Overlay */}
              <div className="relative h-48 overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Price / Budget Badge */}
                {project.priceEstimate && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-yellow-400 text-slate-950 font-mono font-bold text-xs shadow-lg backdrop-blur-sm flex items-center space-x-1">
                    <span>{project.priceEstimate}</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 text-yellow-300 font-mono text-[10px] uppercase tracking-wider border border-white/20 backdrop-blur-md">
                  {project.category}
                </div>

                {/* Tech Badges on bottom edge of image */}
                <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono border border-white/10 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full bg-black/60 text-yellow-300 text-[10px] font-mono border border-white/10">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-yellow-300 font-mono mt-0.5 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs text-white/70 leading-relaxed line-clamp-3 font-light">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-6 pt-0 border-t border-white/10 mt-3 flex items-center justify-between">
              <button
                onClick={() => setActiveModalProject(project)}
                className="text-xs font-bold text-yellow-300 hover:text-white flex items-center space-x-1 transition-colors"
              >
                <span>Batafsil ma'lumot</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center space-x-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                    title="GitHub kodi"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 transition-all font-bold shadow"
                    title="Jonli demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center text-white/70 space-y-3 border border-white/20">
          <p className="text-sm">Qidiruv bo'yicha loyiha topilmadi.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-yellow-400 text-slate-950 rounded-full text-xs font-bold shadow"
          >
            Filtrni tozalash
          </button>
        </div>
      )}

      {/* PROJECT DETAILS MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-950/90 backdrop-blur-2xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl p-6 sm:p-8 space-y-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-60 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              {activeModalProject.priceEstimate && (
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-yellow-400 text-slate-950 rounded-full font-bold text-xs shadow">
                  {activeModalProject.priceEstimate}
                </div>
              )}
            </div>

            {/* Title & Category */}
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-mono font-bold border border-white/15">
                {activeModalProject.category.toUpperCase()}
              </span>
              <h2 className="text-2xl font-bold text-white mt-2">
                {activeModalProject.title}
              </h2>
              <p className="text-xs text-yellow-300/80 font-mono">
                {activeModalProject.subtitle}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-yellow-300">Loyiha haqida</h4>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {activeModalProject.description}
              </p>
            </div>

            {/* Features */}
            {activeModalProject.features && activeModalProject.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-yellow-300">Asosiy Imkoniyatlar</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-yellow-300">Texnologiyalar</h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-mono border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                {activeModalProject.demoUrl && (
                  <a
                    href={activeModalProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-white text-indigo-950 hover:bg-yellow-400 hover:text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Jonli Havola</span>
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center space-x-2 border border-white/15 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  setActiveModalProject(null);
                  setActiveTab('services_contact');
                }}
                className="px-4 py-2 text-xs font-bold text-yellow-300 hover:text-white flex items-center space-x-1 transition-colors"
              >
                <span>Shunga o'xshash loyiha buyurtma qilish</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
