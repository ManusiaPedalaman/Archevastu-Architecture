"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cinzel_Decorative } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import avLogoWhite from "@/image/icon/Vector 6916.svg";
import textLogoWhite from "@/image/icon/Group 6356226.svg";

const cinzel = Cinzel_Decorative({ 
  weight: ["400", "700", "900"], 
  subsets: ["latin"] 
});

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/Tentang" },
  { name: "Project", href: "/Project" },
  { name: "Kontak", href: "/Kontak" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* 
        Top Layer: Logo & Hamburger Menu
        These elements use mix-blend-difference so they invert color dynamically
        (white on black, black on white) without breaking inner children.
      */}
      <header className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between p-6 md:p-8 mix-blend-difference text-white pointer-events-none">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 px-2 pointer-events-auto cursor-pointer">
          <Image src={avLogoWhite} alt="AV Logo" className="h-10 md:h-13 w-auto" />
          {/* <Image src={textLogoWhite} alt="ArcheVastu" className="h-3.5 md:h-5 w-auto" /> */}
        </Link>

        {/* Mobile Hamburger Menu */}
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex md:hidden flex-col items-end gap-[6px] p-4 outline-none pointer-events-auto"
        >
          <span className="block w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-10"></span>
          <span className="block w-6 h-[2px] bg-white transition-all duration-300 group-hover:w-8"></span>
        </button>
      </header>

      {/* 
        Second Layer: Desktop Nav
        Placed separately to ensure backdrop-blur glassmorphism works without blending glitches.
      */}
      <div className="fixed top-0 right-0 w-full z-50 p-6 md:p-8 hidden md:flex items-center justify-end pointer-events-none">
        <nav className="flex items-center gap-6 text-[14px] font-medium tracking-wide pointer-events-auto">
          {/* Glass Pill for Links */}
          <ul className="flex items-center gap-1 bg-[#161618]/60 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
              <li key={i}>
                <Link 
                  href={link.href} 
                  className={`relative px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isActive 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            )})}
          </ul>
          
          {/* Glass Pill for Socials */}
          <div className="flex items-center gap-4 bg-[#161618]/60 backdrop-blur-md border border-white/10 rounded-full py-3.5 px-6 shadow-2xl">
            <a href="https://www.tiktok.com/@archevastu?_r=1&_t=ZS-95BmsxwtTRE" className="opacity-80 hover:opacity-100 hover:scale-110 hover:text-[#ffffff] transition-all duration-300 flex items-center justify-center w-5 h-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/archevastu?igsh=ZmJkYWxya2o1d211" className="opacity-80 hover:opacity-100 hover:scale-110 hover:text-[#ffffff] transition-all duration-300 flex items-center justify-center w-5 h-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/cv-archevastu/" className="opacity-80 hover:opacity-100 hover:scale-110 hover:text-[#ffffff] transition-all duration-300 flex items-center justify-center w-5 h-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@archevastu?si=i5Z_QTRedZZyBPOC" className="opacity-80 hover:opacity-100 hover:scale-110 hover:text-[#ffffff] transition-all duration-300 flex items-center justify-center w-5 h-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                 <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                 <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </nav>
      </div>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#070707] text-white flex flex-col justify-between p-8 md:p-16"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <Image src={avLogoWhite} alt="AV Logo" className="h-6 w-auto" />
                <Image src={textLogoWhite} alt="ArcheVastu" className="h-3.5 w-auto" />
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-widest font-medium hover:text-gray-400 transition-colors"
              >
                Close
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-4 md:gap-8 mt-12">
              {navLinks.map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group block text-[12vw] md:text-[8vw] leading-[1.1] font-bold tracking-tighter uppercase text-white/90 hover:text-white"
                    >
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-8">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Bottom Info inside Menu */}
            <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm md:text-base font-light tracking-wide text-gray-400 uppercase pt-12 border-t border-white/10 overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-white mb-2 font-medium">Follow Us</div>
                <ul className="flex flex-col gap-1">
                  <li><a href="https://www.tiktok.com/@archevastu?_r=1&_t=ZS-95BmsxwtTRE" className="hover:text-white transition-colors">TikTok</a></li>
                  <li><a href="https://www.instagram.com/archevastu?igsh=ZmJkYWxya2o1d211" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="https://www.linkedin.com/company/cv-archevastu/" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://youtube.com/@archevastu?si=i5Z_QTRedZZyBPOC" className="hover:text-white transition-colors">YouTube</a></li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="text-white mb-2 font-medium">Contact</div>
                <p>hello@acevashtu.com</p>
                <p>+62 812 3456 7890</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
