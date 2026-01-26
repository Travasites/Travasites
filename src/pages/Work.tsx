import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fadeInUp, stagger } from "@/lib/animations";
import ProjectCaseStudyModal, { type Project } from "@/components/ProjectCaseStudyModal";

// Import e-commerce screenshots
import ecommerceHero from "@/assets/projects/ecommerce-hero.png";
import ecommerceProducts from "@/assets/projects/ecommerce-products.png";
import ecommerceCart from "@/assets/projects/ecommerce-cart.png";
import ecommerceReviews from "@/assets/projects/ecommerce-reviews.png";
import ecommerceFooter from "@/assets/projects/ecommerce-footer.png";

const projects: Project[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    category: "Web Application",
    shortDescription: "Full-stack e-commerce solution with AI-powered product recommendations.",
    fullDescription: "A complete e-commerce platform built for a premium skincare brand, featuring a modern design, seamless user experience, and AI-powered product recommendations. The platform handles everything from product browsing to secure checkout, with integrated inventory management and customer analytics.",
    challenge: "The client needed a modern e-commerce platform that could compete with industry giants while maintaining their brand's premium aesthetic. They required real-time inventory management, personalized product recommendations, and a checkout process that minimized cart abandonment.",
    solution: "We built a full-stack solution using React for the frontend and Node.js for the backend. The platform features lazy-loaded product galleries, AI-powered recommendations based on browsing behavior, and a streamlined checkout flow. We implemented real-time inventory sync and integrated with multiple payment providers for global reach.",
    results: [
      { metric: "300%", label: "Increase in conversion rate" },
      { metric: "5x", label: "Faster page load times" },
      { metric: "10K+", label: "Monthly active users" }
    ],
    technologies: ["React", "Node.js", "TailwindCSS", "AI Integration", "PostgreSQL", "Stripe"],
    thumbnail: ecommerceHero,
    screenshots: [ecommerceHero, ecommerceProducts, ecommerceCart, ecommerceReviews, ecommerceFooter],
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "Web Application",
    shortDescription: "Analytics dashboard with real-time data visualization and reporting.",
    fullDescription: "A comprehensive analytics dashboard designed for SaaS companies to track key metrics, visualize data trends, and generate automated reports. The platform provides real-time insights into user behavior, revenue metrics, and operational efficiency.",
    challenge: "The client was struggling with scattered data across multiple tools, making it difficult to get a unified view of their business performance. They needed a centralized dashboard that could aggregate data from various sources and present actionable insights.",
    solution: "We developed a custom dashboard using React with Recharts for visualizations. The backend aggregates data from multiple APIs including Stripe, Mixpanel, and their internal systems. We implemented caching strategies to ensure fast load times even with large datasets.",
    results: [
      { metric: "50%", label: "Reduction in reporting time" },
      { metric: "24/7", label: "Real-time monitoring" },
      { metric: "15+", label: "Integrated data sources" }
    ],
    technologies: ["React", "TypeScript", "Recharts", "Node.js", "Redis", "PostgreSQL"],
    screenshots: [],
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: "healthcare-portal",
    title: "Healthcare Portal",
    category: "Website",
    shortDescription: "Patient portal with appointment scheduling and telemedicine integration.",
    fullDescription: "A secure healthcare portal enabling patients to manage appointments, access medical records, and connect with healthcare providers through integrated telemedicine features. Built with strict HIPAA compliance and accessibility standards.",
    challenge: "The healthcare provider needed to modernize their patient experience while maintaining strict security and compliance requirements. They wanted to reduce administrative overhead and improve patient engagement through digital channels.",
    solution: "We created a secure, HIPAA-compliant portal with end-to-end encryption. The platform features a smart scheduling system that optimizes appointment slots, video consultation integration, and secure messaging. We implemented role-based access control and comprehensive audit logging.",
    results: [
      { metric: "10K+", label: "Monthly active users" },
      { metric: "60%", label: "Reduction in no-shows" },
      { metric: "4.8★", label: "Patient satisfaction" }
    ],
    technologies: ["React", "Node.js", "WebRTC", "PostgreSQL", "AWS", "HIPAA Compliant"],
    screenshots: [],
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "ai-content-platform",
    title: "AI Content Platform",
    category: "AI Integration",
    shortDescription: "Content generation platform with custom AI models for marketing teams.",
    fullDescription: "An AI-powered content generation platform that helps marketing teams create high-quality content at scale. Features include blog post generation, social media content, email campaigns, and brand voice customization using fine-tuned language models.",
    challenge: "The marketing agency was spending too much time on content creation, limiting their ability to scale. They needed a solution that could generate on-brand content quickly while maintaining quality and consistency across channels.",
    solution: "We built a platform powered by fine-tuned AI models that understand the client's brand voice. The system generates content suggestions, allows for easy editing, and learns from user feedback to improve over time. We integrated with popular marketing tools for seamless workflow.",
    results: [
      { metric: "5x", label: "Faster content production" },
      { metric: "80%", label: "First-draft acceptance rate" },
      { metric: "100+", label: "Brand voices trained" }
    ],
    technologies: ["React", "Python", "OpenAI", "TailwindCSS", "FastAPI", "PostgreSQL"],
    screenshots: [],
    gradient: "from-orange-500 to-pink-500"
  }
];

const gradients = {
  "gradient-1": "from-blue-500 to-purple-500",
  "gradient-2": "from-cyan-500 to-blue-500",
  "gradient-3": "from-green-500 to-emerald-500",
  "gradient-4": "from-orange-500 to-pink-500"
};

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  usePageMeta({
    title: 'Our Work | Blue Forge',
    description: 'Featured projects and case studies showcasing Blue Forge expertise.',
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

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
              Our <span className="text-primary">Work</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              Featured projects and case studies showcasing our expertise
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image/Thumbnail Area */}
                <div className="relative aspect-video overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm" />
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      variant="secondary" 
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Case Study
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">{project.results[0].metric} {project.results[0].label.toLowerCase()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden glass-hero-animated">
        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-6">
              Ready to Start Your Project?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground mb-8">
              Let's discuss how we can help bring your vision to life.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button asChild size="lg" className="bg-accent-gradient text-accent-foreground hover:shadow-glow">
                <Link to="/contact">
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </Layout>
  );
};

export default Work;
