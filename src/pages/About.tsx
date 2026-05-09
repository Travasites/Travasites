import { motion } from "framer-motion";
import { ArrowRight, Twitter, Github, Linkedin, Mail, MapPin, Clock, MessageSquare, Send } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";

const timeline = [
  { year: "2024", title: "Started Building", desc: "Began freelancing as a full-stack developer, specializing in React and Node.js projects." },
  { year: "2025", title: "E-Commerce Focus", desc: "Pivoted to strictly e-commerce development. Adopted Next.js + Supabase as the core stack. Launched Glowhite Cosmetics." },
  { year: "2026", title: "Growing the Brand", desc: "3+ projects completed. Building a reputation for fast, custom e-commerce platforms that actually convert." },
];

const values = [
  { title: "No Templates", desc: "Every project is built from scratch. We don't reskin Shopify themes or use WordPress page builders." },
  { title: "Direct Access", desc: "You talk directly to the developer who writes your code. No project managers, no middlemen." },
  { title: "Transparent Pricing", desc: "$220 for a full custom store. $44/month for management. No hidden fees, no surprise invoices." },
  { title: "Ship Fast", desc: "Most stores launch in 2 weeks max. We move fast because we know the stack inside and out." },
];

const About = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  usePageMeta({
    title: "About | Travasites — E-comm Web Developer",
    description: "Meet the developer behind Travasites. 2+ years of full-stack experience, 3+ projects delivered. Custom Next.js + Supabase e-commerce stores.",
    canonical: "https://travasites.com/about",
    keywords: "about travasites, e-commerce developer, contact, next.js developer, supabase developer",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeInUp} className="hero-heading text-5xl sm:text-7xl md:text-8xl text-white mb-6">
              ABOUT <span className="text-gradient-purple">US</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Building, managing Next.js + Supabase e-commerce platforms that scale long term. Real builds, no templates. Tips & audits → DMs open.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="https://twitter.com/travasites" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300">
                Follow @travasites <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-black" aria-labelledby="who-heading">
        <div className="container mx-auto px-6">
          <motion.div className="max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Who We Are</p>
                <h2 id="who-heading" className="text-3xl md:text-4xl font-display font-bold text-white mb-6">E-comm Web Developer</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Travasites is a professional e-commerce development service focused exclusively on building custom online stores with <span className="text-white font-medium">Next.js + Supabase</span>.
                  </p>
                  <p>
                    We don't do WordPress. We don't do Shopify themes. Every store we build is coded from scratch — custom UI, custom backend, custom everything.
                  </p>
                  <p>
                    With 2+ years of full-stack development experience and 3+ completed projects, we know exactly how to build platforms that are fast, secure, and built to convert.
                  </p>
                </div>
                <div className="flex gap-4 mt-8">
                  <a href="https://twitter.com/travasites" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-border/30 hover:border-primary/30 hover:bg-primary/10 transition-all" aria-label="Twitter">
                    <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </a>
                  <a href="https://github.com/travasites" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-border/30 hover:border-primary/30 hover:bg-primary/10 transition-all" aria-label="GitHub">
                    <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </a>
                  <a href="https://www.linkedin.com/in/wisdom-a-b02587331/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 border border-border/30 hover:border-primary/30 hover:bg-primary/10 transition-all" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
                  </a>
                </div>
              </div>

              {/* Stats card */}
              <div className="space-y-6">
                {[
                  { label: "Projects Completed", value: "3+" },
                  { label: "Years of Experience", value: "2+" },
                  { label: "Client Satisfaction", value: "98%" },
                  { label: "Average Delivery", value: "2 Weeks Max" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-border/30">
                    <span className="text-muted-foreground text-sm">{s.label}</span>
                    <span className="text-2xl font-display font-bold text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-black border-t border-border/20" aria-labelledby="values-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Our Principles</p>
            <h2 id="values-heading" className="text-3xl md:text-4xl font-display font-bold text-white">How We Operate</h2>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-6 rounded-2xl bg-white/[0.02] border border-border/30">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-display font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-black border-t border-border/20" aria-labelledby="timeline-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Journey</p>
            <h2 id="timeline-heading" className="text-3xl md:text-4xl font-display font-bold text-white">Our Timeline</h2>
          </motion.div>
          <motion.div className="max-w-3xl mx-auto space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {timeline.map((t, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex gap-6">
                <div className="shrink-0 w-16 text-right">
                  <span className="text-primary font-display font-bold">{t.year}</span>
                </div>
                <div className="relative pl-6 border-l border-primary/20 pb-8">
                  <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary -translate-x-[7px]" />
                  <h3 className="text-lg font-display font-semibold text-white mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-black border-t border-border/20" aria-labelledby="contact-heading" id="contact">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Get in Touch</p>
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Let's Talk About Your Project</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Ready to build your custom store? Book a call or send us a message.</p>
          </motion.div>

          <motion.div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-border/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">DMs Open</h3>
                    <p className="text-sm text-muted-foreground">Best way to reach us</p>
                  </div>
                </div>
                <a href="https://twitter.com/travasites" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                  @travasites on Twitter <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-border/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <a href="mailto:hello@travasites.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">hello@travasites.com</a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-border/30">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Response Time</h3>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <a href="https://wa.link/70h2f1" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300">
                Book a Free Call <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/[0.02] border border-border/30 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border/30 text-white placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border/30 text-white placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border/30 text-white placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/5 text-white border border-border/30 font-semibold text-sm hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
                >
                  {submitted ? "Message Sent! ✓" : (<>Send Message <Send className="w-4 h-4" /></>)}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
