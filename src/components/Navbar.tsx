import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
];

export const Navbar = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-strong shadow-card"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
            aria-label="Travasites - Home"
          >
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
              TRAVASITES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                role="menuitem"
                aria-current={
                  location.pathname === link.path ? "page" : undefined
                }
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  location.pathname === link.path
                    ? "text-white bg-primary/20 border border-primary/30"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Book a Call CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.link/70h2f1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Book a Call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border/30"
            role="menu"
          >
            <div className="container mx-auto px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  role="menuitem"
                  aria-current={
                    location.pathname === link.path ? "page" : undefined
                  }
                  className={`block px-5 py-3.5 rounded-xl text-base font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    location.pathname === link.path
                      ? "text-white bg-primary/20 border border-primary/30"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://wa.link/70h2f1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-4 px-6 py-3.5 rounded-xl bg-primary text-white font-medium text-base hover:bg-primary/90 transition-all"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};