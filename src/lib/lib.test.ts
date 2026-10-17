import { describe, expect, it, vi } from 'vitest';
import { encodeForm, submitContact, validateContact, type ContactValues } from './contactForm';
import { parseEmphasis } from './emphasis';

const valid: ContactValues = { name: 'Ada', email: 'ada@example.com', message: 'Hello there, nice work!', botField: '' };

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('flags each invalid field', () => {
    expect(validateContact({ name: ' ', email: 'nope', message: 'short', botField: '' })).toEqual({
      name: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
    });
  });
});

describe('submitContact', () => {
  it('posts URL-encoded data with the Netlify form name', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    await submitContact(valid, fetchMock as unknown as typeof fetch);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/');
    expect(init.method).toBe('POST');
    const body = new URLSearchParams(init.body);
    expect(body.get('form-name')).toBe('contact');
    expect(body.get('email')).toBe('ada@example.com');
  });

  it('throws on a non-2xx response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 404 });
    await expect(submitContact(valid, fetchMock as unknown as typeof fetch)).rejects.toThrow(/404/);
  });

  it('encodes special characters', () => {
    expect(encodeForm({ a: 'x & y' })).toBe('a=x+%26+y');
  });
});

describe('parseEmphasis', () => {
  it('splits bold markers into segments', () => {
    expect(parseEmphasis('a **b** c')).toEqual([
      { text: 'a ', emphasis: false },
      { text: 'b', emphasis: true },
      { text: ' c', emphasis: false },
    ]);
  });

  it('leaves unclosed markers as plain text', () => {
    expect(parseEmphasis('a **b')).toEqual([{ text: 'a **b', emphasis: false }]);
  });
});
