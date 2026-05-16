import { motion } from "framer-motion";

interface BouncingTextProps {
  text: string;
}

const BouncingText = ({ text }: BouncingTextProps) => {
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
          animate={{
            y: [0, -16, 0, 6, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatDelay: 2,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

export default BouncingText;
