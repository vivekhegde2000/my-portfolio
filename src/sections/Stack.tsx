import { skillGroups } from '../data/portfolio';
import { accentColor, accentStyle } from '../lib/accent';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="container-page scroll-mt-24 pt-24 sm:pt-30">
      <SectionHeader
        index="04"
        eyebrow="Stack"
        accent="pink"
        headingId="stack-title"
        title={
          <>
            My <span className="text-outline">toolkit</span>
          </>
        }
        description="What I reach for, grouped by job."
      />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 70} className="card" style={accentStyle(group.accent)}>
            <h3 className="mb-4 flex items-center gap-2.5 font-semibold">
              <span aria-hidden="true" className="block size-2.5 rounded-[3px]" style={{ background: accentColor[group.accent] }} />
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-line-strong px-3 py-1.5 text-sm text-[#d4d7ee] transition hover:-translate-y-0.5 hover:border-[var(--c)] hover:bg-[var(--c)] hover:text-ink"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
