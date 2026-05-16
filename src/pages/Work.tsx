import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import FloatingText from "@/components/FloatingText";
import SafeVideo from "@/components/SafeVideo";
import sectionFemale from "@/assets/Section_Female.jpeg";
import lightDance from "@/assets/Light_dance.mp4";

const projects = [
  {
    title: "Glowhite Cosmetics",
    category: "E-Commerce Store",
    desc: "A full-featured cosmetics e-commerce platform with real-time search, Flutterwave payment integration, and custom admin dashboard. Built on Next.js + Supabase.",
    tags: ["Next.js", "Supabase", "Flutterwave", "TailwindCSS"],
    link: "https://glowhitecosmetics.vercel.app/",
    highlights: ["Custom search modal with zero page reloads", "Flutterwave checkout integration", "Product catalog with categories", "Mobile-first responsive design"],
  },
  {
    title: "Dr Wells Skincare",
    category: "E-Commerce Store",
    desc: "A full-featured cosmetics e-commerce platform with Flutterwave payment integration, and custom admin dashboard. Built on React.js + Supabase.",
    tags: ["React.js", "Supabase", "Flutterwave", "TailwindCSS"],
    link: "https://www.drwellsskincare.com/",
    highlights: ["Flutterwave checkout integration", "Product catalog with categories", "Mobile-first responsive design"],
  },
  {
    title: "Custom B2B Platform",
    category: "Web Application",
    desc: "A business-to-business ordering platform with role-based access, bulk pricing, and automated invoicing. Scalable architecture designed for high-volume transactions.",
    tags: ["Next.js", "Supabase", "Vercel", "TypeScript"],
    link: "https://wa.link/70h2f1",
    highlights: ["Role-based authentication", "Bulk order management", "Automated invoice generation", "Real-time inventory sync"],
  },
  {
    title: "Fashion Storefront",
    category: "E-Commerce Store",
    desc: "A premium fashion brand storefront with lookbook galleries, size guides, and seamless checkout. Designed for high conversion rates.",
    tags: ["Next.js", "Supabase", "Stripe", "TailwindCSS"],
    link: "https://wa.link/70h2f1",
    highlights: ["Lookbook-style product galleries", "Size guide integration", "Wishlist functionality", "SEO optimized pages"],
  },
  {
    title: "Health & Wellness Shop",
    category: "E-Commerce Store",
    desc: "An online store for health and wellness products with subscription ordering, customer reviews, and educational content sections.",
    tags: ["Next.js", "Supabase", "Flutterwave", "PostgreSQL"],
    link: "https://wa.link/70h2f1",
    highlights: ["Subscription-based ordering", "Customer review system", "Blog/content section", "Order tracking dashboard"],
  },
];

const testimonials = [
  {
    name: "Client A",
    role: "Founder, Glowhite Cosmetics",
    text: "Travasites built us a store that loads faster than anything we've seen on Shopify. The custom search alone has increased our conversion rate significantly.",
    rating: 5,
  },
  {
    name: "Client B",
    role: "CEO, Fashion Brand",
    text: "Direct communication with the developer made all the difference. No middlemen, no delays — just results. Our store was live in under 3 weeks.",
    rating: 5,
  },
  {
    name: "Client C",
    role: "Operations Manager",
    text: "The monthly management plan is worth every naira. We don't worry about updates, security, or performance — Travasites handles it all.",
    rating: 5,
  },
];

const Work = () => {
  usePageMeta({
    title: "Work | Travasites — Our E-Commerce Projects",
    description: "See the custom Next.js + Supabase e-commerce stores we've built. Real projects, real results — from Glowhite Cosmetics to B2B platforms.",
    canonical: "https://travasites.com/work",
    keywords: "portfolio, e-commerce projects, next.js stores, supabase projects, web development work",
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
            className="w-[170%] sm:w-[110%] lg:w-[55%] xl:w-[50%] h-auto object-contain opacity-35 select-none mt-14 sm:mt-10 lg:-mt-8 -mr-24 sm:-mr-14 lg:-mr-12"
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
                See what we've built
              </motion.p>
              <motion.h1 variants={fadeInUp} className="hero-heading text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] text-white mb-8">
                Our<br /><FloatingText text="Work" />
              </motion.h1>
              <motion.div variants={fadeInUp} className="mb-10">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
                  Real builds that convert and scale.
                </h2>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-md">
                  Every project is a custom Next.js + Supabase platform — no templates, no shortcuts.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-y-6 gap-x-4 pt-8 border-t border-white/10">
                {[
                  { num: "#01", label: "E-Commerce Stores" },
                  { num: "#02", label: "Admin Dashboards" },
                  { num: "#03", label: "Payment Systems" },
                  { num: "#04", label: "B2B Platforms" },
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
                    See what we've built
                  </motion.p>
                  <motion.h1 variants={fadeInUp} className="hero-heading text-[7rem] xl:text-[9rem] 2xl:text-[10rem] text-white leading-[0.85]">
                    Our<br /><FloatingText text="Work" />
                  </motion.h1>
                </div>
                <motion.div variants={fadeInUp} className="flex-1 max-w-md pb-4">
                  <h2 className="text-2xl xl:text-3xl font-display font-bold text-white mb-4 leading-tight">
                    Real builds that convert and scale.
                  </h2>
                  <p className="text-base text-white/50 leading-relaxed">
                    Every project is a custom Next.js + Supabase platform — no templates, no shortcuts.
                  </p>
                </motion.div>
              </div>

              {/* Bottom row: 4 numbered items */}
              <motion.div variants={fadeInUp} className="grid grid-cols-4 gap-8 pt-8 border-t border-white/10">
                {[
                  { num: "#01", label: "E-Commerce Stores" },
                  { num: "#02", label: "Admin Dashboards" },
                  { num: "#03", label: "Payment Systems" },
                  { num: "#04", label: "B2B Platforms" },
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

      {/* Projects */}
      <section className="relative py-24 bg-black overflow-hidden" aria-labelledby="projects-heading">
        {/* Video background — Light_dance */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <SafeVideo src={lightDance} opacity={0.25} maskType="vertical" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Portfolio</p>
            <h2 id="projects-heading" className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Featured Projects</h2>
          </motion.div>

          <motion.div className="space-y-8 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {projects.map((p, i) => (
              <motion.div key={i} variants={fadeInUp} className="group p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/20 transition-all duration-300 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-primary font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-3">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{p.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.map((t, ti) => (
                        <span key={ti} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-muted-foreground border border-white/[0.06]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-all duration-300"
                    >
                      View Live Site <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="lg:w-72 shrink-0">
                    <h4 className="text-xs text-white/60 uppercase tracking-wider font-medium mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {p.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {h}
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

      {/* Testimonials */}
      <section className="py-24 bg-black border-t border-white/[0.06]" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Testimonials</p>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-display font-bold text-white">What Clients Say</h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
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
              Want Results Like These?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-8">
              Let's build your custom e-commerce store. Starting at $220 / ₦300,000.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="https://wa.link/70h2f1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all">
                Start Your Project <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
