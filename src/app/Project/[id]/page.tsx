"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="bg-[#0f0f11] min-h-screen text-white flex flex-col items-center justify-center p-6 text-center">
        <Navbar />
        <h1 className="text-4xl font-bold mb-4 uppercase">Project Not Found</h1>
        <p className="text-white/50 mb-8 max-w-md">The project you are looking for does not exist or has been moved.</p>
        <Link 
          href="/Project" 
          className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
        >
          Back to Projects
        </Link>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#0f0f11] min-h-screen text-white selection:bg-white selection:text-black pt-32">
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-6 pb-32">
        {/* Back navigation & Title */}
        <div className="mb-12">
          <Link 
            href="/Project" 
            className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-wider mb-6"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 
            Back to Projects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs uppercase tracking-widest text-white/60 border border-white/10 mb-4 inline-block">
                {project.category}
              </span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase"
              >
                {project.title}
              </motion.h1>
            </div>
            
            {/* Quick Details Badge */}
            <div className="flex gap-8 text-sm text-white/40 uppercase tracking-widest border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
              <div>
                <span className="block text-[10px] text-white/20 mb-1">Location</span>
                <span className="text-white/80 font-medium">{project.location.split(',')[0]}</span>
              </div>
              <div>
                <span className="block text-[10px] text-white/20 mb-1">Year</span>
                <span className="text-white/80 font-medium">{project.year}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Second Animation Loop Video */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full aspect-video md:aspect-[21/9] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl mb-16 border border-white/5"
        >
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
          <video 
            src={project.videoUrl}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Looping timeline simulating a 6-second dynamic animation state */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 z-20">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 6, 
                ease: "linear", 
                repeat: Infinity 
              }}
              style={{ originX: 0 }}
              className="h-full bg-white/80 w-full"
            />
          </div>

          <div className="absolute bottom-6 right-6 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">6s Visual Preview</span>
          </div>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 items-start">
          {/* Metadata Specs Column */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-semibold tracking-wider uppercase border-b border-white/10 pb-4">Project Specs</h3>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/30 mb-1">Client</span>
                <span className="text-white/90 text-sm font-medium">{project.client}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/30 mb-1">Location</span>
                <span className="text-white/90 text-sm font-medium">{project.location}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/30 mb-1">Area Size</span>
                <span className="text-white/90 text-sm font-medium">{project.area}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-white/30 mb-1">Completion</span>
                <span className="text-white/90 text-sm font-medium">{project.year}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="block text-xs uppercase tracking-wider text-white/30 mb-2">Scope of Work</span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[10px] text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Story Column */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">Project Story</h3>
            <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
              Konsep desain yang berakar pada estetika modern, fungsionalitas murni, dan keharmonisan lingkungan.
            </h2>
            <div className="w-16 h-[1px] bg-white/20 my-4" />
            <p className="text-white/60 text-base md:text-lg leading-relaxed font-light">
              {project.story}
            </p>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
              Setiap elemen arsitektur dirancang secara matang untuk memadukan estetika visual dengan keberlanjutan fungsional. Melalui proses iterasi pemodelan 3D yang intensif, ArcheVastu memastikan presisi tinggi pada penyelesaian konstruksi fisik agar hasil akhir sejalan secara sempurna dengan visi rendering awal.
            </p>
          </div>
        </div>

        {/* Render Photos Section */}
        <div className="border-t border-white/10 pt-16">
          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white/40 mb-3">Visualization Portfolio</h3>
            <h2 className="text-3xl font-light uppercase">Render Gallery</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {project.renderPhotos.map((photoUrl, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="group relative aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 shadow-lg"
              >
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-500" />
                <img 
                  src={photoUrl} 
                  alt={`${project.title} Render ${index + 1}`} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider text-white border border-white/10">
                    Render View {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
