import type { PerspectiveCamera, Scene, Texture, Vector2 } from 'three';

export type SceneMode = 'particles' | 'orbit' | 'prism';

export const SCENE_MODES: { id: SceneMode; label: string }[] = [
  { id: 'particles', label: 'Particles' },
  { id: 'orbit', label: 'Orbit' },
  { id: 'prism', label: 'Prism' },
];

export interface SceneContext {
  scene: Scene;
  camera: PerspectiveCamera;
  /** Soft round sprite used for glowing points. */
  dot: Texture;
  /** HTML overlay for labels that track 3D positions. */
  labelLayer: HTMLElement | null;
  quality: 'high' | 'low';
}

export interface FrameState {
  /** Seconds since start (frozen when reduced motion is on). */
  time: number;
  /** Smoothed pointer position over the window, -1..1. */
  pointer: { x: number; y: number };
  /** Pointer in canvas NDC, or null when the pointer is outside the canvas. */
  ndc: Vector2 | null;
  width: number;
  height: number;
}

export interface SceneController {
  /** Called on mount and on every resize. */
  layout(width: number, height: number, wide: boolean): void;
  update(frame: FrameState): void;
  dispose(): void;
}

/** Scales the scene down on narrow canvases so nothing is clipped at the edges. */
export const fitScale = (width: number, height: number) => Math.min(1, width / height / 0.95);
