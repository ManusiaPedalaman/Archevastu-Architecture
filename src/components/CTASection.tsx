"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative py-48 px-6 md:px-12 bg-white text-black z-10 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="relative z-20">
        <h2 className="text-5xl md:text-[8vw] font-bold tracking-tighter leading-[0.9] uppercase mb-12">
          Let&apos;s Build It.
        </h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-6 bg-black text-white text-xl tracking-wide uppercase font-medium overflow-hidden rounded-full"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Contact Us</span>
          <div className="absolute inset-0 bg-neutral-200 transform scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100" />
        </motion.button>
      </div>
      
      {/* Decorative background elements */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, black 2px, transparent 2px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Animated blob background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-gray-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" />
    </section>
  );
}
