import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
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
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary transition-colors">Website Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Web Applications</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">AI Integration</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">MVP Support</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/ai-studio" className="hover:text-primary transition-colors">AI Studio</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Prompt Generator</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Content Ad Maker</Link></li>
              <li><Link to="/labs" className="hover:text-primary transition-colors">Labs</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Blue Forge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
