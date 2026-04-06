"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const categories = ["Semua", "Residensial", "Komersial", "Interior", "Lanskap"];

const projects = [
  {
    id: 1,
    title: "The Glass House",
    category: "Residensial",
    description: "Hunian modern dengan pencahayaan alami maksimal dan integrasi tanpa batas dengan alam sekitar.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    tags: ["Modern", "Minimalist", "Glass"]
  },
  {
    id: 2,
    title: "Oasis Commercial Center",
    category: "Komersial",
    description: "Pusat perbelanjaan berkonsep open-air yang mengutamakan keberlanjutan dan sirkulasi udara alami.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2016&auto=format&fit=crop",
    tags: ["Urban", "Sustainable", "Retail"]
  },
  {
    id: 3,
    title: "Serenity Villa",
    category: "Interior",
    description: "Desain interior premium yang menggabungkan material kayu lokal dengan sentuhan marmer mewah.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2080&auto=format&fit=crop",
    tags: ["Luxury", "Wood", "Marble"]
  },
  {
    id: 4,
    title: "Lumina Office Tower",
    category: "Komersial",
    description: "Gedung perkantoran futuristik dengan fasad kinetik yang merespons cahaya matahari.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tags: ["Corporate", "Futuristic", "Kinetic"]
  },
  {
    id: 5,
    title: "Zen Garden Estate",
    category: "Lanskap",
    description: "Desain lanskap meditatif yang menggabungkan elemen air, batu, dan flora tropis eksotis.",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2072&auto=format&fit=crop",
    tags: ["Zen", "Tropical", "Water"]
  },
  {
    id: 6,
    title: "Eco Retreat Haven",
    category: "Residensial",
    description: "Vila ramah lingkungan yang dibangun sepenuhnya dengan material daur ulang dan energi surya terintegrasi.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2187&auto=format&fit=crop",
    tags: ["Eco-friendly", "Solar", "Off-grid"]
  }
];

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProjects = projects.filter(project => 
    activeCategory === "Semua" ? true : project.category === activeCategory
  );

  return (
    <main className="bg-[#0f0f11] min-h-screen text-white selection:bg-white selection:text-black pt-32">
      <Navbar />
      
      <section className="max-w-[1400px] mx-auto px-6 pb-32">
        {/* Header */}
        <div className="mb-16 mt-12 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight mb-8 uppercase selection:bg-white/20"
          >
            ARCHEVASTU 
            <br />
            Projects
          </motion.h1>
          
          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-xs md:text-sm tracking-wide font-medium transition-all duration-300 border ${
                  activeCategory === category 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-colors duration-500"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-[0.23,1,0.32,1]"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider text-white border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-light mb-3 font-serif group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                    <button className="flex-1 bg-white text-black py-3 rounded-full text-xs font-semibold tracking-wider hover:bg-white/90 transition-colors">
                      Visit Site
                    </button>
                    <button className="flex-1 border border-white/20 py-3 rounded-full text-xs font-semibold tracking-wider hover:border-white/50 transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
