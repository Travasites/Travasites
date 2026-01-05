import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  usePageMeta({
    title: "Page Not Found | Blue Forge",
    description: "The page you're looking for doesn't exist. Return to Blue Forge homepage.",
  });

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-24 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="text-8xl md:text-9xl font-bold text-gradient mb-6"
            >
              404
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Page Not Found
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground mb-10"
            >
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-accent-gradient text-accent-foreground hover:shadow-glow transition-all"
              >
                <Link to="/">
                  <Home className="mr-2 w-5 h-5" aria-hidden="true" />
                  Back to Home
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
              >
                <Link to="/contact">
                  <Search className="mr-2 w-5 h-5" aria-hidden="true" />
                  Contact Support
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "Services", path: "/services" },
                  { name: "AI Studio", path: "/ai-studio" },
                  { name: "Work", path: "/work" },
                  { name: "About", path: "/about" },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
