"use client";

import React from "react";
import Image from "next/image";
import {
  Binary, Atom, RotateCw, Combine,
  Terminal, ArrowRight, Zap
} from "lucide-react";

export default function QuantumGatesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        {/* Note: The sidebar's z-50 will now sit ON TOP of this z-0 background */}
        {/* <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" /> */}
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
            <span>Module_03 // Logic_Gates</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Unitary <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Operators</span>
          </h1>
          <p className="text-xl font-serif-italic text-zinc-400 italic leading-relaxed max-w-2xl">
            "If qubits are the actors, quantum gates are the directors—orchestrating the collapse."
          </p>
        </div>
      </header>

      <div className="relative z-20 max-w-5xl mx-auto px-12 py-24 space-y-32 pb-60">

        {/* SECTION 1: THE FUNDAMENTAL UNIT */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            01 // The_Mechanics
          </div>
          <div className="md:col-span-8 space-y-12">
            <div className="glass-pane-dark p-12 rounded-[40px] border border-white/10 dusty-visual space-y-8">
              <h2 className="text-4xl font-serif-italic italic text-white/90">Reversible Logic.</h2>
              <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2.2]">
                Unlike classical gates (AND, OR) which lose information, quantum gates are <span className="text-white">Unitary Matrices</span>. They transform the state vector |ψ⟩ without loss of data, making every operation reversible.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: SINGLE QUBIT GATES */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <Atom size={12} />
            <span>Single_Qubit_Ops</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <GateSpecimen
              symbol="X" name="Pauli-X (NOT)"
              desc="Flips state |0⟩ to |1⟩. Equivalent to a 180° rotation around the X-axis."
              icon={<Binary size={20} />}
            />
            <GateSpecimen
              symbol="H" name="Hadamard"
              desc="Creates Superposition. Maps basis states |0⟩ and |1⟩ to equal probability amplitudes."
              icon={<Atom size={20} />}
            />
            <GateSpecimen
              symbol="Z" name="Pauli-Z"
              desc="Phase Flip. Changes the phase of the |1⟩ component without affecting probability."
              icon={<RotateCw size={20} />}
            />
          </div>
        </section>

        {/* SECTION 3: MULTI-QUBIT GATES */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            03 // Entanglement_Ops
          </div>
          <div className="md:col-span-8 grid gap-6">
            <GateSpecimen
              symbol="CNOT" name="Controlled-NOT"
              desc="The 'If-Then' logic of quantum. Flips the target qubit only if the control is |1⟩. Essential for entanglement."
              icon={<Combine size={20} />}
            />
            <GateSpecimen
              symbol="SWAP" name="Exchange Gate"
              desc="Swaps the state of two qubits perfectly. |ψ⟩|φ⟩ → |φ⟩|ψ⟩."
              icon={<ArrowRight size={20} />}
            />
            <GateSpecimen
              symbol="CCX" name="Toffoli Gate"
              desc="Controlled-Controlled-NOT. A reversible version of the classical AND gate."
              icon={<Zap size={20} />}
            />
          </div>
        </section>

      </div>
    </main>
  );
}

function GateSpecimen({ symbol, name, desc, icon }: any) {
  return (
    <div className="group flex items-start gap-8 p-10 bg-zinc-950/40 border border-white/5 hover:bg-white hover:text-black transition-all duration-700 rounded-[32px]">
      <div className="w-16 h-16 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl group-hover:bg-black/5 group-hover:border-black/10 transition-colors">
        <span className="font-mono text-xl font-bold">{symbol}</span>
      </div>
      <div className="space-y-2">
        <h4 className="font-serif-italic text-2xl text-zinc-200 group-hover:text-black transition-colors">{name}</h4>
        <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed tracking-wide group-hover:text-zinc-600">
          {desc}
        </p>
      </div>
    </div>
  )
}