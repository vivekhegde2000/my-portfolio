import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

/** Counts from 0 to `target` once `start` becomes true (jumps straight to it for reduced motion). */
export function useCountUp(target: number, start: boolean, durationMs = 900): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || reduced) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, durationMs, reduced]);

  if (reduced) return start ? target : 0;
  return value;
}
