"use client";

import React from "react";
import Image from "next/image";
import {
  CircuitBoard,
  Activity
} from "lucide-react";

export default function CircuitBuilderPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. BLUEPRINT BACKGROUND */}
      <div className="fixed inset-0 z-0">
        {/* <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" /> */}
        {/* Logic Grid: Image 5 */}
        <div className="absolute inset-0 opacity-30 blend-screen mask-radial pointer-events-none translate-y-20">
          <Image src="/bg_images/portal.jpg" alt="Blueprint" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <CircuitBoard size={14} className="opacity-40" />
            <span>Operation_Manual // LAB_ARCH_01</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-glow">
            Circuit <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Synthesis</span>
          </h1>
          <p className="text-xl font-mono uppercase tracking-widest text-zinc-400 max-w-2xl leading-relaxed">
            A guide to constructing quantum logical gates within the Superpos drafting layer.
          </p>
        </div>
      </header>

      <div className="relative z-20 max-w-6xl mx-auto px-12 py-32 space-y-40 pb-60">

        {/* SECTION: WORKFLOW SEQUENCES */}
        <section className="space-y-16">
          <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <Activity size={12} />
            <span>Command_Sequence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <SequenceStep id="01" title="Config_Init" desc="Set physical qubit count and simulation depth within the Configuration Panel." />
            <SequenceStep id="02" title="Gate_Drift" desc="Drag unitary operators from the Inventory onto the timeline wires." />
            <SequenceStep id="03" title="Param_Set" desc="Specify rotation angles for RZ, RX, and RY gates before placement." />
            <SequenceStep id="04" title="Logic_Link" desc="Establish control-target dependencies for multi-qubit gates (CNOT, SWAP)." />
            <SequenceStep id="05" title="Execution" desc="Trigger the Simulate sequence to engage the Cirq Kernel." />
            <SequenceStep id="06" title="Analysis" desc="Observe the resulting state-vector collapse and probability histograms." />
          </div>
        </section>

        {/* SECTION: GATE MANIFEST */}
        <section className="glass-pane-dark p-16 rounded-[60px] border border-white/10 grid md:grid-cols-2 gap-20 overflow-hidden relative">
          <div className="space-y-8 relative z-10">
            <h2 className="text-5xl font-serif-italic tracking-tighter uppercase text-glow">Unitary <br /> Manifest</h2>
            <p className="font-mono text-[10px] text-zinc-500 uppercase leading-[2.5] tracking-widest">
              SUPERPOS SUPPORTS STANDARD <br />
              CLIFORD+T AND PARAMETRIC GATES. <br />
              H / X / Y / Z / S / T <br />
              CNOT / CCX / SWAP / MEASURE
            </p>
          </div>
          <div className="relative aspect-square opacity-60 blend-screen scale-150 translate-x-20 mask-radial dusty-visual">
            <Image src="/bg_images/atoms.jpg" alt="Atoms" fill className="object-cover" />
          </div>
        </section>

      </div>
    </main>
  );
}

function SequenceStep({ id, title, desc }: { id: string; title: string; desc: string }) {
  return (
    <div className="group bg-zinc-950/90 border border-white/5 p-12 transition-all duration-700 hover:bg-white hover:text-black cursor-default">
      <span className="block font-mono text-[8px] opacity-20 uppercase tracking-[0.5em] mb-8 group-hover:text-black group-hover:opacity-100 transition-all">SEQ_P_{id}</span>
      <h4 className="text-3xl font-serif-italic tracking-tight uppercase mb-4 group-hover:text-glow-none">{title}</h4>
      <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed tracking-tight group-hover:text-black transition-colors">
        {desc}
      </p>
    </div>
  )
}