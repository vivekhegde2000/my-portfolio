import { useRef } from 'react';
import { caseStudies, moreProjects, sideProjects } from '../data/portfolio';
import { accentColor, accentStyle } from '../lib/accent';
import { useTilt } from '../hooks/usePointerEffects';
import type { CaseStudy, SideProject } from '../types/portfolio';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

function CaseStudyCard({ study, delay }: { study: CaseStudy; delay: number }) {
  const color = accentColor[study.accent];
  return (
    <Reveal as="article" delay={delay} className="card tint flex min-h-[340px] flex-col" style={accentStyle(study.accent)} aria-labelledby={`${study.id}-title`}>
      <p className="eyebrow" style={{ color }}>
        {study.kind}
      </p>
      <h3 id={`${study.id}-title`} className="font-display mt-3.5 mb-1 text-[clamp(22px,2.6vw,34px)] font-bold tracking-[-0.04em]">
        {study.title}
      </h3>
      <dl className="my-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[15px]">
        <dt className="eyebrow pt-0.5 text-[11px] text-dim">Problem</dt>
        <dd className="text-body">{study.problem}</dd>
        <dt className="eyebrow pt-0.5 text-[11px] text-dim">Role</dt>
        <dd className="text-body">{study.role}</dd>
        <dt className="eyebrow pt-0.5 text-[11px] text-dim">Stack</dt>
        <dd className="text-body">{study.stack.join(' · ')}</dd>
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-dashed border-line-strong pt-4" aria-label={`Structure: ${study.diagram.root} with ${study.diagram.nodes.join(', ')}`} role="img">
        <span className="rounded-lg border bg-ink/50 px-2.5 py-1.5 font-mono text-xs" style={{ color, borderColor: `color-mix(in srgb, ${color} 60%, transparent)` }}>
          {study.diagram.root}
        </span>
        <span className="text-dim">→</span>
        {study.diagram.nodes.map((node) => (
          <span key={node} className="rounded-lg border border-line-strong bg-ink/50 px-2.5 py-1.5 font-mono text-xs text-muted">
            {node}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

function SideProjectCard({ project, delay }: { project: SideProject; delay: number }) {
  const ref = useRef<HTMLElement>(null);
  useTilt(ref, { max: 9 });
  const host = new URL(project.liveUrl).host;
  return (
    <Reveal delay={delay} className="[perspective:1200px]">
      <article
        ref={ref}
        className="tilt-card group relative overflow-hidden rounded-[20px] border border-line bg-ink-2"
        style={accentStyle(project.accent)}
      >
        <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5" aria-hidden="true">
          <i className="block size-2.5 rounded-full bg-[#ff5f57]" />
          <i className="block size-2.5 rounded-full bg-[#febc2e]" />
          <i className="block size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2.5 truncate font-mono text-[11px] text-dim">{host}</span>
        </div>
        <div className="aspect-[16/10] overflow-hidden bg-white">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={960}
            height={600}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="px-4.5 pt-4 pb-5">
          <h4 className="text-lg font-semibold">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:content-['']">
              {project.title}
              <span className="sr-only"> (opens live demo in a new tab)</span>
            </a>
          </h4>
          <p className="mt-1 text-sm text-muted">{project.description}</p>
          <div className="mt-3 flex gap-4 text-sm" style={{ color: accentColor[project.accent] }}>
            <span aria-hidden="true" className="inline-flex items-center gap-1">
              Live <Icon name="arrow-up-right" size={14} />
            </span>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 underline-offset-4 hover:underline"
            >
              Code <Icon name="arrow-up-right" size={14} />
              <span className="sr-only"> for {project.title} on GitHub</span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="container-page scroll-mt-24 pt-24 sm:pt-30">
      <SectionHeader
        index="03"
        eyebrow="Work"
        accent="lime"
        headingId="work-title"
        title={
          <>
            Selected <span className="text-outline">work</span>
          </>
        }
        description="Platform work at NSP, plus things I build for fun."
      />

      <div className="grid gap-3.5 md:grid-cols-2">
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} delay={i * 80} />
        ))}
      </div>

      <Reveal as="ul" className="mt-3.5 overflow-hidden rounded-[22px] border border-line" aria-label="More work at NSP">
        {moreProjects.map((project) => (
          <li
            key={project.id}
            className="fill-row relative grid items-center gap-x-4.5 gap-y-1 border-t border-line px-5 py-5.5 transition-colors duration-300 first:border-t-0 sm:grid-cols-[60px_minmax(0,1fr)_auto] sm:px-6 sm:py-6.5"
            style={accentStyle(project.accent)}
          >
            <span className="fill-row-muted relative hidden font-mono text-dim sm:block">{project.index}</span>
            <div className="relative">
              <h3 className="font-display text-[clamp(20px,2.6vw,32px)] font-bold tracking-[-0.04em]">{project.title}</h3>
              <p className="fill-row-muted text-sm text-muted">{project.description}</p>
            </div>
            <span className="fill-row-muted eyebrow relative text-muted">{project.tag}</span>
          </li>
        ))}
      </Reveal>

      <h3 className="sr-only">Side projects</h3>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sideProjects.map((project, i) => (
          <SideProjectCard key={project.id} project={project} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
