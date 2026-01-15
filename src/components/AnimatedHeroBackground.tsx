import { motion } from "framer-motion";
import React from "react";

/**
 * Animated hero background component
 * Features: Gradient mesh animation with floating glowing orbs
 */
export const AnimatedHeroBackground: React.FC = () => {
  // Animated gradient stops
  const gradients = [
    "linear-gradient(135deg, #1a0033 0%, #2d1b4e 25%, #0a3a4a 50%, #1f2d4a 75%, #1a0033 100%)",
    "linear-gradient(225deg, #0a3a4a 0%, #1a0033 25%, #2d1b4e 50%, #1f2d4a 75%, #0a3a4a 100%)",
    "linear-gradient(315deg, #1f2d4a 0%, #0a3a4a 25%, #1a0033 50%, #2d1b4e 75%, #1f2d4a 100%)",
    "linear-gradient(135deg, #1a0033 0%, #2d1b4e 25%, #0a3a4a 50%, #1f2d4a 75%, #1a0033 100%)"
  ];

  // Floating orbs configuration
  const orbs = [
    {
      id: 1,
      size: "w-96 h-96",
      colors: "bg-primary/5",
      x: -100,
      y: 100,
      duration: 20,
      delay: 0
    },
    {
      id: 2,
      size: "w-80 h-80",
      colors: "bg-accent/5",
      x: 400,
      y: -50,
      duration: 25,
      delay: 2
    },
    {
      id: 3,
      size: "w-72 h-72",
      colors: "bg-purple-500/5",
      x: -50,
      y: -200,
      duration: 30,
      delay: 4
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{ background: gradients }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      />

      {/* Floating glowing orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute ${orb.size} ${orb.colors} rounded-full blur-3xl`}
          animate={{
            x: [0, orb.x, 0],
            y: [0, orb.y, 0]
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
    </div>
  );
};

/**
 * Alternative: Grid + Glow Lines background
 */
export const GridGlowBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(199, 140, 48, .1) 25%, rgba(199, 140, 48, .1) 26%, transparent 27%, transparent 74%, rgba(199, 140, 48, .1) 75%, rgba(199, 140, 48, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(199, 140, 48, .1) 25%, rgba(199, 140, 48, .1) 26%, transparent 27%, transparent 74%, rgba(199, 140, 48, .1) 75%, rgba(199, 140, 48, .1) 76%, transparent 77%, transparent)",
          backgroundSize: "50px 50px"
        }}
      />

      {/* Animated glow lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        animate={{
          y: ["0%", "100%"]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Side glow */}
      <div className="absolute -left-40 top-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -right-40 bottom-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
};

/**
 * Alternative: Particle system background
 */
export const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background opacity-50" />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/40 rounded-full blur-sm"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`
          }}
          animate={{
            y: [-20, -window.innerHeight - 20],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

/**
 * Alternative: Aurora effect background
 */
export const AuroraBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      {/* Aurora stripes */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: "repeating-linear-gradient(90deg, transparent 0%, rgba(199, 140, 48, 0.1) 25%, transparent 50%, rgba(24, 144, 255, 0.1) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
          filter: "blur(40px)"
        }}
      />

      {/* Accent glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
};

export default AnimatedHeroBackground;
