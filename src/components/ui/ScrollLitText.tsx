import { useEffect, useMemo, useRef } from 'react';
import { parseEmphasis } from '../../lib/emphasis';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

interface ScrollLitTextProps {
  /** Text with optional **highlighted** phrases. */
  text: string;
  className?: string;
  highlightClassName?: string;
}

/**
 * Words light up one by one as the paragraph scrolls through the viewport.
 * Updates classes directly on scroll (rAF-throttled) to avoid re-rendering per frame.
 * Screen readers get the full sentence regardless.
 */
export function ScrollLitText({ text, className = '', highlightClassName = 'text-lime' }: ScrollLitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  const words = useMemo(
    () =>
      parseEmphasis(text).flatMap((segment) =>
        segment.text
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => ({ word, emphasis: segment.emphasis })),
      ),
    [text],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('.lit-word'));
    if (reduced) {
      spans.forEach((span) => span.classList.add('is-lit'));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh * 0.9 - rect.top) / (rect.height + vh * 0.3), 0), 1);
      const litCount = progress * spans.length;
      spans.forEach((span, i) => span.classList.toggle('is-lit', i < litCount));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, words]);

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, emphasis }, i) => (
        <span key={i}>
          <span className={`lit-word ${emphasis ? highlightClassName : ''}`}>{word}</span>{' '}
        </span>
      ))}
    </p>
  );
}
