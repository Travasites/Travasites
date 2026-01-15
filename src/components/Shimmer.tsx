import { motion } from "framer-motion";
import React from "react";

interface ShimmerProps {
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

/**
 * Loading shimmer skeleton component
 * Displays a shimmering animation while content is loading
 */
export const Shimmer: React.FC<ShimmerProps> = ({
  width = "100%",
  height = "1rem",
  className = "",
  count = 1
}) => {
  const shimmerGradient = `linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  )`;

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            width,
            height,
            backgroundSize: "200% 100%",
            backgroundImage: shimmerGradient,
            backgroundColor: "hsl(var(--forge-steel))"
          }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="rounded-lg"
        />
      ))}
    </div>
  );
};

/**
 * Card shimmer skeleton
 */
export const CardShimmer: React.FC<{ count?: number }> = ({ count = 1 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="p-6 rounded-2xl bg-card border border-border">
        <Shimmer width="40%" height="1.5rem" className="mb-4" />
        <Shimmer height="1rem" count={3} />
      </div>
    ))}
  </div>
);

/**
 * Table row shimmer skeleton
 */
export const TableRowShimmer: React.FC<{ columns?: number }> = ({ columns = 4 }) => (
  <div className="flex gap-4">
    {Array.from({ length: columns }).map((_, i) => (
      <Shimmer key={i} width={`${100 / columns}%`} height="2rem" />
    ))}
  </div>
);

export default Shimmer;
