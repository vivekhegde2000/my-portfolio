import { useSyncExternalStore } from 'react';

const canMatch = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function';

export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (!canMatch()) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => (canMatch() ? window.matchMedia(query).matches : serverFallback),
    () => serverFallback,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** True for mouse / trackpad users — pointer-driven effects (tilt, magnetic) are skipped on touch. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
