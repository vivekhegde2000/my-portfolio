import { useRef } from 'react';
import { profile } from '../../data/portfolio';
import { useClock } from '../../hooks/useClock';
import { useTilt } from '../../hooks/usePointerEffects';

/** Profile photo as a tilting holographic card. */
export function HoloCard() {
  const ref = useRef<HTMLDivElement>(null);
  const time = useClock(profile.timeZone);
  useTilt(ref, { max: 18, trackPointer: true });

  return (
    <div className="[perspective:1000px]">
      <div ref={ref} className="holo-card">
        <img
          src={profile.photo.src}
          srcSet={profile.photo.srcSet}
          sizes="(min-width: 1024px) 280px, 250px"
          width={profile.photo.width}
          height={profile.photo.height}
          alt={profile.photo.alt}
          fetchPriority="high"
          decoding="async"
          className="block size-full object-cover object-[50%_18%]"
        />
        <div className="holo-foil" aria-hidden="true" />
        <div className="holo-sheen" aria-hidden="true" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-2xl border border-white/15 bg-ink/60 px-3.5 py-3 backdrop-blur-md">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold">{profile.name}</p>
            <p className="eyebrow truncate text-[10px] text-muted">{profile.role}</p>
          </div>
          <p className="eyebrow shrink-0 text-lime">
            <span className="sr-only">Local time in Bengaluru: </span>
            {time} IST
          </p>
        </div>
      </div>
    </div>
  );
}
