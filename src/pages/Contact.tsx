import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MessageSquare, Send, Github, Linkedin, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(255, "Email is too long"),
  company: z.string().max(100, "Company name is too long").optional(),
  budget: z.string().max(50, "Budget range is too long").optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  // Honeypot field for spam protection
  website: z.string().max(0, "").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  usePageMeta({
    title: "Contact Us | Blue Forge",
    description: "Start a project with Blue Forge. Tell us about your project and we'll get back to you within 24 hours.",
    canonical: "https://blueforge.dev/contact",
  });

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
      website: "",
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot - if filled, silently reject
    if (data.website) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    reset();
  };

  if (isSuccess) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center py-24 relative overflow-hidden glass-hero-animated">
          <div className="absolute inset-0 bg-glow z-10" aria-hidden="true" />
          <motion.div 
            className="container mx-auto px-6 relative z-20 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-500" aria-hidden="true" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Message Sent!</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for reaching out. We'll review your message and get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setIsSuccess(false)} 
              variant="outline"
              size="lg"
            >
              Send Another Message
            </Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

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
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              Start a <span className="text-primary">Project</span>
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
              variants={staggerContainer}
            >
              <motion.form 
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                variants={staggerContainer}
                noValidate
              >
                {/* Honeypot field - hidden from users */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    {...register("website")}
                    type="text"
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      {...register("name")}
                      id="name"
                      placeholder="Your name"
                      className={`h-12 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      className={`h-12 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input 
                      {...register("company")}
                      id="company"
                      placeholder="Company name"
                      className={`h-12 ${errors.company ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive mt-1" role="alert">
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <Input 
                      {...register("budget")}
                      id="budget"
                      placeholder="e.g., $5k - $10k"
                      className={`h-12 ${errors.budget ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {errors.budget && (
                      <p className="text-sm text-destructive mt-1" role="alert">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Project Details <span className="text-destructive">*</span>
                  </label>
                  <Textarea 
                    {...register("message")}
                    id="message"
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={6}
                    className={errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent-gradient text-accent-foreground hover:shadow-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Prefer to reach out directly? Here's how you can connect with us.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                <a 
                  href="mailto:blueforgedev@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm text-muted-foreground">blueforgedev@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h3 className="font-medium mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/blueforgedev" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Visit Blue Forge on GitHub"
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/wisdom-a-b02587331/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Connect with Blue Forge on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
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
