import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { usePageMeta } from '@/hooks/usePageMeta';
import { fadeInUp, stagger } from '@/lib/animations';

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy | Blue Forge',
    description: 'Read the Privacy Policy for Blue Forge AI Studio.',
  });

  return (
    <Layout>
      <section className="py-24 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Privacy <span className="text-gradient">Policy</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              Last updated: January 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto prose prose-invert"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We collect information you provide directly:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Account information (email, name, password)</li>
                  <li>Payment information (processed securely by Stripe)</li>
                  <li>Content you create using our tools</li>
                  <li>Usage data and preferences</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important updates about your account</li>
                  <li>Analyze usage patterns to improve our AI models</li>
                  <li>Respond to support requests</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your data. All data is encrypted in transit and at rest. We regularly audit our security practices and maintain compliance with applicable regulations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Data Sharing</h2>
                <p className="text-muted-foreground mb-4">We do not sell your personal data. We may share data with:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Service providers who help operate our platform</li>
                  <li>Payment processors (Stripe)</li>
                  <li>Analytics providers (anonymized data only)</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your account and data</li>
                  <li>Export your data</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
                <p className="text-muted-foreground">
                  We use essential cookies for authentication and preferences. We also use analytics cookies to understand how you use our service. You can manage cookie preferences in your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your data for as long as your account is active. After account deletion, we may retain some data for legal compliance or legitimate business purposes for up to 90 days.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our Service is not intended for users under 13 years of age. We do not knowingly collect personal information from children.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground">
                  For privacy-related questions, please contact us at privacy@blueforge.ai
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
