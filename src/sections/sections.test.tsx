import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from './Contact';
import { Experience } from './Experience';

describe('Contact form', () => {
  it('shows validation errors and does not submit invalid input', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<Contact />);
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('submits to Netlify and confirms success', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));
    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText(/^email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Would love to chat about a role.');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/your message is on its way/i)).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  it('offers an email fallback when sending fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 500 }));
    render(<Contact />);
    await userEvent.type(screen.getByLabelText(/your name/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/^email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.');
    await userEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('link', { name: /email me directly/i })).toHaveAttribute('href', expect.stringMatching(/^mailto:/));
  });
});

describe('Experience contributions', () => {
  it('lists all nine highlights and filters by category', async () => {
    render(<Experience />);
    const list = screen.getByRole('list', { name: /key contributions/i });
    expect(within(list).getAllByRole('listitem')).toHaveLength(9);

    await userEvent.click(screen.getByRole('button', { name: /leadership/i }));
    expect(screen.getByRole('button', { name: /leadership/i })).toHaveAttribute('aria-pressed', 'true');
    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText(/showing 2 of 9 contributions/i)).toBeInTheDocument();
  });
});
