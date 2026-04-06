"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function KontakPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isFormValid = name.trim() !== "" && email.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    const waNumber = "6287750881867";
    const textUrl = encodeURIComponent(`Halo, saya ${name} (${email}).\n\nSaya ingin menceritakan proyek saya:\n${message}`);
    window.open(`https://wa.me/${waNumber}?text=${textUrl}`, "_blank");
  };

  return (
    <main className="bg-[#111111] min-h-screen text-white selection:bg-white selection:text-black flex flex-col pt-20 lg:pt-0">
      <Navbar />
      
      <section className="flex-grow flex flex-col lg:flex-row mt-12 lg:mt-0">
        {/* Left Side: Info */}
        <div className="lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-[#151515] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-[5vw] leading-[1.1] font-light mb-12">
              Mari <br/> <span className="font-bold underline decoration-white/20 underline-offset-8">Berbincang.</span>
            </h1>
            
            <div className="space-y-12">
              <div className="group">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/30 mb-3 group-hover:text-white/60 transition-colors">Email</h3>
                <a href="mailto:archevastu@gmail.com" className="text-2xl md:text-3xl font-light hover:italic transition-all">archevastu@gmail.com</a>
              </div>
              <div className="group">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/30 mb-3 group-hover:text-white/60 transition-colors">Phone</h3>
                <a href="tel:+6287750881867" className="text-2xl md:text-3xl font-light hover:italic transition-all">+62 877 5088 1867</a>
              </div>
              <div className="group">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/30 mb-3 group-hover:text-white/60 transition-colors">Headquarters</h3>
                <p className="text-xl md:text-2xl font-light text-white/80 max-w-sm leading-relaxed">
                  Jl. Manukan Bhakti 10 BL 20-J/19, <br/>
                  Kel. Manukan Kulon, <br/>
                  Kec. Tandes, Surabaya.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-1/2 p-8 md:p-16 lg:p-45 flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md w-full mx-auto"
          >
            <div className="mb-12">
               <h2 className="text-2xl font-light mb-4">Punya Visi yang Ingin Diwujudkan?</h2>
               <p className="text-white/40">Isi form di bawah ini dan konsultan kami akan segera menghubungi Anda untuk mengatur sesi eksklusif.</p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-3 pt-4 text-lg focus:outline-none focus:border-white transition-colors peer placeholder-transparent"
                  placeholder="Nama Lengkap"
                  required
                />
                <label htmlFor="name" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white/70 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/70 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 uppercase tracking-widest font-medium">Nama Lengkap</label>
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-3 pt-4 text-lg focus:outline-none focus:border-white transition-colors peer placeholder-transparent"
                  placeholder="Email"
                  required
                />
                <label htmlFor="email" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white/70 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/70 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 uppercase tracking-widest font-medium">Email Address</label>
              </div>

              <div className="relative pt-4">
                <textarea 
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-3 pt-2 text-lg focus:outline-none focus:border-white transition-colors peer placeholder-transparent resize-none"
                  placeholder="Ceritakan Proyek Anda"
                  required
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white/70 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/70 peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 uppercase tracking-widest font-medium">Ceritakan Proyek Anda</label>
              </div>
              
              <button 
                type="submit" 
                disabled={!isFormValid}
                className={`w-full py-5 mt-4 text-xs font-bold uppercase tracking-[0.2em] relative overflow-hidden group transition-all ${isFormValid ? "bg-white text-black" : "bg-white/20 text-white/50 cursor-not-allowed"}`}
              >
                <span className={`relative z-10 transition-colors flex items-center justify-center gap-2 ${isFormValid ? "group-hover:text-white" : ""}`}>
                  Kirim Pesan
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                </span>
                {isFormValid && <div className="absolute inset-0 h-full w-full bg-[#111] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>}
                <div className={`absolute inset-0 border z-20 pointer-events-none transition-colors ${isFormValid ? "border-white" : "border-transparent"}`}></div>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Since it's a flex-col we can keep Footer at bottom or omit it? We will add Footer. */}
      {/* For Contact, sometimes footers are omitted. But let's keep consistency.  */}
      <div className="lg:hidden mt-auto"><Footer /></div>
      <div className="hidden lg:block w-full"><Footer /></div>
    </main>
  );
}
