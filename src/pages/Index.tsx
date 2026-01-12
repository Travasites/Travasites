import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Code2, Palette, Server, Brain, Rocket, Zap, Globe, Layers, Star, TrendingUp, Smartphone, Code, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { OrganizationSchema } from "@/components/JsonLd";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";
const services = [{
  icon: Globe,
  title: "Website Development",
  desc: "Mobile-first, blazing fast websites"
}, {
  icon: Code2,
  title: "Web Applications",
  desc: "Scalable, modern web apps"
}, {
  icon: Palette,
  title: "UI/UX Design",
  desc: "Beautiful, intuitive interfaces"
}, {
  icon: Server,
  title: "Backend & APIs",
  desc: "Robust server infrastructure"
}, {
  icon: Brain,
  title: "AI Integration",
  desc: "Smart AI-powered features"
}, {
  icon: Rocket,
  title: "MVP Support",
  desc: "Launch your startup fast"
}];
const techStack = [{
  name: "React",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
}, {
  name: "TypeScript",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
}, {
  name: "Node.js",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
}, {
  name: "TensorFlow",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
}, {
  name: "AWS",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
}, {
  name: "Supabase",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg"
}, {
  name: "PostgreSQL",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
}, {
  name: "Kubernetes",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
}, {
  name: "Docker",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
}, {
  name: "TailwindCSS",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
}, {
  name: "Cloudflare",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg"
}, {
  name: "Redis",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
}];
const stats = [{
  value: "9+",
  label: "Projects Delivered",
  icon: Layers
}, {
  value: "98%",
  label: "Client Satisfaction",
  icon: Star
}, {
  value: "24h",
  label: "Response Time",
  icon: TrendingUp
}];
const clientLogos = [{
  name: "Vercel",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg"
}, {
  name: "Stripe",
  logo: "https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_logo_-_blurple.svg"
}, {
  name: "DigitalOcean",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg"
}, {
  name: "AWS",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
}, {
  name: "Hetzner",
  logo: "https://www.hetzner.com/assets/Uploads/Hetzner-Logo.svg"
}];
const forgeTools = [{
  icon: Smartphone,
  title: "Mobile-First Architect",
  desc: "Transform ideas into mobile UI strategies",
  credits: 3
}, {
  icon: Code,
  title: "Code Refiner",
  desc: "Optimize code for production",
  credits: 2
}, {
  icon: Gauge,
  title: "Performance Predictor",
  desc: "Predict Core Web Vitals impact",
  credits: 2
}];
const Index = () => {
  usePageMeta({
    title: "Blue Forge | Web Development Studio + AI Builder Platform",
    description: "Build. Launch. Scale. Mobile-first websites, web apps, and AI-powered products crafted with precision.",
    canonical: "https://blueforge.dev/",
    keywords: "web development, AI tools, web applications, UI/UX design, startup MVP"
  });
  return <Layout>
      <OrganizationSchema />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden glass-hero-animated">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-glow z-10" aria-hidden="true" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse z-0" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-glow-pulse z-0" style={{
        animationDelay: "1.5s"
      }} aria-hidden="true" />
        
        <div className="container mx-auto px-6 relative z-20">
          <motion.div className="max-w-4xl mx-auto text-center" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8">
              <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">Web Development Studio + AI Platform</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-logo-blue">BLUE </span>
              <span className="text-logo-forge">FORGE</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-2xl md:text-4xl font-semibold text-foreground mb-4">
              Build. Launch. Scale.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Mobile-first websites, web apps, and AI-powered products crafted with precision and built for growth.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow transition-all duration-300 text-lg px-8">
                <Link to="/contact">
                  Work with Blue Forge
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary transition-all text-lg px-8">
                <Link to="/ai-studio">
                  <Sparkles className="mr-2 w-5 h-5 text-primary" aria-hidden="true" />
                  Enter The Forge
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} aria-hidden="true">
          <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {stats.map((stat, index) => <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-4">
                  <stat.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-card/30" aria-labelledby="services-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeInUp}>
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From concept to launch, we build digital products that make an impact
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {services.map((service, index) => <motion.div key={index} variants={fadeInUp} whileHover={{
            y: -4
          }} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent-gradient transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-accent-foreground transition-colors" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* The Forge Preview */}
      <section className="py-24 relative overflow-hidden" aria-labelledby="forge-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="grid lg:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">The Forge</span>
              </div>
              <h2 id="forge-heading" className="text-3xl md:text-4xl font-bold mb-6">
                Build with AI-Powered Tools
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                The Forge provides industrial-grade tools for mobile-first development architecture blueprints, code refinement, and performance prediction.
              </p>
              <ul className="space-y-4 mb-8">
                {forgeTools.map((tool, i) => <li key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <tool.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-medium">{tool.title}</span>
                      <span className="text-muted-foreground text-sm ml-2">• {tool.credits}c</span>
                    </div>
                  </li>)}
              </ul>
              <Button asChild className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                <Link to="/ai-studio">
                  Enter The Forge
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-forge-steel border border-border shadow-elevated overflow-hidden">
                {/* Forge UI Mockup */}
                <div className="h-8 bg-forge-iron flex items-center gap-2 px-4 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-4 text-xs text-muted-foreground">The Forge</span>
                </div>
                <div className="p-4 grid grid-cols-4 gap-3 h-[calc(100%-2rem)]">
                  {/* Sidebar */}
                  <div className="col-span-1 space-y-2">
                    {forgeTools.map((tool, i) => <div key={i} className={`px-2 py-2 rounded-lg text-xs flex items-center gap-2 ${i === 0 ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`}>
                        <tool.icon className="w-4 h-4" />
                        <span className="hidden xl:inline truncate">{tool.title.split(' ')[0]}</span>
                      </div>)}
                  </div>
                  {/* Canvas */}
                  <div className="col-span-3 bg-forge-iron/50 rounded-lg p-4 flex flex-col">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Smartphone className="w-8 h-8 text-primary" aria-hidden="true" />
                        </div>
                        <p className="text-muted-foreground text-sm">Blueprint Canvas</p>
                      </div>
                    </div>
                    <div className="h-10 bg-forge-steel rounded-lg border border-border flex items-center px-4">
                      <span className="text-muted-foreground text-xs">Describe your app idea...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 border-y border-border bg-card/30" aria-label="Trusted by companies">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-8" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeInUp}>
            <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Trusted by Innovative Companies</p>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center items-center gap-8 md:gap-12" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {clientLogos.map((client, i) => <motion.div key={i} variants={fadeInUp} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <img src={client.logo} alt={client.name} className="w-8 h-8 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                <span className="text-lg font-semibold text-muted-foreground/70 hover:text-muted-foreground transition-colors">
                  {client.name}
                </span>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-card/30" aria-labelledby="tech-stack-heading">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeInUp}>
            <h2 id="tech-stack-heading" className="text-2xl font-bold mb-4">Trusted Tech Stack</h2>
            <p className="text-muted-foreground">Built with modern, battle-tested technologies</p>
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-4" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            {techStack.map((tech, i) => <motion.div key={i} variants={fadeInUp} whileHover={{
            scale: 1.05
          }} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <img src={tech.logo} alt={tech.name} className="w-6 h-6 object-contain" />
                <span className="font-medium">{tech.name}</span>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden glass-hero-animated" aria-labelledby="cta-heading">
        <div className="container mx-auto px-6 relative z-20">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Something Amazing?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground mb-8">
              Let's turn your vision into reality. Start a project with Blue Forge today.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow transition-all">
                <Link to="/contact">
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/work">View Our Work</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default Index;