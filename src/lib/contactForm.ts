/** Name of the Netlify form. Must match the hidden form in index.html. */
export const CONTACT_FORM_NAME = 'contact';

export interface ContactValues {
  name: string;
  email: string;
  message: string;
  /** Honeypot — real users never fill this in. */
  botField: string;
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}

export function encodeForm(data: Record<string, string>): string {
  return new URLSearchParams(data).toString();
}

/**
 * Submits to Netlify Forms (https://docs.netlify.com/forms/setup/).
 * Throws on network or non-2xx responses so the UI can show a fallback.
 */
export async function submitContact(values: ContactValues, fetchImpl: typeof fetch = fetch): Promise<void> {
  const response = await fetchImpl('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm({
      'form-name': CONTACT_FORM_NAME,
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      'bot-field': values.botField,
    }),
  });
  if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);
}
