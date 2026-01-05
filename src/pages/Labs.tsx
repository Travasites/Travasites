import { motion } from "framer-motion";
import { Beaker, Gamepad2, TrendingUp, Brain, AlertTriangle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, stagger } from "@/lib/animations";

const experiments = [
  {
    icon: Gamepad2,
    title: "AI Gaming Demos",
    description: "Interactive game prototypes powered by AI decision-making and procedural generation.",
    status: "In Development"
  },
  {
    icon: TrendingUp,
    title: "Market Simulation Tools",
    description: "AI-driven market analysis and simulation for predictive insights.",
    status: "Prototype"
  },
  {
    icon: Brain,
    title: "Experimental AI Models",
    description: "Custom-trained models for specialized tasks and novel applications.",
    status: "Research"
  }
];

const Labs = () => {
  usePageMeta({
    title: 'Labs | Blue Forge',
    description: 'Explore experimental AI projects and prototypes from Blue Forge Labs.',
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
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-6"
            >
              <Beaker className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-yellow-500 font-medium">Experimental • Not Commercial</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Blue Forge <span className="text-gradient">Labs</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Where we experiment with cutting-edge AI and emerging technologies
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Experiments */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="mb-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Labs projects are experimental proof-of-concepts. They may be unstable and are not intended for production use.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {experiments.map((exp, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <exp.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 font-medium">
                    {exp.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{exp.title}</h3>
                <p className="text-muted-foreground">{exp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Labs;
