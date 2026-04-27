import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Susea.ai collects, uses, and protects your personal data. GDPR and CCPA compliant.",
  path: "/privacy-policy",
});

const LAST_UPDATED = "April 27, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <div className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full border border-outline-variant/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
          Legal
        </span>
        <h1 className="text-5xl font-headline font-extrabold tracking-tighter text-on-surface mb-4">
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant font-mono text-sm">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="space-y-12 text-on-surface-variant leading-relaxed">

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">1. Introduction</h2>
          <p>
            Susea.ai (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and safeguard information when you visit our website (susea.ai) or engage our services. It applies to all users globally, with specific provisions for residents of the European Union (&ldquo;GDPR&rdquo;) and California (&ldquo;CCPA&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">2. Data We Collect</h2>
          <p className="mb-3">We may collect the following categories of personal data:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-on-surface">Contact data:</strong> Name, email address, company name, phone number — when you fill in our contact form or book a call.</li>
            <li><strong className="text-on-surface">Usage data:</strong> IP address, browser type, pages visited, and time spent — collected automatically via server logs and analytics tools.</li>
            <li><strong className="text-on-surface">Communications:</strong> Content of messages you send us via email or web forms.</li>
            <li><strong className="text-on-surface">Project data:</strong> Information you share during an active engagement, which may include business data. This is governed separately by a Data Processing Agreement.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">3. How We Use Your Data</h2>
          <p className="mb-3">We use personal data to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to enquiries and deliver contracted services.</li>
            <li>Send transactional communications (invoices, project updates, meeting confirmations).</li>
            <li>Improve our website, services, and security through aggregated analytics.</li>
            <li>Comply with legal obligations.</li>
            <li>Send marketing emails where you have given explicit consent (you may unsubscribe at any time).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">4. Data Sharing</h2>
          <p className="mb-3">We do not sell your personal data. We may share it with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-on-surface">Service providers:</strong> Hosting, analytics, and CRM tools operating under data processing agreements.</li>
            <li><strong className="text-on-surface">Legal authorities:</strong> Where required by law, court order, or government request.</li>
            <li><strong className="text-on-surface">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to you.</li>
          </ul>
          <p className="mt-3">
            Any third-party processor is bound by contractual data protection obligations no less protective than our own.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">5. Cookies</h2>
          <p>
            We use essential cookies (required for the site to function) and optional analytics cookies to understand how visitors use our site. You can control cookies through your browser settings. Declining analytics cookies does not affect your ability to use the site. We do not use third-party advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">6. Data Retention</h2>
          <p>
            We retain personal data for as long as necessary to fulfil the purposes described in this policy, or as required by law. Contact enquiry data is kept for up to 2 years. Client engagement data is retained for 7 years to meet financial and legal record-keeping requirements, then securely deleted.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">7. Your Rights (GDPR &amp; CCPA)</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li><strong className="text-on-surface">Access</strong> — Request a copy of the personal data we hold about you.</li>
            <li><strong className="text-on-surface">Rectification</strong> — Ask us to correct inaccurate or incomplete data.</li>
            <li><strong className="text-on-surface">Erasure</strong> — Request deletion of your data where we have no lawful basis to retain it.</li>
            <li><strong className="text-on-surface">Portability</strong> — Receive your data in a structured, machine-readable format.</li>
            <li><strong className="text-on-surface">Objection</strong> — Object to processing based on legitimate interests or for direct marketing.</li>
            <li><strong className="text-on-surface">Opt-out of sale</strong> — California residents may opt out of the sale of personal information (we do not sell data).</li>
          </ul>
          <p>
            To exercise any right, email{" "}
            <a href="mailto:hello@susea.ai" className="text-primary hover:opacity-70 transition-opacity">
              hello@susea.ai
            </a>{" "}
            with the subject &ldquo;Privacy Request.&rdquo; We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">8. Security</h2>
          <p>
            We apply industry-standard technical and organisational measures to protect your data — including encryption in transit (TLS 1.3), access controls, and regular security audits. No transmission over the internet is 100% secure; we cannot guarantee absolute security but commit to prompt disclosure in the event of a breach affecting your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">9. Children&apos;s Privacy</h2>
          <p>
            Our services are directed at businesses and professionals. We do not knowingly collect personal data from anyone under the age of 16. If you believe we have inadvertently collected such data, please contact us immediately and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be communicated via email or a notice on our website. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision. Continued use of our services after an update constitutes acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">11. Contact &amp; Data Controller</h2>
          <p>
            Susea.ai is the data controller for personal data collected via this website. For privacy enquiries, contact us at{" "}
            <a href="mailto:hello@susea.ai" className="text-primary hover:opacity-70 transition-opacity">
              hello@susea.ai
            </a>
            . EU residents may also lodge a complaint with the relevant supervisory authority in their member state.
          </p>
        </section>

      </div>
    </div>
  );
}
