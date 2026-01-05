import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, stagger } from "@/lib/animations";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web Application",
    description: "Full-stack e-commerce solution with AI-powered product recommendations.",
    results: "300% increase in conversion rate",
    image: "gradient-1"
  },
  {
    title: "SaaS Dashboard",
    category: "Web Application",
    description: "Analytics dashboard with real-time data visualization and reporting.",
    results: "50% reduction in reporting time",
    image: "gradient-2"
  },
  {
    title: "Healthcare Portal",
    category: "Website",
    description: "Patient portal with appointment scheduling and telemedicine integration.",
    results: "10,000+ monthly active users",
    image: "gradient-3"
  },
  {
    title: "AI Content Platform",
    category: "AI Integration",
    description: "Content generation platform with custom AI models for marketing teams.",
    results: "5x faster content production",
    image: "gradient-4"
  }
];

const gradients = {
  "gradient-1": "from-blue-500 to-purple-500",
  "gradient-2": "from-cyan-500 to-blue-500",
  "gradient-3": "from-green-500 to-emerald-500",
  "gradient-4": "from-orange-500 to-pink-500"
};

const Work = () => {
  usePageMeta({
    title: 'Our Work | Blue Forge',
    description: 'Featured projects and case studies showcasing Blue Forge expertise.',
  });

  return (
    <Layout>
      {/* Hero */}
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
              Our <span className="text-gradient">Work</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Featured projects and case studies showcasing our expertise
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className={`aspect-video bg-gradient-to-br ${gradients[project.image as keyof typeof gradients]} flex items-center justify-center`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">{project.results}</span>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">
              Ready to Start Your Project?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">
              Let's discuss how we can help bring your vision to life.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
