"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, useSpring, AnimatePresence } from "framer-motion";
import { Cinzel_Decorative } from "next/font/google";
import Image from "next/image";
import avLogoGold from "@/image/icon/Vector 6914.svg";
import textLogoGold from "@/image/icon/Group 6356227.svg";
import textLogoWhite from "@/image/icon/Group 6356228.svg";

const cinzel = Cinzel_Decorative({ 
  weight: ["400", "700", "900"], 
  subsets: ["latin"] 
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
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesLoadedRef = useRef(0);
  
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !(window as any)._isAppLoaded;
    }
    return true; // default true for SSR
  });
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    imagesLoadedRef.current = imagesLoaded;
  }, [imagesLoaded]);

  useEffect(() => {
    // Apabila sudah diload sebelumnya pada sesi SPA ini, jangan tampilkan loading lagi
    if (!isLoading) return;
    
    if (typeof window !== 'undefined') {
      // Disable default browser scroll restoration so it doesn't jump down on refresh
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      // Force scroll to top
      window.scrollTo(0, 0);

      // Flag bahwa secara global web ini sudah pernah loading per hard-refresh
      (window as any)._isAppLoaded = true;
    }

    // Always show loading sequence on mount (e.g. on every refresh)
    const duration = 2500; // 2.5 seconds min duration
    const updateInterval = 30; // 30ms per tick
    const totalTicks = duration / updateInterval;
    let currentTick = 0;

    const timer = setInterval(() => {
      currentTick++;
      
      // Time progress from 0 to 100%
      const timeProgress = Math.min((currentTick / totalTicks) * 100, 100);
      
      // Actual progress from loading images
      const actualProgress = (imagesLoadedRef.current / frameCount) * 100;

      // Display progress is the minimum of both bounds
      const currentDisplay = Math.min(timeProgress, actualProgress);
      setDisplayProgress(currentDisplay);
      
      if (timeProgress >= 100 && actualProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          // Ensure we are at the top before revealing the content
          window.scrollTo(0, 0);
          setIsLoading(false);
        }, 400); // Wait a split second at 100%
      }
    }, updateInterval);
    
    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;
    
    for (let i = 1; i <= frameCount; i++) {
        const img = new window.Image();
        const handleLoad = () => {
          loaded++;
          setImagesLoaded(loaded);
        };
        
        img.onload = handleLoad;
        img.onerror = handleLoad; 
        
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/image/sequence/ezgif-frame-${frameNumber}.jpg`;
        // Load explicitly at full priority via browser mechanism
        
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (index: number) => {
    if (images.length === 0 || !images[index - 1]) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    
    const img = images[index - 1];
    if (!img.complete || img.naturalWidth === 0) return;

    // We MUST use naturalWidth to get the true resolution of the image (1920x1080)
    // To prevent squishing, we set canvas internal resolution to the exact image resolution!
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Render paksa frame pertama saat sudah siap
  useEffect(() => {
    if (imagesLoaded > 0 && images[0]?.complete) {
      drawImage(Math.round(currentIndex.get()));
    }
  }, [imagesLoaded, images, currentIndex]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    drawImage(Math.round(latest));
  });

  // Handle window resizing to force re-evaluation of CSS object-cover
  useEffect(() => {
    const handleResize = () => drawImage(Math.round(currentIndex.get()));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

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
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.4] text-black">
            <span className="bg-white px-3 py-1 md:px-5 md:py-2 rounded-2xl md:rounded-3xl box-decoration-clone">
              Shape Your Environment.
            </span>
          </h2>
          <p className="text-lg md:text-2xl font-medium mt-6 max-w-md leading-relaxed text-neutral-800">
            <span className="bg-white/90 px-2 py-1 md:px-4 md:py-2 rounded-xl md:rounded-2xl box-decoration-clone">
              We design spaces that resonate with harmony, function, and cutting-edge aesthetics.
            </span>
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity: text3Opacity }} 
          className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right pointer-events-none"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight max-w-3xl leading-[1.4] text-black">
            <span className="bg-white px-3 py-1 md:px-5 md:py-2 rounded-2xl md:rounded-3xl box-decoration-clone">
              Beyond The Horizon.
            </span>
          </h2>
          <p className="text-lg md:text-2xl font-medium mt-6 max-w-md ml-auto leading-relaxed text-neutral-800">
            <span className="bg-white/90 px-2 py-1 md:px-4 md:py-2 rounded-xl md:rounded-2xl box-decoration-clone">
              Pushing boundaries of what's possible with modern materials and timeless concepts.
            </span>
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity: text4Opacity }} 
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white"
        >
          <h2 className="text-5xl md:text-[6vw] leading-none font-bold tracking-tighter mb-12 mix-blend-difference">
            Ready to Build?
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-white text-black text-xl tracking-wide uppercase font-medium overflow-hidden rounded-full pointer-events-auto"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Start Your Project</span>
            <div className="absolute inset-0 bg-neutral-900 transform scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
