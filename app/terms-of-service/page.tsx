import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of Susea.ai services. Read our service agreement, payment terms, and intellectual property policy.",
  path: "/terms-of-service",
});

const LAST_UPDATED = "April 27, 2026";

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
      <div className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full border border-outline-variant/30 text-primary font-mono text-xs uppercase tracking-widest mb-6">
          Legal
        </span>
        <h1 className="text-5xl font-headline font-extrabold tracking-tighter text-on-surface mb-4">
          Terms of Service
        </h1>
        <p className="text-on-surface-variant font-mono text-sm">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="space-y-12 text-on-surface-variant leading-relaxed">

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">1. Acceptance of Terms</h2>
          <p>
            By engaging Susea.ai (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) for any service, accessing our website, or entering into a service agreement, you (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) agree to be bound by these Terms of Service. If you do not accept these terms, do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">2. Services Description</h2>
          <p className="mb-3">
            Susea.ai provides enterprise AI consulting, custom AI agent development, security assessments, rapid MVP engineering, and related professional services. The specific scope, deliverables, timelines, and fees for each engagement are defined in a separate Statement of Work (&ldquo;SOW&rdquo;) or project agreement.
          </p>
          <p>
            We reserve the right to modify, suspend, or discontinue any service offering at any time with reasonable notice. Changes to an active SOW require mutual written agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">3. Client Responsibilities</h2>
          <p className="mb-3">You agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information necessary for service delivery.</li>
            <li>Grant timely access to systems, data, and stakeholders as required by the SOW.</li>
            <li>Ensure all data shared with us complies with applicable laws and that you hold the necessary rights to share it.</li>
            <li>Designate a primary point of contact with authority to make project decisions.</li>
            <li>Promptly review and provide feedback on deliverables within agreed timelines.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">4. Intellectual Property</h2>
          <p className="mb-3">
            Upon full payment of all amounts due, you retain ownership of all custom deliverables created specifically for your project under an SOW. Susea.ai retains ownership of:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-3">
            <li>Pre-existing tools, frameworks, libraries, and methodologies developed independently.</li>
            <li>General AI/ML knowledge, techniques, and non-client-specific innovations.</li>
            <li>Anonymised learnings derived from projects that do not contain your confidential information.</li>
          </ul>
          <p>
            We grant you a perpetual, royalty-free licence to use any pre-existing components embedded in your deliverables for the purposes outlined in the SOW.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">5. Confidentiality</h2>
          <p>
            Both parties agree to keep each other&apos;s confidential information strictly confidential and not to disclose it to any third party without prior written consent, except as required by law. This obligation survives termination of any agreement for a period of three (3) years. Confidential information does not include information that is publicly available through no fault of the receiving party, independently developed, or received from a third party without restriction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">6. Payment Terms</h2>
          <p className="mb-3">
            Fees are set out in each SOW. Unless otherwise agreed:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Invoices are payable within 14 days of the invoice date.</li>
            <li>Fixed-fee projects require a 50% deposit before work commences.</li>
            <li>Late payments accrue interest at 1.5% per month (or the maximum permitted by law, whichever is lower).</li>
            <li>All fees are exclusive of applicable taxes (VAT, GST, sales tax) for which the Client is responsible.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">7. Limitation of Liability</h2>
          <p className="mb-3">
            To the maximum extent permitted by applicable law, Susea.ai&apos;s total liability arising from or related to any engagement shall not exceed the total fees paid by you in the three (3) months preceding the claim.
          </p>
          <p>
            We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, even if advised of the possibility of such damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">8. Termination</h2>
          <p>
            Either party may terminate an SOW with 30 days&apos; written notice. You will be invoiced for all work completed and expenses incurred up to the termination date. Susea.ai may terminate immediately if you breach these terms and fail to remedy the breach within 10 days of written notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">9. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Delaware, USA, without regard to conflict-of-law provisions. For clients in the European Union, mandatory consumer protection laws of your country of residence also apply. Any dispute shall be resolved by binding arbitration under the rules of JAMS (USA) or ICC (EU), unless both parties agree otherwise in writing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">10. Changes to These Terms</h2>
          <p>
            We may update these Terms at any time. Material changes will be communicated via email or a prominent notice on our website at least 30 days before taking effect. Your continued use of our services after the effective date constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-4">11. Contact</h2>
          <p>
            Questions about these Terms? Email us at{" "}
            <a href="mailto:hello@susea.ai" className="text-primary hover:opacity-70 transition-opacity">
              hello@susea.ai
            </a>
            . We aim to respond within 2 business days.
          </p>
        </section>

      </div>
    </div>
  );
}
