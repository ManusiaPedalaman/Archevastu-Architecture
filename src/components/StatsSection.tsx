"use client";

import { useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";

function Counter({ from, to }: { from: number, to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView && node) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return <span ref={nodeRef} />;
}

export default function StatsSection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-black text-white relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
        
        <div className="flex-1 py-8 md:py-0 md:px-12 first:pl-0 last:pr-0 flex flex-col items-center justify-center text-center">
          <div className="text-6xl md:text-8xl font-medium tracking-tighter mb-4">
            <Counter from={0} to={50} />+
          </div>
          <div className="text-sm font-light tracking-[0.2em] uppercase text-white/50">Projects</div>
        </div>
        
        <div className="flex-1 py-8 md:py-0 md:px-12 flex flex-col items-center justify-center text-center">
          <div className="text-6xl md:text-8xl font-medium tracking-tighter mb-4">
            <Counter from={0} to={10} />
          </div>
          <div className="text-sm font-light tracking-[0.2em] uppercase text-white/50">Awards</div>
        </div>
        
        <div className="flex-1 py-8 md:py-0 md:px-12 flex flex-col items-center justify-center text-center">
          <div className="text-6xl md:text-8xl font-medium tracking-tighter mb-4">
             <Counter from={0} to={5} />
          </div>
          <div className="text-sm font-light tracking-[0.2em] uppercase text-white/50">Years</div>
        </div>

      </div>
    </section>
  );
}
