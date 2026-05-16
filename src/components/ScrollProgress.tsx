import { useState, useEffect } from "react";

export const ScrollProgress = (): React.ReactNode => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        setProgress(scrollTop / docHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-16 md:top-20 left-0 right-0 h-[3px] z-[99] pointer-events-none"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        className="h-full bg-primary origin-left"
        style={{
          transform: `scaleX(${progress})`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
