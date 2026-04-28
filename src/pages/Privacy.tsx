import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export default function Privacy() {
  const { t } = useTranslation();

  const sections = [
    {
      title: "1. Data Controller",
      content: "Trou aux Biches Residences is the data controller responsible for your personal data. We are committed to protecting your privacy in accordance with the Mauritius Data Protection Act 2017 (DPA 2017). For any data protection inquiries, contact our Data Protection Officer at privacy@trouauxbiches.mu."
    },
    {
      title: "2. Data We Collect",
      content: "We collect only data strictly necessary for defined purposes: (a) Contact information (name, email, phone) when you submit inquiry forms; (b) Property preferences and viewing requests; (c) Technical data (IP address, browser type, device info) for security and analytics; (d) Cookie preferences and consent records. We do not collect sensitive personal data such as biometric data, health information, or political opinions."
    },
    {
      title: "3. Purpose & Legal Basis",
      content: "Your data is processed for: (a) Responding to property inquiries and tour requests — based on your consent; (b) Managing bookings and rental applications — necessary for contractual performance; (c) Website analytics and improvement — based on legitimate interest or consent; (d) Marketing communications — only with your explicit consent. We will never process your data for purposes incompatible with those for which it was collected."
    },
    {
      title: "4. Consent",
      content: "Where we rely on consent as the legal basis, you have the right to withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal. Cookie consent can be modified at any time via the cookie settings accessible from any page. Form submissions require explicit consent before data is collected."
    },
    {
      title: "5. Data Sharing & Third Parties",
      content: "We may share your data with: (a) Property management partners directly involved in your inquiry; (b) Technology service providers who process data on our behalf (hosting, email delivery); (c) Legal and regulatory authorities when required by law. All third-party processors are bound by data processing agreements ensuring equivalent protection. We do not sell your personal data to any third party."
    },
    {
      title: "6. International Data Transfers",
      content: "Your data may be stored on servers located outside Mauritius. Where data is transferred internationally, we ensure adequate safeguards are in place as required by Section 36 of the DPA 2017, including standard contractual clauses and adequacy assessments of the receiving jurisdiction's data protection framework."
    },
    {
      title: "7. Data Retention",
      content: "We retain personal data only as long as necessary: (a) Inquiry data: 24 months from last interaction; (b) Booking and transaction data: 7 years for legal/accounting obligations; (c) Marketing consent records: retained until withdrawal; (d) Cookie consent logs: 13 months. After retention periods expire, data is securely deleted or anonymized."
    },
    {
      title: "8. Your Rights Under DPA 2017",
      content: "You have the right to: (a) Access — request a copy of your personal data; (b) Correction — request rectification of inaccurate data; (c) Deletion — request erasure of your data; (d) Portability — receive your data in a machine-readable format; (e) Objection — object to processing based on legitimate interest; (f) Restriction — request limitation of processing. Exercise these rights via our Data Rights page or by contacting privacy@trouauxbiches.mu. We will respond within 30 days."
    },
    {
      title: "9. Security Measures",
      content: "We implement appropriate technical and organizational measures including: HTTPS encryption for all data in transit; encrypted data storage; role-based access controls; regular security assessments; audit logging of all data access; and breach detection mechanisms. In the event of a data breach likely to result in risk to your rights and freedoms, we will notify the Data Protection Office within 72 hours as required by the DPA 2017."
    },
    {
      title: "10. Cookies",
      content: "Our website uses: (a) Essential cookies — required for site functionality, cannot be disabled; (b) Analytics cookies — help us understand usage patterns, require your consent; (c) Marketing cookies — used for relevant advertising, require your consent. You can manage your cookie preferences at any time using the cookie banner or by contacting us."
    },
    {
      title: "11. Children's Data",
      content: "Our services are not directed at individuals under 18 years of age. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected such data, please contact us immediately."
    },
    {
      title: "12. Complaints",
      content: "If you believe your data protection rights have been violated, you have the right to lodge a complaint with the Data Protection Office of Mauritius (www.dataprotection.govmu.org). We encourage you to contact us first so we can address your concerns directly."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="container-editorial">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl text-foreground"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mt-4 max-w-2xl text-lg font-light"
          >
            Compliant with the Mauritius Data Protection Act 2017
          </motion.p>
        </div>
      </section>

      <section className="section-gap-sm">
        <div className="container-editorial max-w-3xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Data Rights CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border border-border/40 bg-secondary/30 p-8 mt-16"
          >
            <h3 className="font-serif text-xl text-foreground mb-3">Exercise Your Rights</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Submit a data access, correction, deletion, or export request through our dedicated portal.
            </p>
            <Link
              to="/data-rights"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.06em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
            >
              Go to Data Rights Portal →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-border mt-16 pt-8"
          >
            <p className="text-sm text-muted-foreground">
              Last Updated: March 2026 · Data Protection Officer: privacy@trouauxbiches.mu
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
