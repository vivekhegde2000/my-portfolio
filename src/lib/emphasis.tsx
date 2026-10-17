import type { ReactNode } from 'react';

export interface Segment {
  text: string;
  emphasis: boolean;
}

/** Splits `"plain **bold** plain"` into segments. Unclosed markers are treated as plain text. */
export function parseEmphasis(input: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) segments.push({ text: input.slice(last, start), emphasis: false });
    segments.push({ text: match[1], emphasis: true });
    last = start + match[0].length;
  }
  if (last < input.length) segments.push({ text: input.slice(last), emphasis: false });
  return segments;
}

/** Renders `**bold**` markers as <strong> elements. */
export function renderEmphasis(input: string, strongClassName = 'font-semibold text-fg'): ReactNode {
  return parseEmphasis(input).map((segment, i) =>
    segment.emphasis ? (
      <strong key={i} className={strongClassName}>
        {segment.text}
      </strong>
    ) : (
      segment.text
    ),
  );
}
