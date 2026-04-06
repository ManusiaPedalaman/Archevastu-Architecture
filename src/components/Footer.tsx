import Image from "next/image";
import Link from "next/link";
import textLogoWhite from "@/image/icon/Group 6356228.svg";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-12 pt-16 pb-8 relative z-10 w-full font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        
        {/* Left Section - Logo & Description */}
        <div className="flex flex-col gap-6 max-w-sm md:max-w-md">
          <Link href="/" className="inline-block cursor-pointer">
            <Image src={textLogoWhite} alt="ArcheVastu" className="h-[36px] md:h-[48px] w-auto opacity-90" priority />
          </Link>
          <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
            Crafting digital experiences with code and creativity, blending aesthetics with functionality for a seamless and impactful digital presence.
          </p>
        </div>

        {/* Right Section - Links & Connect */}
        <div className="flex gap-16 md:gap-24">
          {/* Links Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-base font-medium text-white tracking-wide">Links</h3>
            <ul className="flex flex-col gap-4 text-sm text-white/60 font-light">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/Tentang" className="hover:text-white transition-colors">Tentang</Link></li>
              <li><Link href="/Project" className="hover:text-white transition-colors">Project</Link></li>
              <li><Link href="/Kontak" className="hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-base font-medium text-white tracking-wide">Connect</h3>
            <ul className="flex flex-col gap-4 text-sm text-white/60 font-light">
              <li><a href="https://www.tiktok.com/@archevastu?_r=1&_t=ZS-95BmsxwtTRE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
              <li><a href="https://www.instagram.com/archevastu?igsh=ZmJkYWxya2o1d211" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/cv-archevastu/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://www.youtube.com/@archevastu?si=i5Z_QTRedZZyBPOC" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Footer - Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex justify-center text-center mt-auto">
        <p className="text-xs md:text-sm font-light text-white/40">
          © {new Date().getFullYear()} ArcheVastu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
