"use client";

import React from "react";
import Image from "next/image";
import {
  BarChart3, Orbit,
  Activity, Plus, Cpu
} from "lucide-react";

export default function VisualizationPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
        </div>
        {/* Atomic Grid: Image 2 */}
        <div className="absolute inset-0 opacity-40 blend-screen mask-radial pointer-events-none">
          <Image src="/bg_images/download (28).jpg" alt="Blueprint" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. EDITORIAL HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Activity size={14} className="text-glow" />
            <span>Analytical_Reference // VIS_PROJ_05</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
            Visual <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Intelligence</span>
          </h1>
          <p className="text-xl font-mono uppercase tracking-widest text-zinc-400 max-w-2xl leading-relaxed">
            Decoding simulation data through high-fidelity 2D and 3D projections.
          </p>
        </div>
      </header>

      <div className="relative z-20 max-w-6xl mx-auto px-12 py-32 space-y-40 pb-60">

        {/* SECTION 01: STATE VECTOR TABLE */}
        <section className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
            01 // State_Vector_Log
          </div>
          <div className="md:col-span-8 space-y-12">
            <div className="glass-pane-dark p-12 rounded-[50px] border border-white/10 dusty-visual">
              <h2 className="text-4xl font-serif-italic italic mb-8 text-white/90">The mathematical snapshot.</h2>
              <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2.2] mb-12">
                The state vector provides the raw description of the system <span className="text-white">pre-collapse</span>. It lists all possible computational basis states and their complex amplitudes.
              </p>

              <div className="grid grid-cols-1 gap-4">
                <ColumnSpec label="Basis_State" desc="Basis state labels (e.g., |01⟩)." />
                <ColumnSpec label="Amplitude" desc="Complex number (α/β) encoding magnitude and phase." />
                <ColumnSpec label="Magnitude" desc="The weight (|α|) of the state in superposition." />
                <ColumnSpec label="Phase" desc="The angle in the complex plane, vital for interference." />
                <ColumnSpec label="Probability" desc="Square of the magnitude (|α|²). Sums to unity." />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: 2D PROJECTIONS */}
        <section className="space-y-16">
          <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <Cpu size={12} />
            <span>Plotting_Engine // Plotly.js</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <ProjectionTile
              title="Probability Histogram"
              desc="Visualizes measurement outcome likelihoods. Each bar represents a discrete basis state outcome."
            />
            <ProjectionTile
              title="Polar Phase Plot"
              desc="Represents states as vectors. The angle signifies phase, crucial for understanding constructive interference."
            />
          </div>
        </section>

        {/* SECTION 03: 3D TOPOLOGY */}
        <section className="glass-pane-dark rounded-[60px] p-20 border border-white/10 overflow-hidden relative group">
          {/* Background 3D Energy: Image 4 */}
          <div className="absolute inset-0 opacity-[0.03] blend-screen pointer-events-none group-hover:scale-105 transition-transform [transition-duration:4s]">
            <Image src="/bg_images/logic-grid.jpg" alt="Energy" fill className="object-cover" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <Orbit size={18} className="animate-pulse" />
                <span>03 // Three.js_Topology</span>
              </div>
              <h2 className="text-6xl font-serif-italic tracking-tighter uppercase leading-[0.85] text-glow">
                3D Circuit <br /> <span className="italic text-zinc-600">Schematics</span>
              </h2>
              <p className="font-mono text-[11px] text-zinc-500 uppercase leading-[2] tracking-tight">
                For high-depth circuits, the topology is projected into 3D space.
                Enables spatial analysis of gate connections through
                rotation, zoom, and panning.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5 h-fit self-center">
              {['Axis_Rotation', 'Precision_Zoom', 'XY_Panning'].map(tool => (
                <div key={tool} className="bg-zinc-950/60 p-6 font-mono text-[9px] uppercase tracking-[0.3em] flex justify-between items-center group/item hover:bg-white hover:text-black transition-all">
                  <span>{tool}</span>
                  <Plus size={10} className="opacity-20 group-hover/item:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-12 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700">
        <span>SUPERPOS_VISUAL_SYSTEM_v.01</span>
        <span>SYNC_ACTIVE</span>
      </footer>
    </main>
  );
}

/* --- THEME SPECIFIC COMPONENTS --- */

function ColumnSpec({ label, desc }: { label: string, desc: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 py-4 border-b border-white/5 group hover:border-white/20 transition-colors">
      <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest min-w-[140px] group-hover:text-white transition-colors">{label}</span>
      <p className="font-mono text-[10px] text-zinc-600 uppercase group-hover:text-zinc-400 transition-colors">{desc}</p>
    </div>
  )
}

function ProjectionTile({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="group bg-zinc-950/40 p-12 transition-all duration-700 hover:bg-white hover:text-black cursor-default">
      <div className="flex justify-between items-start mb-16">
        <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-black/20 group-hover:bg-black/5 transition-all duration-500">
          <BarChart3 size={20} />
        </div>
        <Plus size={14} className="opacity-30 group-hover:opacity-100" />
      </div>
      <div className="space-y-4">
        <h4 className="text-3xl font-serif-italic tracking-tight uppercase group-hover:text-glow-none">{title}</h4>
        <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed tracking-widest group-hover:text-black transition-colors">
          {desc}
        </p>
      </div>
    </div>
  )
}