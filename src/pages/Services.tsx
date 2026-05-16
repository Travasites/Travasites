import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Search, Shield, BarChart3, Zap, Palette, Code2, Globe, Smartphone, Database, Lock, Headphones } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import FloatingText from "@/components/FloatingText";
import sectionFemale from "@/assets/Section_Female.jpeg";
import riseServiceSection from "@/assets/Rise_Service_Section.mp4";

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
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-end overflow-hidden bg-black pb-6 md:pb-16">
        {/* Hero background — Section_Female */}
        <div className="absolute inset-0 z-0 flex items-start justify-end pointer-events-none" aria-hidden="true">
          <img
            src={sectionFemale}
            alt=""
            className="w-[170%] sm:w-[110%] lg:w-[55%] xl:w-[50%] h-auto object-contain opacity-35 select-none mt-4 sm:mt-10 lg:-mt-8 -mr-32 sm:-mr-14 lg:-mr-12"
            style={{
              transform: 'scaleX(-1)',
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 88%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 88%)'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-24 md:pt-40">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

            {/* === MOBILE / TABLET LAYOUT === */}
            <div className="lg:hidden">
              <motion.p variants={fadeInUp} className="text-sm md:text-base text-white/60 font-display mb-3">
                What we offer
              </motion.p>
              <motion.h1 variants={fadeInUp} className="hero-heading text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] text-white mb-8 whitespace-nowrap">
                Custom<br /><FloatingText text="E-Commerce" />
              </motion.h1>
              <motion.div variants={fadeInUp} className="mb-10">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                  Built to sell, not just to look good.
                </h2>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-md">
                  From storefront to checkout, we build complete e-commerce platforms on Next.js + Supabase.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-y-6 gap-x-4 pt-8 border-t border-white/10">
                {[
                  { num: "#01", label: "Custom Storefront" },
                  { num: "#02", label: "Payment Integration" },
                  { num: "#03", label: "Admin Dashboard" },
                  { num: "#04", label: "Store Management" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-display font-bold text-primary">{item.num}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-white/80">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* === DESKTOP LAYOUT === */}
            <div className="hidden lg:block">
              {/* Top row: subtitle + heading left, statement right */}
              <div className="flex items-end justify-between gap-16 mb-16">
                <div className="flex-1 max-w-[60%]">
                  <motion.p variants={fadeInUp} className="text-base text-white/60 font-display mb-4">
                    What we offer
                  </motion.p>
                  <motion.h1 variants={fadeInUp} className="hero-heading text-[5rem] xl:text-[6.5rem] 2xl:text-[7.5rem] text-white leading-[0.85] whitespace-nowrap">
                    Custom<br /><FloatingText text="E-Commerce" />
                  </motion.h1>
                </div>
                <motion.div variants={fadeInUp} className="flex-1 max-w-md pb-4">
                  <h2 className="text-2xl xl:text-3xl font-display font-bold text-white mb-4 leading-tight">
                    Built to sell, not just to look good.
                  </h2>
                  <p className="text-base text-white/50 leading-relaxed">
                    From storefront to checkout, we build complete e-commerce platforms on Next.js + Supabase.
                  </p>
                </motion.div>
              </div>

              {/* Bottom row: 4 numbered items */}
              <motion.div variants={fadeInUp} className="grid grid-cols-4 gap-8 pt-8 border-t border-white/10">
                {[
                  { num: "#01", label: "Custom Storefront" },
                  { num: "#02", label: "Payment Integration" },
                  { num: "#03", label: "Admin Dashboard" },
                  { num: "#04", label: "Store Management" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-display font-bold text-primary">{item.num}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-white/80">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 bg-black overflow-hidden">
        {/* Video background — Rise_Service_Section */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <video
            src={riseServiceSection}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20 select-none"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-8 rounded-3xl bg-white/[0.02] border border-border/30 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm">
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
        </div>

        {/* DESKTOP: Single row marquee, left to right */}
        <div className="hidden md:block overflow-hidden relative">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee-left flex w-max gap-4">
            {[...Array(4)].flatMap(() => [
              { n: "Next.js", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
              { n: "Supabase", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
              { n: "TypeScript", l: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
              { n: "Vercel", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
              { n: "TailwindCSS", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
              { n: "PostgreSQL", l: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            ]).map((t, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] shrink-0">
                <img src={t.l} alt={t.n} className="w-6 h-6 object-contain" />
                <span className="font-medium text-white text-sm whitespace-nowrap">{t.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE: Two rows — top L-R, bottom R-L */}
        <div className="md:hidden overflow-hidden relative space-y-4">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          {/* Row 1: left to right */}
          <div className="animate-marquee-left flex w-max gap-3">
            {[...Array(4)].flatMap(() => [
              { n: "Next.js", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
              { n: "Supabase", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
              { n: "TypeScript", l: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            ]).map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] shrink-0">
                <img src={t.l} alt={t.n} className="w-5 h-5 object-contain" />
                <span className="font-medium text-white text-sm whitespace-nowrap">{t.n}</span>
              </div>
            ))}
          </div>
          {/* Row 2: right to left */}
          <div className="animate-marquee-right flex w-max gap-3">
            {[...Array(4)].flatMap(() => [
              { n: "Vercel", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
              { n: "TailwindCSS", l: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
              { n: "PostgreSQL", l: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            ]).map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] shrink-0">
                <img src={t.l} alt={t.n} className="w-5 h-5 object-contain" />
                <span className="font-medium text-white text-sm whitespace-nowrap">{t.n}</span>
              </div>
            ))}
          </div>
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
              <a href="https://wa.link/70h2f1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all">
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
