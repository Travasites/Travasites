import { motion } from "framer-motion";
import React from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow' | 'lift' | 'scale';
  delay?: number;
  [key: string]: any;
}

/**
 * Premium animated card component
 * Provides smooth hover and tap interactions with various animation variants
 */
export const AnimatedCard = ({
  children,
  className = "",
  variant = 'default',
  delay = 0,
  ...props
}: AnimatedCardProps) => {
  const variantConfigs = {
    default: {
      whileHover: { y: -4, transition: { duration: 0.2 } },
      whileTap: { scale: 0.98 },
    },
    glow: {
      whileHover: {
        boxShadow: "0 0 30px rgba(199, 140, 48, 0.4)",
        y: -4,
        transition: { duration: 0.2 }
      },
      whileTap: { scale: 0.98 },
    },
    lift: {
      whileHover: {
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.2 }
      },
      whileTap: { scale: 0.96 },
    },
    scale: {
      whileHover: { scale: 1.02, transition: { duration: 0.2 } },
      whileTap: { scale: 0.95 },
    },
  };

  return (
    <motion.div
      className={`rounded-2xl bg-card border border-border transition-all ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      {...variantConfigs[variant]}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
