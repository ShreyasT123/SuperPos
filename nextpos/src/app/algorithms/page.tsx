'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Terminal, Search, Zap, Cpu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const demos = [
  {
    id: "01",
    title: "Shor's Algorithm",
    subtitle: "Prime Factorization Protocol",
    description: "Deconstructing classical RSA encryption through quantum period-finding logic. Factorize large integers exponentially faster.",
    link: "/algorithms/shors",
    img: "/bg_images/grid2.jpg", // Use Image 3/Logic style
    icon: <Zap size={18} />
  },
  {
    id: "02",
    title: "Fault Tolerance",
    subtitle: "Error Correction Workbench",
    description: "Mitigating stochastic decoherence using repetition codes. Observe how syndrome measurement preserves logical states.",
    link: "/algorithms/quantum-error-correction",
    img: "/bg_images/machine0.jpg", // Use Image 2/Grid style
    icon: <Cpu size={18} />
  }
]

export default function DemosPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDemos = demos.filter(demo =>
    demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC BACKGROUND (Inspiration Image 3 style) */}
      <div className="fixed inset-0 z-0 opacity-15 blend-screen pointer-events-none">
        <Image
          src="/bg_images/algosbg.jpg"
          alt="Technical Schematic"
          fill
          className="object-cover dusty-visual"
        />
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. PAGE HEADER */}
      <section className="relative z-10 pt-32 pb-20 px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
              <Terminal size={14} />
              <span>Available Intelligence</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow">
              Simulation <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Archives</span>
            </h1>
          </div>

          {/* SEARCH: Styled as a Command Line */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <input
              type="text"
              placeholder="QUERY_ARCHIVE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 pl-12 pr-6 font-mono text-[10px] uppercase tracking-widest focus:border-white/30 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* 3. THE DEMO TILES */}
      <section className="relative z-10 max-w-7xl mx-auto px-12 py-20 pb-60">
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence mode='popLayout'>
            {filteredDemos.map((demo) => (
              <DemoSpecimen key={demo.id} demo={demo} />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}

function DemoSpecimen({ demo }: { demo: { id: string; title: string; subtitle: string; description: string; link: string; img: string; icon: React.ReactNode } }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={demo.link} className="group block relative rounded-[60px] border border-white/10 bg-zinc-950/40 backdrop-blur-3xl overflow-hidden dusty-visual">
        <div className="grid md:grid-cols-12 items-stretch min-h-[500px]">

          {/* LEFT: Text Data */}
          <div className="md:col-span-7 p-16 flex flex-col justify-between relative z-10 border-r border-white/5">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] opacity-20">REF_{demo.id}</span>
                <div className="h-[1px] w-12 bg-white/10" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">{demo.subtitle}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-6xl font-serif-italic tracking-tight group-hover:text-glow transition-all duration-700">
                  {demo.title}
                </h2>
                <p className="text-[11px] font-mono text-zinc-400 uppercase leading-[2] tracking-tight max-w-md opacity-70 group-hover:opacity-100 transition-opacity">
                  {demo.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-12">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-white">
                <span>Initialize_Sequence</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* RIGHT: High-Concept Visualization (Based on your Images) */}
          <div className="md:col-span-5 relative bg-black/40 overflow-hidden">
            {/* The intricate math diagram from your inspo */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen group-hover:scale-110 group-hover:opacity-60 transition-all [transition-duration:2s]">
              <Image
                src={demo.img}
                alt="Mathematical Visualization"
                fill
                className="object-cover"
              />
            </div>
            {/* Overlaying a radial light source */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60" />

            {/* Large Icon Graphic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md bg-white/[0.02] group-hover:scale-125 transition-transform duration-700">
                {demo.icon}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}