"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import { Maximize2, X } from "lucide-react";

const categories = ["Semua", "Residensial", "Komersial", "Interior", "Lanskap"];

function ProjectContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; category: string } | null>(null);

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (!previewImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [previewImage]);

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
                className="h-full"
              >
                <Link
                  href={`/Project/${project.id}`}
                  className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-white/40 hover:bg-white/[0.04] transition-all duration-500 h-full cursor-pointer block"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {/* Gambar selalu terang & jernih di semua perangkat (laptop, tablet, HP) */}
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider text-white border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Tombol Perbesar / Review Icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPreviewImage({ url: project.image, title: project.title, category: project.category });
                      }}
                      className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-black hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer"
                      title="Perbesar gambar"
                      aria-label="Perbesar gambar"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-light mb-3 font-serif group-hover:text-white transition-colors">
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
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10 w-full">
                      <div className="flex-1 text-center border border-white/20 py-3 rounded-full text-xs font-semibold tracking-wider group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                        View Details ↗
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#070707]/98 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8"
            onClick={() => setPreviewImage(null)}
          >
            {/* Top Bar */}
            <div 
              className="w-full max-w-7xl flex items-center justify-between z-10 text-white pt-2 md:pt-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <span className="px-3.5 py-1.5 bg-white/10 rounded-full text-xs font-medium uppercase tracking-widest text-white border border-white/15">
                  {previewImage.category}
                </span>
                <span className="text-white/80 text-sm md:text-base font-light tracking-wide">
                  {previewImage.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center text-white transition-all border border-white/20 active:scale-95 cursor-pointer flex-shrink-0"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Center Image */}
            <div 
              className="relative w-full max-w-6xl flex-grow flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] md:h-[78vh] flex items-center justify-center">
                <Image
                  src={previewImage.url}
                  alt={previewImage.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Info */}
            <div 
              className="w-full max-w-md text-center z-50 text-xs md:text-sm text-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              Klik di luar gambar atau tombol X untuk menutup
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f11]" />}>
      <ProjectContent />
    </Suspense>
  );
}
