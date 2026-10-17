import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// WebGL isn't available in jsdom — swap the lazy 3D scene for a stub.
vi.mock('./components/hero/HeroScene', () => ({ default: () => <div data-testid="hero-scene" /> }));

describe('App', () => {
  it('renders every main section with a heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /vivek\s*hegde/i })).toBeInTheDocument();
    for (const name of [/at a glance/i, /the path so far/i, /selected work/i, /my toolkit/i, /awards & education/i, /let.?s\s*talk/i]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });

  it('opens the command palette with Ctrl+K and runs a command', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.keyboard('{Control>}k{/Control}');
    const input = screen.getByRole('combobox');
    expect(input).toHaveFocus();

    await user.type(input, 'resume');
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent(/open resume/i);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /command menu/i })).not.toBeInTheDocument();
  });

  it('opens the mobile menu as a dialog', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('dialog', { name: /site menu/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('dialog', { name: /site menu/i })).not.toBeInTheDocument();
  });
});
