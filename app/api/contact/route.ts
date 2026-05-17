import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { supabase } from "@/lib/supabase";

const SG_KEY   = process.env.SENDGRID_API_KEY    ?? "";
const FROM     = process.env.SENDGRID_FROM_EMAIL ?? "hello@susea.ai";
const TEAM     = process.env.CONTACT_TO_EMAIL    ?? "hello@susea.ai";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://susea.ai").replace(/\/$/, "");

if (SG_KEY) sgMail.setApiKey(SG_KEY);

interface ContactPayload {
  name:      string;
  email:     string;
  company?:  string;
  country?:  string;
  industry?: string;
  service?:  string;
  message:   string;
  referral?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const name  = body.name.trim();
    const email = body.email.trim();

    // ── Team notification ─────────────────────────────────────────────────────
    const rows = [
      ["Name",     name],
      ["Email",    email],
      ["Company",  body.company  ?? "—"],
      ["Country",  body.country  ?? "—"],
      ["Industry", body.industry ?? "—"],
      ["Service",  body.service  ?? "—"],
      ["Referral", body.referral ?? "—"],
    ].map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:700;color:#555;border-bottom:1px solid #eee;white-space:nowrap;">${k}</td><td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee;">${v}</td></tr>`).join("");

    const teamHtml = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f2f2f5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2f2f5">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,0.08);">
      <tr><td bgcolor="#0f1629" style="padding:28px 40px;">
        <span style="color:#6BA3E8;font-size:22px;font-weight:800;font-family:Arial,sans-serif;">Susea.ai</span>
      </td></tr>
      <tr><td style="padding:40px 40px 32px;">
        <h2 style="margin:0 0 20px;font-size:18px;font-weight:800;color:#0f1629;">New contact form submission</h2>
        <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e8e8ec;border-radius:8px;overflow:hidden;font-size:14px;margin-bottom:24px;">
          ${rows}
        </table>
        <p style="margin:0 0 8px;font-weight:700;font-size:14px;color:#555;">Message:</p>
        <p style="margin:0;padding:16px;background:#f8f8fb;border-radius:8px;font-size:14px;color:#222;line-height:1.7;">${body.message.trim()}</p>
      </td></tr>
      <tr><td bgcolor="#f2f2f5" style="padding:20px 40px;border-top:1px solid #e4e4e8;text-align:center;">
        <p style="color:#aaa;font-size:12px;margin:0;">&copy; 2026 Susea.ai &middot; <a href="${SITE_URL}" style="color:#6BA3E8;text-decoration:none;">susea.ai</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

    // ── Auto-reply to sender ──────────────────────────────────────────────────
    const replyHtml = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f2f2f5;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2f2f5">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,0.08);">
      <tr><td bgcolor="#0f1629" style="padding:28px 40px;">
        <span style="color:#6BA3E8;font-size:22px;font-weight:800;font-family:Arial,sans-serif;">Susea.ai</span>
      </td></tr>
      <tr><td style="padding:40px 40px 32px;color:#1a1a2e;font-size:15px;line-height:1.7;">
        <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0f1629;">Got it, ${name} 👋</h2>
        <p style="margin:0 0 16px;color:#444;">Thanks for reaching out. One of our team members will be in touch within one business day.</p>
        <p style="margin:0 0 24px;color:#444;">In the meantime, you might find these useful:</p>
        <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
          <tr>
            <td style="padding:12px;background:#f8f8fb;border-radius:8px;font-size:13px;">
              <a href="${SITE_URL}/resources/ai-readiness-scorecard" style="color:#2B5BA8;font-weight:700;text-decoration:none;">AI Readiness Scorecard →</a>
              <br><span style="color:#666;">Know where you stand before our call.</span>
            </td>
          </tr>
          <tr><td style="height:8px;"></td></tr>
          <tr>
            <td style="padding:12px;background:#f8f8fb;border-radius:8px;font-size:13px;">
              <a href="${SITE_URL}/resources/playbooks" style="color:#2B5BA8;font-weight:700;text-decoration:none;">Free AI Playbooks →</a>
              <br><span style="color:#666;">Step-by-step guides from 200+ deployments.</span>
            </td>
          </tr>
        </table>
        <p style="color:#aaa;font-size:13px;margin:0;">— The Susea.ai team</p>
      </td></tr>
      <tr><td bgcolor="#f2f2f5" style="padding:20px 40px;border-top:1px solid #e4e4e8;text-align:center;">
        <p style="color:#aaa;font-size:12px;margin:0;">&copy; 2026 Susea.ai &middot; <a href="${SITE_URL}" style="color:#6BA3E8;text-decoration:none;">susea.ai</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

    // Persist lead to Supabase
    if (supabase) {
      const { error } = await supabase.from("contacts").insert({
        name,
        email,
        company:  body.company  ?? null,
        country:  body.country  ?? null,
        industry: body.industry ?? null,
        service:  body.service  ?? null,
        message:  body.message.trim(),
        referral: body.referral ?? null,
      });
      if (error) console.error("[contact] Supabase insert failed:", error.message);
    } else {
      console.warn("[contact] Supabase not configured — lead not persisted.");
    }

    if (SG_KEY) {
      await Promise.all([
        sgMail.send({
          to: TEAM, from: FROM,
          subject: `New enquiry from ${name}`,
          html: teamHtml,
        }),
        sgMail.send({
          to: email, from: FROM,
          subject: "We got your message — Susea.ai",
          html: replyHtml,
        }),
      ]).catch(err => console.error("[contact] SendGrid failed:", err));
    } else {
      console.warn("[contact] SENDGRID_API_KEY not set — email skipped.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
