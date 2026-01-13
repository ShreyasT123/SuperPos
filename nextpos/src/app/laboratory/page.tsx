'use client'
import React from 'react';
import Image from 'next/image';
import {
  SimulatorProvider,
  useSimulator,
  GatesPalette,
  CircuitGrid,
  JsonOutput,
  SimulationResults,
  SimulationTextResults
} from '@/components/ui/LaboratoryComponents'; // Moved sub-components for clarity
import { Terminal, Settings2, Activity } from 'lucide-react';

export default function Laboratory() {
  return (
    <SimulatorProvider>
      <LaboratoryContent />
    </SimulatorProvider>
  );
}
function LaboratoryContent() {
  const { simResults, qubits, steps } = useSimulator();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 relative overflow-x-hidden">

      {/* 1. THE SCHEMATIC BACKGROUNDS */}
      <div className="fixed inset-0 z-0 opacity-60 mix-blend-screen mask-radial pointer-events-none">
        <Image
          src="/bg_images_and_asethetics/download (17).jpg"
          alt="Technical Grid"
          fill
          className="object-cover"
        />
      </div>

      {/* 2. HEADER */}
      <header className="relative z-[110] px-12 py-8 flex justify-between items-center border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Terminal size={20} className="text-zinc-500" />
          <h1 className="text-2xl font-didone tracking-[0.4em] uppercase text-quantum text-glow-quantum">
            Circuit <span className="italic opacity-50 font-serif-italic capitalize tracking-normal">Composer</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-12 font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse text-glow-emerald shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-glow-emerald text-emerald-500/80">Kernel: Cirq_v1.4</span>
          </div>
          <span>Node: 0x992_VIRTUAL</span>
        </div>
      </header>

      {/* 3. WORKBENCH */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-12 py-12 grid grid-cols-12 gap-10">

        {/* SIDEBAR */}
        <aside className="col-span-12 lg:col-span-3 h-fit lg:sticky lg:top-32 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between opacity-30 font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Settings2 size={12} />
                <span>Lab_Intelligence</span>
              </div>
              <span>v.01</span>
            </div>

            {/* Scrollable controls + gates */}
            <GatesPalette />
          </div>
        </aside>

        {/* DRAFTING AREA */}
        <div className="col-span-12 lg:col-span-9 space-y-12">
          <section className="relative rounded-[48px] border border-white/10 bg-zinc-950/40 backdrop-blur-3xl p-10 overflow-hidden dusty-visual">
            <div className="absolute top-6 left-10 opacity-20 font-mono text-[9px] tracking-[0.5em] uppercase text-glow">
              Schematic_Draft_01 // Array_{qubits}x{steps}
            </div>
            <CircuitGrid />
          </section>

          <div className="grid grid-cols-1 gap-12 pb-40">
            <JsonOutput />
            {simResults && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4 opacity-40 font-mono text-[10px] uppercase tracking-widest text-glow">
                  <Activity size={12} />
                  <span>Analytical_Projections</span>
                </div>
                <SimulationResults />
                <SimulationTextResults />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}