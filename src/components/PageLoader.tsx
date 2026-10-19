"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import textLogoWhite from "@/image/icon/Group 6356228.svg";

export default function PageLoader() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  
  // Initialize identically on server and client to avoid hydration mismatch
  const [isLoading, setIsLoading] = useState(pathname !== "/");
  
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // We only care about the absolute first render sequence (refresh/direct load).
    // If we transition to another page via client-side routing or already loaded, we do nothing.
    if (isFirstLoad.current && pathname !== "/") {
      isFirstLoad.current = false;

      if (typeof window !== "undefined" && (window as any)._isAppLoaded) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      if (typeof window !== "undefined" && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);

      // Flag globally that the browser has been loaded
      if (typeof window !== "undefined") {
        (window as any)._isAppLoaded = true;
      }

      setDisplayProgress(100);
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        setIsLoading(false);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      isFirstLoad.current = false;
      setIsLoading(false);
    }
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0e0e0e] text-white"
        >
          {/* Top Text Logo */}
          <div className="mb-12">
            <Image
              src={textLogoWhite}
              alt="ArcheVastu"
              className="h-[19px] md:h-[23px] w-auto opacity-80"
            />
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
            Preparing Environment...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
