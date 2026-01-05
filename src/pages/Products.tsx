import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Zap, PenTool, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const products = [
  {
    icon: Sparkles,
    title: "Blue Forge AI Studio",
    category: "Core",
    description: "Our flagship AI-powered creative suite. Generate images, content, UI copy, and more.",
    features: ["Image Generation", "Content Writing", "UI Copy Assistant", "Project Management"],
    link: "/ai-studio",
    isInternal: true
  },
  {
    icon: Zap,
    title: "Prompt Generator",
    category: "Utility",
    description: "Craft perfect prompts for any AI model. Optimize your inputs for better outputs.",
    features: ["Multi-model Support", "Template Library", "History Tracking", "Export Options"],
    link: "/products/prompt-generator",
    isInternal: true
  },
  {
    icon: PenTool,
    title: "Content Ad Maker",
    category: "Utility",
    description: "Create compelling ad copy and visuals for social media and digital marketing.",
    features: ["Ad Templates", "A/B Testing", "Multi-platform Export", "Analytics Integration"],
    link: "/products/content-ad-maker",
    isInternal: true
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

const Products = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Products</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              AI-powered tools built to accelerate your creative workflow
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center shadow-glow">
                        <product.icon className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                        <h3 className="text-2xl font-bold">{product.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-secondary text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button asChild className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                      <Link to={product.link}>
                        {product.isInternal ? "Launch" : "View Demo"}
                        {product.isInternal ? <ArrowRight className="ml-2 w-4 h-4" /> : <ExternalLink className="ml-2 w-4 h-4" />}
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
