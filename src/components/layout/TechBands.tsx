import { techBands } from '../../data/portfolio';

function BandText({ items }: { items: string[] }) {
  const text = items.map((item) => `${item} ✦ `).join('');
  // Rendered twice so the -50% marquee loops seamlessly.
  return (
    <>
      <span className="pr-8">{text}</span>
      <span className="pr-8">{text}</span>
    </>
  );
}

/** Two crossing marquee bands of the tech stack (decorative; the Stack section lists it accessibly). */
export function TechBands() {
  const [first, second] = techBands;
  return (
    <div aria-hidden="true" className="relative h-[150px] overflow-hidden sm:h-[200px]">
      <div className="absolute top-9 -left-[5%] z-[2] w-[110%] -rotate-[2.5deg] overflow-hidden bg-lime py-3 whitespace-nowrap text-ink sm:top-12 sm:py-3.5">
        <div className="band-track font-display text-[clamp(18px,2.6vw,34px)] font-bold uppercase">
          <BandText items={first} />
        </div>
      </div>
      <div className="absolute top-[70px] -left-[5%] w-[110%] rotate-2 overflow-hidden bg-[linear-gradient(90deg,var(--color-violet),#6d4be0)] py-3 whitespace-nowrap text-white sm:top-[92px] sm:py-3.5">
        <div className="band-track reverse font-display text-[clamp(18px,2.6vw,34px)] font-bold uppercase">
          <BandText items={second} />
        </div>
      </div>
    </div>
  );
}
