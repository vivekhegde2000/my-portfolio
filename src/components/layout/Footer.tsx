import { profile, socials } from '../../data/portfolio';
import { isApplePlatform } from '../../lib/navigation';
import { Icon } from '../ui/Icon';

interface FooterProps {
  onOpenPalette: () => void;
}

export function Footer({ onOpenPalette }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="container-page relative z-[1] flex flex-col gap-6 border-t border-line pt-10 pb-12 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {year} {profile.name}. Built with React, TypeScript, Tailwind &amp; three.js.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={onOpenPalette} className="inline-flex items-center gap-1.5 hover:text-fg">
          Press <kbd className="rounded-md border border-line-strong px-1.5 py-0.5 font-mono text-[11px]">{isApplePlatform() ? '⌘K' : 'Ctrl K'}</kbd>
        </button>
        <ul className="flex gap-3" aria-label="Social links">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                className="hover:text-fg"
                {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon name={s.icon} size={16} />
              </a>
            </li>
          ))}
        </ul>
        <a href="#top" className="inline-flex items-center gap-1 hover:text-fg">
          Back to top <Icon name="arrow-up-right" size={14} className="-rotate-45" />
        </a>
      </div>
    </footer>
  );
}
