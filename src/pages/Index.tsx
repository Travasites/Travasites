import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Palette, 
  Server, 
  Brain, 
  Rocket,
  Zap,
  Globe,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const services = [
  { icon: Globe, title: "Website Development", desc: "Mobile-first, blazing fast websites" },
  { icon: Code2, title: "Web Applications", desc: "Scalable, modern web apps" },
  { icon: Palette, title: "UI/UX Design", desc: "Beautiful, intuitive interfaces" },
  { icon: Server, title: "Backend & APIs", desc: "Robust server infrastructure" },
  { icon: Brain, title: "AI Integration", desc: "Smart AI-powered features" },
  { icon: Rocket, title: "MVP Support", desc: "Launch your startup fast" },
];

const techStack = [
  "React", "TypeScript", "Next.js", "Node.js", "Supabase", "PostgreSQL", "OpenAI", "TailwindCSS"
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-hero-gradient">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Web Development Studio + AI Platform</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="text-foreground">BLUE </span>
              <span className="text-gradient">FORGE</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-2xl md:text-4xl font-semibold text-foreground mb-4"
            >
              Build. Launch. Scale.
            </motion.p>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Mobile-first websites, web apps, and AI-powered products — crafted with precision and built for growth.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow transition-all duration-300 text-lg px-8">
                <Link to="/contact">
                  Work with Blue Forge
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary transition-all text-lg px-8">
                <Link to="/ai-studio">
                  <Sparkles className="mr-2 w-5 h-5 text-primary" />
                  Explore AI Studio
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to launch, we build digital products that make an impact
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent-gradient transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Studio Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI Studio</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Build with AI-Powered Tools
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI Studio provides powerful tools for content generation, image creation, UI copy, and more — all in one seamless platform.
              </p>
              <ul className="space-y-4 mb-8">
                {["Image AI Generation", "Content Writer AI", "UI Copy Assistant", "App Helper Bot"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                <Link to="/ai-studio">
                  Open AI Studio
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-card-gradient border border-border shadow-elevated overflow-hidden">
                <div className="h-8 bg-secondary/50 flex items-center gap-2 px-4 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="p-6 grid grid-cols-4 gap-4 h-[calc(100%-2rem)]">
                  <div className="col-span-1 space-y-3">
                    {["Dashboard", "Image AI", "Content AI", "Settings"].map((item, i) => (
                      <div key={i} className={`px-3 py-2 rounded-lg text-sm ${i === 1 ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="col-span-3 bg-secondary/30 rounded-lg p-4 flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <Layers className="w-12 h-12 text-primary/50 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm">AI Canvas Area</p>
                      </div>
                    </div>
                    <div className="h-12 bg-background/50 rounded-lg border border-border flex items-center px-4">
                      <span className="text-muted-foreground text-sm">Enter your prompt...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan/10 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold mb-4">Trusted Tech Stack</h2>
            <p className="text-muted-foreground">Built with modern, battle-tested technologies</p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <span className="font-medium">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 via-transparent to-teal/5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Something Amazing?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
              Let's turn your vision into reality. Start a project with Blue Forge today.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow transition-all">
                <Link to="/contact">
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/work">View Our Work</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
