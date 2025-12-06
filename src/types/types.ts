export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  alternativePhone: string;
  email: string;
  linkedin: string;
  summary: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  highlights: string[];
  technologies?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
}

export interface Award {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ThemeMode {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}
