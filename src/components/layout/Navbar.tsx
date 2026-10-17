import { useCallback, useEffect, useRef, useState } from 'react';
import { navItems, profile } from '../../data/portfolio';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useScrollLock } from '../../hooks/useScrollLock';
import { isApplePlatform, scrollToSection } from '../../lib/navigation';
import { Icon } from '../ui/Icon';

interface NavbarProps {
  onOpenPalette: () => void;
}

const sectionIds = navItems.map((item) => item.id);

export function Navbar({ onOpenPalette }: NavbarProps) {
  const active = useScrollSpy(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const shortcut = isApplePlatform() ? '⌘K' : 'Ctrl K';

  return (
    <header>
      <nav
        aria-label="Primary"
        className="fixed top-3 left-1/2 z-40 flex w-[calc(100%-2rem)] -translate-x-1/2 md:w-auto items-center justify-between gap-0.5 rounded-full border border-line-strong bg-ink-2/70 p-1.5 shadow-[0_10px_40px_rgb(0_0_0/0.35)] backdrop-blur-xl sm:top-4"
      >
        <a href="#top" className="font-display text-gradient rounded-full px-3.5 py-2 text-[15px] font-extrabold" aria-label={`${profile.name} — back to top`}>
          VH
        </a>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className="rounded-full px-3 py-2 text-sm whitespace-nowrap text-muted transition-colors hover:bg-white/[0.07] hover:text-fg aria-[current]:bg-white/[0.07] aria-[current]:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command menu"
            aria-keyshortcuts="Control+K Meta+K"
            className="hidden min-h-9 items-center rounded-full border border-line-strong px-3 font-mono text-xs whitespace-nowrap text-muted transition-colors hover:border-violet-soft hover:text-fg md:inline-flex"
          >
            {shortcut}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-white/[0.07] md:hidden"
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </nav>

      {menuOpen && <MobileMenu active={active} onClose={closeMenu} onOpenPalette={onOpenPalette} />}
    </header>
  );
}

interface MobileMenuProps {
  active: string | null;
  onClose: () => void;
  onOpenPalette: () => void;
}

function MobileMenu({ active, onClose, onOpenPalette }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(true);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab' && panelRef.current) {
        // Keep focus inside the menu.
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="animate-fade-in fixed inset-0 z-50 bg-[rgb(5_5_15/0.7)] backdrop-blur-sm md:hidden" onClick={onClose}>
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-in absolute inset-x-3 top-3 rounded-3xl border border-line-strong bg-ink-2 p-3 shadow-[0_30px_90px_rgb(0_0_0/0.6)]"
      >
        <div className="flex items-center justify-between pb-2 pl-3.5">
          <span className="font-display text-gradient text-[15px] font-extrabold">VH</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center rounded-full hover:bg-white/[0.07]">
            <Icon name="close" size={20} />
          </button>
        </div>
        <ul className="grid gap-1">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                  // Wait for the menu to unmount and release the scroll lock.
                  window.setTimeout(() => scrollToSection(item.id), 0);
                }}
                aria-current={active === item.id ? 'true' : undefined}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-bold tracking-[-0.03em] hover:bg-white/[0.05] aria-[current]:bg-white/[0.07]"
              >
                {item.label}
                <span className="font-mono text-xs font-normal text-dim">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
          <a href={profile.resumeUrl} target="_blank" rel="noopener" className="btn btn-ghost min-h-11 text-sm">
            <Icon name="download" size={16} /> Resume
          </a>
          <button
            type="button"
            className="btn btn-ghost min-h-11 text-sm"
            onClick={() => {
              onClose();
              onOpenPalette();
            }}
          >
            <Icon name="command" size={16} /> Commands
          </button>
        </div>
      </div>
    </div>
  );
}
