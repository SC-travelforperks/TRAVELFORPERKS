import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ipStore = new Map<string, { count: number; resetAt: number }>();

interface EnquiryFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

function parseRecipientList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function buildEmailHtml(fields: EnquiryFields): string {
  const rows = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Phone / WhatsApp", fields.phone],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;background:#f7f2eb;font-weight:600;color:#7c5c45;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 16px;color:#2f2a26;font-size:14px;vertical-align:top;">${escapeHtml(value || "-")}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f4ee;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border:1px solid #eadfd2;box-shadow:0 6px 24px rgba(47,42,38,0.08);">
    <div style="padding:28px 32px;border-bottom:1px solid #eadfd2;background:#f5ede3;">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#8c745f;">New Enquiry</p>
      <h1 style="margin:0;font-size:28px;font-weight:600;color:#2f2a26;font-family:'Cormorant Garamond',Georgia,serif;">Travel For Perks</h1>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 24px;font-size:15px;color:#6b625a;line-height:1.7;">
        Someone just submitted an enquiry through the website. Here are the details:
      </p>

      <table style="width:100%;border-collapse:collapse;border:1px solid #eadfd2;">
        ${tableRows}
      </table>

      <div style="margin-top:24px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#8c745f;">Trip Notes</p>
        <div style="padding:16px;background:#fcfaf7;border:1px solid #eadfd2;font-size:14px;color:#2f2a26;line-height:1.7;white-space:pre-wrap;">${escapeHtml(fields.message)}</div>
      </div>

      <div style="margin-top:24px;padding:18px;background:#fcfaf7;border-left:4px solid #b8895a;">
        <p style="margin:0;font-size:13px;color:#6b625a;">
          Reply directly to this email to respond to <strong style="color:#2f2a26;">${escapeHtml(fields.name)}</strong>.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries. Please wait 15 minutes before trying again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const fields: EnquiryFields = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  const missing = (["name", "email", "phone", "message"] as const).filter(
    (key) => !fields[key]
  );

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  if (fields.name.length < 2) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 422 });
  }

  if (!EMAIL_REGEX.test(fields.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const clientEmails = parseRecipientList(process.env.CLIENT_EMAIL);
  const fromEmail = process.env.FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resendApiKey) {
    console.error("[Enquiry] RESEND_API_KEY env var not set");
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please contact us directly." },
      { status: 503 }
    );
  }

  if (clientEmails.length === 0) {
    console.error("[Enquiry] CLIENT_EMAIL env var not set");
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please contact us directly." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: `Travel For Perks Enquiries <${fromEmail}>`,
      to: clientEmails,
      replyTo: fields.email,
      subject: `New Enquiry from ${fields.name}`,
      html: buildEmailHtml(fields),
    });

    if (error) {
      console.error("[Enquiry] Resend API error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send your enquiry. Please try again or contact us directly." },
        { status: 502 }
      );
    }

    console.info("[Enquiry] Email sent", {
      emailId: data?.id ?? null,
      recipients: clientEmails,
    });
  } catch (error) {
    console.error("[Enquiry] Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send your enquiry. Please try again or contact us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
