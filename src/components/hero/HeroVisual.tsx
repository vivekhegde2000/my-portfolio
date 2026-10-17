import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { heroChips } from '../../data/portfolio';
import { accentColor } from '../../lib/accent';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { HoloCard } from './HoloCard';
import { SCENE_MODES, type SceneMode } from './scene/types';

const HeroScene = lazy(() => import('./HeroScene'));

const STORAGE_KEY = 'vh:scene-mode';

function readStoredMode(): SceneMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SCENE_MODES.some((m) => m.id === stored)) return stored as SceneMode;
  } catch {
    /* storage unavailable (private mode etc.) */
  }
  return 'particles';
}

const chipPositions = ['top-[12%] left-0', 'top-1/2 right-0', 'bottom-[8%] right-[6%]'];

export function HeroVisual() {
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<SceneMode>(readStoredMode);
  const [webglFailed, setWebglFailed] = useState(false);
  const labelLayerRef = useRef<HTMLDivElement>(null);
  const handleError = useCallback(() => setWebglFailed(true), []);

  const selectMode = (next: SceneMode) => {
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const orbit = mode === 'orbit' && !webglFailed;

  return (
    <div className="relative h-[460px] sm:h-[540px] lg:h-[min(640px,80vh)] lg:min-h-[520px]">
      {webglFailed ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(40%_45%_at_60%_40%,rgb(139_92_246/0.45),transparent_70%),radial-gradient(28%_32%_at_70%_35%,rgb(34_211_238/0.35),transparent_70%)]"
        />
      ) : (
        <ErrorBoundary fallback={null} onError={handleError}>
          <Suspense fallback={null}>
            <HeroScene mode={mode} reducedMotion={reducedMotion} labelLayerRef={labelLayerRef} onError={handleError} />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Orbit labels are injected here by the scene. No z-index, so labels can layer around the card. */}
      <div ref={labelLayerRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />

      {!webglFailed && (
        <div
          role="group"
          aria-label="3D style"
          className="absolute top-0 right-0 z-[6] flex items-center gap-0.5 rounded-full border border-line-strong bg-ink-2/80 p-1 backdrop-blur-md"
        >
          <span className="eyebrow hidden px-2.5 text-[10px] text-dim sm:inline">3D style</span>
          {SCENE_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => selectMode(m.id)}
              className="min-h-8 rounded-full px-3 text-xs text-muted transition-colors hover:text-fg aria-pressed:bg-fg aria-pressed:text-ink"
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <ul aria-label="Core technologies" className="contents">
        {heroChips.map((chip, i) => (
          <li
            key={chip.label}
            className={`float-chip pill absolute z-[3] hidden px-3.5 py-2 sm:inline-flex ${chipPositions[i]} ${orbit ? 'pointer-events-none opacity-0' : ''}`}
            style={{ animationDelay: `${-i * 2}s` }}
          >
            <span aria-hidden="true" className="block size-2 rounded-full" style={{ background: accentColor[chip.accent] }} />
            {chip.label}
          </li>
        ))}
      </ul>

      <div
        className={`absolute z-[2] w-[min(58%,250px)] transition-[left,bottom,translate] duration-700 ease-out-expo lg:w-[min(48%,280px)] ${
          orbit ? 'bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2' : 'bottom-[3%] left-1/2 -translate-x-1/2 lg:left-[4%] lg:translate-x-0'
        }`}
      >
        <HoloCard />
      </div>
    </div>
  );
}
