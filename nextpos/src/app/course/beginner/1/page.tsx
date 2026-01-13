"use client";

import React from "react";
import Image from "next/image";
import {
  Atom, Brain, Network, Cpu,
  Terminal, ShieldCheck, Zap, Activity
} from "lucide-react";

export default function BeginnerCourse() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC BACKGROUNDS */}
      <div className="fixed inset-0 z-0">
        {/* <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" /> */}
        {/* Logic Grid: Image 5 */}
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial pointer-events-none">
          <Image src="/bg_images/compass.jpg" alt="Logic Grid" fill className="object-cover object-center scale-110" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. COURSE HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-5xl mx-auto border-b border-white/5">
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Terminal size={14} />
            <span>Module_01 // Introduction</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Quantum <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Computing</span>
          </h1>
          <p className="text-xl font-serif-italic text-zinc-400 italic leading-relaxed max-w-2xl">
            "Welcome to the multiverse of computation, where Schrödinger meets silicon."
          </p>
        </div>
      </header>

      {/* 3. MAIN LECTURE CONTENT */}
      <div className="relative z-20 max-w-5xl mx-auto px-12 py-24 space-y-32 pb-60">

        {/* SECTION 1: THE PARADIGM SHIFT */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            01 // The_Paradigm
          </div>
          <div className="md:col-span-8 space-y-12">
            <div className="glass-pane-dark p-12 rounded-[40px] border border-white/10 dusty-visual">
              <h2 className="text-4xl font-serif-italic italic mb-8 text-white/90">A fundamental redefinition of logic.</h2>
              <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2.2] mb-8">
                Classical computers operate on <span className="text-white">Bits (0 or 1)</span>. Quantum computers utilize <span className="text-white">Qubits</span>, leveraging superposition to exist in multiple states simultaneously.
              </p>
              <div className="bg-zinc-950/60 p-8 rounded-3xl border-l-2 border-white/20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 block mb-2">Analogy: The_Maze_Solver</span>
                <p className="font-serif-italic text-lg text-zinc-300">
                  "A classical computer walks every path of a maze sequentially. A quantum computer floods the maze like water, finding the exit instantaneously."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CLASSICAL VS QUANTUM TABLE */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <Activity size={12} />
            <span>Comparative_Analysis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
            <ComparisonTile
              title="Basic Unit"
              classical="Bit (0 OR 1)"
              quantum="Qubit (0 AND 1)"
              icon={<Cpu size={20} />}
            />
            <ComparisonTile
              title="Processing"
              classical="Sequential Logic"
              quantum="Parallel Interference"
              icon={<Network size={20} />}
            />
            <ComparisonTile
              title="Outcome"
              classical="Deterministic"
              quantum="Probabilistic"
              icon={<Atom size={20} />}
            />
          </div>
        </section>

        {/* SECTION 3: IMPACT & APPLICATION */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            03 // Impact_Vector
          </div>
          <div className="md:col-span-8 grid gap-6">
            <ImpactCard
              title="Optimization"
              desc="Grover's algorithm provides quadratic speedup for unstructured search databases."
              icon={<Zap size={20} />}
            />
            <ImpactCard
              title="Cryptography"
              desc="Shor's algorithm threatens RSA encryption via efficient prime factorization."
              icon={<ShieldCheck size={20} />}
            />
            <ImpactCard
              title="Simulation"
              desc="Accurately modeling molecular interactions for drug discovery and material science."
              icon={<Brain size={20} />}
            />
          </div>
        </section>

      </div>
    </main>
  );
}

/* --- SUB-COMPONENTS --- */

function ComparisonTile({ title, classical, quantum, icon }: any) {
  return (
    <div className="bg-zinc-950/40 p-10 group hover:bg-white hover:text-black transition-all duration-700">
      <div className="mb-8 opacity-40 group-hover:opacity-100">{icon}</div>
      <h4 className="font-mono text-[10px] uppercase tracking-widest mb-6 opacity-60">{title}</h4>
      <div className="space-y-4 font-mono text-[11px] leading-relaxed">
        <div>
          <span className="block text-[8px] opacity-30 uppercase tracking-widest mb-1">Classical</span>
          <span className="text-zinc-400 group-hover:text-black">{classical}</span>
        </div>
        <div>
          <span className="block text-[8px] opacity-30 uppercase tracking-widest mb-1">Quantum</span>
          <span className="text-white group-hover:text-black font-bold">{quantum}</span>
        </div>
      </div>
    </div>
  )
}

function ImpactCard({ title, desc, icon }: any) {
  return (
    <div className="glass-pane-dark p-8 rounded-3xl border border-white/5 flex items-start gap-6 hover:border-white/20 transition-all group">
      <div className="p-3 bg-white/[0.03] rounded-xl text-zinc-400 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-serif-italic text-xl text-zinc-200 mb-2 group-hover:text-glow">{title}</h4>
        <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wide">
          {desc}
        </p>
      </div>
    </div>
  )
}