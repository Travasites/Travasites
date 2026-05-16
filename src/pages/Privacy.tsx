import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Privacy() {
  usePageMeta({
    title: "Privacy Policy | Travasites",
    description: "Read the Privacy Policy for Travasites e-commerce development services.",
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 bg-black overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Privacy <span className="text-gradient-purple">Policy</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              Last updated: May 2024
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-10">
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Travasites ("we," "our," or "us"). We are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you engage our e-commerce web development services, visit our website, or communicate with us in any capacity.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">When you engage our services, we may collect the following information:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Business information (brand name, business type, website requirements)</li>
                  <li>Payment and billing details (processed securely through third-party payment processors)</li>
                  <li>Project files, assets, and content you provide for your website build</li>
                  <li>Communication records (emails, messages, and call notes)</li>
                  <li>Website analytics data (anonymized usage data from our website)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We use the information collected strictly for the following purposes:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>To deliver, manage, and maintain the e-commerce platforms we build for you</li>
                  <li>To communicate with you regarding project progress, updates, and support</li>
                  <li>To process payments and manage billing</li>
                  <li>To improve our services and develop new features</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We take the security of your data seriously. All project files, credentials, and sensitive information are stored securely using industry-standard encryption and access controls. We use trusted third-party services (Supabase, Vercel, Flutterwave) that maintain their own robust security protocols. While we implement reasonable safeguards, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">5. Data Sharing & Third Parties</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">We do not sell, trade, or rent your personal data to third parties. We may share limited information with:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Hosting and deployment providers (Vercel) — strictly for project deployment</li>
                  <li>Payment processors (Flutterwave, Stripe) — strictly for billing purposes</li>
                  <li>Database providers (Supabase) — strictly for application functionality</li>
                  <li>Legal authorities — only when required by applicable law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">6. Ownership of Project Assets</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any brand assets, product images, content, and materials you provide remain your property. The custom code, design systems, and technical architecture created by Travasites during the project are licensed to you for use on your platform upon full payment. Travasites retains the right to showcase the completed project in our portfolio unless otherwise agreed in writing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">7. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website uses essential cookies for basic functionality and analytics cookies to understand how visitors interact with our site. These cookies do not collect personally identifiable information. You may disable cookies in your browser settings at any time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">8. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your project data and communication records for the duration of our working relationship and for a reasonable period afterward (up to 12 months) for support and reference purposes. After this period, data may be securely deleted. Payment records may be retained longer as required by applicable tax and financial regulations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">9. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Request access to the personal data we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data (subject to legal retention requirements)</li>
                  <li>Withdraw consent to data processing at any time</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise any of these rights, please contact us at travasites@gmail.com.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the revised policy. We encourage you to review this page periodically.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:travasites@gmail.com" className="text-primary hover:underline">travasites@gmail.com</a> or reach out via{" "}
                  <a href="https://wa.link/70h2f1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
