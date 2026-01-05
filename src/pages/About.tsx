import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Lightbulb, Wrench, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const values = [
  { icon: Target, title: "Mission", description: "To empower businesses with cutting-edge web solutions and AI tools that drive growth and innovation." },
  { icon: Lightbulb, title: "Vision", description: "A world where every business can harness the power of modern technology to achieve their goals." },
  { icon: Wrench, title: "Approach", description: "We combine technical excellence with creative problem-solving to deliver solutions that exceed expectations." }
];

const process = [
  { step: "01", title: "Discovery", desc: "Understanding your goals, challenges, and requirements" },
  { step: "02", title: "Strategy", desc: "Planning the optimal approach and technology stack" },
  { step: "03", title: "Design", desc: "Creating intuitive, beautiful user experiences" },
  { step: "04", title: "Development", desc: "Building with clean, scalable code" },
  { step: "05", title: "Launch", desc: "Deploying and ensuring smooth operation" },
  { step: "06", title: "Support", desc: "Ongoing maintenance and optimization" }
];

const stack = ["React", "Vite", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "OpenAI", "TailwindCSS", "Vercel", "AWS", "Docker", "GraphQL"];

const About = () => {
  usePageMeta({
    title: "About Us | Blue Forge",
    description: "Learn about Blue Forge - a web development studio and AI builder platform dedicated to crafting exceptional digital experiences.",
    canonical: "https://blueforge.dev/about",
  });

  return (
    <Layout>
      <section className="py-24 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-gradient">Blue Forge</span></motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">A web development studio and AI builder platform dedicated to crafting exceptional digital experiences</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp} className="p-8 rounded-2xl bg-card border border-border text-center">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold mb-4">{value.title}</h2>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-4">How We Work</h2>
            <p className="text-muted-foreground">Our proven process for delivering exceptional results</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {process.map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="p-6 rounded-xl bg-card border border-border">
                <span className="text-3xl font-bold text-gradient">{item.step}</span>
                <h3 className="text-lg font-semibold mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-muted-foreground">Modern, battle-tested technologies we work with</p>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {stack.map((tech, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.05 }} className="px-6 py-3 rounded-xl bg-card border border-border">
                <span className="font-medium">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">Let's Work Together</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">Ready to start your project? Get in touch and let's create something amazing.</motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                <Link to="/contact">Get in Touch<ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
