import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Code2, 
  Palette, 
  Server, 
  Brain, 
  Rocket,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Mobile-first, SEO-optimized websites that load lightning fast and convert visitors into customers.",
    features: ["Responsive Design", "SEO Optimization", "Performance Focused", "CMS Integration"]
  },
  {
    icon: Code2,
    title: "Web Application Development",
    description: "Scalable web applications built with modern frameworks and best practices.",
    features: ["React/Next.js", "Real-time Features", "API Development", "Cloud Deployment"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love to interact with.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description: "Robust server infrastructure and APIs that power your applications.",
    features: ["RESTful APIs", "Database Design", "Authentication", "Cloud Infrastructure"]
  },
  {
    icon: Brain,
    title: "AI Integration",
    description: "Smart AI-powered features that enhance user experience and automate workflows.",
    features: ["OpenAI Integration", "Custom AI Models", "Chatbots", "Content Generation"]
  },
  {
    icon: Rocket,
    title: "MVP & Startup Support",
    description: "Launch your startup fast with our rapid MVP development process.",
    features: ["Rapid Prototyping", "Tech Consulting", "Scalable Architecture", "Launch Support"]
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Services = () => {
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
              Our <span className="text-gradient">Services</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Full-stack development services to bring your digital vision to life
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="grid lg:grid-cols-2 gap-8 p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
              Let's Build Together
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">
              Ready to start your project? Get in touch for a free consultation.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                <Link to="/contact">
                  Get a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Book a Call</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
