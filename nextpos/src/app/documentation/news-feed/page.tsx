"use client";

import React from "react";
import Image from "next/image";
import { Terminal, Zap } from "lucide-react";

export default function NewsFeedPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" />
        {/* Logic Glitch: Image 3 */}
        <div className="absolute inset-0 opacity-30 blend-screen mask-radial pointer-events-none">
          <Image src="/bg_images/download (17).jpg" alt="Signal Map" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Zap size={14} className="text-white opacity-40" />
            <span>Reference_Doc // INTEL_FEED_06</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Signal <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Intelligence</span>
          </h1>
          <p className="text-xl font-mono uppercase tracking-widest text-zinc-400 max-w-2xl leading-relaxed">
            Real-time research aggregation via the Tavily x Gemini decoding pipeline.
          </p>
        </div>
      </header>

      <div className="relative z-20 max-w-6xl mx-auto px-12 py-32 space-y-40 pb-60">

        {/* SECTION: THE ACQUISITION PIPELINE */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            01 // Acquisition_Logic
          </div>
          <div className="md:col-span-8 space-y-1">
            <AcquisitionLayer
              title="Sourcing_Agent"
              tech="Tavily_Search_API"
              desc="Performs high-frequency web-crawls specifically for quantum breakthrough metadata."
            />
            <AcquisitionLayer
              title="Neural_Summary"
              tech="Gemini_Flash_1.5"
              desc="Asynchronous processing of raw text into concise theoretical briefs."
            />
            <AcquisitionLayer
              title="UI_Projection"
              tech="Tailwind_CSS"
              desc="Dynamic rendering of summarized data into the Field Briefings feed."
            />
          </div>
        </section>

        {/* SECTION: ACCESS ADVISORY */}
        <section className="glass-pane-dark p-16 rounded-[60px] border border-white/10 dusty-visual flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-5xl font-serif-italic tracking-tighter uppercase text-glow leading-tight">Access <br /> <span className="italic text-zinc-600">Advisory</span></h2>
            <p className="font-mono text-[11px] text-zinc-500 uppercase leading-[2] tracking-tight">
              Data streams originate from third-party scientific repositories. Superpos maintains the pipe, but not the content. Verify all critical findings through the source link.
            </p>
          </div>
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
              <Terminal size={40} className="opacity-20" />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function AcquisitionLayer({ title, tech, desc }: any) {
  return (
    <div className="group bg-zinc-950/90 p-10 border border-white/5 transition-all duration-700 hover:bg-white hover:text-black">
      <div className="flex justify-between items-center mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white group-hover:text-black">{title}</span>
        <span className="font-mono text-[8px] text-zinc-600 group-hover:text-zinc-400">Bus: {tech}</span>
      </div>
      <p className="font-mono text-[11px] text-zinc-500 uppercase leading-relaxed tracking-tighter group-hover:text-black">
        {desc}
      </p>
    </div>
  )
}