import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Terms() {
  usePageMeta({
    title: "Terms of Service | Travasites",
    description: "Read the Terms of Service for Travasites e-commerce development services.",
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
              Terms of <span className="text-gradient-purple">Service</span>
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
                <h2 className="text-2xl font-display font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By engaging Travasites ("we," "our," or "us") for any web development services, you ("the Client") agree to be bound by these Terms of Service. These terms constitute the entire agreement between you and Travasites regarding the services provided. If you do not agree to these terms, please do not engage our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">2. Scope of Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Travasites provides custom e-commerce web development services, including but not limited to: custom storefront development, payment gateway integration, admin dashboard builds, performance optimization, UI/UX design, and monthly website maintenance. The specific deliverables for each project will be agreed upon prior to commencement and documented in writing (via email, WhatsApp, or formal proposal).
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">3. Pricing & Payment</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">All payments are subject to the following terms:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>A non-refundable deposit of at least 50% of the total project cost is required before work begins</li>
                  <li>The remaining balance is due upon project completion, before final deployment and source code handover</li>
                  <li>Monthly maintenance fees are billed at the beginning of each service period and are non-refundable</li>
                  <li>Prices quoted are valid for 14 days from the date of the proposal</li>
                  <li>Late payments may result in suspension of services until the outstanding balance is settled</li>
                  <li>Travasites reserves the right to adjust pricing with 30 days written notice for ongoing maintenance contracts</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">4. Project Timeline & Delivery</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Estimated timelines are provided in good faith based on the agreed scope. However:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Delays caused by the Client (e.g., late content delivery, delayed feedback, scope changes) may extend the timeline without penalty to Travasites</li>
                  <li>Travasites is not liable for delays caused by third-party services (hosting providers, payment gateways, domain registrars, etc.)</li>
                  <li>If the Client fails to provide required materials within 30 days of request, the project may be paused and re-scoped</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">5. Revisions & Scope Changes</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Each project includes a reasonable number of revisions as agreed upon during the project scoping phase. Additional terms:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Minor revisions (color changes, text edits, layout tweaks) are included at no extra cost during the development phase</li>
                  <li>Major scope changes (new features, additional pages, redesigns) after project commencement will be quoted separately and may affect the timeline</li>
                  <li>Revision requests must be submitted in a single consolidated round to maintain efficiency</li>
                  <li>Revisions requested after final delivery and deployment may be subject to additional charges</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">6. Intellectual Property & Ownership</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Upon full and final payment:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>The Client receives a perpetual license to use the custom code and design delivered for their project</li>
                  <li>Travasites retains the right to reuse general-purpose components, frameworks, and development patterns across other projects</li>
                  <li>Travasites retains the right to display the completed project in our portfolio, case studies, and marketing materials unless explicitly agreed otherwise in writing</li>
                  <li>All brand assets, product images, and content provided by the Client remain the Client&apos;s property</li>
                  <li>Third-party tools, libraries, and open-source components used in the project remain subject to their respective licenses</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">7. Client Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">The Client agrees to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide all necessary content, assets, brand guidelines, and access credentials in a timely manner</li>
                  <li>Respond to communications and feedback requests within a reasonable timeframe (ideally within 48-72 hours)</li>
                  <li>Ensure that all content provided is legally owned or properly licensed</li>
                  <li>Not hold Travasites responsible for content accuracy, legal compliance of products sold, or business decisions made on the platform</li>
                  <li>Maintain their own backups of critical business data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Travasites provides all services on an "as is" basis. To the fullest extent permitted by law, Travasites shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to: loss of revenue, loss of profits, loss of data, or business interruption — regardless of the cause. Our total liability for any claim arising from the services shall not exceed the total amount paid by the Client for the specific project in question.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">9. Warranties & Disclaimers</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  While we strive for excellence in every build:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Travasites provides a 30-day post-launch support period for bug fixes related to the original scope of work</li>
                  <li>We do not guarantee specific business results (sales, traffic, conversion rates) from the website</li>
                  <li>We do not guarantee uninterrupted uptime, as hosting and third-party services are outside our direct control</li>
                  <li>Issues arising from Client modifications to the codebase after delivery are not covered under the support period</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">10. Refund Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our refund policy is structured as follows:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>The initial deposit is non-refundable as it covers project planning, design, and resource allocation</li>
                  <li>If the Client cancels the project after work has commenced, payment is due for all work completed to date</li>
                  <li>Monthly maintenance fees are non-refundable once the service period has begun</li>
                  <li>Travasites reserves the right to cancel a project if the Client breaches these terms, in which case no refund will be issued for work already completed</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">11. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate the working relationship with 14 days written notice. Upon termination, the Client is responsible for payment of all work completed up to the termination date. Travasites will provide all completed deliverables upon receipt of outstanding payments. Any ongoing maintenance services will cease at the end of the current billing period.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">12. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Both parties agree to keep confidential any proprietary or sensitive information exchanged during the course of the project. This obligation survives the termination of the agreement. Travasites will not disclose the Client&apos;s business data, access credentials, or proprietary strategies to any third party without prior written consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">13. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising under or in connection with these terms shall be resolved through good-faith negotiation between the parties. If a resolution cannot be reached, the matter may be submitted to mediation or arbitration.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">14. Changes to These Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Travasites reserves the right to update these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Continued engagement of our services after any changes constitutes acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">15. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any questions regarding these Terms of Service, please contact us at{" "}
                  <a href="mailto:hello@travasites.com" className="text-primary hover:underline">hello@travasites.com</a> or reach out via{" "}
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
