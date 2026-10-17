import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useScrollLock } from '../../hooks/useScrollLock';

export interface Command {
  id: string;
  label: string;
  group: 'Navigate' | 'Actions' | 'Links';
  keywords?: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  commands: Command[];
}

/** Accessible ⌘K / Ctrl+K command menu (combobox + listbox pattern). */
export function CommandPalette({ open, onClose, commands }: CommandPaletteProps) {
  useScrollLock(open);
  if (!open) return null;
  return <PaletteDialog onClose={onClose} commands={commands} />;
}

function PaletteDialog({ onClose, commands }: Omit<CommandPaletteProps, 'open'>) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Focus the input on open; restore focus to the trigger on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (command: Command | undefined) => {
    if (!command) return;
    onClose();
    // Let the dialog unmount (and scroll lock release) before navigating.
    window.setTimeout(command.run, 0);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive((i) => (results.length ? (i + 1) % results.length : 0));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(Math.max(results.length - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        run(results[active]);
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Single focusable control — keep focus inside the dialog.
        event.preventDefault();
        break;
    }
  };

  const optionId = (i: number) => `${listId}-opt-${i}`;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-start justify-center bg-[rgb(5_5_15/0.6)] px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="animate-sheet-in w-full max-w-[560px] overflow-hidden rounded-[18px] border border-line-strong bg-ink-2 shadow-[0_30px_90px_rgb(0_0_0/0.6)]"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results.length ? optionId(active) : undefined}
          aria-autocomplete="list"
          placeholder="Type a command or search…"
          className="w-full border-b border-line bg-transparent px-5 py-4.5 text-base text-fg outline-none placeholder:text-dim"
        />
        <ul ref={listRef} id={listId} role="listbox" aria-label="Commands" className="max-h-[min(360px,55vh)] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3.5 py-6 text-center text-sm text-muted">No results for “{query}”</li>}
          {results.map((command, i) => {
            const header = i === 0 || results[i - 1].group !== command.group ? command.group : null;
            return (
              <li key={command.id} role="presentation">
                {header && (
                  <p aria-hidden="true" className="eyebrow px-3.5 pt-2.5 pb-1.5 text-[10px] text-dim">
                    {header}
                  </p>
                )}
                <div
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(command)}
                  className="flex cursor-pointer items-center justify-between rounded-[10px] px-3.5 py-3 text-[15px] aria-selected:bg-violet/15"
                >
                  {command.label}
                  {i === active && (
                    <span aria-hidden="true" className="font-mono text-xs text-dim">
                      ↵
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="flex gap-4 border-t border-line px-5 py-2.5 font-mono text-[11px] text-dim" aria-hidden="true">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </p>
      </div>
    </div>
  );
}
