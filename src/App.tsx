import { useCallback, useEffect, useMemo, useState } from 'react';
import { navItems, profile, socials } from './data/portfolio';
import { scrollToSection } from './lib/navigation';
import { useSpotlight } from './hooks/usePointerEffects';
import { Backdrop } from './components/layout/Backdrop';
import { CommandPalette, type Command } from './components/layout/CommandPalette';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { TechBands } from './components/layout/TechBands';
import { Hero } from './components/hero/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Work } from './sections/Work';
import { Stack } from './sections/Stack';
import { Awards } from './sections/Awards';
import { Contact } from './sections/Contact';

const openExternal = (href: string) => window.open(href, '_blank', 'noopener,noreferrer');

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  useSpotlight();

  // Honour deep links (e.g. /#work): the browser tries before React has rendered the target.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Global ⌘K / Ctrl+K shortcut.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      ...navItems.map((item) => ({
        id: `go-${item.id}`,
        label: `Go to ${item.label}`,
        group: 'Navigate' as const,
        run: () => scrollToSection(item.id),
      })),
      { id: 'go-awards', label: 'Go to Awards & education', group: 'Navigate', run: () => scrollToSection('awards') },
      { id: 'resume', label: 'Open resume (PDF)', group: 'Actions', keywords: 'cv download', run: () => openExternal(profile.resumeUrl) },
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Actions',
        keywords: 'contact mail',
        run: () => void navigator.clipboard?.writeText(profile.email).catch(() => undefined),
      },
      ...socials
        .filter((s) => s.href.startsWith('http'))
        .map((s) => ({ id: `open-${s.label}`, label: `Open ${s.label}`, group: 'Links' as const, run: () => openExternal(s.href) })),
    ],
    [],
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-xl bg-lime px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Backdrop />
      <Navbar onOpenPalette={openPalette} />

      <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
        <div id="top" />
        <Hero />
        <TechBands />
        <About />
        <Experience />
        <Work />
        <Stack />
        <Awards />
        <Contact />
      </main>

      <Footer onOpenPalette={openPalette} />
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
    </>
  );
}
