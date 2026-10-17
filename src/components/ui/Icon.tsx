import type { ReactElement, SVGProps } from 'react';
import type { IconName } from '../../types/portfolio';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const paths: Record<IconName, ReactElement> = {
  linkedin: (
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.3 22 14.7V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21h-4V9Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
    />
  ),
  mail: (
    <g {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </g>
  ),
  download: <path {...stroke} d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />,
  'arrow-right': <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-up-right': <path {...stroke} d="M7 17 17 7M8 7h9v9" />,
  star: <path {...stroke} d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z" />,
  users: <path {...stroke} d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20a6 6 0 0 1 12 0m-2 0a6 6 0 0 1 10 0" />,
  trophy: <path {...stroke} d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v1a3 3 0 0 0 3 3m10-4h3v1a3 3 0 0 1-3 3" />,
  'grad-cap': <path {...stroke} d="m2 9 10-5 10 5-10 5L2 9Zm4 2.2V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8M22 9v6" />,
  menu: <path {...stroke} d="M4 7h16M4 12h16M4 17h16" />,
  close: <path {...stroke} d="M6 6l12 12M18 6 6 18" />,
  copy: (
    <g {...stroke}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </g>
  ),
  check: <path {...stroke} d="m5 12 5 5L20 7" />,
  command: <path {...stroke} d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" />,
  send: <path {...stroke} d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />,
};

/** Decorative by default (aria-hidden). Pass `aria-label` + `role="img"` when the icon carries meaning on its own. */
export function Icon({ name, size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...rest}>
      {paths[name]}
    </svg>
  );
}
