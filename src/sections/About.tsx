import { useRef } from 'react';
import { exploring, profile, stats } from '../data/portfolio';
import { accentColor, accentStyle } from '../lib/accent';
import { useClock } from '../hooks/useClock';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import type { Stat } from '../types/portfolio';
import { Reveal } from '../components/ui/Reveal';
import { ScrollLitText } from '../components/ui/ScrollLitText';
import { SectionHeader } from '../components/ui/SectionHeader';

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.6 });
  const value = useCountUp(stat.value, inView);
  const done = value === stat.value;
  return (
    <Reveal delay={delay} className="card tint" style={accentStyle(stat.accent)}>
      <p className="eyebrow" style={{ color: accentColor[stat.accent] }}>
        {stat.eyebrow}
      </p>
      <div
        ref={ref}
        className={`font-display mt-4.5 text-[clamp(44px,5vw,58px)] leading-none font-extrabold tracking-[-0.06em] ${stat.accent === 'cyan' ? 'text-gradient' : ''}`}
        style={stat.accent === 'cyan' ? undefined : { color: accentColor[stat.accent] }}
      >
        <span aria-hidden="true">
          {value}
          {done && stat.suffix}
        </span>
        <span className="sr-only">
          {stat.value}
          {stat.suffix}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">{stat.caption}</p>
    </Reveal>
  );
}

export function About() {
  const time = useClock(profile.timeZone);

  return (
    <section id="about" aria-labelledby="about-title" className="container-page scroll-mt-24 pt-24 sm:pt-30">
      <SectionHeader
        index="01"
        eyebrow="About"
        accent="violet"
        headingId="about-title"
        title={
          <>
            At a <span className="text-outline">glance</span>
          </>
        }
        description="The short version, in one card."
      />

      <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-2 gap-3.5 lg:grid-cols-4">
        <Reveal className="card tint col-span-2 flex flex-col justify-between gap-6 lg:row-span-2" style={accentStyle('violet')}>
          <p className="eyebrow text-violet-soft">Who I am</p>
          <ScrollLitText
            text={profile.bio}
            className="font-display text-[clamp(19px,2vw,27px)] leading-[1.3] font-medium tracking-[-0.025em]"
          />
          <ul className="flex flex-wrap gap-1.5" aria-label="Education and languages">
            <li className="tag">{profile.education}</li>
            <li className="tag">{profile.languages.join(' · ')}</li>
          </ul>
        </Reveal>

        {stats.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} delay={(i + 1) * 70} />
        ))}

        <Reveal delay={210} className="card tint" style={accentStyle('pink')}>
          <p className="eyebrow text-pink">Local time</p>
          <p className="mt-4 font-mono text-[clamp(26px,3vw,32px)]">
            <time>{time}</time>
          </p>
          <p className="mt-2 text-sm text-muted">IST · {profile.location}</p>
        </Reveal>

        <Reveal delay={280} className="card">
          <p className="eyebrow text-muted">Exploring now</p>
          <p className="mt-3.5 font-semibold">{exploring.title}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies I'm exploring">
            {exploring.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
