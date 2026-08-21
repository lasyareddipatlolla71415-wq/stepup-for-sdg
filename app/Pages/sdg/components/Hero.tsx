"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SDGGrid from "./SDGGrid";

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const goalsRef = useRef<HTMLElement | null>(null);

  const handleExplore = () => {
    goalsRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-white text-[#0F172A]"
      style={{ background: "#FFFFFF", colorScheme: "light" }}
    >
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[75vw] max-w-[950px] overflow-hidden"
            style={{
              aspectRatio: "16/9",
              WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to left, transparent 0%, black 25%, black 75%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/Sdg.white.mp4"
            />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(to right, #FFFFFF 0%, transparent 20%), linear-gradient(to left, #FFFFFF 0%, transparent 15%), linear-gradient(to bottom, #FFFFFF 0%, transparent 5%), linear-gradient(to top, #FFFFFF 0%, transparent 10%)"
            }} />
          </div>

          <div className="relative z-20 mx-auto w-full max-w-7xl">
            <motion.div
              className="max-w-[42rem]"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.6, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-balance text-[clamp(2.5rem,5.8vw,5.2rem)] font-extrabold leading-[0.92] mb-4 text-[#0F172A]">
                Sustainable Development Goals
              </h2>
              <p className="text-[clamp(1rem,1.8vw,1.5rem)] font-medium mb-8 text-[#475569]">
                17 Goals to Transform Our World
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="rounded-full border border-[#155DFC] bg-[#155DFC]/10 px-6 py-2.5 text-sm font-semibold text-[#155DFC] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#155DFC]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155DFC]/30"
                  onClick={handleExplore}
                  type="button"
                >
                  Explore Goals
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <SDGGrid isVisible reduceMotion={reduceMotion} sectionRef={goalsRef} />
      </motion.div>
    </main>
  );
}
