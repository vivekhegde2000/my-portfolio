import type { PersonalInfo, SkillCategory, Experience, Project, Education, Award } from '../types/types';

export const personalInfo: PersonalInfo = {
  name: "Vivek Hegde",
  title: "Frontend Developer",
  location: "Bengaluru, India",
  phone: "+91 8277338780",
  alternativePhone: "+91 7483179603",
  email: "vivekhegdehalasarige@gmail.com",
  linkedin: "https://www.linkedin.com/in/vivek-hegde-/",
  summary: "Frontend Developer with 3+ years of experience building scalable React.js/TypeScript SPAs, now expanding into fullstack development across the JavaScript ecosystem (Node.js, Express.js) with growing experience in Java Spring Boot and PostgreSQL. Also working in micro-frontend architecture (Module Federation) — led development of a component library published to NPM, and optimized a team-wide micro-frontend setup now used as the standard structure across the codebase. Proficient in Redux Toolkit, RESTful API integration, and modern testing practices (Jest/Vitest)."
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
    category: "Architecture",
    skills: [
      { name: "Micro-Frontend Architecture" },
      { name: "Module Federation (Webpack)" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Prisma ORM" },
      { name: "PostgreSQL" }
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
      "Built and scaled a production React/TypeScript SPA, applying code splitting and lazy loading to improve load performance",
      "Contributed to migrating the Assisto HRMS platform to a micro-frontend architecture using Webpack Module Federation to expose/consume remote apps from the host; optimized the initial setup established by the tech lead, and the refined structure is now the standard adopted across the team's codebase",
      "Recently began contributing to full-stack development on the Assisto platform, building backend services with Java Spring Boot microservices and a multi-tenant PostgreSQL database, alongside the existing React/TypeScript frontend",
      "Led development of a reusable React/TypeScript component library published to NPM, reducing development time for new features across the team",
      "Guide and mentor the frontend team on architecture decisions and best practices, acting as a de facto frontend lead",
      "Implemented state management (Redux Toolkit, Thunk) and integrated RESTful APIs (Axios) for dynamic, data-driven UI",
      "Delivered responsive interfaces using SCSS, MUI, Tailwind, and Bootstrap; wrote unit tests with Jest/RTL to maintain component reliability",
      "Maintained code quality through Git-based version control, pull request reviews, and Agile/Scrum delivery practices",
      "Progressed Trainee → Associate Software Engineer → Software Engineer; delivered enhancements and bug fixes on ABB's Product Dashboard Management system"
    ],
    technologies: ["React", "TypeScript", "Redux Toolkit", "MUI", "SCSS", "Jest", "RTL", "Java Spring Boot", "PostgreSQL"]
  }
];

export const projects: Project[] = [
  {
    id: "proj-2",
    title: "Assisto - HRMS",
    description: "Data-integrated platform managing the complete Employee Life Cycle, Project Management, Timesheets, Reports, and Employee Onboarding. Migrated the frontend to a micro-frontend architecture with Webpack Module Federation, and expanded into full-stack development building backend microservices with Java Spring Boot and a multi-tenant PostgreSQL database.",
    technologies: ["React", "TypeScript", "Scss", "Redux Toolkit", "Thunk", "Tailwind CSS", "Vite", "Vitest - RTL", "Axios", "WebSockets", "Java Spring Boot", "PostgreSQL"],
    featured: true
  },
  {
    id: "proj-1",
    title: "Assisto UI Components",
    description: "A comprehensive React/TypeScript component library published to NPM, featuring reusable UI components with consistent styling, theming and accessibility. Used by multiple teams to accelerate development.",
    technologies: ["React", "TypeScript", "Storybook", "SCSS", "Fluent UI", "NPM"],
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
    title: "Performance Excellence Award (2024–2025, 2025–2026)",
    description: "Recognized in two consecutive cycles for consistent, outstanding performance and dedication to delivering high-quality results."
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
