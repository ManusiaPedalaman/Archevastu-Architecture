"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ArchitectureImg = "/image/architecture.webp";
const LandscapeImg = "/image/landscape.webp";

export default function BentoSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-16 uppercase">Our Disciplines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {/* Card 1: Architecture */}
          <Link href="/Project?category=Residensial" className="md:col-span-2 block">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="relative bg-neutral-900 rounded-3xl overflow-hidden group p-8 flex flex-col justify-end h-full cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
              <Image 
                src={ArchitectureImg} 
                alt="Architecture" 
                fill 
                sizes="(max-width: 768px) 100vw, 66vw" 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
              <div className="relative z-20">
                <h3 className="text-3xl font-bold tracking-tight mb-2">Architecture</h3>
                <p className="text-white/80 max-w-sm">Designing monumental structures that define the modern skyline.</p>
              </div>
            </motion.div>
          </Link>
          
          {/* Card 2: Landscape */}
          <Link href="/Project?category=Lanskap" className="block">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="relative bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden group p-8 flex flex-col justify-between h-full cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
              <Image 
                src={LandscapeImg} 
                alt="Landscape" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw" 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
              <div className="relative z-20 w-12 h-12 rounded-full border border-white/30 backdrop-blur-sm bg-black/40 flex items-center justify-center mb-auto group-hover:bg-white text-white group-hover:text-black transition-all">
                ↗
              </div>
              <div className="relative z-20">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Landscape</h3>
                <p className="text-white/80 text-sm">Arranging the beauty of green open spaces.</p>
              </div>
            </motion.div>
          </Link>

          {/* Card 3: Interiors */}
          <Link href="/Project?category=Interior" className="block">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="relative bg-neutral-900 rounded-3xl overflow-hidden group p-8 flex flex-col justify-end h-full cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-500" />
              <Image 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" 
                alt="Interior" 
                fill 
                sizes="(max-width: 768px) 100vw, 33vw" 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
              <div className="relative z-20">
                <h3 className="text-2xl font-bold tracking-tight mb-2">Interiors</h3>
                <p className="text-white/80 text-sm">Refining spaces for the human scale.</p>
              </div>
            </motion.div>
          </Link>

          {/* Card 4: Quote -> Link to All Projects */}
          <Link href="/Project" className="md:col-span-2 block">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="relative bg-neutral-900 rounded-3xl overflow-hidden group p-8 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-black h-full cursor-pointer border border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="text-center relative z-20">
                <h3 className="text-3xl md:text-5xl font-light tracking-tight italic group-hover:scale-105 transition-transform duration-500">
                  &quot;Bringing vibes to life&quot;
                </h3>
                <span className="inline-block mt-4 text-xs tracking-widest uppercase text-white/50 group-hover:text-white transition-colors">
                  Explore All Projects ↗
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
