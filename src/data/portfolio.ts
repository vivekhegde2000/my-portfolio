import type {
  Award,
  CareerStep,
  CaseStudy,
  Contribution,
  ContributionCategory,
  Accent,
  Education,
  Experience,
  HeroChip,
  NavItem,
  Profile,
  ProjectRow,
  SideProject,
  SkillGroup,
  SocialLink,
  Stat,
} from '../types/portfolio';

/**
 * Single source of truth for all site content.
 * Update this file to change what the portfolio shows — no component edits needed.
 */

export const profile: Profile = {
  name: 'Vivek Hegde',
  firstName: 'Vivek',
  lastName: 'Hegde',
  role: 'Software Engineer',
  company: 'NSP',
  rotatingFocus: ['scalable SPAs', 'micro‑frontends', 'design systems', 'full‑stack apps'],
  pitch:
    'I build fast, scalable React & TypeScript frontends — from micro‑frontend platforms to the component libraries teams ship with every day.',
  bio:
    '3+ years building production **React + TypeScript** apps at NSP. I led an internal component library on NPM, turned our micro‑frontend setup into the team standard, and act as de facto frontend lead — now exploring full‑stack JavaScript with **Node.js & Express**.',
  location: 'Bengaluru, India',
  timeZone: 'Asia/Kolkata',
  email: 'vivekhegdehalasarige@gmail.com',
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Vivek_Hegde_Resume.pdf',
  availableForWork: true,
  education: "MCA · Jain University '26",
  languages: ['English', 'Hindi', 'Kannada'],
  photo: {
    src: '/images/profile-800.jpg',
    srcSet: '/images/profile-480.jpg 480w, /images/profile-800.jpg 800w',
    width: 800,
    height: 1067,
    alt: 'Portrait of Vivek Hegde',
  },
};

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vivek-hegde-/', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/vivekhegde2000', icon: 'github' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
];

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export const heroChips: HeroChip[] = [
  { label: 'React + TypeScript', accent: 'cyan' },
  { label: 'Module Federation', accent: 'violet' },
  { label: 'Node.js + Express', accent: 'lime' },
];

export const techBands: [string[], string[]] = [
  ['React', 'TypeScript', 'Module Federation', 'Redux Toolkit', 'Next.js'],
  ['Node.js', 'Express', 'PostgreSQL', 'Storybook', 'Vitest', 'Tailwind'],
];

export const stats: Stat[] = [
  { id: 'years', eyebrow: 'Experience', value: 3, suffix: '+', caption: 'years shipping React', accent: 'cyan' },
  { id: 'awards', eyebrow: 'Awards', value: 3, caption: 'incl. Performance Excellence ×2', accent: 'lime' },
];

export const exploring = {
  title: 'Full‑stack JavaScript',
  tags: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
};

export const experience: Experience = {
  role: 'Software Engineer',
  company: 'NSP',
  location: 'Bengaluru',
  period: 'May 2023 — Present',
};

export const careerPath: CareerStep[] = [
  { id: 'trainee', eyebrow: 'Step 01', title: 'Trainee', caption: 'Joined NSP · May 2023', accent: 'violet' },
  { id: 'associate', eyebrow: 'Step 02', title: 'Associate SE', caption: 'First promotion', accent: 'cyan' },
  {
    id: 'engineer',
    eyebrow: 'Now',
    title: 'Software Engineer',
    caption: 'De facto frontend lead · exploring Node.js & Express',
    accent: 'lime',
  },
];

export const contributionCategories: Record<ContributionCategory, { label: string; accent: Accent }> = {
  architecture: { label: 'Architecture', accent: 'violet' },
  leadership: { label: 'Leadership', accent: 'cyan' },
  frontend: { label: 'Frontend', accent: 'pink' },
  fullstack: { label: 'Full‑stack', accent: 'lime' },
  delivery: { label: 'Delivery & growth', accent: 'amber' },
};

