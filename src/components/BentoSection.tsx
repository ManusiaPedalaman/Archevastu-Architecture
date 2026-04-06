"use client";

import { motion } from "framer-motion";
import ArchitectureImg from "../image/img/2.4.webp";

export default function BentoSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-16 uppercase">Our Disciplines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 relative bg-neutral-900 rounded-3xl overflow-hidden group p-8 flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
            <img src={ArchitectureImg.src} alt="Architecture" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="relative z-20">
              <h3 className="text-3xl font-bold tracking-tight mb-2">Architecture</h3>
              <p className="text-white/80 max-w-sm">Designing monumental structures that define the modern skyline.</p>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden group p-8 flex flex-col justify-between"
          >
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-auto group-hover:bg-white text-white hover:text-black transition-all">
              ↗
            </div>
            <div className="relative z-20">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Landscape</h3>
              <p className="text-white/60 text-sm">arranging the beauty of green open spaces.</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="relative bg-neutral-900 rounded-3xl overflow-hidden group p-8 flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" alt="Interior" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="relative z-20">
              <h3 className="text-2xl font-bold tracking-tight mb-2">Interiors</h3>
              <p className="text-white/80 text-sm">Refining spaces for the human scale.</p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 relative bg-neutral-900 rounded-3xl overflow-hidden p-8 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-black"
          >
            <div className="text-center relative z-20">
              <h3 className="text-3xl md:text-5xl font-light tracking-tight italic">
                &quot;Bringing vibes to life&quot;
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
