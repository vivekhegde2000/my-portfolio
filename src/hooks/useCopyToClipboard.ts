import { useCallback, useEffect, useRef, useState } from 'react';

type CopyState = 'idle' | 'copied' | 'error';

/** Copies text and reports the outcome for ~1.8s so the UI can confirm it. */
export function useCopyToClipboard(resetMs = 1800): [CopyState, (text: string) => Promise<void>] {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(text);
        setState('copied');
      } catch {
        setState('error');
      }
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState('idle'), resetMs);
    },
    [resetMs],
  );

  return [state, copy];
}
