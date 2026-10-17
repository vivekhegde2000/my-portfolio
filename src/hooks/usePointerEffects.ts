import { useEffect, type RefObject } from 'react';
import { useFinePointer, usePrefersReducedMotion } from './useMediaQuery';

/**
 * One delegated listener drives the cursor glow on every `.card`
 * (cheaper than a listener per card, and works for cards rendered later).
 */
export function useSpotlight(): void {
  const fine = useFinePointer();
  useEffect(() => {
    if (!fine) return;
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>('.card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--y', `${event.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, [fine]);
}

interface TiltOptions {
  /** Max rotation in degrees. */
  max?: number;
  /** Also expose pointer position as --mx/--my (for holographic foil). */
  trackPointer?: boolean;
}

/** 3D tilt towards the pointer via --rx/--ry. Disabled on touch and for reduced motion. */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, { max = 10, trackPointer = false }: TiltOptions = {}): void {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      el.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
      el.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
      if (trackPointer) {
        el.style.setProperty('--mx', `${x * 100}%`);
        el.style.setProperty('--my', `${y * 100}%`);
      }
    };
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      onLeave();
    };
  }, [ref, fine, reduced, max, trackPointer]);
}

/** Element drifts slightly towards the pointer while hovered. */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.3): void {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced) return;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) * strength;
      const dy = (event.clientY - rect.top - rect.height / 2) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      onLeave();
    };
  }, [ref, fine, reduced, strength]);
}
