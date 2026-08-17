'use client';

import { useState, type FormEvent } from 'react';
import { FORM_OPTIONS } from '@/lib/content';
import PhoneField from './PhoneField';
import { CheckCircle } from './Icons';

type Errors = Partial<Record<'fullname' | 'email' | 'mobile' | 'qualification' | 'experience' | 'mode' | 'consent', boolean>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    if (!String(data.get('fullname') ?? '').trim()) next.fullname = true;
    const email = String(data.get('email') ?? '').trim();
    if (!email || !EMAIL_RE.test(email)) next.email = true;
    if (!String(data.get('mobile') ?? '').trim()) next.mobile = true;
    if (!data.get('qualification')) next.qualification = true;
    if (!data.get('experience')) next.experience = true;
    if (!data.get('mode')) next.mode = true;
    if (!data.get('consent')) next.consent = true;

    setFailed(false);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const payload = Object.fromEntries(data.entries());
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, consent: true }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { fields?: string[] } | null;
        if (result?.fields?.length) {
          const serverErrors: Errors = {};
          result.fields.forEach((field) => {
            serverErrors[field as keyof Errors] = true;
          });
          setErrors(serverErrors);
        } else {
          setFailed(true);
        }
        return;
      }

      // Track conversions across Google Ads, Meta Pixel, and LinkedIn
      if (typeof window !== 'undefined') {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18043790314/ok_WCJDlmpAcEOrH-ZtD',
          });
        }
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'EGA_Register');
          window.fbq('track', 'Lead');
        }
        if (typeof window.lintrk === 'function') {
          window.lintrk('track', { conversion_id: 26855090 });
        }
      }

      setSent(true);
    } catch {
      // Network failure — tell the visitor rather than silently doing nothing.
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  const invalid = (key: keyof Errors) => (errors[key] ? 'true' : undefined);
  const errorStyle = (key: keyof Errors) =>
    errors[key] ? { borderColor: '#C0492F' } : undefined;

  if (sent) {
    return (
      <div className="form-card" id="brochure">
        <div className="form-done" style={{ display: 'block' }}>
          <CheckCircle />
          <h3>On its way.</h3>
          <p>
            Check your inbox for the brochure, module descriptors and the full fee schedule. If it
            hasn&apos;t arrived in five minutes, please look in your spam folder or call us on +65
            8899 6180.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card" id="brochure">
      <h2>Get the brochure, module list and full fee schedule.</h2>

      <form onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="fname">Full name</label>
          <input
            id="fname"
            name="fullname"
            type="text"
            autoComplete="name"
            placeholder="e.g. Tan Wei Ming"
            aria-invalid={invalid('fullname')}
            style={errorStyle('fullname')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={invalid('email')}
            style={errorStyle('email')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="mobile">Mobile</label>
          <PhoneField />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="qual">Highest qualification</label>
            <select
              id="qual"
              name="qualification"
              defaultValue=""
              aria-invalid={invalid('qualification')}
              style={errorStyle('qualification')}
              required
            >
              <option value="">Select</option>
              {FORM_OPTIONS.qualification.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="exp">Work experience</label>
            <select
              id="exp"
              name="experience"
              defaultValue=""
              aria-invalid={invalid('experience')}
              style={errorStyle('experience')}
              required
            >
              <option value="">Select</option>
              {FORM_OPTIONS.experience.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="mode">Preferred study mode</label>
          <select
            id="mode"
            name="mode"
            defaultValue=""
            aria-invalid={invalid('mode')}
            style={errorStyle('mode')}
            required
          >
            <option value="">Select</option>
            {FORM_OPTIONS.mode.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <label className="consent">
          <input type="checkbox" name="consent" value="yes" aria-invalid={invalid('consent')} required />
          <span style={errors.consent ? { color: '#C0492F' } : undefined}>
            I agree to Educare Global Academy contacting me about this programme, and to the{' '}
            <a href="/privacy" style={{ color: 'var(--brass)' }}>
              privacy policy
            </a>
            .
          </span>
        </label>

        <button className="btn btn-brass btn-lg btn-block" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send me the brochure & fees'}
        </button>
        {failed ? (
          <p className="form-note" role="alert" style={{ color: '#C0492F' }}>
            Something went wrong sending that. Please try again, or call us on {'+65 8899 6180'}.
          </p>
        ) : (
          <p className="form-note">Takes about 30 seconds. No obligation.</p>
        )}
      </form>
    </div>
  );
}
