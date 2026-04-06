"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function Word({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const filter = useTransform(progress, range, ["blur(12px)", "blur(0px)"]);
  
  return (
    <span className="mr-3 md:mr-4 mt-2 relative inline-block">
      <motion.span 
        style={{ opacity, filter }} 
        className="inline-block will-change-[opacity,filter]"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function AboutReveal() {
  const container = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 0.85", "end 0.5"]
  });

  const paragraph = "We are Acevashtu, pioneers of architectural expression. Our mission is to sculpt spaces that defy convention, merging raw materiality with ethereal light to craft environments that ignite the human spirit.";
  
  const words = paragraph.split(" ");

  return (
    <section 
      ref={container}
      className="py-20 md:py-32 lg:py-48 px-6 md:px-12 flex items-center justify-center bg-black min-h-[50vh] lg:min-h-[80vh] text-white relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h3 className="text-sm font-light tracking-[0.3em] uppercase text-white/50 mb-8 after:content-[''] after:block after:w-12 after:h-[1px] after:bg-white/30 after:mt-6">
            The Vision
          </h3>
        </div>
        <div className="md:w-2/3">
          <p ref={paragraphRef} className="flex flex-wrap text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-[1.2]">
            {words.map((word, i) => {
              const start = i / words.length;
              // Expand the end bound so words overlap beautifully
              const end = Math.min(start + (3 / words.length), 1);
              
              return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
            })}
          </p>
          <div className="mt-16 md:mt-32 w-full h-[1px] bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-white"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
