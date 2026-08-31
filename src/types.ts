export type PageTab = 'home' | 'about' | 'skills' | 'projects' | 'services_contact';

export interface PersonalProfile {
  name: string;
  age: number; // 14
  roleTitle: string;
  roleSubtitle: string;
  badge: string;
  tagline: string;
  bio: string;
  detailedAbout: string;
  avatar: string; // base64 or URL
  phone: string;
  email: string;
  telegram: string;
  github: string;
  location: string;
  hourlyRate: number; // $
  discountText: string;
  statusText: string;
  availableForWork: boolean;
  yearsOfExperience: number;
  completedProjectsCount: number;
  happyClientsCount: number;
}

export type SkillCategory = 'backend' | 'frontend' | 'database' | 'tools' | 'vibe';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  percent: number; // 0 - 100
  experienceYears: number; // e.g., 2, 3
  icon: string;
  color: string;
  description: string;
  highlight?: boolean;
}

export type ProjectCategory = 'all' | 'backend' | 'fullstack' | 'telegram' | 'vibe';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'backend' | 'fullstack' | 'telegram' | 'vibe';
  image: string; // base64 or URL
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  priceEstimate?: string;
  features: string[];
  featured?: boolean;
  completedDate?: string;
}

export interface ServicePlan {
  id: string;
  title: string;
  badge?: string;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  deliveryDays: string;
  description: string;
  features: string[];
  popular?: boolean;
  iconName: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderContact: string; // Phone or Telegram or Email
  projectType: string;
  budget?: string;
  message: string;
  date: string;
  read: boolean;
}

export interface PortfolioData {
  profile: PersonalProfile;
  skills: Skill[];
  projects: Project[];
  services: ServicePlan[];
  messages: ContactMessage[];
}
