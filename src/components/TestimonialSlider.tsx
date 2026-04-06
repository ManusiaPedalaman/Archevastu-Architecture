"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { quote: "Acevashtu transformed our vision into a physical reality that exceeded all expectations.", author: "Elena R., CEO of Nexus" },
  { quote: "Their attention to the interplay of light and material created a space we truly desire.", author: "Marcus T., Hospitality Director" },
  { quote: "A rare mastery of both the monumental and the intimate. Truly visionary.", author: "Sarah W., Private Client" }
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 md:py-48 px-6 md:px-12 bg-neutral-950 text-white relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto relative min-h-[400px] flex items-center justify-center text-center">
        <h3 className="absolute top-0 text-sm font-light tracking-[0.3em] uppercase text-white/30 hidden md:block">
          Client Voices
        </h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full absolute"
          >
            <p className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-12 italic">
              &quot;{testimonials[index].quote}&quot;
            </p>
            <p className="text-sm font-medium tracking-widest uppercase text-white/60">
              — {testimonials[index].author}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute bottom-0 flex gap-4">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`w-12 h-[2px] transition-all duration-500 hover:bg-white/70 ${i === index ? 'bg-white' : 'bg-white/20'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
