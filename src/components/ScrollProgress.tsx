import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = (): React.ReactNode => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-0.5 bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
