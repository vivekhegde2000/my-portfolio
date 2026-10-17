# Vivek Hegde — Portfolio

Personal portfolio built with **React 19, TypeScript, Vite, Tailwind CSS v4 and three.js**, deployed on **Netlify**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Start the dev server                                |
| `npm run build`     | Type-check and build to `dist/`                     |
| `npm run preview`   | Serve the production build locally                  |
| `npm run lint`      | ESLint (incl. React Compiler hook rules)            |
| `npm test`          | Vitest + Testing Library (jsdom)                    |
| `npm run check`     | Lint → test → build (run before pushing)            |

## Editing content

All text, links, projects, skills and awards live in **[`src/data/portfolio.ts`](src/data/portfolio.ts)** — no component changes needed.
Wrap words in `**double asterisks**` to highlight them (bio, contributions).

| Asset                 | Location                         |
| --------------------- | -------------------------------- |
| Resume                | `public/resume.pdf`              |
| Profile photo         | `public/images/profile-{480,800}.jpg` |
| Side-project shots    | `public/images/projects/*.jpg` (960×600) |
| Social preview image  | `public/og-image.jpg` (1200×630) |

## Project structure

```
src/
  data/portfolio.ts        Site content (single source of truth)
  types/portfolio.ts       Content types
  sections/                Page sections (About, Experience, Work, Stack, Awards, Contact)
  components/
    hero/                  Hero, photo card, lazy-loaded three.js scene (+ scene/ styles)
    layout/                Navbar, mobile menu, ⌘K palette, footer, backdrop
    ui/                    Reveal, SectionHeader, Icon, ErrorBoundary, ScrollLitText
  hooks/                   In-view, media queries, tilt/magnetic/spotlight, scroll-spy…
  lib/                     Contact form (Netlify), accents, emphasis parser, navigation
  styles/index.css         Tailwind theme tokens + component styles
```

## How it works

- **3D hero** — `HeroScene` is code-split (three.js loads only after first paint), renders only while visible, caps pixel ratio on low-power devices, and falls back to a static gradient if WebGL fails. Visitors can switch between *Particles*, *Orbit* and *Prism*; the choice is remembered.
- **Contact form** — posted to [Netlify Forms](https://docs.netlify.com/forms/setup/). A hidden static copy in `index.html` lets Netlify detect it at deploy time; a honeypot field filters bots. Submissions appear under **Netlify → Forms**, where you can enable email notifications. Locally (`npm run dev`) submission fails by design and the UI offers a mailto fallback.
- **SEO** — `__SITE_URL__` in `index.html` is replaced at build time with Netlify's `URL` env var (override with `VITE_SITE_URL`) for canonical, Open Graph and JSON-LD tags.
- **Accessibility** — semantic landmarks, skip link, focus-visible styles, keyboard-operable menu and command palette, `aria-live` status messages, and `prefers-reduced-motion` support (all animation and 3D motion stop).
- **Security & caching** — headers in [`netlify.toml`](netlify.toml) (CSP, HSTS, frame/sniff protection, immutable hashed assets).

## Deploying

Push to the branch Netlify builds from. Build command `npm run build`, publish directory `dist` (both set in `netlify.toml`).
