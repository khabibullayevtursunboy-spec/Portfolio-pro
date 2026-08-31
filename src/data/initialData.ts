import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Samandar (Dev Vibe)",
    age: 14,
    roleTitle: "Backend Dasturchi & Frontend Vibe Coder",
    roleSubtitle: "Tezkor, toza va hamyonbop dasturlash yechimlari",
    badge: "🚀 14-Yoshli Yosh Dasturchi",
    tagline: "Boshqalardan 2 baravar arzon narx, lekin eng yangi arxitektura va zamonaviy vibe bilan!",
    bio: "Assalomu alaykum! Men 14 yoshdaman. Django, FastAPI, Node.js va PostgreSQL orqali baquvvat backend tizimlar qura olaman. Shuningdek, zamonaviy React, Tailwind va Vibe Coding yordamida tezkor, chiroyli va yengil interfeyslar yarataman.",
    detailedAbout: "Dasturlash olamiga 11 yoshimda qiziqish bilan kirib kelganman. Asosiy e'tiborim - tezkor va xavfsiz backend arxitekturasi hamda zamonaviy dizaynga ega veb-ilovalar yaratish. Yoshim 14 da bo'lgani uchun narxlarim bozordagi katta dasturchilarnikidan ancha arzon, lekin ishimga 100% mas'uliyat bilan yondashaman.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    phone: "+998 90 123 45 67",
    email: "vibe.coder.14@gmail.com",
    telegram: "@samandar_vibe",
    github: "https://github.com/samandar-dev-14",
    location: "Toshkent, O'zbekiston",
    hourlyRate: 8,
    discountText: "Bozor narxidan 50% arzonroq narxlar!",
    statusText: "Yangi loyihalar uchun ochiqman",
    availableForWork: true,
    yearsOfExperience: 3,
    completedProjectsCount: 18,
    happyClientsCount: 15,
  },
  skills: [
    {
      id: "skill-1",
      name: "Python / Django",
      category: "backend",
      percent: 92,
      experienceYears: 2.5,
      icon: "Code2",
      color: "#092e20",
      description: "Django REST Framework, ORM, Auth, Signals, Django Admin moslashuvi.",
      highlight: true
    },
    {
      id: "skill-2",
      name: "FastAPI & Async",
      category: "backend",
      percent: 88,
      experienceYears: 2,
      icon: "Zap",
      color: "#009688",
      description: "Yuqori tezlikdagi asinxron API-lar, Pydantic, Swagger hujjatlashtirish.",
      highlight: true
    },
    {
      id: "skill-3",
      name: "PostgreSQL & Redis",
      category: "database",
      percent: 85,
      experienceYears: 2,
      icon: "Database",
      color: "#336791",
      description: "Murakkab SQL so'rovlar, keshlashtirish, munosabatli ma'lumotlar bazasi.",
      highlight: false
    },
    {
      id: "skill-4",
      name: "Frontend Vibe Coding (React + Tailwind)",
      category: "frontend",
      percent: 90,
      experienceYears: 2,
      icon: "Layout",
      color: "#38bdf8",
      description: "Zamonaviy UI, shaffof glassmorphism, silliq animatsiyalar va tezkor yechimlar.",
      highlight: true
    },
    {
      id: "skill-5",
      name: "Telegram Botlar (Aiogram / PyTelegramBotAPI)",
      category: "backend",
      percent: 95,
      experienceYears: 3,
      icon: "Send",
      color: "#229ed9",
      description: "To'lov tizimlari (Click/Payme) integratsiyalangan, admin panelli botlar.",
      highlight: true
    },
    {
      id: "skill-6",
      name: "Docker & Linux",
      category: "tools",
      percent: 75,
      experienceYears: 1.5,
      icon: "Server",
      color: "#2496ed",
      description: "Konteynerlashtirish, VPS server sozlash, Nginx va reverse proxy.",
      highlight: false
    },
    {
      id: "skill-7",
      name: "Node.js & Express",
      category: "backend",
      percent: 80,
      experienceYears: 1.5,
      icon: "Cpu",
      color: "#68a063",
      description: "REST API, JWT avtorizatsiya, real-time WebSocket yechimlari.",
      highlight: false
    },
    {
      id: "skill-8",
      name: "AI & LLM API Integratsiya (Vibe Tools)",
      category: "vibe",
      percent: 94,
      experienceYears: 2,
      icon: "Sparkles",
      color: "#a855f7",
      description: "Gemini / OpenAI API, prompt injiniring va sun'iy intellektli funksiyalar.",
      highlight: true
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Online Do'kon & Savdo Boshqaruv Tizimi",
      subtitle: "Django REST Framework + PostgreSQL + React Vibe Frontend",
      description: "Mijozlar uchun to'liq avtomatlashtirilgan savdo platformasi. To'lov tizimlari (Payme/Click), xaridlar tarixi, savatcha va Django orqali to'liq boshqariladigan admin panel.",
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=900&q=80",
      techStack: ["Django REST", "PostgreSQL", "React", "Tailwind CSS", "Payme API"],
      demoUrl: "https://example.com/demo-shop",
      githubUrl: "https://github.com/samandar-dev-14/django-shop-api",
      priceEstimate: "$50 (bozorda $200+)",
      features: ["JWT Auth", "Click/Payme Integratsiya", "Real-time buyurtma ogohlantirish", "Dashboard statistika"],
      featured: true,
      completedDate: "2024"
    },
    {
      id: "proj-2",
      title: "Katta Telegram Savdo & Xizmat Boti",
      subtitle: "Aiogram 3.x + Redis + PostgreSQL + Click integratsiyasi",
      description: "O'zbekistondagi o'quv markaz uchun ishlab chiqilgan to'liq avtomatlashtirilgan Telegram bot. Dars jadvali, to'lovlar, avto-eslatmalar va Excel eksport tizimi.",
      category: "telegram",
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=900&q=80",
      techStack: ["Python", "Aiogram 3", "Redis", "PostgreSQL", "Docker"],
      demoUrl: "https://t.me/example_demo_bot",
      githubUrl: "https://github.com/samandar-dev-14/aiogram-crm-bot",
      priceEstimate: "$35 (bozorda $120+)",
      features: ["Inline knopkalar", "Excel hisobotlar", "Admin eshittirish (broadcast)", "Keshlashtirish"],
      featured: true,
      completedDate: "2024"
    },
    {
      id: "proj-3",
      title: "Tezkor Kuryerlik & Logistika API Tizimi",
      subtitle: "FastAPI + Celery + Redis + Leaflet Xaritalar",
      description: "Shaharlararo kuryerlar marshruti, yuk yetkazish holati va buyurtma trekingi uchun mikroservis backend arxitekturasi. Soniyaiga 500+ so'rovni ko'taradi.",
      category: "backend",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
      techStack: ["FastAPI", "AsyncPG", "Redis", "Docker-Compose", "Celery"],
      demoUrl: "https://example.com/api/docs",
      githubUrl: "https://github.com/samandar-dev-14/fastapi-logistics",
      priceEstimate: "$60 (bozorda $250+)",
      features: ["Async WebSocket GPS", "Swagger API Docs", "Rate Limiting", "JWT Role Access"],
      featured: true,
      completedDate: "2024"
    },
    {
      id: "proj-4",
      title: "Vibe Portfolio & Glassmorphism Landing",
      subtitle: "React + Tailwind CSS + Motion + Sunset Canvas",
      description: "Mijozlar uchun ko'zni quvontiradigan, o'ta yengil va zamonaviy vibe dizayndagi 5 sahifali brend veb-sayti.",
      category: "vibe",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
      techStack: ["React 19", "Tailwind CSS v4", "Motion", "Canvas", "Lucide Icons"],
      demoUrl: "https://example.com/vibe-landing",
      githubUrl: "https://github.com/samandar-dev-14/vibe-portfolio",
      priceEstimate: "$30 (bozorda $100+)",
      features: ["Shaffof Glassmorphism", "Jonli orqa fon animatsiyasi", "Moslashuvchan (Mobile first)", "SEO Friendly"],
      featured: false,
      completedDate: "2024"
    }
  ],
  services: [
    {
      id: "srv-1",
      title: "Start Vibe (Telegram Bot / Mini API)",
      badge: "Eng Hamyonbop",
      originalPrice: 70,
      discountedPrice: 29,
      currency: "$",
      deliveryDays: "2-3 kun",
      description: "Kichik biznes yoki shaxsiy maqsadlar uchun qulay telegram bot yoki tayyor API xizmati.",
      features: [
        "Aiogram 3.x asosida toza kod",
        "Ma'lumotlar bazasi (SQLite / PostgreSQL)",
        "Boshqaruv paneli (Admin buyruqlari)",
        "Bepul 1 oylik server yordami",
        "Tezkor topshirish"
      ],
      popular: false,
      iconName: "Send"
    },
    {
      id: "srv-2",
      title: "Pro Full-Stack & Django Backend",
      badge: "Eng Ko'p Tanlangan 🔥",
      originalPrice: 150,
      discountedPrice: 59,
      currency: "$",
      deliveryDays: "4-6 kun",
      description: "Murakkab veb-sayt, Django admin paneli, to'lovlar va zamonaviy frontend interfeysi.",
      features: [
        "Django REST / FastAPI backend",
        "Zamonaviy React Vibe Frontend",
        "Django Admin paneli orqali boshqaruv",
        "Payme / Click to'lov integratsiyasi",
        "PostgreSQL + Redis kesh",
        "Doimiy texnik ko'mak"
      ],
      popular: true,
      iconName: "Layers"
    },
    {
      id: "srv-3",
      title: "VIP Maxsus Loyiha & Avtomatlashtirish",
      badge: "Kengaytirilgan",
      originalPrice: 280,
      discountedPrice: 119,
      currency: "$",
      deliveryDays: "7-10 kun",
      description: "Katta loyihalar, murakkab biznes jarayonlarini avtomatlashtirish va mikroservis tizimlar.",
      features: [
        "To'liq arxitektura & Docker sozlash",
        "Yuqori yuklamaga chidamli API",
        "Web + Telegram Bot sinxronizatsiyasi",
        "AI / LLM chat-bot integratsiyasi",
        "Serverga o'rnatib berish (VPS/Nginx)",
        "3 oylik bepul kafolat va qo'llab-quvvatlash"
      ],
      popular: false,
      iconName: "ShieldCheck"
    }
  ],
  messages: [
    {
      id: "msg-1",
      senderName: "Akmal Rustamov",
      senderContact: "+998 90 999 88 77 (Telegram)",
      projectType: "Telegram Savdo Boti",
      budget: "$40",
      message: "Salom Samandar! Bizning kiyim do'konimiz uchun buyurtma qabul qiluvchi bot kerak edi. Narxlaring juda ma'qul keldi!",
      date: "Kecha, 18:40",
      read: true
    }
  ]
};

const STORAGE_KEY = 'vibe_portfolio_data_v1';

export function loadPortfolioData(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_PORTFOLIO_DATA, ...parsed };
    }
  } catch (e) {
    console.error("Local storage error:", e);
  }
  return INITIAL_PORTFOLIO_DATA;
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage save error:", e);
  }
}

export function resetPortfolioData(): PortfolioData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Reset error:", e);
  }
  return INITIAL_PORTFOLIO_DATA;
}
