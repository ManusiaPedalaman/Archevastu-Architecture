"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, useSpring } from "framer-motion";
import { Cinzel_Decorative } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import avLogoGold from "@/image/icon/Vector 6914.svg";
import textLogoGold from "@/image/icon/Group 6356227.svg";

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

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const requestedFramesRef = useRef<Set<number>>(new Set());
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastIndexRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  // Helper for duplicate frames (frames with pattern i >= 13 && i % 5 === 3 are exact byte duplicates of i - 1)
  const getMasterIndex = (i: number) => {
    if (i >= 13 && i % 5 === 3) return i - 1;
    return i;
  };

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

  // On-demand frame loader: only downloads frames when needed
  const requestFrame = (index: number) => {
    if (index < 1 || index > frameCount) return;
    const master = getMasterIndex(index);

    if (imagesRef.current[master - 1]) {
      imagesRef.current[index - 1] = imagesRef.current[master - 1];
      return;
    }

    if (requestedFramesRef.current.has(master)) return;
    requestedFramesRef.current.add(master);

    const img = new window.Image();
    img.decoding = "async";
    const frameNumber = String(master).padStart(3, "0");
    img.src = `/image/sequence/ezgif-frame-${frameNumber}.jpg`;
    img.onload = () => {
      imagesRef.current[master - 1] = img;
      imagesRef.current[index - 1] = img;
      if (Math.round(currentIndex.get()) === index) {
        scheduleDraw(index);
      }
    };
  };

  // Setup canvas resolution and cached context once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1920;
    canvas.height = 1080;
    ctxRef.current = canvas.getContext("2d", { alpha: false, desynchronized: true });

    // Preload only the immediate initial 3 frames on mount
    for (let i = 1; i <= 3; i++) {
      requestFrame(i);
    }

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // On scroll: render active frame and buffer 8 frames ahead
  useMotionValueEvent(currentIndex, "change", (latest) => {
    const target = Math.round(latest);
    scheduleDraw(target);

    // Buffer frames ahead of active scroll position
    const start = Math.max(1, target - 1);
    const end = Math.min(frameCount, target + 8);
    for (let i = start; i <= end; i++) {
      requestFrame(i);
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
      {/* Sticky Hero & Scroll Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Instant LCP Hero Background: Preloaded by Next.js in <head> */}
        <Image
          src="/image/sequence/ezgif-frame-001.jpg"
          alt="ArcheVastu Architecture"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />

        {/* Dynamic Sequence Canvas on top */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full object-cover z-[1]"
        />

        {/* Texts */}
        <motion.div
          style={{ opacity: text1Opacity }}
          className={`absolute inset-0 z-[2] flex flex-col items-center justify-center p-8 text-center text-white pointer-events-none drop-shadow-2xl ${cinzel.className}`}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
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
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm sm:text-base md:text-xl font-light tracking-[0.3em] uppercase bg-[#161618]/60 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-3 rounded-full border border-white/10 shadow-xl"
          >
            Elevated Architecture
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity: text2Opacity }}
          className="absolute inset-0 z-[2] flex flex-col items-start justify-center p-8 md:p-24 pointer-events-none"
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
          className="absolute inset-0 z-[2] flex flex-col items-end justify-center p-8 md:p-24 text-right pointer-events-none"
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
          className="absolute inset-0 z-[2] flex flex-col items-center justify-center p-8 text-center text-white"
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
