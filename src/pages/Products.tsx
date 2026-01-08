import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Hammer, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, stagger } from "@/lib/animations";

const products = [
  {
    icon: Hammer,
    title: "The Forge",
    category: "Core",
    description: "Your mobile-first development command center. Build production-ready digital products with AI-powered architecture, code refinement, and performance prediction.",
    features: ["Mobile-First Architect", "Code Refiner", "Performance Predictor", "Project Management"],
    link: "/ai-studio",
    isInternal: true
  }
];

const Products = () => {
  usePageMeta({
    title: 'Products | Blue Forge',
    description: 'The Forge - AI-powered mobile-first development toolkit for building production-ready digital products.',
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden glass-hero-animated">
        <div className="absolute inset-0 bg-glow z-10" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Products</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Industrial-grade tools built to forge production-ready digital products
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
                        <span key={i} className="px-3 py-1 rounded-full bg-secondary border border-border text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button asChild className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                      <Link to={product.link}>
                        Enter The Forge
                        <ArrowRight className="ml-2 w-4 h-4" />
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
