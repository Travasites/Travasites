import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { usePageMeta } from '@/hooks/usePageMeta';
import { fadeInUp, stagger } from '@/lib/animations';

export default function Terms() {
  usePageMeta({
    title: 'Terms of Service | Blue Forge',
    description: 'Read the Terms of Service for Blue Forge AI Studio.',
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
              Terms of <span className="text-gradient">Service</span>
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
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using Blue Forge AI Studio ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  Blue Forge provides AI-powered tools for content generation, image creation, and creative assistance. The Service operates on a credit-based system where users purchase or receive credits to use various AI tools.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground">
                  You must create an account to use certain features of the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Credits and Payments</h2>
                <p className="text-muted-foreground">
                  Credits are non-refundable and non-transferable. Unused credits do not roll over between billing periods. Subscription plans renew automatically unless cancelled before the renewal date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
                <p className="text-muted-foreground mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Generate illegal, harmful, or offensive content</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Attempt to reverse engineer our AI systems</li>
                  <li>Resell or redistribute generated content without permission</li>
                  <li>Abuse or circumvent rate limits</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  Content you generate using the Service is owned by you, subject to any third-party rights. Blue Forge retains all rights to the Service, including our AI models, software, and branding.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  The Service is provided "as is" without warranties. Blue Forge is not liable for any indirect, incidental, or consequential damages arising from your use of the Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, please contact us at legal@blueforge.ai
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
