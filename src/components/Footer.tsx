import { Link } from "react-router-dom";
import { ArrowRight, Twitter, Github, Linkedin, Mail } from "lucide-react";
import sectionBg from "@/assets/Home_Section_Image.jpeg";

export const Footer = (): React.ReactNode => {
  return (
    <footer className="bg-black border-t border-border/30" role="contentinfo">
      {/* CTA Banner */}
      <div className="container mx-auto px-6 py-20">
        <div className="relative rounded-3xl border border-primary/20 p-8 pt-48 sm:pt-56 md:p-16 overflow-hidden bg-black min-h-[400px] md:min-h-0 flex items-end md:items-center justify-center">
          {/* Background image with edge blending */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <img
              src={sectionBg}
              alt=""
              className="w-full h-full object-cover opacity-40"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
              }}
            />
          </div>
          
          <div className="relative z-10 text-center w-full">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Ready to Launch Your Store?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl md:mx-auto mb-6 md:mb-8">
              Let&apos;s build an e-commerce platform that actually converts. No templates, no shortcuts — just clean, custom code.
            </p>
            <a
              href="https://wa.link/70h2f1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-white font-semibold text-base sm:text-lg hover:bg-primary/90 transition-all duration-300"
            >
              Book a Free Consultation
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link
              to="/"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              aria-label="Travasites - Home"
            >
              <span className="text-2xl font-display font-bold tracking-tight text-white">
                TRAVASITES
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building, managing Next.js + Supabase e-commerce platforms that scale long term. Real builds, no templates.
            </p>
            <div className="flex gap-3" role="list" aria-label="Social media links">
              <a
                href="https://twitter.com/travasites"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/20 border border-border/30 hover:border-primary/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Follow Travasites on Twitter"
              >
                <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/travasites"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/20 border border-border/30 hover:border-primary/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Visit Travasites on GitHub"
              >
                <Github className="w-4 h-4 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/wisdom-a-b02587331/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-primary/20 border border-border/30 hover:border-primary/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:underline">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:underline">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services navigation">
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/services" className="hover:text-primary transition-colors duration-300">
                  Custom E-Commerce Build
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors duration-300">
                  Store Management
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors duration-300">
                  Performance Optimization
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors duration-300">
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                <a href="mailto:travasites@gmail.com" className="hover:text-primary transition-colors duration-300">
                  travasites@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-primary" aria-hidden="true" />
                <a href="https://twitter.com/travasites" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                  @travasites
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="https://wa.link/70h2f1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-all duration-300"
              >
                Book a Call
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Travasites. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
