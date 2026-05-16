import { useRef, useEffect, memo } from "react";

interface SafeVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  maskType?: "radial" | "vertical" | "none";
}

/**
 * Cross-browser safe video component for background videos.
 * Handles iOS Safari autoplay restrictions, adds webkit vendor prefixes,
 * and provides graceful fallback if video fails to play.
 */
const SafeVideo = memo(({
  src,
  className = "",
  style = {},
  opacity = 0.25,
  maskType = "vertical",
}: SafeVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari: must call play() after user interaction context or muted
    // Using IntersectionObserver to only play when visible (saves battery + bandwidth)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay blocked — video will remain paused, which is fine for decorative bg
              });
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const maskStyles: Record<string, React.CSSProperties> = {
    vertical: {
      maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
    },
    radial: {
      maskImage: "radial-gradient(ellipse at center, black 25%, transparent 70%)",
      WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 70%)",
    },
    none: {},
  };

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      // @ts-expect-error — webkit-playsinline for older iOS Safari
      webkit-playsinline="true"
      preload="metadata"
      disablePictureInPicture
      aria-hidden="true"
      className={`w-full h-full object-cover select-none ${className}`}
      style={{
        opacity,
        ...maskStyles[maskType],
        ...style,
      }}
    />
  );
});

SafeVideo.displayName = "SafeVideo";

export default SafeVideo;
