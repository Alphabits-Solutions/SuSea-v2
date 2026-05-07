import { NextResponse } from "next/server";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import sgMail from "@sendgrid/mail";

// ── Config ────────────────────────────────────────────────────────────────────

const SG_KEY   = process.env.SENDGRID_API_KEY      ?? "";
const FROM     = process.env.SENDGRID_FROM_EMAIL   ?? "hello@susea.ai";
const TEAM     = process.env.CONTACT_TO_EMAIL      ?? "hello@susea.ai";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://susea.ai").replace(/\/$/, "");

if (SG_KEY) sgMail.setApiKey(SG_KEY);

// ── PDF map ───────────────────────────────────────────────────────────────────

const PLAYBOOK_PDFS: Record<string, string> = {
  "7 Questions to Ask Before Hiring an AI Agency": "/resources/playbook-7-questions-hiring-ai-agency.pdf",
  "From Vibe Code to Production":                  "/resources/playbook-vibe-code-to-production.pdf",
  "The $200K AI Mistake Report":                   "/resources/playbook-200k-ai-mistake-report.pdf",
  "The 4-Week AI MVP Playbook":                    "/resources/playbook-4-week-ai-mvp.pdf",
};

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LeadPayload {
  email:     string;
  fname?:    string;
  lname?:    string;
  company?:  string;
  role?:     string;
  source:    string;
  score?:    number;
  playbook?: string;
}

interface StoredLead extends LeadPayload {
  id:         number;
  capturedAt: string;
}

// ── Email helpers ─────────────────────────────────────────────────────────────

function shell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f2f2f5;font-family:-apple-system,Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f2f2f5">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,0.08);">
      <!-- Header -->
      <tr>
        <td bgcolor="#0f1629" style="padding:28px 40px;">
          <span style="color:#6BA3E8;font-size:22px;font-weight:800;letter-spacing:-0.5px;font-family:Arial,sans-serif;">Susea.ai</span>
        </td>
      </tr>
      <!-- Body -->
      <tr><td style="padding:40px 40px 32px;color:#1a1a2e;font-size:15px;line-height:1.7;">
        ${content}
      </td></tr>
      <!-- Footer -->
      <tr>
        <td bgcolor="#f2f2f5" style="padding:20px 40px;border-top:1px solid #e4e4e8;text-align:center;">
          <p style="color:#aaa;font-size:12px;margin:0;line-height:1.6;">
            You received this because you submitted your email on
            <a href="${SITE_URL}" style="color:#6BA3E8;text-decoration:none;">susea.ai</a>.
            &nbsp;|&nbsp; &copy; 2026 Susea.ai
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function btn(url: string, label: string, bg = "#2B5BA8"): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
  <tr>
    <td bgcolor="${bg}" style="border-radius:9px;">
      <a href="${url}" style="display:block;padding:14px 30px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;font-family:Arial,sans-serif;">${label} →</a>
    </td>
  </tr>
