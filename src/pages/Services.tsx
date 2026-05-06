import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Search, Shield, BarChart3, Zap, Palette, Code2, Globe, Smartphone, Database, Lock, Headphones } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    icon: ShoppingCart,
    title: "Custom E-Commerce Store",
    desc: "A fully custom online store built from the ground up with Next.js and Supabase. No templates, no page builders — just clean, performant code tailored to your brand.",
    features: ["Product catalog with categories & filters", "Shopping cart & wishlist", "Guest & authenticated checkout", "Order tracking & history", "Inventory management"],
  },
  {
    icon: Search,
    title: "Lightning-Fast Search",
    desc: "Custom search modal that queries Supabase instantly with zero page reloads and debounced input. Shopify templates simply can't match this speed.",
    features: ["Real-time search results", "Debounced input handling", "Category-based filtering", "Search analytics", "Zero page reloads"],
  },
  {
    icon: Shield,
    title: "Secure Payment Integration",
    desc: "End-to-end payment processing with Flutterwave or Stripe. Webhook verification, order creation, and secure transaction handling.",
    features: ["Flutterwave / Stripe integration", "Webhook verification", "Automated order creation", "Payment status tracking", "Refund handling"],
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    desc: "A custom-built admin panel to manage your entire store — products, orders, customers, and analytics — all in one place.",
    features: ["Product CRUD operations", "Order management", "Customer database", "Sales analytics", "Inventory alerts"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Premium, mobile-first design that makes your brand look world-class. Every pixel is intentional, every interaction is smooth.",
    features: ["Mobile-first responsive design", "Brand-aligned aesthetics", "Micro-interactions & animations", "Accessibility compliant", "Dark/light mode support"],
  },
  {
    icon: Headphones,
    title: "Store Management",
    desc: "Don't want to manage the tech? We handle updates, monitoring, security patches, and performance optimization monthly.",
    features: ["Bug fixes & updates", "Performance monitoring", "Security patches", "Content updates", "Monthly reports"],
  },
];

const Services = () => {
  usePageMeta({
    title: "Services | Travasites — Custom E-Commerce Development",
    description: "Custom Next.js + Supabase e-commerce stores, payment integration, admin dashboards, and ongoing store management. Real builds, no templates.",
    canonical: "https://travasites.com/services",
    keywords: "e-commerce services, custom store, next.js development, supabase, payment integration",
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeInUp} className="pixel-text text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.9] mb-6">
              OUR <span className="text-gradient-purple">SERVICES</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Everything you need to launch and scale a custom e-commerce platform — built strictly on Next.js + Supabase.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="https://wa.link/70h2f1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:shadow-glow transition-all duration-300">
                Book a Call <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-8 rounded-3xl bg-white/[0.02] border border-border/30 hover:border-primary/20 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech we use */}
      <section className="py-20 bg-black border-y border-border/20">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Our Tech Stack</h2>
            <p className="text-muted-foreground text-sm">Built with the tools that power the fastest platforms on the web</p>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {[
              { n: "Next.js", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
              { n: "Supabase", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
              { n: "TypeScript", l: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
              { n: "Vercel", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
              { n: "TailwindCSS", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
              { n: "PostgreSQL", l: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-border/30">
                <img src={t.l} alt={t.n} className="w-6 h-6 object-contain" />
                <span className="font-medium text-white text-sm">{t.n}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to Build?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-8">
              Custom Next.js + Supabase store starting at <span className="text-white font-semibold">$220</span> (₦300,000). Monthly management for <span className="text-white font-semibold">$44</span> (₦60,000).
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.link/70h2f1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:shadow-glow transition-all">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </a>
              <Link to="/work" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 text-white border border-border/30 font-semibold hover:border-primary/30 transition-all">
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
