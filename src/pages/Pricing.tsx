import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap, Star, Building2, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { usePageMeta } from '@/hooks/usePageMeta';
import { fadeInUp, stagger } from '@/lib/animations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out The Forge',
    credits: 10,
    icon: Zap,
    features: [
      '10 credits on signup',
      'Access to all tools',
      'Basic support',
      'Community access',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'For individuals and small projects',
    credits: 100,
    icon: Star,
    features: [
      '100 credits/month',
      'All Free features',
      'Priority support',
      'Project history',
      'Export options',
    ],
    cta: 'Start Starter',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For professionals and teams',
    credits: 500,
    icon: Star,
    features: [
      '500 credits/month',
      'All Starter features',
      'Advanced AI models',
      'API access',
      'Priority queue',
      'Team collaboration',
    ],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '$79',
    period: '/month',
    description: 'For agencies and enterprises',
    credits: 2000,
    icon: Building2,
    features: [
      '2000 credits/month',
      'All Pro features',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const creditCosts = [
  { tool: 'Code Refiner', credits: 2, description: 'Analyze and optimize code for production' },
  { tool: 'Performance Predictor', credits: 2, description: 'Predict Core Web Vitals impact' },
  { tool: 'Mobile-First Architect', credits: 3, description: 'Generate mobile UI strategies' },
];

const faqs = [
  {
    question: 'What are credits?',
    answer: 'Credits are the currency used in The Forge. Each AI tool costs a certain number of credits to use. For example, the Code Refiner costs 2 credits, while the Mobile-First Architect costs 3 credits.',
  },
  {
    question: 'Do unused credits roll over?',
    answer: 'Credits do not roll over to the next month. We recommend choosing a plan that matches your typical usage.',
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the next billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'We offer a 7-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us for a full refund.',
  },
];

export default function Pricing() {
  usePageMeta({
    title: 'Pricing | The Forge by Blue Forge',
    description: 'Simple, transparent pricing for The Forge. Start free with 10 credits, or upgrade for more power.',
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-forge-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-forge-glow" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent <span className="text-forge-gradient">Pricing</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Start free and scale as you grow. No hidden fees.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative p-6 rounded-2xl border ${
                  plan.popular
                    ? 'bg-card border-primary shadow-forge'
                    : 'bg-card border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-accent-gradient text-accent-foreground text-xs font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                  <p className="text-sm text-primary mt-1">
                    {plan.credits} credits{plan.period !== 'forever' ? '/month' : ''}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? 'bg-accent-gradient text-accent-foreground hover:shadow-forge'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  <Link to={plan.name === 'Business' ? '/contact' : '/auth'}>
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credit Costs */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Credit Usage</h2>
              <p className="text-muted-foreground">
                Each tool has a different credit cost based on complexity
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-card rounded-2xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium">Tool</th>
                    <th className="px-6 py-4 text-center text-sm font-medium">Credits</th>
                    <th className="px-6 py-4 text-left text-sm font-medium hidden sm:table-cell">Use For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {creditCosts.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 font-medium">{item.tool}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {item.credits}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-4">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">FAQ</span>
              </div>
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border border-border rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">
              Join developers using The Forge to build production-ready apps
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-forge">
                <Link to="/auth">
                  Enter The Forge
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
