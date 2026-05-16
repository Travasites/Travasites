import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  words?: string[];
  interval?: number;
  gradient?: boolean;
}

const defaultWords = ["WEB DEV", "NEXT.JS", "SUPABASE", "VERCEL"];

const RotatingText = ({ words = defaultWords, interval = 2500, gradient = true }: RotatingTextProps) => {
  const [index, setIndex] = useState(0);
  const sizerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const gradientStyle = gradient
    ? {
        background: "linear-gradient(90deg, hsl(270 80% 60%), hsl(290 70% 50%))",
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent",
        backgroundClip: "text" as const,
      }
    : {};

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      {/* Invisible sizer — dynamically follows current word for smooth width transitions */}
      <span
        ref={sizerRef}
        className="invisible whitespace-nowrap"
        style={{ transition: "width 0.4s ease" }}
        aria-hidden="true"
      >
        {words[index]}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-0 top-0 w-full h-full flex items-center justify-center whitespace-nowrap"
          style={gradientStyle}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
