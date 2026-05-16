import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import loadingBgVideo from "@/assets/Background_Loading_animation_Video.mp4";

interface LoadingScreenProps {
  onComplete: () => void;
}

const VIDEO_SOLO_DURATION = 2500; // ms the video plays alone before loading UI appears
const VIDEO_TIMEOUT = 4000; // ms to wait for video before proceeding without it

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<
    "videoSolo" | "loading" | "fadeContent" | "splitOpen" | "done"
  >("videoSolo");
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const videoReadyFiredRef = useRef(false);

  // Smooth progress animation using requestAnimationFrame
  const animateProgress = useCallback(() => {
    const TOTAL_DURATION = 1800; // ms for 0→100

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);

      // Ease-out curve for natural feel
      const eased = 100 * (1 - Math.pow(1 - rawProgress / 100, 2.5));
      const rounded = Math.min(Math.round(eased), 100);

      if (rounded !== progressRef.current) {
        progressRef.current = rounded;
        setProgress(rounded);
      }

      if (rounded < 100) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Start video as soon as it's ready
  const handleVideoReady = useCallback(() => {
    if (videoReadyFiredRef.current) return; // prevent double-fire
    videoReadyFiredRef.current = true;

    if (videoRef.current) {
      // iOS Safari: must use play() promise pattern
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — proceed without video
        });
      }
    }
    setVideoReady(true);
  }, []);

  // CRITICAL FIX: Timeout fallback for iOS Safari and other browsers
  // where video events may never fire (autoplay restrictions, slow load, etc.)
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoReadyFiredRef.current) {
        videoReadyFiredRef.current = true;
        setVideoReady(true);
      }
    }, VIDEO_TIMEOUT);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // After video plays solo for VIDEO_SOLO_DURATION, transition to loading phase
  useEffect(() => {
    if (!videoReady) return;

    const timer = setTimeout(() => {
      setPhase("loading");
    }, VIDEO_SOLO_DURATION);

    return () => clearTimeout(timer);
  }, [videoReady]);

  // Start progress animation when entering "loading" phase
  useEffect(() => {
    if (phase === "loading") {
      animateProgress();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, animateProgress]);

  // Phase transitions after progress completes
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setPhase("fadeContent"), 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (phase === "fadeContent") {
      const timer = setTimeout(() => setPhase("splitOpen"), 600);
      return () => clearTimeout(timer);
    }
    if (phase === "splitOpen") {
      const timer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const isContentVisible = phase === "loading";
  const isExiting = phase === "fadeContent" || phase === "splitOpen";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* ─── Video background — plays throughout all phases ─── */}
      <motion.div
        className="absolute inset-0 z-[10000] pointer-events-none"
        animate={{
          opacity: isExiting ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          src={loadingBgVideo}
          muted
          loop
          playsInline
          // @ts-expect-error — webkit-playsinline is needed for older iOS Safari
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          onCanPlayThrough={handleVideoReady}
          onLoadedData={handleVideoReady}
          onLoadedMetadata={handleVideoReady}
          className="w-full h-full object-cover select-none"
          style={{
            opacity: phase === "videoSolo" ? 0.35 : 0.25,
            transition: "opacity 0.8s ease-in-out",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        />
        {/* Vignette overlay during video-solo phase */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, black 80%)",
          }}
          animate={{
            opacity: phase === "videoSolo" ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ─── Top curtain ─── */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-black z-[9999]"
        animate={{
          y: phase === "splitOpen" ? "-100%" : "0%",
        }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ─── Bottom curtain ─── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black z-[9999]"
        animate={{
          y: phase === "splitOpen" ? "100%" : "0%",
        }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ─── Thin purple accent line at the split seam ─── */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] z-[10000]"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, hsl(270, 80%, 60%, 0.6) 30%, hsl(290, 70%, 50%, 0.6) 70%, transparent 95%)",
        }}
        animate={{
          opacity: phase === "splitOpen" ? 0 : phase === "fadeContent" ? 1 : 0,
          scaleX:
            phase === "splitOpen" ? 1.5 : phase === "fadeContent" ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* ─── Content overlay — loading UI fades in after video solo phase ─── */}
      <AnimatePresence>
        {(isContentVisible || isExiting) && (
          <motion.div
            className="absolute inset-0 z-[10001] flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 0.95 : 1,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 mb-8"
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] text-white"
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Helvetica Neue', system-ui, sans-serif",
                }}
              >
                TRAVASITES
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 text-xs sm:text-sm tracking-[0.3em] text-white/40 font-medium mb-12 uppercase"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
              }}
            >
              E-Comm Web Dev
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="relative z-10 w-48 sm:w-64"
            >
              {/* Track */}
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                {/* Fill */}
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, hsl(270, 80%, 60%), hsl(290, 70%, 50%))",
                    transition: "width 60ms linear",
                  }}
                />
              </div>

              {/* Percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-between items-center mt-3"
              >
                <span className="text-[10px] text-white/30 tracking-widest uppercase">
                  Loading
                </span>
                <span
                  className="text-xs tabular-nums text-white/50 font-medium"
                  style={{
                    fontFamily: "'SF Mono', 'JetBrains Mono', monospace",
                  }}
                >
                  {progress}%
                </span>
              </motion.div>
            </motion.div>

            {/* Bottom decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-px origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(270, 80%, 60%, 0.4), transparent)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingScreen;
