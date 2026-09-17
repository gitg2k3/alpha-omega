"use client";

import HalftoneFlow from "@/components/ui/halftone-flow";

export default function HalftoneFlowDemo() {
  return (
    <section className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-black text-white">
      <HalftoneFlow className="absolute inset-0 h-full w-full">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-between p-8 sm:p-14">
          <div className="flex w-full max-w-6xl items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-xs tracking-widest uppercase text-[#ff6a1a]">
              03 / The Statement
            </span>
            <span className="font-mono text-xs tracking-widest uppercase text-white/50">
              Tactile Halftone Flow
            </span>
          </div>

          <div className="flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-wider backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#ff6a1a] shadow-[0_0_8px_#ff6a1a]" />
              Alpha &amp; Omega Spectrum
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-7xl">
              We craft digital worlds{" "}
              <span className="italic font-normal text-[#ff6a1a]">that refuse to fade.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              A standalone bold statement section driven by real-time WebGL halftone fluid dynamics, tuned to the studio's chromatic palette.
            </p>
          </div>

          <div className="flex w-full max-w-6xl items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-white/40 uppercase tracking-wider">
            <span>100VH Standalone Viewport</span>
            <span>#DF5D14 &bull; #9D4C20 &bull; #FF6A1A</span>
            <span>Realtime Shader</span>
          </div>
        </div>
      </HalftoneFlow>
    </section>
  );
}

export { HalftoneFlowDemo };
