import { useEffect, useState, type RefObject } from 'react';

interface Options extends IntersectionObserverInit {
  /** Stop observing after the first intersection. Defaults to true. */
  once?: boolean;
}

export function useInView<T extends Element>(ref: RefObject<T | null>, { once = true, ...init }: Options = {}): boolean {
  // Without IntersectionObserver (very old browsers), show content immediately.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');
  const { root, rootMargin, threshold } = init;

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, once, root, rootMargin, threshold]);

  return inView;
}
