'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {
  ArrowRight, CircuitBoard,
  BrainCircuit,
  Layers3, Newspaper, Terminal, Plus, Activity
} from 'lucide-react'

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS (Background Layers) */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
        </div>
        {/* Logic Grid Overlay (Your Image 5) */}
        <div className="absolute inset-0 opacity-50 blend-screen mask-radial pointer-events-none">
          <Image src="/bg_images/portal.jpg" alt="Blueprint" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HERO SECTION: "The Archive Entry" */}
      <section className="relative z-10 pt-40 pb-24 px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row gap-16 items-end justify-between">
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
              <Terminal size={14} />
              <span>Central_Intelligence_Base</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
              The <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Archive</span>
            </h1>
            <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] leading-loose text-zinc-400">
              Democratizing quantum education through high-fidelity simulation <br />
              and interactive modular intelligence.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link href="/simulator" className="group flex items-center gap-6 px-10 py-5 rounded-full border border-white/10 bg-white text-black font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all">
              Launch_Lab <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-12 py-32 space-y-40 pb-60">

        {/* 3. CORE FUNCTIONALITY: "Protocol Manifest" */}
        <section className="space-y-16">
          <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
            <Activity size={12} />
            <span>System_Protocols</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ManifestCard
              id="01"
              title="Circuit_Synthesis"
              desc="Intuitive gate architecture supporting up to 10 qubits with real-time Cirq backend synchronization."
              icon={<CircuitBoard size={24} />}
              href="/documentation/simulator"
            />
            <ManifestCard
              id="02"
              title="Data_Visualization"
              desc="Analytical 2D/3D projections including probability histograms and state phase analysis."
              icon={<Layers3 size={24} />}
              href="/documentation/visualization"
            />
            <ManifestCard
              id="03"
              title="Quantum_Briefings"
              desc="Real-time research intelligence gathered via Tavily x Gemini decoding logic."
              icon={<Newspaper size={24} />}
              href="/quantum-news"
            />
            <ManifestCard
              id="04"
              title="System_Assistant"
              desc="Gemini-powered orbital assistant for real-time theoretical explanations."
              icon={<BrainCircuit size={24} />}
              href="/documentation/chatbot"
            />
          </div>
        </section>

        {/* 4. TECHNOLOGY STACK: "Hardware Component Manifest" */}
        <section className="glass-pane-dark rounded-[60px] p-20 dusty-visual border border-white/10">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h2 className="text-6xl font-serif-italic tracking-tighter uppercase text-glow">The Stack</h2>
              <p className="font-mono text-[11px] text-zinc-500 uppercase leading-[2] max-w-sm">
                Superpos leverages a distributed micro-architecture optimized for low-latency quantum circuit execution and rendering.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 font-mono text-[9px] uppercase tracking-widest">
              <div className="space-y-4">
                <span className="text-zinc-600 block border-b border-white/5 pb-2">Core_Engine</span>
                <ul className="space-y-2 text-zinc-400">
                  <li>Next.js_14</li>
                  <li>Django_REST</li>
                  <li>Cirq_v1.4</li>
                </ul>
              </div>
              <div className="space-y-4">
                <span className="text-zinc-600 block border-b border-white/5 pb-2">Graphics_Layer</span>
                <ul className="space-y-2 text-zinc-400">
                  <li>Plotly.js</li>
                  <li>Three.js</li>
                  <li>Tailwind_CSS</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. DOCUMENTATION DIRECTORY: "The Ledger" */}
        <section className="space-y-16">
          <h2 className="text-4xl font-didone uppercase tracking-widest text-center opacity-40">Documentation_Ledger</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            <LedgerItem title="Platform Overview" href="/documentation/overview" />
            <LedgerItem title="Circuit Builder" href="/documentation/simulator" />
            <LedgerItem title="Algorithms" href="/documentation/algorithms" />
            <LedgerItem title="Visualization" href="/documentation/visualization" />
            <LedgerItem title="AI Interaction" href="/documentation/chatbot" />
            <LedgerItem title="News Feeds" href="/documentation/news-feed" />
          </div>
        </section>

      </div>

      {/* 6. FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-24 px-12 max-w-4xl mx-auto text-center space-y-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-[1px] bg-white/20" />
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">
            Contribute to the Archive on <Link href="#" className="text-white hover:text-glow transition-all underline underline-offset-8">GitHub</Link>
          </p>
        </div>
        <button className="px-10 py-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-mono text-[9px] uppercase tracking-[0.5em]">
          Visit_Community_Forum
        </button>
      </footer>
    </main>
  )
}

/* --- RESKINNED SUB-COMPONENTS --- */

function ManifestCard({ id, title, desc, icon, href }: any) {
  return (
    <Link href={href} className="group relative glass-pane-dark p-12 rounded-[48px] overflow-hidden transition-all duration-700 hover:px-16 hover:bg-zinc-900/80">
      <div className="flex justify-between items-start mb-12">
        <span className="font-mono text-[11px] opacity-20 group-hover:opacity-100 transition-opacity">SYS_REF_{id}</span>
        <div className="w-12 h-12 rounded-2xl border border-white/5 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all duration-500">
          {icon}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-4xl font-serif-italic tracking-tight text-white/90 group-hover:text-glow transition-all">{title}</h3>
        <p className="text-[11px] font-mono text-zinc-500 uppercase leading-relaxed tracking-tight group-hover:text-zinc-300 transition-colors">
          {desc}
        </p>
      </div>
      <Plus className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-40 transition-opacity" size={16} />
    </Link>
  )
}
function LedgerItem({ title, href }: any) {
  return (
    <Link
      href={href}
      className="
        group flex items-center justify-between p-8 
        /* GLASSY BASE: Translucent white tint + Heavy Blur */
        bg-white/[0.005] backdrop-blur-xl border border-white/10
        /* TRANSITION: Slower, elegant ease */
        transition-all duration-700 ease-out
        /* HOVER: Solid flip with a subtle scale-up and outer glow */
        hover:bg-white hover:text-black hover:scale-[1.01]
        hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]
        relative overflow-hidden
      "
    >
      {/* Editorial Text */}
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] relative z-10 transition-colors duration-500">
        {title}
      </span>

      {/* Action Icon */}
      <div className="relative z-10 flex items-center">
        <ArrowRight
          size={14}
          className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500"
        />
      </div>

      {/* OPTIONAL: A faint "dusty" texture that only appears on hover inside the glass */}
      <div className="absolute inset-0 dusty-visual opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
    </Link>
  )
}