export const contributions: Contribution[] = [
  {
    id: 'spa',
    category: 'architecture',
    text: 'Built and scaled a production React/TypeScript SPA, applying **code splitting and lazy loading** to improve load performance.',
  },
  {
    id: 'mfe',
    category: 'architecture',
    wide: true,
    text: "Contributed to migrating the Assisto HRMS platform to a **micro‑frontend architecture using Webpack Module Federation** to expose/consume remote apps from the host; optimized the initial setup established by the tech lead, and the refined structure is now **the standard adopted across the team's codebase**.",
  },
  {
    id: 'fullstack',
    category: 'fullstack',
    wide: true,
    text: 'Contributing to full‑stack development on the Assisto platform — backend services with **Java Spring Boot microservices** and a **multi‑tenant PostgreSQL** database, alongside the React/TypeScript frontend.',
  },
  {
    id: 'library',
    category: 'leadership',
    text: '**Led development of a reusable React/TypeScript component library published to NPM**, reducing development time for new features across the team.',
  },
  {
    id: 'mentor',
    category: 'leadership',
    text: 'Guide and mentor the frontend team on architecture decisions and best practices, acting as a **de facto frontend lead**.',
  },
  {
    id: 'state',
    category: 'frontend',
    text: 'Implemented state management (**Redux Toolkit, Thunk**) and integrated RESTful APIs (**Axios**) for a dynamic, data‑driven UI.',
  },
  {
    id: 'ui',
    category: 'frontend',
    text: 'Delivered responsive interfaces using **SCSS, MUI, Tailwind and Bootstrap**; wrote unit tests with **Jest/RTL** to keep components reliable.',
  },
  {
    id: 'quality',
    category: 'delivery',
    label: 'Delivery',
    text: 'Maintained code quality through Git‑based version control, **pull request reviews** and **Agile/Scrum** delivery practices.',
  },
  {
    id: 'growth',
    category: 'delivery',
    label: 'Growth',
    wide: true,
    text: "Progressed **Trainee → Associate Software Engineer → Software Engineer**; delivered enhancements and bug fixes on **ABB's Product Dashboard Management** system.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'assisto-hrms',
    title: 'Assisto HRMS',
    kind: 'Case study · Platform',
    accent: 'violet',
    problem: 'One large frontend slowing every team down.',
    role: 'Micro‑frontend migration, full‑stack features.',
    stack: ['React', 'TypeScript', 'Module Federation', 'Spring Boot'],
    diagram: { root: 'Host shell', nodes: ['Onboarding', 'Timesheets', 'PMS', 'Reports'] },
  },
  {
    id: 'assisto-ui',
    title: 'Assisto UI Components',
    kind: 'Case study · Design system',
    accent: 'cyan',
    problem: 'Inconsistent UI and repeated work across teams.',
    role: 'Led design & development of the library.',
    stack: ['React', 'TypeScript', 'Storybook', 'SCSS', 'Fluent UI'],
    diagram: { root: 'npm package', nodes: ['Button', 'DataGrid', 'Forms', 'Theme'] },
  },
];

export const moreProjects: ProjectRow[] = [
  {
    id: 'pms',
    index: '03',
    title: 'PMS',
    description: 'Goals, performance reviews & feedback · Redux Toolkit · Vitest · MUI',
    tag: 'HRMS module',
    accent: 'lime',
  },
  {
    id: 'abb',
    index: '04',
    title: 'Dashboard Manager',
    description: 'Enterprise product dashboards · Redux Saga · Highcharts · RBAC',
    tag: 'Client · ABB',
    accent: 'pink',
  },
];

export const sideProjects: SideProject[] = [
  {
    id: 'kanban',
    title: 'Kanban Board',
    description: 'Drag & drop task board with dnd‑kit sortable.',
    image: '/images/projects/kanban.jpg',
    liveUrl: 'https://viveks-kanban-board.netlify.app/',
    repoUrl: 'https://github.com/vivekhegde2000/kanban-board',
    accent: 'violet',
  },
  {
    id: 'weather',
    title: 'Weather App',
    description: 'Live forecasts via the OpenWeatherMap API.',
    image: '/images/projects/weather.jpg',
    liveUrl: 'https://simple-weather-check-v-0-0-1.netlify.app/',
    repoUrl: 'https://github.com/vivekhegde2000/weather-check',
    accent: 'cyan',
  },
  {
    id: 'otp',
    title: 'OTP Generator',
    description: 'Custom OTP length and character sets.',
    image: '/images/projects/otp.jpg',
    liveUrl: 'https://otp-generator-v1-0-0.netlify.app/',
    repoUrl: 'https://github.com/vivekhegde2000/otp-generator',
    accent: 'lime',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    accent: 'violet',
    skills: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Redux Saga', 'React Query', 'Tailwind', 'SCSS', 'MUI'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    accent: 'cyan',
    skills: ['Micro‑frontends', 'Module Federation', 'Design systems', 'Performance'],
  },
  {
    id: 'backend',
    title: 'Backend',
    accent: 'lime',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST APIs', 'Spring Boot'],
  },
  {
    id: 'quality',
    title: 'Quality & tools',
    accent: 'pink',
    skills: ['Jest', 'Vitest', 'RTL', 'Storybook', 'Webpack', 'Vite', 'Git', 'CI/CD'],
  },
];

export const awards: Award[] = [
  {
    id: 'performance',
    title: 'Performance Excellence Award',
    description: '2024–25 and 2025–26 — two consecutive cycles of outstanding performance.',
    accent: 'amber',
    icon: 'trophy',
    figure: '×2',
  },
  {
    id: 'rising-star',
    title: 'Rising Star Award',
    description: 'Exceptional commitment, hard work and impact in the role.',
    accent: 'violet',
    icon: 'star',
  },
  {
    id: 'collaboration',
    title: 'Collaboration Award',
    description: 'Seamless teamwork, clear communication and joint delivery of results.',
    accent: 'cyan',
    icon: 'users',
  },
];

export const education: Education[] = [
  {
    id: 'mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Jain University',
    location: 'Bengaluru',
    date: 'Jan 2026',
  },
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'JMJ BCA College',
    location: 'Sirsi',
    date: 'Nov 2022',
  },
  {
    id: 'diploma',
    degree: 'Diploma in Computer Science & Engineering',
    institution: 'Govt CPC Polytechnic',
    location: 'Mysore',
    date: 'Aug 2019',
  },
];
