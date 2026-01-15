import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends Omit<ButtonProps, 'variant'> {
  children: React.ReactNode;
  variant?: 'default' | 'glow' | 'pulse' | 'float';
  animated?: boolean;
  ripple?: boolean;
}

/**
 * Premium animated button with ripple and hover effects
 */
export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({
    children,
    variant = 'default',
    animated = true,
    ripple = false,
    className = "",
    ...props
  }, ref) => {
    const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number } | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setRippleEffect({ x, y });
        setTimeout(() => setRippleEffect(null), 600);
      }
      props.onClick?.(e);
    };

    const variantConfig = {
      default: {
        whileHover: animated ? { scale: 1.02 } : undefined,
        whileTap: animated ? { scale: 0.98 } : undefined,
      },
      glow: {
        whileHover: animated ? {
          scale: 1.02,
          boxShadow: "0 0 20px rgba(199, 140, 48, 0.4)"
        } : undefined,
        whileTap: animated ? { scale: 0.98 } : undefined,
      },
      pulse: {
        animate: {
          boxShadow: [
            "0 0 0 0 rgba(199, 140, 48, 0.4)",
            "0 0 0 10px rgba(199, 140, 48, 0)"
          ]
        },
        transition: { duration: 2, repeat: Infinity },
      },
      float: {
        whileHover: animated ? {
          y: -4,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
        } : undefined,
        whileTap: animated ? { scale: 0.95 } : undefined,
      }
    };

    return (
      <motion.div
        {...variantConfig[variant]}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative inline-block"
      >
        <Button
          ref={ref}
          className={`relative overflow-hidden ${className}`}
          onClick={handleClick}
          {...props}
        >
          {children}
          {ripple && rippleEffect && (
            <motion.span
              className="absolute block pointer-events-none bg-white/20 rounded-full"
              initial={{
                width: 0,
                height: 0,
                left: rippleEffect.x,
                top: rippleEffect.y,
                transform: "translate(-50%, -50%)"
              }}
              animate={{
                width: 400,
                height: 400,
                left: rippleEffect.x,
                top: rippleEffect.y,
                transform: "translate(-50%, -50%)"
              }}
              transition={{ duration: 0.6 }}
            />
          )}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
