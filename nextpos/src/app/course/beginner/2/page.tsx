"use client";

import React from "react";
import Image from "next/image";
import {
  Atom, Box, Grid, Globe,
  Terminal, Activity
} from "lucide-react";

export default function QubitsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        {/* <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" /> */}
        {/* Atom Schematic: Image 2 */}
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial pointer-events-none">
          <Image src="/bg_images/compass.jpg" alt="Logic Grid" fill className="object-cover object-center scale-110" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Terminal size={14} />
            <span>Module_02 // Qubits</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Superposition <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Logic</span>
          </h1>
          <p className="text-xl font-serif-italic text-zinc-400 italic leading-relaxed max-w-2xl">
            "Existing in two places at once. The fundamental duality of quantum information."
          </p>
        </div>
      </header>

      <div className="relative z-20 max-w-5xl mx-auto px-12 py-24 space-y-32 pb-60">

        {/* SECTION 1: THE MATH */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            01 // The_State_Vector
          </div>
          <div className="md:col-span-8 space-y-12">
            <div className="glass-pane-dark p-12 rounded-[40px] border border-white/10 dusty-visual space-y-8">
              <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2.2]">
                A qubit's state |ψ⟩ is a linear combination of the basis states |0⟩ and |1⟩.
              </p>

              {/* Math Block */}
              <div className="bg-black/60 border border-white/10 rounded-2xl p-8 flex justify-center">
                <code className="font-serif-italic text-3xl text-white">
                  |ψ⟩ = α|0⟩ + β|1⟩
                </code>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Alpha (α)</span>
                  <p className="text-sm text-zinc-300">Probability Amplitude for state |0⟩.</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Beta (β)</span>
                  <p className="text-sm text-zinc-300">Probability Amplitude for state |1⟩.</p>
                </div>
              </div>

              <div className="p-4 border-t border-white/5 text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                |α|² + |β|² = 1 (Unity Condition)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: BLOCH SPHERE ANALOGY */}
        <section className="glass-pane-dark rounded-[60px] p-20 border border-white/10 relative overflow-hidden group">
          {/* Background Sphere: Image 2 scale up */}
          <div className="absolute -right-20 -top-20 w-[60vw] h-[60vw] opacity-30 blend-screen pointer-events-none mask-radial dusty-visual">
            <Image src="/bg_images/compass.jpg" alt="Bloch Sphere" fill className="object-contain rotate-12 scale-125" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <Globe size={18} className="animate-pulse" />
                <span>02 // Bloch_Representation</span>
              </div>
              <h2 className="text-5xl font-serif-italic tracking-tighter uppercase text-glow">
                Geometric <br /> <span className="italic text-zinc-600">Visualization</span>
              </h2>
              <ul className="space-y-6 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                <li className="flex gap-4"><div className="w-1 h-1 bg-white mt-1.5" /> North Pole: State |0⟩</li>
                <li className="flex gap-4"><div className="w-1 h-1 bg-white mt-1.5" /> South Pole: State |1⟩</li>
                <li className="flex gap-4"><div className="w-1 h-1 bg-white mt-1.5" /> Equator: Superposition States</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: ANALOGY GRID */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <Activity size={12} />
            <span>Conceptual_Analogies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnalogyTile title="Spinning Coin" desc="While spinning, it is neither heads nor tails. It is a probability distribution of both." icon={<Atom size={20} />} />
            <AnalogyTile title="Musical Chord" desc="Multiple frequencies (states) resonating simultaneously to create a complex waveform." icon={<Activity size={20} />} />
            <AnalogyTile title="Paint Mixing" desc="Basis colors blending to form a new hue (superposition), distinct from its parts." icon={<Grid size={20} />} />
            <AnalogyTile title="Schrödinger's Box" desc="The unobserved state holds both outcomes (Alive/Dead) in coherent suspension." icon={<Box size={20} />} />
          </div>
        </section>

      </div>
    </main>
  );
}

function AnalogyTile({ title, desc, icon }: any) {
  return (
    <div className="glass-pane-dark p-10 rounded-[32px] border border-white/5 hover:border-white/20 transition-all group">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-serif-italic text-2xl text-zinc-200 group-hover:text-glow">{title}</h4>
        <div className="p-3 bg-white/[0.03] rounded-xl text-zinc-500 group-hover:text-white transition-colors">{icon}</div>
      </div>
      <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wide group-hover:text-zinc-300">
        {desc}
      </p>
    </div>
  )
}