"use client";

import React from "react";
import Image from "next/image";
import { Atom, Waves, Link2, CircuitBoard, Binary, ShieldCheck, Cpu, Terminal, Plus, ArrowRight } from "lucide-react";

export default function ConceptsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grayscale mix-blend-overlay opacity-10 pointer-events-none bg-[url('/marble-bg.png')] bg-cover" />
        {/* Atom Blueprint: Image 2 */}
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial pointer-events-none grayscale translate-y-40">
          <Image src="/bg_images/atoms.jpg" alt="Atomic Schematic" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Terminal size={14} />
            <span>Reference_Doc // THEORY_MNF_02</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Theoretical <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Manifest</span>
          </h1>
          <p className="text-xl font-mono uppercase tracking-widest text-zinc-400 max-w-2xl leading-relaxed">
            A taxonomy of quantum mechanics and computational foundations.
          </p>
        </div>
      </header>

      {/* 3. CONCEPTS LIST: Styled as Specimen entries */}
      <div className="relative z-20 max-w-6xl mx-auto px-12 py-32 space-y-1 pb-60">
        <ConceptSpecimen
          id="01"
          title="Qubits"
          tag="State_Basis"
          desc="Unlike classical bits, qubits exist in Hilbert space. Mathematical representation: |ψ⟩ = α|0⟩ + β|1⟩."
          icon={<Atom size={24} />}
        />
        <ConceptSpecimen
          id="02"
          title="Superposition"
          tag="Linear_Coherence"
          desc="The ability of a system to exist in multiple configurations simultaneously until a measurement collapse occurs."
          icon={<Waves size={24} />}
        />
        <ConceptSpecimen
          id="03"
          title="Entanglement"
          tag="Non_Locality"
          desc="Spooky action at a distance. Non-separable states where measurement of one instantly informs the other."
          icon={<Link2 size={24} />}
        />
        <ConceptSpecimen
          id="04"
          title="Gate_Logic"
          tag="Unitary_Operators"
          desc="Unitary transformations (H, X, CNOT) that rotate the statevector across the Bloch Sphere surface."
          icon={<CircuitBoard size={24} />}
        />
        <ConceptSpecimen
          id="05"
          title="Decoherence"
          tag="System_Noise"
          desc="The degradation of quantum information through environmental interaction. The primary obstacle to fault-tolerance."
          icon={<ShieldCheck size={24} />}
        />
      </div>
    </main>
  );
}

function ConceptSpecimen({ id, title, tag, desc, icon }: any) {
  return (
    <div className="group relative border-b border-white/5 py-16 px-12 transition-all duration-700 hover:bg-white hover:text-black overflow-hidden cursor-default">
      <div className="relative z-10 flex flex-col md:flex-row gap-12 md:items-center">

        <div className="flex md:flex-col justify-between md:justify-start gap-4 min-w-[120px]">
          <span className="font-mono text-[11px] opacity-20 group-hover:text-black">SPEC_{id}</span>
          <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-600">
            {tag}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="text-5xl font-serif-italic tracking-tighter uppercase group-hover:text-glow-quantum">
            {title}
          </h2>
          <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2] tracking-tight max-w-2xl group-hover:text-black transition-colors">
            {desc}
          </p>
        </div>

        <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02] group-hover:border-black/20 group-hover:bg-black/5 transition-all duration-500">
          {icon}
        </div>
      </div>
    </div>
  )
}
