import { awards, education } from '../data/portfolio';
import { accentColor, accentStyle } from '../lib/accent';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

export function Awards() {
  return (
    <section id="awards" aria-labelledby="awards-title" className="container-page scroll-mt-24 pt-24 sm:pt-30">
      <SectionHeader index="05" eyebrow="Recognition" accent="amber" headingId="awards-title" title="Awards & education" />

      <ul className="grid gap-3.5 lg:grid-cols-[1.3fr_1fr_1fr]">
        {awards.map((award, i) => {
          const color = accentColor[award.accent];
          return (
            <Reveal as="li" key={award.id} delay={i * 70} className="card tint" style={accentStyle(award.accent)}>
              {award.figure ? (
                <p className="font-display text-[clamp(64px,7vw,104px)] leading-[0.9] font-extrabold tracking-[-0.07em]" style={{ color }}>
                  {award.figure}
                  <span className="sr-only"> (awarded twice)</span>
                </p>
              ) : (
                <span
                  className="grid size-11 place-items-center rounded-xl"
                  style={{ color, background: `color-mix(in srgb, ${color} 17%, transparent)` }}
                >
                  <Icon name={award.icon} size={22} />
                </span>
              )}
              <h3 className="mt-3.5 mb-1.5 text-[19px] font-semibold">{award.title}</h3>
              <p className="text-sm text-muted">{award.description}</p>
            </Reveal>
          );
        })}
      </ul>

      <Reveal as="h3" className="mt-12 mb-4 text-xl font-semibold">
        Education
      </Reveal>
      <ol className="grid gap-3.5 md:grid-cols-3">
        {education.map((item, i) => (
          <Reveal as="li" key={item.id} delay={i * 70} className="card flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
              <Icon name="grad-cap" size={22} />
            </span>
            <div>
              <p className="eyebrow text-dim">{item.date}</p>
              <h4 className="mt-1 font-semibold leading-snug">{item.degree}</h4>
              <p className="mt-1 text-sm text-muted">
                {item.institution}, {item.location}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
