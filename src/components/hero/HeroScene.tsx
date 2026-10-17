import { useEffect, useRef, type RefObject } from 'react';
import { PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three';
import { createDotTexture } from './scene/palette';
import { createParticles } from './scene/particles';
import { createOrbit } from './scene/orbit';
import { createPrism } from './scene/prism';
import type { FrameState, SceneContext, SceneController, SceneMode } from './scene/types';

const factories: Record<SceneMode, (ctx: SceneContext) => SceneController> = {
  particles: createParticles,
  orbit: createOrbit,
  prism: createPrism,
};

const WIDE_QUERY = '(min-width: 1024px)';

interface Runtime {
  renderer: WebGLRenderer;
  ctx: SceneContext;
  controller: SceneController | null;
  frame: FrameState;
  wide: boolean;
  render: () => void;
}

interface HeroSceneProps {
  mode: SceneMode;
  reducedMotion: boolean;
  labelLayerRef: RefObject<HTMLDivElement | null>;
  onError: () => void;
}

/**
 * Owns the WebGL renderer for the hero. Loaded lazily (three.js lives in its own chunk).
 * - Renders only while on screen and while the tab is visible.
 * - With reduced motion: a single still frame, re-rendered on resize / mode change.
 */
export default function HeroScene({ mode, reducedMotion, labelLayerRef, onError }: HeroSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<Runtime | null>(null);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  // Renderer lifecycle — created once per mount.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      onErrorRef.current();
      return;
    }

    const lowPower = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 10.5);
    const dot = createDotTexture();

    const frame: FrameState = { time: 2, pointer: { x: 0, y: 0 }, ndc: null, width: 1, height: 1 };
    const runtime: Runtime = {
      renderer,
      ctx: { scene, camera, dot, labelLayer: labelLayerRef.current, quality: lowPower ? 'low' : 'high' },
      controller: null,
      frame,
      wide: window.matchMedia(WIDE_QUERY).matches,
      render: () => {
        runtime.controller?.update(frame);
        renderer.render(scene, camera);
      },
    };
    runtimeRef.current = runtime;

    const resize = () => {
      const width = canvas.clientWidth || 1;
      const height = canvas.clientHeight || 1;
      frame.width = width;
      frame.height = height;
      runtime.wide = window.matchMedia(WIDE_QUERY).matches;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      runtime.controller?.layout(width, height, runtime.wide);
      if (reducedMotion) runtime.render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    // Pointer tracking (skipped for reduced motion — the scene stays still).
    const target = { x: 0, y: 0 };
    const ndc = new Vector2();
    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.y = (event.clientY / window.innerHeight) * 2 - 1;
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      frame.ndc = Math.abs(x) <= 1 && Math.abs(y) <= 1 ? ndc.set(x, y) : null;
    };
    const onPointerLeave = () => {
      frame.ndc = null;
    };

    // Animation loop, paused off-screen / in background tabs.
    let raf = 0;
    let onScreen = true;
    const start = performance.now();
    const loop = (now: number) => {
      frame.time = (now - start) / 1000;
      frame.pointer.x += (target.x - frame.pointer.x) * 0.05;
      frame.pointer.y += (target.y - frame.pointer.y) * 0.05;
      runtime.render();
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? pause() : play());
    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) play();
      else pause();
    });

    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
      document.addEventListener('visibilitychange', onVisibility);
      intersection.observe(canvas);
      play();
    }

    return () => {
      pause();
      intersection.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      runtime.controller?.dispose();
      runtime.controller = null;
      dot.dispose();
      renderer.dispose();
      runtimeRef.current = null;
    };
  }, [reducedMotion, labelLayerRef]);

  // Scene swap — reuses the renderer.
  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    runtime.controller?.dispose();
    try {
      runtime.controller = factories[mode](runtime.ctx);
      runtime.controller.layout(runtime.frame.width, runtime.frame.height, runtime.wide);
      runtime.render();
    } catch {
      runtime.controller = null;
      onErrorRef.current();
    }
  }, [mode, reducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 block size-full" aria-hidden="true" />;
}
