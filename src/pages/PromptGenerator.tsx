import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft, Clock, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { usePageMeta } from "@/hooks/usePageMeta";

const PromptGenerator = () => {
  usePageMeta({
    title: "Prompt Generator | Blue Forge Products",
    description: "Craft perfect prompts for any AI model. Optimize your inputs for better outputs with Blue Forge Prompt Generator.",
  });

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
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Coming Soon</span>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center mx-auto mb-8 shadow-glow"
            >
              <Zap className="w-10 h-10 text-accent-foreground" />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Prompt Generator</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10">
              Craft perfect prompts for any AI model. Our intelligent prompt generator helps you optimize inputs for better, more consistent outputs across ChatGPT, Claude, Midjourney, and more.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/products">
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back to Products
                </Link>
              </Button>
              <Button size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow" disabled>
                <Bell className="mr-2 w-5 h-5" />
                Notify Me at Launch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { title: "Multi-model Support", desc: "Works with ChatGPT, Claude, Gemini, Midjourney, and more" },
              { title: "Template Library", desc: "Pre-built templates for common use cases" },
              { title: "History Tracking", desc: "Save and organize your best prompts" },
              { title: "Export Options", desc: "Export prompts in various formats" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 rounded-xl bg-card border border-border text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PromptGenerator;
