"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, useSpring, AnimatePresence } from "framer-motion";
import { Cinzel_Decorative } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import avLogoGold from "@/image/icon/Vector 6914.svg";
import textLogoGold from "@/image/icon/Group 6356227.svg";
import textLogoWhite from "@/image/icon/Group 6356228.svg";

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frameCount = 240;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    mass: 1,
    restDelta: 0.001
  });

  const currentIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);

  const text1Opacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const text2Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const text3Opacity = useTransform(smoothProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const text4Opacity = useTransform(smoothProgress, [0.85, 0.95, 1], [0, 1, 1]);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const imagesLoadedRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastIndexRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !(window as any)._isAppLoaded;
    }
    return true; // default true for SSR
  });
  const [displayProgress, setDisplayProgress] = useState(0);

  // Setup canvas resolution and cached context once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1920;
    canvas.height = 1080;
    ctxRef.current = canvas.getContext("2d", { alpha: false, desynchronized: true });
  }, []);

  const drawFrame = (index: number) => {
    if (index === lastIndexRef.current) return;
    
    // Find exact image or nearest available loaded frame
    let img = imagesRef.current[index - 1];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < 35; offset++) {
        const prev = imagesRef.current[index - 1 - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current[index - 1 + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, 1920, 1080);
    lastIndexRef.current = index;
  };

  const scheduleDraw = (index: number) => {
    const clampedIndex = Math.min(Math.max(1, index), frameCount);
    if (clampedIndex === lastIndexRef.current) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(clampedIndex);
      rafIdRef.current = null;
    });
  };

  // Progressive sequence loader: Frame 1 instant hero, background deferred batches for rest
  useEffect(() => {
    let isCancelled = false;

    // Helper for duplicate frames (frames with pattern i >= 13 && i % 5 === 3 are exact byte duplicates of i - 1)
    const getMasterIndex = (i: number) => {
      if (i >= 13 && i % 5 === 3) return i - 1;
      return i;
    };

    const loadedImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    imagesRef.current = loadedImages as HTMLImageElement[];

    // 1. Immediately load and draw Frame 1
    const frame1 = new window.Image();
    frame1.decoding = "async";
    frame1.src = `/image/sequence/ezgif-frame-001.jpg`;

    const onFrame1Ready = () => {
      if (isCancelled) return;
      loadedImages[0] = frame1;
      drawFrame(1);
      setDisplayProgress(100);

      // Graceful fast intro dismiss (avoids blocking LCP/TBT)
      setTimeout(() => {
        if (!isCancelled) {
          setIsLoading(false);
          if (typeof window !== "undefined") {
            (window as any)._isAppLoaded = true;
          }
        }
      }, 250);
    };

    frame1.onload = onFrame1Ready;
    frame1.onerror = onFrame1Ready;
    if (frame1.complete) {
      onFrame1Ready();
    }

    // 2. Load immediate next frames (2-12) for quick initial scroll
    const loadImmediateFrames = () => {
      if (isCancelled) return;
      for (let i = 2; i <= 12; i++) {
        const master = getMasterIndex(i);
        if (master !== i && loadedImages[master - 1]) {
          loadedImages[i - 1] = loadedImages[master - 1];
          continue;
        }
        const img = new window.Image();
        img.decoding = "async";
        const frameNumber = String(master).padStart(3, "0");
        img.src = `/image/sequence/ezgif-frame-${frameNumber}.jpg`;
        img.onload = () => {
          if (!isCancelled) loadedImages[i - 1] = img;
        };
      }
    };

    // 3. Staged idle loader for remaining frames in small non-blocking batches
    const loadRemainingFrames = () => {
      let nextIndex = 13;
      const batchSize = 6;

      const scheduleBatch = () => {
        if (isCancelled || nextIndex > frameCount) return;

        const end = Math.min(nextIndex + batchSize, frameCount + 1);
        for (let i = nextIndex; i < end; i++) {
          const master = getMasterIndex(i);
          if (master !== i && loadedImages[master - 1]) {
            loadedImages[i - 1] = loadedImages[master - 1];
            continue;
          }
          const img = new window.Image();
          img.decoding = "async";
          const frameNumber = String(master).padStart(3, "0");
          img.src = `/image/sequence/ezgif-frame-${frameNumber}.jpg`;
          img.onload = () => {
            if (!isCancelled) loadedImages[i - 1] = img;
          };
        }

        nextIndex = end;
        if (nextIndex <= frameCount) {
          if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            (window as any).requestIdleCallback(scheduleBatch, { timeout: 150 });
          } else {
            setTimeout(scheduleBatch, 50);
          }
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(scheduleBatch, { timeout: 350 });
      } else {
        setTimeout(scheduleBatch, 200);
      }
    };

    const timer1 = setTimeout(loadImmediateFrames, 120);
    const timer2 = setTimeout(loadRemainingFrames, 350);

    return () => {
      isCancelled = true;
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const target = Math.round(latest);
    scheduleDraw(target);

    // Opportunistically prioritize loading frames around active scroll position
    const start = Math.max(1, target - 2);
    const end = Math.min(frameCount, target + 10);
    for (let i = start; i <= end; i++) {
      if (!imagesRef.current[i - 1]) {
        const master = (i >= 13 && i % 5 === 3) ? i - 1 : i;
        const img = new window.Image();
        img.decoding = "async";
        const frameNumber = String(master).padStart(3, "0");
        img.src = `/image/sequence/ezgif-frame-${frameNumber}.jpg`;
        img.onload = () => {
          imagesRef.current[i - 1] = img;
        };
      }
    }
  });

  // Handle window resizing without re-rendering everything
  useEffect(() => {
    const handleResize = () => {
      if (lastIndexRef.current > 0) {
        drawFrame(lastIndexRef.current);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#0e0e0e] text-white"
          >
            {/* Top Text Logo */}
            <div className="mb-12">
              <Image src={textLogoWhite} alt="ArcheVastu" className="h-[19px] md:h-[23px] w-auto opacity-80" />
            </div>

            {/* Percentage Indicator */}
            <div className="flex items-baseline mb-8">
              <span className="text-7xl md:text-9xl font-light tracking-tighter tabular-nums text-white/90">
                {Math.round(displayProgress)}
              </span>
              <span className="text-2xl md:text-3xl font-light text-white/50 ml-2">
                %
              </span>
            </div>

            {/* Thin Progress Bar */}
            <div className="w-64 md:w-80 h-[1px] bg-white/10 mb-8 relative">
              <div
                className="absolute top-0 left-0 h-full bg-white/70 transition-all duration-300 ease-out"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            {/* Status Information */}
            <p className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-white/40">
              Preparing Image Sequence...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        This is the most bulletproof way to do background canvas sequences:
        We set the sticky container to w-full and h-screen ensuring it covers the parent width.
        By setting object-cover, it behaves identically to a background-size: cover image.
      */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover"
        />

        {/* Texts */}
        <motion.div
          style={{ opacity: text1Opacity }}
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white pointer-events-none drop-shadow-2xl ${cinzel.className}`}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <Image
              src={avLogoGold}
              alt="AV Logo"
              className="h-[64px] sm:h-[80px] md:h-[5vw] w-auto mb-4"
              priority
            />
            <Image
              src={textLogoGold}
              alt="ArcheVastu"
              className="h-[30px] sm:h-[40px] md:h-[3.5vw] w-auto drop-shadow-lg"
              priority
            />
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-sm sm:text-base md:text-xl font-light tracking-[0.3em] uppercase bg-[#161618]/60 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-3 rounded-full border border-white/10 shadow-xl"
          >
            Elevated Architecture
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity: text2Opacity }}
          className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24 pointer-events-none"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.4] text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
            Shape Your Environment.
          </h2>
          <p className="text-lg md:text-2xl font-medium mt-6 max-w-md leading-relaxed text-neutral-100 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
            We design spaces that resonate with harmony, function, and cutting-edge aesthetics.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: text3Opacity }}
          className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right pointer-events-none"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.4] text-white [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
            Beyond The Horizon.
          </h2>
          <p className="text-lg md:text-2xl font-medium mt-6 max-w-md ml-auto leading-relaxed text-neutral-100 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
            Pushing boundaries of what's possible with modern materials and timeless concepts.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: text4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white"
        >
          <h2 className="text-5xl md:text-[6vw] leading-none font-bold tracking-tighter mb-12 mix-blend-difference">
            Ready to Build?
          </h2>
          <Link href="/Project" className="pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-black text-xl tracking-wide uppercase font-medium overflow-hidden rounded-full cursor-pointer"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Start Your Project</span>
              <div className="absolute inset-0 bg-neutral-900 transform scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
