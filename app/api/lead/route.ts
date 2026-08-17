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

  /* ------------------------------ Deliver via Brevo API */
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (brevoApiKey) {
    try {
      const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_FROM || 'admissions@ega.edu.sg';
      const senderName = process.env.BREVO_SENDER_NAME || 'EGA MBA Portal';
      const toEmail = process.env.BREVO_TO_EMAIL || process.env.EMAIL_TO || 'admissions@ega.edu.sg';

      const emailList = toEmail.split(',').map((e) => ({ email: e.trim() }));

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0C1420; margin: 0; padding: 20px; background-color: #FBF9F5; }
            .card { background: #ffffff; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 28px; border: 1px solid #E3DED4; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            h2 { color: #0C1420; margin-top: 0; font-size: 22px; border-bottom: 2px solid #9A6F28; padding-bottom: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 18px; }
            th, td { text-align: left; padding: 12px 14px; font-size: 14.5px; border-bottom: 1px solid #F0ECE4; }
            th { color: #4E5B6E; font-weight: 600; width: 38%; background-color: #F8F6F0; }
            td { color: #0C1420; font-weight: 500; }
            .badge { display: inline-block; background: #F6EEDF; color: #9A6F28; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 13px; }
            .foot { margin-top: 24px; font-size: 12px; color: #7A8798; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>🎓 New MBA Brochure & Enquiry Lead</h2>
            <table>
              <tr>
                <th>Full Name</th>
                <td><strong>${lead.fullname}</strong></td>
              </tr>
              <tr>
                <th>Email</th>
                <td><a href="mailto:${lead.email}">${lead.email}</a></td>
              </tr>
              <tr>
                <th>Phone</th>
                <td><a href="tel:${lead.dialCode}${lead.mobile}">${lead.dialCode} ${lead.mobile}</a></td>
              </tr>
              <tr>
                <th>Country</th>
                <td>${lead.country}</td>
              </tr>
              <tr>
                <th>Qualification</th>
                <td>${lead.qualification}</td>
              </tr>
              <tr>
                <th>Management Experience</th>
                <td>${lead.experience}</td>
              </tr>
              <tr>
                <th>Study Mode</th>
                <td><span class="badge">${lead.mode}</span></td>
              </tr>
              <tr>
                <th>Submitted At</th>
                <td>${new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' })} (SGT)</td>
              </tr>
            </table>
            <div class="foot">
              Educare Global Academy · Glasgow Caledonian University MBA
            </div>
          </div>
        </body>
        </html>
      `;

      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': brevoApiKey,
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: emailList,
          subject: `🎓 New MBA Brochure Lead: ${lead.fullname}`,
          htmlContent,
        }),
      });

      if (!brevoRes.ok) {
        const errBody = await brevoRes.text();
        console.error('[lead] Brevo API error:', brevoRes.status, errBody);
      } else {
        console.info('[lead] Successfully delivered via Brevo to', toEmail);
      }
    } catch (error) {
      console.error('[lead] Brevo delivery failed:', error);
    }
  }

  /* ------------------------------ Deliver to Google Sheets (Optional) */
  const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (sheetWebhook) {
    try {
      await fetch(sheetWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          phone: `'${lead.dialCode} ${lead.mobile}`,
          submittedAt: new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }),
        }),
        redirect: 'follow',
      });
      console.info('[lead] Successfully logged to Google Sheets');
    } catch (error) {
      console.error('[lead] Google Sheets webhook failed:', error);
    }
  }

  /* ------------------------------ Deliver via Webhook (Optional) */
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
      });
    } catch (error) {
      console.error('[lead] webhook delivery failed', error);
    }
  }

  if (!brevoApiKey && !webhook && !sheetWebhook) {
    console.info('[lead] received (no BREVO_API_KEY, GOOGLE_SHEET_WEBHOOK_URL or LEAD_WEBHOOK_URL set)', {
      fullname: lead.fullname,
      email: lead.email,
      mobile: `${lead.dialCode} ${lead.mobile}`,
    });
  }

  return NextResponse.json({ ok: true });
}
