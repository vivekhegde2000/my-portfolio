import { useEffect, useRef, useState } from 'react';
import { profile, socials } from '../../data/portfolio';
import { useMagnetic } from '../../hooks/usePointerEffects';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { Icon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';
import { HeroVisual } from './HeroVisual';

function RotatingFocus({ words }: { words: string[] }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, words.length]);

  return (
    <span className="inline-block">
      <span key={index} aria-hidden="true" className="text-gradient inline-block font-semibold motion-safe:animate-[word-in_0.5s_var(--ease-out-expo)_both]">
        {words[index]}
      </span>
    </span>
  );
}

export function Hero() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useMagnetic(ctaRef, 0.25);

  return (
    <section aria-labelledby="hero-title" className="container-page">
      <div className="grid min-h-svh items-center gap-6 pt-28 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
        <div>
          {profile.availableForWork && (
            <p className="inline-flex items-center gap-2 rounded-full border border-lime/35 bg-lime/[0.06] py-1.5 pr-3 pl-2.5 text-[13px] text-lime">
              <span aria-hidden="true" className="animate-ping-lime block size-2 rounded-full bg-lime" />
              Open to opportunities
            </p>
          )}

          <h1
            id="hero-title"
            className="font-display mt-6 mb-5 text-[clamp(46px,8vw,104px)] leading-[0.92] font-extrabold tracking-[-0.055em]"
          >
            <span className="rise-line block overflow-hidden pb-[0.04em]">
              <span>{profile.firstName}</span>
            </span>
            <span className="rise-line block overflow-hidden pb-[0.06em]">
              <span className="text-gradient [animation-delay:0.1s]">{profile.lastName}</span>
            </span>
          </h1>

          <Reveal as="p" className="text-[clamp(18px,2vw,24px)] tracking-[-0.01em] text-muted">
            <span className="sr-only">Frontend engineer building {profile.rotatingFocus.join(', ')}.</span>
            <span aria-hidden="true">
              <b className="font-medium text-fg">Frontend engineer</b> building{' '}
            </span>
            <RotatingFocus words={profile.rotatingFocus} />
          </Reveal>

          <Reveal as="p" delay={70} className="mt-5 mb-8 max-w-[520px] text-[17px] text-muted">
            {profile.pitch}
          </Reveal>

          <Reveal delay={140} className="flex flex-wrap gap-3">
            <a ref={ctaRef} href="#work" className="btn btn-primary">
              View my work <Icon name="arrow-right" size={16} />
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener" className="btn btn-ghost">
              <Icon name="download" size={16} /> Resume
            </a>
          </Reveal>

          <Reveal as="ul" delay={210} className="mt-8 flex gap-2.5" aria-label="Social links">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="icon-btn"
                  aria-label={s.label}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon name={s.icon} />
                </a>
              </li>
            ))}
          </Reveal>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
