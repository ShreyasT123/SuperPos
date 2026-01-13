"use client";

import React from "react";
import Image from "next/image";
import {
  MessageSquareWarning,
  Cpu, Activity
} from "lucide-react";

export default function ChatbotPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
        </div>
        {/* Assistant Schematic: Your Image 3 */}
        <div className="absolute inset-0 opacity-50 blend-screen mask-radial pointer-events-none translate-x-20">
          <Image src="/bg_images/download (34).jpg" alt="Neural Map" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. EDITORIAL HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="space-y-8">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Cpu size={14} className="text-glow-emerald" />
            <span>Reference_Doc // AI_BUS_09</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Orbital <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Assistant</span>
          </h1>
          <p className="text-xl font-serif-italic text-zinc-400 italic leading-relaxed max-w-2xl">
            "Leveraging Gemini_1.5 Flash for real-time theoretical resolution and platform synchronization."
          </p>
        </div>
      </header>

      <div className="relative z-20 max-w-5xl mx-auto px-12 py-24 space-y-32 pb-60">

        {/* SECTION: ACCESS PROTOCOL */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            01 // Access_Path
          </div>
          <div className="md:col-span-8 glass-pane-dark p-10 rounded-[40px] border border-white/10 dusty-visual">
            <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 leading-[2.2]">
              The assistant is a <span className="text-white">Persistent Neural Node</span> located in the lower-right quadrant of the simulation environment. Initialize via the <span className="text-white text-glow">Terminal Icon</span> to engage the theoretical bus.
            </p>
          </div>
        </section>

        {/* SECTION: QUERY DICTIONARY (What can you ask?) */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 opacity-50 font-mono text-[10px] uppercase tracking-widest">
            <Activity size={12} />
            <span>Query_Dictionary</span>
          </div>

          {/* Change gap-1 to gap-4 or gap-6 for better definition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            <QueryTile label="Concept_Resolution" example="Explain Bell's Inequality in simple terms." />
            <QueryTile label="Logic_Synthesis" example="How do I add a Toffoli gate to Qubit_02?" />
            <QueryTile label="Diagnostic_Output" example="Why is my state-vector collapsing prematurely?" />
            <QueryTile label="Vocabulary_Fetch" example="Define 'Decoherence' within a noisy environment." />
          </div>
        </section>

        {/* SECTION: PRIVACY LOG */}
        <section className="max-w-2xl mx-auto p-10 border border-white/5 rounded-3xl bg-white/[0.01] flex items-start gap-8">
          <MessageSquareWarning className="text-zinc-600 mt-1" size={24} />
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-400">Data_Privacy_Protocol</h4>
            <p className="text-[10px] font-mono uppercase text-zinc-600 leading-loose">
              All inquiries are processed via Gemini_Cloud. Refrain from injecting PII (Personally Identifiable Information) into the theoretical stream.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}

function QueryTile({ label, example }: { label: string, example: string }) {
  return (
    <div className="group bg-zinc-950/40 border border-white/5 p-10 transition-all duration-700 hover:bg-white hover:text-black">
      <span className="block font-mono text-[8px] opacity-30 uppercase tracking-[0.4em] mb-4 group-hover:text-black">Node_{label}</span>
      <p className="font-serif-italic italic text-lg text-zinc-400 group-hover:text-black transition-colors">
        &quot;{example}&quot;
      </p>
    </div>
  )
}