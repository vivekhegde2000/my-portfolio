import { CanvasTexture, Color } from 'three';

/** Brand colours, kept in sync with the @theme tokens in styles/index.css. */
export const palette = {
  violet: new Color('#8b5cf6'),
  violetSoft: new Color('#b9a4ff'),
  cyan: new Color('#22d3ee'),
  lime: new Color('#d4ff3a'),
  pink: new Color('#f472b6'),
} as const;

/** Radial-gradient sprite so points render as soft glowing dots instead of squares. */
export function createDotTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.85)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new CanvasTexture(canvas);
}
