// Shared animation variants for Framer Motion
import { Variants } from "framer-motion";

// Basic fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

// Stagger container variants
export const stagger: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

// Card hover animation (for use with whileHover)
export const cardHover = {
  y: -4,
  transition: { duration: 0.2, ease: "easeOut" }
};

// Button press animation (for use with whileTap)
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Floating animation for decorative elements
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Pulse glow animation
export const pulseGlow = {
  opacity: [0.4, 0.8, 0.4],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// ==================== PREMIUM INTERACTIVE ANIMATIONS ====================

// Slide in animations (entrance)
export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// Rotate entrance
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { opacity: 1, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Bounce entrance
export const bounceIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 10
    } 
  }
};

// Hover effects for interactive elements
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" }
};

export const hoverLift = {
  y: -8,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  transition: { duration: 0.2, ease: "easeOut" }
};

export const hoverGlow = {
  boxShadow: "0 0 30px rgba(199, 140, 48, 0.4)",
  transition: { duration: 0.2 }
};

// Tap/Click animations
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

export const tapRotate = {
  rotate: 5,
  transition: { duration: 0.1 }
};

// Scroll reveal animation (for whileInView)
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Loading shimmer effect
export const shimmer = {
  animate: {
    backgroundPosition: ["0% 0%", "200% 0%"],
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  }
};

// Pulsing scale (breathing effect)
export const breathe = {
  scale: [1, 1.02, 1],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
};

// Icon spin animation
export const spin = {
  rotate: [0, 360],
  transition: { duration: 2, repeat: Infinity, ease: "linear" }
};

// Icon bounce (vertical)
export const bounce = {
  y: [0, -8, 0],
  transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
};

// Icon wobble (horizontal)
export const wobble = {
  x: [0, -4, 4, -4, 0],
  transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
};

// Swirl animation (combined rotate + scale)
export const swirl = {
  rotate: [0, 360],
  scale: [1, 1.1, 1],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
};

// Flash animation (for alerts/notifications)
export const flash = {
  opacity: [1, 0.5, 1],
  transition: { duration: 0.6, repeat: 3, ease: "easeInOut" }
};

// Shake animation (for errors)
export const shake = {
  x: [-10, 10, -10, 10, 0],
  transition: { duration: 0.4, ease: "easeInOut" }
};

// Success checkmark animation
export const successCheck = {
  scale: [0, 1.2, 1],
  opacity: [0, 1, 1],
  transition: { duration: 0.6, ease: "easeOut" }
};

// Stagger list animations (for multiple items)
export const staggerList: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      duration: 0.4
    }
  }
};

export const staggerListItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

// Gradient animation (for gradient backgrounds)
export const gradientShift = {
  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  transition: { duration: 8, repeat: Infinity, ease: "ease-in-out" }
};

// Parallax animation (for hero sections)
export const parallaxHero = {
  y: [0, 30],
  transition: { duration: 0.5, ease: "easeOut" }
};

// Card flip animation
export const cardFlip = {
  rotateY: [0, 360],
  transition: { duration: 0.8, ease: "easeInOut" }
};

// Text reveal (line by line)
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Combine animations for cards
export const cardEnter: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Button group stagger
export const buttonGroupStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const buttonItemVariant: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};
