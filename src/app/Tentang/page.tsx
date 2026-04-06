"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

export default function TentangPage() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black" ref={container}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center px-6 pt-20">
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="absolute inset-0 z-0 opacity-20"
         >
           {/* Abstract grid background */}
           <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
         </motion.div>

         <motion.h1 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
           className="text-[14vw] md:text-[10vw] leading-none font-bold uppercase tracking-tighter text-center z-10"
         >
           Tentang <br/> <span className="text-white/30 italic font-light tracking-normal lowercase">ArcheVastu</span>
         </motion.h1>
      </section>

      {/* Philosophy Split Section */}
      <section className="relative pb-32 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
         <div className="md:w-1/3">
           <div className="sticky top-40">
             <h2 className="text-3xl md:text-5xl font-light mb-8">Filosofi Kami</h2>
             <div className="w-12 h-1 bg-white/20 mb-8" />
             <p className="text-white/60 text-lg leading-relaxed mb-6">
               Di ArcheVastu, kami percaya bahwa arsitektur bukan sekadar tentang membangun struktur fisik, melainkan tentang menciptakan harmoni antara manusia, emosi, dan alam sekitarnya. 
             </p>
             <p className="text-white/40 text-base leading-relaxed">
               Setiap garis yang kami tarik dan setiap material yang kami pilih memiliki tujuan untuk mengangkat kualitas hidup penghuninya menuju tingkat yang lebih tinggi (high-end architectural experience).
             </p>
           </div>
         </div>
         <div className="md:w-2/3 flex flex-col gap-12 mt-12 md:mt-0">
           {[
             { title: "Materialitas", desc: "Mengekspos kejujuran bahan dasar seperti beton ekspos, kayu murni, dan baja." },
             { title: "Keseimbangan Cahaya", desc: "Memanfaatkan cahaya alami sebagai instrumen desain utama." },
             { title: "Proporsi Spasial", desc: "Menciptakan alur ruang yang intuitif dan menenangkan jiwa." }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="relative h-[50vh] md:h-[60vh] w-full border border-white/10 rounded-2xl overflow-hidden group"
             >
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80" />
               <div className="absolute inset-0 bg-[#121212] group-hover:bg-[#1a1a1c] transition-colors duration-700" />
               
               <div className="absolute inset-0 flex items-center justify-center opacity-5">
                   <span className="text-[20rem] font-bold">{i+1}</span>
               </div>

               <div className="absolute bottom-10 left-8 md:left-12 pr-8 z-20">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-sm font-bold tracking-widest uppercase text-white/50">Prinsip</p>
                   <span className="w-8 h-[1px] bg-white/30"></span>
                   <p className="text-sm font-bold text-white/50">0{i+1}</p>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-light mb-4">{item.title}</h3>
                 <p className="text-white/60 text-lg max-w-md">{item.desc}</p>
               </div>
             </motion.div>
           ))}
         </div>
      </section>

      <Footer />
    </main>
  );
}
