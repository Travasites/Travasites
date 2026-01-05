import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
  };

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
              Start a <span className="text-gradient">Project</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Tell us about your project and we'll get back to you within 24 hours
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={stagger}
              >
                <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your name"
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="you@company.com"
                      required
                      className="h-12"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Company name"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <Input 
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="e.g., $5k - $10k"
                      className="h-12"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium mb-2">Project Details</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={6}
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Button type="submit" size="lg" className="w-full bg-accent-gradient text-accent-foreground hover:shadow-glow">
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="text-muted-foreground">
                  Prefer to reach out directly? Here's how you can connect with us.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                <a 
                  href="mailto:hello@blueforge.dev"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm text-muted-foreground">hello@blueforge.dev</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h4 className="font-medium mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
