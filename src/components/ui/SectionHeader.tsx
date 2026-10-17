import type { ReactNode } from 'react';
import type { Accent } from '../../types/portfolio';
import { accentColor } from '../../lib/accent';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  accent: Accent;
  title: ReactNode;
  description?: ReactNode;
  headingId: string;
}

export function SectionHeader({ index, eyebrow, accent, title, description, headingId }: SectionHeaderProps) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
      <div>
        <p className="eyebrow mb-3.5 inline-flex items-center gap-2 text-muted">
          <span aria-hidden="true" className="block h-0.5 w-[18px]" style={{ background: accentColor[accent] }} />
          {index} · {eyebrow}
        </p>
        <h2 id={headingId} className="font-display text-[clamp(30px,4.6vw,60px)] leading-none font-bold tracking-[-0.045em]">
          {title}
        </h2>
      </div>
      {description && <p className="max-w-sm text-muted">{description}</p>}
    </Reveal>
  );
}
