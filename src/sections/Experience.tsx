import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { careerPath, contributionCategories, contributions, experience } from '../data/portfolio';
import { accentColor, accentStyle } from '../lib/accent';
import { renderEmphasis } from '../lib/emphasis';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import type { ContributionCategory } from '../types/portfolio';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

type Filter = 'all' | ContributionCategory;

/** Career path whose line draws itself (and lights each step) as it scrolls into view. */
function CareerPath() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>('.path-node'));
    const apply = (p: number) => {
      el.style.setProperty('--p', String(p));
      nodes.forEach((node, i) => node.classList.toggle('is-lit', p > 0 && p >= i / Math.max(nodes.length - 1, 1) - 0.001));
    };
    if (reduced) {
      apply(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      apply(Math.min(Math.max((vh * 0.85 - top) / (vh * 0.45), 0), 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  return (
    <ol ref={ref} aria-label="Career progression" className="relative mt-6 mb-9 grid gap-7 md:grid-cols-3 md:gap-4">
      <li aria-hidden="true" className="path-track" />
      <li aria-hidden="true" className="path-fill" />
      {careerPath.map((step) => (
        <li key={step.id} className="path-node relative pl-10 md:pt-[58px] md:pl-0" style={accentStyle(step.accent)}>
          <p className="eyebrow" style={{ color: accentColor[step.accent] }}>
            {step.eyebrow}
          </p>
          <h3 className="font-display mt-1.5 text-[clamp(20px,2.3vw,32px)] font-bold tracking-[-0.04em]">{step.title}</h3>
          <p className="mt-1 text-muted">{step.caption}</p>
        </li>
      ))}
    </ol>
  );
}

function Contributions() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = useMemo(
    () => (filter === 'all' ? contributions : contributions.filter((c) => c.category === filter)),
    [filter],
  );
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: contributions.length },
    ...(Object.keys(contributionCategories) as ContributionCategory[]).map((id) => ({
      id,
      label: contributionCategories[id].label,
      count: contributions.filter((c) => c.category === id).length,
    })),
  ];

  return (
    <>
      <Reveal className="mt-2 mb-4.5 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Key contributions</h3>
        <div role="group" aria-label="Filter contributions" className="flex flex-wrap gap-1.5">
          {filters.map((f) => {
            const accent = f.id === 'all' ? 'var(--color-fg)' : accentColor[contributionCategories[f.id].accent];
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                style={{ '--c': accent } as CSSProperties}
                className="group inline-flex min-h-9 items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3.5 text-[13px] text-muted transition-colors hover:border-[var(--c)] hover:text-fg aria-pressed:border-[var(--c)] aria-pressed:bg-[var(--c)] aria-pressed:text-ink"
              >
                {f.id !== 'all' && <span aria-hidden="true" className="block size-2 rounded-full bg-[var(--c)] group-aria-pressed:bg-ink" />}
                {f.label}
                <span className="font-mono text-[11px] text-dim group-aria-pressed:text-ink">{f.count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {contributions.length} contributions
      </p>

      <ol aria-label="Key contributions" className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => {
          const category = contributionCategories[item.category];
          const number = String(contributions.indexOf(item) + 1).padStart(2, '0');
          return (
            <li
              key={`${filter}-${item.id}`}
              className={`card contribution p-5.5 ${item.wide ? 'lg:col-span-2' : ''}`}
              style={{ ...accentStyle(category.accent), '--glow': `color-mix(in srgb, ${accentColor[category.accent]} 22%, transparent)` } as CSSProperties}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-[26px] font-extrabold tracking-[-0.05em]" style={{ color: accentColor[category.accent] }}>
                  {number}
                </span>
                <span
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-[0.06em] uppercase"
                  style={{ color: accentColor[category.accent], borderColor: `color-mix(in srgb, ${accentColor[category.accent]} 45%, transparent)` }}
                >
                  {item.label ?? category.label}
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-body">{renderEmphasis(item.text)}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="container-page scroll-mt-24 pt-24 sm:pt-30">
      <SectionHeader
        index="02"
        eyebrow="Experience"
        accent="cyan"
        headingId="experience-title"
        title={
          <>
            The <span className="text-outline">path</span> so far
          </>
        }
        description={`${experience.company} · ${experience.location} · ${experience.period}`}
      />
      <CareerPath />
      <Contributions />
    </section>
  );
}
