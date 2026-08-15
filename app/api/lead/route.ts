import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export type Lead = {
  fullname: string;
  email: string;
  dialCode: string;
  country: string;
  mobile: string;
  qualification: string;
  experience: string;
  mode: string;
  consent: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: Record<string, unknown>): { lead?: Lead; errors: string[] } {
  const errors: string[] = [];
  const str = (key: string) => String(body[key] ?? '').trim();

  const fullname = str('fullname');
  const email = str('email');
  const mobile = str('mobile');
  const dialCode = str('dialCode') || '+65';
  const country = str('country') || 'SG';
  const qualification = str('qualification');
  const experience = str('experience');
  const mode = str('mode');
  const consent = body.consent === true || body.consent === 'yes' || body.consent === 'on';

  if (!fullname) errors.push('fullname');
  if (!email || !EMAIL_RE.test(email)) errors.push('email');
  if (!/^[0-9\s-]{6,20}$/.test(mobile)) errors.push('mobile');
  if (!qualification) errors.push('qualification');
  if (!experience) errors.push('experience');
  if (!mode) errors.push('mode');
  if (!consent) errors.push('consent');

  if (errors.length > 0) return { errors };

  return {
    errors,
    lead: {
      fullname,
      email,
      dialCode,
      country,
      mobile,
      qualification,
      experience,
      mode,
      consent,
    },
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { lead, errors } = validate(body);

  if (!lead) {
    return NextResponse.json({ ok: false, fields: errors }, { status: 422 });
  }

  /*
   * TODO — EGA: deliver the lead. Replace this block with whichever you use:
   *
   *   HubSpot   POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
   *   Zoho CRM  POST https://www.zohoapis.com/crm/v5/Leads          (Bearer token)
   *   Webhook   POST process.env.LEAD_WEBHOOK_URL
   *   Email     Resend / SendGrid to admissions@ega.edu.sg
   *
   * Keep credentials in environment variables — never in client components.
   * See .env.example.
   */
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      });
    } catch (error) {
      // Never fail the visitor's submission because a downstream system is down.
      console.error('[lead] webhook delivery failed', error);
    }
  } else {
    console.info('[lead] received (no LEAD_WEBHOOK_URL configured)', {
      email: lead.email,
      country: lead.country,
    });
  }

  return NextResponse.json({ ok: true });
}
