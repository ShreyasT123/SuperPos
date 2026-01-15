"use client";

import React from "react";
import Image from "next/image";
import {
  Terminal, Activity, Plus,
  Cpu, Server, Zap
} from "lucide-react";

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC MAIN_FRAME BACKGROUNDS */}
      <div className="fixed inset-0 z-0">
        {/* <div className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none">
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
        </div> */}
        {/* Floor Schematic: Your Image 5 */}
        <div className="absolute inset-0 opacity-50 blend-screen mask-radial pointer-events-none translate-y-20">
          <Image src="/bg_images/logic-grid.jpg" alt="Logic Grid" fill className="object-cover" />
        </div>
        {/* Core Energy: Your Image 4 (Centered behind content) */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] opacity-[0.60] blend-screen pointer-events-none"> */}
        {/* <Image src="/bg_images/download (41).jpg" alt="Fracture Core" fill className="object-contain animate-pulse" />
        </div> */}
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. EDITORIAL HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-6xl mx-auto border-b border-white/5">
        <div className="space-y-6">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
            <Terminal size={14} />
            <span>Reference_Doc // SYS_ARCH_02</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
            System <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Architecture</span>
          </h1>
          <p className="text-xl font-mono uppercase tracking-widest text-zinc-400 max-w-2xl leading-relaxed">
            A modular client-server framework engineered for high-fidelity simulation and neural data aggregation.
          </p>
        </div>
      </header>

      <div className="relative z-20 max-w-6xl mx-auto px-12 py-32 space-y-40 pb-60">

        {/* 3. HIGH LEVEL OVERVIEW: "The Signal Path" */}
        <section className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest text-zinc-600">
              <Activity size={12} />
              <span>01 // Signal_Flow</span>
            </div>
            <p className="text-lg font-mono text-zinc-400 uppercase leading-[1.8] tracking-tighter">
              Communication is established between the <span className="text-white text-glow">Orbital UI (Next.js)</span> and the <span className="text-white text-glow">Simulation Kernel (Django)</span> via an asynchronous REST protocol.
            </p>
          </div>
          {/* Minimalist Flow Visualization */}
          <div className="flex items-center justify-between p-12 glass-pane-dark rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 blend-screen scale-150 group-hover:scale-100 transition-transform [transition-duration:3s]">
              <Image src="/bg_images/atoms.jpg" alt="pattern" fill className="object-cover" />
            </div>
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black"><Cpu size={20} /></div>
              <span className="font-mono text-[8px] uppercase opacity-40">Client</span>
            </div>
            <div className="flex-1 h-[1px] bg-white/10 mx-6 relative">
              <div className="absolute inset-0 bg-white/40 animate-[shimmer_2s_infinite]" />
            </div>
            <div className="z-10 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center"><Server size={20} /></div>
              <span className="font-mono text-[8px] uppercase opacity-40">Kernel</span>
            </div>
          </div>
        </section>

        {/* 4. COMPONENT BREAKDOWN: "Module Manifest" */}
        <section className="space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-serif-italic italic text-white/80">Hardware Node Mapping</h2>
            <div className="w-24 h-[1px] bg-white/10 mx-auto" />
          </div>

          <div className="grid grid-cols-1 gap-1">
            <ArchCategory
              id="0x01"
              title="Frontend Orbital Layer"
              subtitle="Next.js // React // Graphics_Bus"
              components={[
                { name: "Circuit_Architect", role: "Visual state manipulation and JSON synthesis", tech: "Three.js" },
                { name: "Analytical_Projections", role: "2D/3D Probability distribution rendering", tech: "Plotly.js" },
                { name: "Orbital_Chat_UI", role: "Interface for the neural theoretical assistant", tech: "Context_API" }
              ]}
            />
            <ArchCategory
              id="0x02"
              title="Simulation Kernel"
              subtitle="Django_REST // Python // Logic_Core"
              components={[
                { name: "REST_Controller", role: "Signal routing and API request management", tech: "DRF" },
                { name: "Interpreter_Bus", role: "Parsing circuit JSON into executable Cirq objects", tech: "Python" },
                { name: "Sim_Processor", role: "High-fidelity execution of quantum gates", tech: "Cirq_v1.4" }
              ]}
            />
            <ArchCategory
              id="0x03"
              title="Neural Linkages"
              subtitle="External // AI_Bus // Search_API"
              components={[
                { name: "Briefing_Aggregator", role: "Intelligence gathering and summarization", tech: "Tavily x Gemini" },
                { name: "Theoretical_Oracle", role: "Real-time query resolution and concept aiding", tech: "Gemini_1.5" }
              ]}
            />
          </div>
        </section>

        {/* 5. DATA FLOW LOGS */}
        <section className="glass-pane-dark p-16 rounded-[60px] border border-white/10 dusty-visual">
          <div className="space-y-12">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500 opacity-60">
              <Plus size={14} />
              <span>Execution_Protocols</span>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              <FlowLog
                title="Simulation_Path"
                path="UI -> API -> Interpreter -> Cirq -> Analyzer -> Projections"
              />
              <FlowLog
                title="Briefing_Path"
                path="UI -> Controller -> Tavily_API -> Gemini_Decoding -> Feed"
              />
              <FlowLog
                title="Query_Path"
                path="UI -> Neural_Bus -> Gemini_Model -> Context_Injection -> Chat"
              />
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-12 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700">
        <span>SUPERPOS_BLUEPRINT_ARCH_v.02</span>
        <span>KERNEL_SYNCED</span>
      </footer>
    </main>
  );
}

/* --- THEME SPECIFIC COMPONENTS --- */

function ArchCategory({ id, title, subtitle, components }: { id: string; title: string; subtitle: string; components: { name: string; role: string; tech: string }[] }) {
  return (
    <div className="group border border-white/5 bg-zinc-950/40 p-12 transition-all duration-700 hover:bg-white hover:text-black">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <span className="font-mono text-[9px] opacity-30 group-hover:opacity-100">{id} {"//"} Sector</span>
          <h3 className="text-4xl font-serif-italic tracking-tighter uppercase">{title}</h3>
        </div>
        <span className="font-mono text-[10px] text-zinc-600 group-hover:text-black tracking-widest">{subtitle}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {components.map((c) => (
          <div key={c.name} className="space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-tighter text-white group-hover:text-black border-b border-white/10 group-hover:border-black/20 pb-2">
              {c.name}
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed group-hover:text-black">
              {c.role}
            </p>
            <span className="block font-mono text-[8px] text-zinc-700 uppercase tracking-widest group-hover:text-black">
              Bus: {c.tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowLog({ title, path }: { title: string, path: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-[9px] text-white/40 uppercase tracking-[0.3em]">
        <Zap size={10} /> <span>{title}</span>
      </div>
      <p className="font-mono text-[10px] text-zinc-500 leading-loose uppercase tracking-tight">
        {path}
      </p>
    </div>
  )
}