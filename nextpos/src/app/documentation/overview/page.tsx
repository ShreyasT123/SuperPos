"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CircuitBoard, FlaskConical,
  Newspaper, BotMessageSquare, Users,
  Terminal, ArrowUpRight, Plus, Activity
} from "lucide-react";

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none">
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
        </div>
        {/* The Atom Schematic (Your Image 2) as a blueprint backdrop */}
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial pointer-events-none grayscale">
          <Image src="/bg_images/download(20).jpg" alt="Atomic Schematic" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. THE EDITORIAL HEADER */}
      <header className="relative z-10 pt-40 pb-24 px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="space-y-8">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Terminal size={14} />
            <span>Reference_Doc // ARCH_OVR_01</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Platform <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Overview</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif-italic text-zinc-400 italic leading-relaxed max-w-3xl">
            &quot;Collapse your uncertainty. Architecting the fundamental reality through the mechanics of modular quantum intelligence.&quot;
          </p>
        </div>
      </header>

      {/* 3. MAIN CONTENT: THE THESIS */}
      <div className="relative z-10 max-w-5xl mx-auto px-12 py-24 space-y-40 pb-60">

        {/* SECTION: MISSION */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            01 // The_Mission
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-lg font-mono uppercase tracking-tight text-zinc-400 leading-[2]">
              Superpos addresses the complexity barriers of existing simulators by providing a <span className="text-white text-glow">Decentralized Intelligence Environment</span> designed to democratize quantum education.
            </p>
            <div className="h-[1px] w-24 bg-white/20" />
          </div>
        </section>

        {/* SECTION: SYSTEM CAPABILITIES (Specimen Grid) */}
        <section className="space-y-16">
          <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <Activity size={12} />
            <span>System_Capabilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[48px] overflow-hidden">
            <CapabilityTile
              title="Circuit Synthesis"
              desc="Visual drafting layer supporting high-fidelity gate architectures and real-time state synchronization."
              icon={<CircuitBoard size={20} />}
            />
            <CapabilityTile
              title="Analytical Briefings"
              desc="Deep-learning News aggregation via Tavily x Gemini decoding for real-time research updates."
              icon={<Newspaper size={20} />}
            />
            <CapabilityTile
              title="Protocol Demos"
              desc="Interactive execution of Shor's factorization and Fault Tolerance error mitigation modules."
              icon={<FlaskConical size={20} />}
            />
            <CapabilityTile
              title="Orbital Assistant"
              desc="Gemini-powered theoretical aid for instantaneous resolution of quantum complexity."
              icon={<BotMessageSquare size={20} />}
            />
          </div>
        </section>

        {/* SECTION: TARGET AUDIENCE (Stakeholder Analysis) */}
        <section className="glass-pane-dark p-16 rounded-[60px] border border-white/10 dusty-visual">
          <div className="space-y-12">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500 opacity-60">
              <Users size={14} />
              <span>Stakeholder_Analysis</span>
            </div>
            <h3 className="text-5xl font-serif-italic tracking-tighter uppercase text-glow leading-tight">
              Designed for the <br /> <span className="italic text-zinc-600">Quantum Class</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Students', 'Researchers', 'Educators', 'Enthusiasts'].map((item) => (
                <div key={item} className="space-y-2">
                  <span className="font-mono text-[8px] opacity-20 uppercase tracking-[0.4em]">Node_{item[0]}</span>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: INITIATION (Getting Started) */}
        <section className="text-center space-y-12">
          <div className="flex flex-col items-center gap-6">
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-white/20" />
            <h2 className="text-4xl font-didone uppercase tracking-[0.3em]">Initialize_Sequence</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/simulator" className="group flex items-center gap-4 px-12 py-5 rounded-full border border-white/10 bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all">
              Execute_Builder <ArrowUpRight size={14} />
            </Link>
            <Link href="/course" className="group flex items-center gap-4 px-12 py-5 rounded-full border border-white/10 bg-black text-white font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
              Access_Curriculum
            </Link>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-12 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700">
        <span>SUPERPOS_THESIS_v.01</span>
        <span>SYSTEM_STABLE</span>
      </footer>
    </main>
  );
}

/* --- THEME SPECIFIC COMPONENTS --- */

function CapabilityTile({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="group bg-zinc-950/40 p-12 transition-all duration-700 hover:bg-white hover:text-black cursor-default">
      <div className="flex justify-between items-start mb-12">
        <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-black/20 group-hover:bg-black/5 transition-all duration-500">
          {icon}
        </div>
        <Plus size={14} className="opacity-10 group-hover:opacity-100" />
      </div>
      <div className="space-y-4">
        <h4 className="text-2xl font-serif-italic tracking-tight uppercase group-hover:text-glow-quantum">{title}</h4>
        <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed tracking-widest group-hover:text-black transition-colors">
          {desc}
        </p>
      </div>
    </div>
  )
}