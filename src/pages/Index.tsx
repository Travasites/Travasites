import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, Zap, Shield, Code2, Palette, Rocket, ShoppingCart, Search, BarChart3, Headphones } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";


const process = [
  { step: "01", title: "Discovery Call", desc: "We discuss your brand, products, and goals to understand exactly what your store needs." },
  { step: "02", title: "Design & Prototype", desc: "Custom UI/UX designed from scratch — no templates. You approve every screen before we code." },
  { step: "03", title: "Development", desc: "Built on Next.js + Supabase for lightning speed. Real-time inventory, search, checkout — all custom." },
  { step: "04", title: "Launch & Support", desc: "Deployed on Vercel with monitoring. Optional monthly maintenance to keep your store optimized." },
];

const features = [
  { icon: ShoppingCart, title: "Custom Storefront", desc: "Fully branded shopping experience with cart, checkout, and payment integration." },
  { icon: Search, title: "Lightning Search", desc: "Instant search with zero page reloads, debounced input, and real-time Supabase queries." },
  { icon: Shield, title: "Secure Payments", desc: "Flutterwave or Stripe integration with webhook verification and order tracking." },
  { icon: BarChart3, title: "Admin Dashboard", desc: "Manage products, orders, and customers from a custom-built admin panel." },
  { icon: Zap, title: "Blazing Performance", desc: "Sub-second page loads, optimized images, and perfect Core Web Vitals scores." },
  { icon: Palette, title: "Pixel-Perfect Design", desc: "Mobile-first, responsive design that looks premium on every device." },
];

