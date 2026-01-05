import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50" role="contentinfo">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              aria-label="Blue Forge - Home"
            >
              <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-foreground" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold">
                BLUE <span className="text-gradient">FORGE</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Web Development Studio + AI Builder Platform
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services navigation">
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/services" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  AI Integration
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  MVP Support
                </Link>
              </li>
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Products navigation">
            <h4 className="font-semibold text-foreground mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/ai-studio" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  AI Studio
                </Link>
              </li>
              <li>
                <Link to="/products/prompt-generator" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  Prompt Generator
                </Link>
              </li>
              <li>
                <Link to="/products/content-ad-maker" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  Content Ad Maker
                </Link>
              </li>
              <li>
                <Link to="/labs" className="hover:text-primary transition-colors focus:outline-none focus-visible:underline">
                  Labs
                </Link>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              <a 
                href="https://github.com/blueforge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Visit Blue Forge on GitHub"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com/blueforge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Follow Blue Forge on Twitter"
              >
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com/company/blueforge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Connect with Blue Forge on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </a>
              <a 
                href="mailto:hello@blueforge.dev"
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Email Blue Forge"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Blue Forge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