</table>`;
}

function divider(): string {
  return `<div style="border-top:1px solid #e8e8ec;margin:28px 0;"></div>`;
}

// ── Per-source user emails ────────────────────────────────────────────────────

function buildUserEmail(lead: StoredLead): { subject: string; html: string } | null {
  const name   = lead.fname ? `, ${lead.fname}` : "";
  const ctaUrl = `${SITE_URL}/contact`;

  switch (lead.source) {

    case "AI_Readiness_Report": {
      const pdfUrl = `${SITE_URL}/reports/susea-ai-readiness-report.pdf`;
      return {
        subject: "Your AI Readiness Report — Susea.ai",
        html: shell(`
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0f1629;">Your AI Readiness Report is here${name} 📄</h2>
          <p style="margin:0 0 16px;color:#444;">Thanks for requesting the Susea.ai AI Readiness Report. Your 14-page PDF covers:</p>
          <ul style="margin:0 0 24px;padding-left:20px;color:#444;">
            <li style="margin-bottom:8px;">Overall readiness score across 4 dimensions</li>
            <li style="margin-bottom:8px;">AI use case prioritisation matrix</li>
            <li style="margin-bottom:8px;">3-phase implementation roadmap</li>
            <li style="margin-bottom:8px;">Investment estimates &amp; ROI projections</li>
          </ul>
          ${btn(pdfUrl, "Download Your 14-Page Report")}
          ${divider()}
          <p style="margin:0 0 8px;color:#444;font-size:14px;">Want a personalised assessment for your specific business?</p>
          ${btn(ctaUrl, "Book a Free 20-Minute Strategy Call", "#E8650A")}
          <p style="color:#aaa;font-size:12px;margin:16px 0 0;">Free &middot; 20 minutes &middot; No pitch &middot; Talk directly with an AI engineer</p>
        `),
      };
    }

    case "Playbooks": {
      if (!lead.playbook) return null;
      const pdfPath = PLAYBOOK_PDFS[lead.playbook];
      if (!pdfPath) return null;
      return {
        subject: `Your Playbook: ${lead.playbook} — Susea.ai`,
        html: shell(`
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0f1629;">Your playbook is ready${name} 📖</h2>
          <p style="margin:0 0 8px;color:#444;">Here's the playbook you requested:</p>
          <p style="margin:0 0 24px;font-size:16px;font-weight:700;color:#2B5BA8;">${lead.playbook}</p>
          ${btn(`${SITE_URL}${pdfPath}`, "Download Your Free Playbook")}
          ${divider()}
          <p style="margin:0 0 4px;color:#666;font-size:13px;">Browse all four AI playbooks:</p>
          <p style="margin:0 0 24px;"><a href="${SITE_URL}/resources/playbooks" style="color:#6BA3E8;font-size:13px;">susea.ai/resources/playbooks</a></p>
          <p style="margin:0 0 8px;color:#444;font-size:14px;">Want a custom playbook or hands-on help rolling out AI?</p>
          ${btn(ctaUrl, "Book a Free Strategy Call", "#E8650A")}
        `),
      };
    }

    case "AI_Agent_Diagnostic": {
      const scoreText = lead.score !== undefined ? `<p style="margin:0 0 24px;color:#444;">Your AI Agent Health Score: <strong style="font-size:28px;color:${lead.score >= 75 ? "#2dd4a0" : lead.score >= 50 ? "#f5c842" : "#f05252"};">${lead.score}<span style="font-size:16px;color:#aaa;">/100</span></strong></p>` : "";
      return {
        subject: "Your AI Agent Diagnostic Results — Susea.ai",
        html: shell(`
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0f1629;">Your diagnostic results${name} 🔍</h2>
          <p style="margin:0 0 16px;color:#444;">Thanks for completing the Susea.ai AI Agent Diagnostic. Here's a summary of your results:</p>
          ${scoreText}
          <p style="margin:0 0 24px;color:#444;">Your full report — including flagged issues by category and severity — is available on the diagnostic page.</p>
          ${btn(`${SITE_URL}/resources/ai-agent-diagnostic`, "View Full Diagnostic Results")}
          ${divider()}
          <p style="margin:0 0 8px;color:#444;font-size:14px;">Want our engineers to walk through your specific failure points?</p>
          ${btn(ctaUrl, "Book a Free AI Agent Audit", "#E8650A")}
          <p style="color:#aaa;font-size:12px;margin:16px 0 0;">Free &middot; 15 minutes &middot; Talk directly with an AI engineer</p>
        `),
      };
    }

    case "AI_Readiness_Scorecard": {
      const scoreText = lead.score !== undefined ? `<p style="margin:0 0 24px;color:#444;">Your AI Readiness Score: <strong style="font-size:28px;color:${lead.score >= 75 ? "#2dd4a0" : lead.score >= 50 ? "#f5c842" : "#f05252"};">${lead.score}<span style="font-size:16px;color:#aaa;">/100</span></strong></p>` : "";
      const roleLabel = lead.role === "cto" ? "CTO / Technical Leader" : lead.role === "smb" ? "SMB Owner" : "";
      return {
        subject: "Your AI Readiness Score — Susea.ai",
        html: shell(`
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0f1629;">Your AI readiness score is in${name} 📊</h2>
          ${roleLabel ? `<p style="margin:0 0 16px;color:#666;font-size:13px;">Path: ${roleLabel}</p>` : ""}
          ${scoreText}
          <p style="margin:0 0 24px;color:#444;">Your full results — including your score breakdown across all four dimensions and your priority action recommendations — are available on the scorecard page.</p>
          ${btn(`${SITE_URL}/resources/ai-readiness-scorecard`, "View Full Scorecard Results")}
          ${divider()}
          <p style="margin:0 0 8px;color:#444;font-size:14px;">Want our AI strategy team to walk through a customised implementation roadmap?</p>
          ${btn(ctaUrl, "Book a Free Strategy Call", "#E8650A")}
          <p style="color:#aaa;font-size:12px;margin:16px 0 0;">Free &middot; 20 minutes &middot; No obligation</p>
        `),
      };
    }

    case "Playbooks_Notify": {
      return {
        subject: "You're on the Susea.ai playbooks list ✅",
        html: shell(`
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0f1629;">You're on the list${name}!</h2>
          <p style="margin:0 0 24px;color:#444;">We'll email you as soon as new playbooks drop — including our upcoming guides on HIPAA-safe AI, compliance-first FinTech, and scaling AI operations.</p>
          <p style="margin:0 0 8px;color:#444;font-size:14px;">In the meantime, check out the four playbooks already available:</p>
          ${btn(`${SITE_URL}/resources/playbooks`, "Browse Current Playbooks")}
        `),
      };
    }

    default:
      return null;
  }
}

