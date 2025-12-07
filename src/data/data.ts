import type { PersonalInfo, SkillCategory, Experience, Project, Education, Award } from '../types/types';

export const personalInfo: PersonalInfo = {
  name: "Vivek Hegde",
  title: "Frontend Developer",
  location: "Bengaluru, India",
  phone: "+91 8277338780",
  alternativePhone: "+91 7483179603",
  email: "vivekhegdehalasarige@gmail.com",
  linkedin: "https://www.linkedin.com/in/vivek-hegde-/",
  summary: "Frontend Developer with 2.5+ years of experience in React.js and TypeScript. Specializing in building scalable, high-performance Single-Page Applications (SPAs). Proven ability to deliver robust, reusable UI component libraries within Agile teams. Proficient in Redux Toolkit and modern testing practices (Jest/Vitest)."
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Technology Stack",
    skills: [
      { name: "React.js" },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "Redux Toolkit" },
      { name: "Next.js" }
    ]
  },
  {
    category: "Styling & UI Frameworks",
    skills: [
      { name: "CSS" },
      { name: "HTML" },
      { name: "SCSS" },
      { name: "MUI" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" }
    ]
  },
  {
    category: "State & Data Flow",
    skills: [
      { name: "Thunk Middleware" },
      { name: "Redux Saga" },
      { name: "RESTful APIs" },
      { name: "Axios" },
      { name: "React Query" }
    ]
  },
  {
    category: "Testing & Quality",
    skills: [
      { name: "Jest" },
      { name: "Vitest" },
      { name: "React Testing Library" },
      { name: "Unit Testing" },
      { name: "E2E Testing" }
    ]
  },
  {
    category: "Development Practices",
    skills: [
      { name: "Agile (Scrum)" },
      { name: "Git" },
      { name: "Version Control" },
      { name: "Code Review" },
      { name: "CI/CD" }
    ]
  },
  {
    category: "Additional Skills",
    skills: [
      { name: "Webpack" },
      { name: "Vite" },
      { name: "npm" },
      { name: "Performance Optimization" },
      { name: "Responsive Design" }
    ]
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Software Engineer",
    company: "NSP",
    period: "May 2023 – Present",
    location: "Bengaluru",
    highlights: [
      "Built the core Single-Page Application (SPA) using React and TypeScript",
      "Used Redux Toolkit and Thunk for reliable state management across the app",
      "Designed and implemented responsive UI with SCSS and frameworks like MUI, Tailwind, Bootstrap",
      "Integrated front-end with RESTful APIs for dynamic content presentation",
      "Created Reusable Components that sped up feature development for the team",
      "Optimized performance of existing React applications by utilizing best practices such as code splitting and lazy loading",
      "Led development of a new Design System: A React/TypeScript component library published to NPM",
      "Created custom components, forms, and interfaces for user interactions in React",
      "Implemented unit test cases for all React components using Jest and React Testing Library",
      "Progressed from Trainee to Associate Software Engineer and then to Software Engineer",
      "Worked with ABB on developing, bug fixes and enhancing a Product Dashboard Management system"
    ],
    technologies: ["React", "TypeScript", "Redux Toolkit", "MUI", "SCSS", "Jest", "RTL"]
  }
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Assisto UI Components",
    description: "A comprehensive React/TypeScript component library published to NPM, featuring reusable UI components with consistent styling, theming and accessibility. Used by multiple teams to accelerate development.",
    technologies: ["React", "TypeScript", "Storybook", "SCSS", "Fluent UI", "NPM"],
    featured: true
  },
    {
    id: "proj-2",
    title: "Assisto - HRMS",
    description: "Worked on Data Integrated platform to manage complete Employee Life cycle. Also the Project Management, Timesheets, Reports, Employee Onboarding and Management features.",
    technologies: ["React", "TypeScript", "Scss", "Redux Toolkit", "Thunk" ,"Tailwind CSS", "Vite", "Vitest - RTL", "Axios", "WebSockets"],
    featured: true
  },
  {
    id: "proj-3",
    title: "PMS",
    description: "Module of Assisto - HRMS : Performance Management System : Setting up goal management, performance reviews, and feedback features.",
    technologies: ["React", "TypeScript", "Scss", "Redux Toolkit", "Thunk", "Vite", "Vitest - RTL", "Axios", "MUI"],
    featured: true
  },
  {
    id: "proj-4",
    title: "Dashboard Manager",
    description: "ABB client product : Worked on few enhancements and bug fixesin Enterprise dashboard manager built to manage product data, analytics, and reporting. Features dynamic charts, real-time updates, and role-based access control.",
    technologies: ["React", "TypeScript", "Redux Toolkit", "Redux saga", "HighCharts", "Immer","Redux Dynamic Modules", "Jest"],
    featured: true
  },
  {
    id: "proj-5",
    title: "Kanban Board",
    description: "Kanban Board built using React dnd, dnd sortable.",
    technologies: ["React", "TypeScript", "Scss", "MUI", "Tailwind CSS", "React Dnd", "Dnd Sortable"],
    featured: true,
    githubUrl : "https://github.com/vivekhegde2000/kanban-board",
    liveUrl : "https://viveks-kanban-board.netlify.app/"
  },
  {
    id: "proj-6",
    title: "Weather Web App",
    description: "Weather App built using React and OpenWeatherMap API.",
    technologies: ["React", "TypeScript", "Scss", "MUI", "Tailwind CSS", "OpenWeatherMap API"],
    featured: true,
    githubUrl : "https://github.com/vivekhegde2000/weather-check",
    liveUrl:"https://simple-weather-check-v-0-0-1.netlify.app/"
  },
  {
    id: "proj-7",
    title: "OTP generator",
    description: "Custom OTP generator with customization of length and characters.",
    technologies: ["React", "TypeScript", "Scss", "MUI", "Tailwind CSS"],
    featured: true,
    githubUrl : "https://github.com/vivekhegde2000/otp-generator",
    liveUrl:"https://otp-generator-v1-0-0.netlify.app/"
  },
];

export const education: Education[] = [
  {
    id: "edu-1",
    degree: "Master of Computer Applications (MCA)",
    institution: "Jain University",
    location: "Bengaluru",
    graduationDate: "January 2026"
  },
  {
    id: "edu-2",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "JMJ BCA College",
    location: "Sirsi",
    graduationDate: "November 2022"
  },
  {
    id: "edu-3",
    degree: "Diploma in Computer Science & Engineering",
    institution: "Govt CPC Polytechnic",
    location: "Mysore",
    graduationDate: "August 2019"
  }
];

export const awards: Award[] = [
  {
    id: "award-1",
    title: "Rising Star Award",
    description: "Awarded for exceptional commitment, hard work, and significant impact in the role."
  },
  {
    id: "award-2",
    title: "Performance Excellence Award",
    description: "Recognized for consistent, outstanding performance and dedication to delivering high-quality results."
  },
  {
    id: "award-3",
    title: "Collaboration Award",
    description: "Honored for showcasing seamless teamwork, effective communication, and joint delivery of exceptional results."
  }
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" }
];
