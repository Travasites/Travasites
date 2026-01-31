import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Lightbulb, Wrench, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import founderProfile from "@/assets/founder-profile.jpeg";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CEO",
    company: "TechStart Inc",
    rating: 5,
    quote: "Blue Forge transformed our online presence completely. Their attention to detail and commitment to delivering a fast, modern website exceeded our expectations. Highly recommend!"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Founder",
    company: "GrowthLab",
    rating: 5,
    quote: "Working with Blue Forge was a game-changer for our startup. They delivered our MVP in record time without compromising on quality. The AI integration features are phenomenal."
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Elevate Digital",
    rating: 5,
    quote: "The team at Blue Forge truly understands modern web development. Our new platform is lightning fast and our conversion rates have improved significantly since launch."
  },
  {
    id: "4",
    name: "David Kim",
    role: "CTO",
    company: "InnovateTech",
    rating: 5,
    quote: "Professional, responsive, and technically excellent. Blue Forge delivered a complex web application that our users love. Their code quality is top-notch."
  }
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

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

const stack = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "TailwindCSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Cloudflare", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
];

const About = () => {
  usePageMeta({
    title: "About Us | Blue Forge",
    description: "Learn about Blue Forge - a web development studio and AI builder platform dedicated to crafting exceptional digital experiences.",
    canonical: "https://blueforge.dev/about",
  });

  return (
    <Layout>
      <section className="py-24 relative overflow-hidden glass-hero-animated">
        <div className="absolute inset-0 bg-glow z-10" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-20">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-primary">Blue Forge</span></motion.h1>
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
                <span className="text-3xl font-bold text-primary">{item.step}</span>
                <h3 className="text-lg font-semibold mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet the Founder</h2>
              <p className="text-muted-foreground">The face behind Blue Forge</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                    <img
                      src={founderProfile}
                      alt="Founder of Blue Forge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl -z-10" />
                </div>
              </div>

              {/* Bio Content */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Wisdom</h3>
                <p className="text-primary font-medium mb-4">Founder & Lead Developer</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Passionate about crafting exceptional digital experiences, I founded Blue Forge with a vision to help businesses thrive in the digital age. With years of experience in full-stack development and a deep understanding of modern web technologies, I bring a unique blend of technical expertise and creative problem-solving to every project.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  My mission is to bridge the gap between complex technology and business needs, delivering solutions that are not only powerful but also intuitive and user-friendly.
                </p>
                <Button asChild variant="outline" className="hover:border-primary/50">
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">Trusted by businesses worldwide</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all"
              >
                {/* Header: Avatar + Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
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
              <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className="w-6 h-6 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden glass-hero-animated">
        <div className="container mx-auto px-6 relative z-20">
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
