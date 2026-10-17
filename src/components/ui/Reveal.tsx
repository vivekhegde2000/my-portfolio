import { useRef, type CSSProperties, type ElementType, type HTMLAttributes } from 'react';
import { useInView } from '../../hooks/useInView';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Stagger delay in ms. */
  delay?: number;
}

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as: Tag = 'div', className = '', style, delay = 0, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.12 });
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ ...style, '--delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
