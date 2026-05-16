import { motion } from "framer-motion";

interface FloatingTextProps {
  text: string;
}

const FloatingText = ({ text }: FloatingTextProps) => {
  const letters = text.split("");

  return (
    <span className="inline-flex" aria-label={text}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="inline-block"
          style={{
            background: "linear-gradient(90deg, hsl(270 80% 60%), hsl(290 70% 50%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: [20, 0, -6, 0, 4, 0],
            opacity: 1,
          }}
          transition={{
            y: {
              duration: 2.4,
              delay: 0.4 + i * 0.08,
              ease: "easeInOut",
              times: [0, 0.3, 0.5, 0.65, 0.8, 1],
            },
            opacity: {
              duration: 0.8,
              delay: 0.4 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

export default FloatingText;
