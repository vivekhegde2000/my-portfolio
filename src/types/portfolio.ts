/** Brand accents. Each maps to a CSS colour token (see `lib/accent.ts`). */
export type Accent = 'violet' | 'cyan' | 'lime' | 'pink' | 'amber';

export type IconName =
  | 'linkedin'
  | 'github'
  | 'mail'
  | 'download'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'star'
  | 'users'
  | 'trophy'
  | 'grad-cap'
  | 'menu'
  | 'close'
  | 'copy'
  | 'check'
  | 'command'
  | 'send';

export type SectionId = 'about' | 'experience' | 'work' | 'stack' | 'awards' | 'contact';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  /** Words cycled after "building …" in the hero. */
  rotatingFocus: string[];
  pitch: string;
  /** Bento bio. Wrap highlighted phrases in **double asterisks**. */
  bio: string;
  location: string;
  timeZone: string;
  email: string;
  resumeUrl: string;
  resumeFileName: string;
  availableForWork: boolean;
  education: string;
  languages: string[];
  photo: { src: string; srcSet: string; width: number; height: number; alt: string };
}

export interface HeroChip {
  label: string;
  accent: Accent;
}

export interface Stat {
  id: string;
  eyebrow: string;
  value: number;
  suffix?: string;
  caption: string;
  accent: Accent;
}

export interface CareerStep {
  id: string;
  eyebrow: string;
  title: string;
  caption: string;
  accent: Accent;
}

export type ContributionCategory = 'architecture' | 'leadership' | 'frontend' | 'fullstack' | 'delivery';

export interface Contribution {
  id: string;
  category: ContributionCategory;
  /** Optional label override (e.g. "Growth" inside the delivery category). */
  label?: string;
  /** Wrap emphasised phrases in **double asterisks**. */
  text: string;
  /** Spans two columns on large screens. */
  wide?: boolean;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  kind: string;
  accent: Accent;
  problem: string;
  role: string;
  stack: string[];
  diagram: { root: string; nodes: string[] };
}

export interface ProjectRow {
  id: string;
  index: string;
  title: string;
  description: string;
  tag: string;
  accent: Accent;
}

export interface SideProject {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  repoUrl: string;
  accent: Accent;
}

export interface SkillGroup {
  id: string;
  title: string;
  accent: Accent;
  skills: string[];
}

export interface Award {
  id: string;
  title: string;
  description: string;
  accent: Accent;
  icon: IconName;
  /** Large figure shown instead of an icon, e.g. "×2". */
  figure?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  date: string;
}
