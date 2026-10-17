import type { CSSProperties } from 'react';
import type { Accent } from '../types/portfolio';

/** CSS colour token for each brand accent. */
export const accentColor: Record<Accent, string> = {
  violet: 'var(--color-violet-soft)',
  cyan: 'var(--color-cyan)',
  lime: 'var(--color-lime)',
  pink: 'var(--color-pink)',
  amber: 'var(--color-amber)',
};

/** Inline style that exposes an accent as the `--c` custom property used by `.tint`, `.card`, etc. */
export const accentStyle = (accent: Accent): CSSProperties => ({ '--c': accentColor[accent] }) as CSSProperties;
