import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { profile } from '../data/portfolio';
import { CONTACT_FORM_NAME, submitContact, validateContact, type ContactErrors, type ContactValues } from '../lib/contactForm';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useMagnetic } from '../hooks/usePointerEffects';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: ContactValues = { name: '', email: '', message: '', botField: '' };

export function Contact() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copyState, copy] = useCopyToClipboard();
  const submitRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  useMagnetic(submitRef, 0.2);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof ContactErrors]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as (keyof ContactErrors)[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      await submitContact(values);
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  const field = (name: keyof ContactErrors) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-error` : undefined,
    className: 'field mt-1.5',
  });

  const fieldError = (name: keyof ContactErrors) =>
    errors[name] ? (
      <span id={`${uid}-${name}-error`} className="mt-1 block text-[13px] text-pink">
        {errors[name]}
      </span>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page scroll-mt-24 pt-28 pb-20 sm:pt-36">
      <Reveal className="relative grid gap-10 overflow-hidden rounded-[32px] border border-line-strong bg-ink-2 bg-[radial-gradient(60%_80%_at_0%_0%,rgb(139_92_246/0.28),transparent_60%),radial-gradient(50%_70%_at_100%_100%,rgb(34_211_238/0.18),transparent_60%)] p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-16">
        <div className="min-w-0">
          <p className="eyebrow mb-3.5 inline-flex items-center gap-2 text-muted">
            <span aria-hidden="true" className="block h-0.5 w-[18px] bg-lime" />
            06 · Contact
          </p>
          <h2
            id="contact-title"
            className="font-display text-[clamp(52px,8.5vw,128px)] leading-[0.85] font-extrabold tracking-[-0.07em] uppercase"
          >
            <span className="text-outline">Let's</span>
            <br />
            <span className="text-gradient">talk.</span>
          </h2>
          <p className="mt-5 max-w-[380px] text-muted">
            Open to frontend and full‑stack roles. Drop a message or copy my email — I reply within a day.
          </p>
          <button
            type="button"
            onClick={() => copy(profile.email)}
            className="mt-7 inline-flex min-h-12 max-w-full items-center gap-3 rounded-2xl border border-line-strong bg-ink/60 px-4 font-mono text-sm transition-colors hover:border-lime"
          >
            <span className="min-w-0 truncate">{profile.email}</span>
            <span className="inline-flex shrink-0 items-center gap-1 text-lime">
              <Icon name={copyState === 'copied' ? 'check' : 'copy'} size={15} />
              {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Press Ctrl+C' : 'Copy'}
            </span>
          </button>
          <span className="sr-only" aria-live="polite">
            {copyState === 'copied' ? 'Email address copied to clipboard' : ''}
          </span>
        </div>

        <form
          ref={formRef}
          name={CONTACT_FORM_NAME}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          noValidate
          onSubmit={onSubmit}
          className="grid min-w-0 content-start gap-3.5"
          aria-describedby={`${uid}-status`}
        >
          <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
          {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
          <p className="hidden" aria-hidden="true">
            <label>
              Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" value={values.botField} onChange={(e) => setValues((v) => ({ ...v, botField: e.target.value }))} />
            </label>
          </p>

          <label htmlFor={`${uid}-name`} className="text-[13px] text-muted">
            Your name
            <input {...field('name')} type="text" autoComplete="name" required />
            {fieldError('name')}
          </label>
          <label htmlFor={`${uid}-email`} className="text-[13px] text-muted">
            Email
            <input {...field('email')} type="email" autoComplete="email" inputMode="email" required />
            {fieldError('email')}
          </label>
          <label htmlFor={`${uid}-message`} className="text-[13px] text-muted">
            Message
            <textarea {...field('message')} rows={4} required className="field mt-1.5 min-h-[120px] resize-y" />
            {fieldError('message')}
          </label>

          <button ref={submitRef} type="submit" disabled={status === 'submitting'} className="btn btn-primary mt-1 disabled:cursor-progress disabled:opacity-70">
            {status === 'submitting' ? 'Sending…' : 'Send message'} <Icon name="send" size={16} />
          </button>

          <p id={`${uid}-status`} role="status" className="min-h-5 text-sm">
            {status === 'success' && <span className="text-lime">Thanks! Your message is on its way — I’ll get back to you soon.</span>}
            {status === 'error' && (
              <span className="text-pink">
                Something went wrong sending that.{' '}
                <a className="underline underline-offset-4" href={`mailto:${profile.email}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${encodeURIComponent(values.message)}`}>
                  Email me directly instead
                </a>
                .
              </span>
            )}
          </p>
        </form>
      </Reveal>
    </section>
  );
}