const techStack = [
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "TailwindCSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

const pricing = [
  {
    title: "Custom E-Commerce Build",
    subtitle: "Complete online store from scratch",
    priceUSD: "$220",
    priceNGN: "₦300,000",
    type: "One-time fee",
    features: ["Custom Next.js + Supabase store", "Responsive mobile-first design", "Product catalog & categories", "Cart & checkout system", "Payment gateway integration", "Admin dashboard", "SEO optimization", "Deployed on Vercel", "30 days post-launch support"],
    cta: "Start Your Build",
    popular: true,
  },
  {
    title: "Monthly Maintenance",
    subtitle: "Let Travasites manage your store",
    priceUSD: "$44",
    priceNGN: "₦60,000",
    type: "Per month",
    features: ["Bug fixes & updates", "Performance monitoring", "Security patches", "Content updates", "Uptime monitoring", "Priority support", "Monthly performance report"],
    cta: "Get Managed",
    popular: false,
  },
];

const Index = () => {
  usePageMeta({
    title: "Travasites | E-comm Web Dev — Custom Next.js + Supabase Stores",
    description: "Building, managing Next.js + Supabase e-commerce platforms that scale long term. Real builds, no templates. Custom online stores from $220.",
    canonical: "https://travasites.com/",
    keywords: "e-commerce developer, next.js store, supabase, custom online store, web developer nigeria",
  });

  return (
    <Layout>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black -mt-16 md:-mt-20 pt-16 md:pt-20">
        <div className="container mx-auto px-6 relative z-10 py-20">
          {/* Mobile: Video on top, text below. Desktop: overlapping layout */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

            {/* === MOBILE LAYOUT === */}
            <div className="lg:hidden">
              {/* Heading */}
              <motion.h1 variants={fadeInUp} className="hero-heading text-[3.5rem] sm:text-[4.5rem] text-white mb-6">
                E-COMM<br />WEB DEV
              </motion.h1>

              {/* Stats row */}
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <span className="text-sm text-white/60">3+ Completed Products</span>
                <div className="flex-1 h-px bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
              </motion.div>

              {/* Wordmark badge */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-block px-5 py-2 bg-white text-black font-display font-bold text-lg tracking-wider">
                  TRAVASITES
                </span>
              </motion.div>

              {/* Experience card */}
              <motion.div variants={fadeInUp} className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm mb-8">
                <h3 className="text-white font-display font-bold text-base mb-1">2 Years of Experience</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  With a strong foundation in full-stack development, I bring innovative solutions and efficient code to every project.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeInUp}>
                <a
                  href="https://wa.link/70h2f1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all duration-300"
                >
                  Book a Call
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </a>
              </motion.div>
            </div>

            {/* === DESKTOP LAYOUT (matches reference image) === */}
            <div className="hidden lg:block relative">
              {/* Stat: top-left */}
              <motion.div variants={fadeInUp} className="absolute top-0 left-0 z-20 flex items-center gap-3">
                <span className="text-sm text-white/70 font-display">3+ Completed Products</span>
                <div className="w-24 h-px bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
              </motion.div>

              {/* Large heading — behind video */}
              <motion.h1
                variants={fadeInUp}
                className="hero-heading text-[8rem] xl:text-[10rem] 2xl:text-[12rem] text-white text-center leading-[0.85] relative z-10 select-none"
              >
                E-COMM<br />WEB DEV
              </motion.h1>



              {/* TRAVASITES wordmark badge — bottom center */}
              <motion.div variants={fadeInUp} className="flex justify-center mt-6 relative z-20">
                <span className="inline-block px-6 py-2.5 bg-white text-black font-display font-bold text-xl tracking-[0.15em]">
                  TRAVASITES
                </span>
              </motion.div>

              {/* Experience card — bottom right, connected with dot */}
              <motion.div variants={fadeInUp} className="absolute bottom-[-2rem] right-0 z-20 flex items-start gap-3">
                <div className="flex flex-col items-center mt-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md max-w-xs">
                  <h3 className="text-white font-display font-bold text-sm mb-1">2 Years of Experience</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    With a strong foundation in full-stack development, I bring innovative solutions and efficient code to every project I work on.
                  </p>
                </div>
              </motion.div>

              {/* Social icons — bottom left */}
              <motion.div variants={fadeInUp} className="absolute bottom-[-2rem] left-0 z-20 flex items-center gap-4">
                {[
                  { label: "W", href: "https://wa.link/70h2f1" },
                  { label: "in", href: "https://www.linkedin.com/in/wisdom-a-b02587331/" },
                  { label: "X", href: "https://twitter.com/travasites" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs hover:text-white hover:border-white/40 transition-all"
                  >
                    {s.label}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom nav pills — desktop only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
          <div className="flex items-center gap-2 px-2 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
            <Link to="/" className="px-5 py-1.5 rounded-full bg-primary text-white text-sm font-medium">Home</Link>
            <Link to="/services" className="px-5 py-1.5 rounded-full text-white/50 text-sm hover:text-white transition-colors">Services</Link>
            <Link to="/work" className="px-5 py-1.5 rounded-full text-white/50 text-sm hover:text-white transition-colors">Work</Link>
            <Link to="/about" className="px-5 py-1.5 rounded-full text-white/50 text-sm hover:text-white transition-colors">About</Link>
          </div>
        </div>
      </section>




      {/* ═══════════════ WHAT WE BUILD ═══════════════ */}
      <section className="py-24 bg-black" aria-labelledby="features-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">What You Get</p>
            <h2 id="features-heading" className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Everything Your Store Needs</h2>
            <p className="text-white/40 max-w-2xl mx-auto">Every feature is custom-coded. No plugins, no page builders, no Shopify templates — just clean Next.js + Supabase architecture.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -4 }} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-24 bg-black" aria-labelledby="process-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">The Process</p>
            <h2 id="process-heading" className="text-3xl md:text-5xl font-display font-bold text-white mb-4">How We Build Your Store</h2>
            <p className="text-white/40 max-w-2xl mx-auto">From first call to launch day — here's the exact roadmap.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {process.map((p, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative">
                <div className="text-6xl font-display font-bold text-primary/10 mb-4">{p.step}</div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{p.desc}</p>
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 w-8 h-px bg-primary/20" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TECH STACK ═══════════════ */}
      <section className="py-20 bg-black border-y border-white/[0.06]" aria-labelledby="tech-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 id="tech-heading" className="text-2xl font-display font-bold text-white mb-2">Built With Modern Tech</h2>
            <p className="text-white/40 text-sm">The same stack powering the fastest e-commerce platforms</p>
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {techStack.map((t, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-primary/30 transition-colors">
                <img src={t.logo} alt={t.name} className="w-6 h-6 object-contain" />
                <span className="font-medium text-white text-sm">{t.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section className="py-24 bg-black" aria-labelledby="pricing-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Transparent Pricing</p>
            <h2 id="pricing-heading" className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Simple, Honest Pricing</h2>
            <p className="text-white/40 max-w-2xl mx-auto">No hidden fees. No surprise charges. You know exactly what you're paying for.</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {pricing.map((plan, i) => (
              <motion.div key={i} variants={fadeInUp} className={`relative p-8 rounded-3xl border ${plan.popular ? "border-primary/40 bg-primary/[0.03]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-display font-bold text-white mb-1">{plan.title}</h3>
                <p className="text-sm text-white/40 mb-6">{plan.subtitle}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-white">{plan.priceUSD}</span>
                    <span className="text-white/40 text-sm">/ {plan.type}</span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">or {plan.priceNGN} {plan.type === "One-time fee" ? "one-time" : "monthly"}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-white/50">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.link/70h2f1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white/5 text-white border border-white/[0.06] hover:border-primary/30 hover:bg-primary/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ WHY TRAVASITES ═══════════════ */}
      <section className="py-24 bg-black" aria-labelledby="why-heading">
        <div className="container mx-auto px-6">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Why Us</p>
              <h2 id="why-heading" className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Why Choose Travasites?</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Code2, title: "No Templates, Ever", desc: "Every line of code is written specifically for your brand. We don't use Shopify themes or WordPress plugins." },
                { icon: Rocket, title: "Ship Fast, Ship Right", desc: "Most stores launch within 2-3 weeks. We move fast without cutting corners on quality or performance." },
                { icon: Headphones, title: "Direct Communication", desc: "You talk directly to the developer. No account managers, no middlemen, no waiting." },
                { icon: Star, title: "Proven Results", desc: "From Glowhite Cosmetics to custom B2B platforms — our builds convert and scale." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <item.icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-display font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;