// ── Team notification email ───────────────────────────────────────────────────

function buildTeamEmail(lead: StoredLead): { subject: string; html: string } {
  const rows = [
    ["Source",    lead.source],
    ["Email",     lead.email],
    ["Name",      `${lead.fname ?? ""} ${lead.lname ?? ""}`.trim() || "—"],
    ["Company",   lead.company ?? "—"],
    ["Role",      lead.role    ?? "—"],
    ["Score",     lead.score !== undefined ? String(lead.score) : "—"],
    ["Playbook",  lead.playbook ?? "—"],
    ["Captured",  lead.capturedAt],
  ].map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:700;color:#555;border-bottom:1px solid #eee;white-space:nowrap;">${k}</td><td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee;">${v}</td></tr>`).join("");

  return {
    subject: `New lead [${lead.source}] — ${lead.email}`,
    html: shell(`
      <h2 style="margin:0 0 20px;font-size:18px;font-weight:800;color:#0f1629;">New lead captured</h2>
      <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e8e8ec;border-radius:8px;overflow:hidden;font-size:14px;">
        ${rows}
      </table>
      ${btn(`${SITE_URL}/contact`, "View Dashboard")}
    `),
  };
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    const email = body.email?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (!body.source?.trim()) {
      return NextResponse.json({ error: "Source is required." }, { status: 400 });
    }

    const lead: StoredLead = {
      id:         Date.now(),
      email,
      fname:      body.fname?.trim()   || undefined,
      lname:      body.lname?.trim()   || undefined,
      company:    body.company?.trim() || undefined,
      role:       body.role            || undefined,
      source:     body.source,
      score:      body.score,
      playbook:   body.playbook        || undefined,
      capturedAt: new Date().toISOString(),
    };

    // ── 1. Local file storage ─────────────────────────────────────────────────
    // Writes to data/leads.json (gitignored). Replace with a DB on serverless.
    try {
      const dataDir = join(process.cwd(), "data");
      if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
      const filePath = join(dataDir, "leads.json");
      const existing: StoredLead[] = existsSync(filePath)
        ? (JSON.parse(readFileSync(filePath, "utf-8")) as StoredLead[])
        : [];
      existing.push(lead);
      writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("[capture-lead] File write failed:", fsErr);
    }

    // ── 2. SendGrid emails ────────────────────────────────────────────────────
    if (SG_KEY) {
      const sends: Promise<unknown>[] = [];

      // Email to the lead (send PDF link / results summary)
      const userMail = buildUserEmail(lead);
      if (userMail) {
        sends.push(
          sgMail.send({ to: email, from: FROM, subject: userMail.subject, html: userMail.html })
            .catch(err => console.error("[capture-lead] User email failed:", err))
        );
      }

      // Notification to the team
      const teamMail = buildTeamEmail(lead);
      sends.push(
        sgMail.send({ to: TEAM, from: FROM, subject: teamMail.subject, html: teamMail.html })
          .catch(err => console.error("[capture-lead] Team email failed:", err))
      );

      await Promise.all(sends);
    } else {
      console.warn("[capture-lead] SENDGRID_API_KEY not set — emails skipped.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
