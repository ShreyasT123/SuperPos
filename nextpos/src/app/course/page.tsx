"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Atom, Zap, Brain, Sparkles,
  BrainCircuit, ShieldCheck, Binary, Route, Search, Activity
} from "lucide-react";

// --- DATA ---
const courses = [
  {
    id: "01",
    title: "Quantum FundaQuantum Fundamentals",
    subtitle: "The Qubit Basis",
    desc: "Understanding the fundamental building block: the qubit and its unique superposition properties.",
    level: "beginner",
    slug: "1",
    duration: "4_WEEKS",
    icon: <Atom size={20} />,
    bg: "/bg_images/compass.jpg"
  },
  {
    id: "02",
    title: "Superposition Logic",
    subtitle: "Linear Coherence",
    desc: "Exploring the counter-intuitive ability of quantum systems to exist in multiple states simultaneously.",
    level: "beginner",
    slug: "2",
    duration: "3_WEEKS",
    icon: <Sparkles size={20} />,
    bg: "/bg_images/compass.jpg"
  },
  {
    id: "03",
    title: "Gate Architecture",
    subtitle: "Unitary Operations",
    desc: "Manipulating qubits through Hadamard, Pauli-X, and Phase rotation gates.",
    level: "beginner",
    slug: "3",
    duration: "4_WEEKS",
    icon: <Binary size={20} />,
    bg: "/bg_images/compass.jpg"
  },
  {
    id: "04",
    title: "Circuit Synthesis",
    subtitle: "Logic Assembly",
    desc: "Combining gates into functional circuits to perform computational tasks.",
    level: "intermediate",
    slug: "1",
    duration: "4_WEEKS",
    icon: <Route size={20} />,
    bg: "/bg_images/atoms.jpg"
  },
  {
    id: "05",
    title: "Algorithmic Theory",
    subtitle: "Deutsch & Grover",
    desc: "Foundational algorithms that demonstrate quantum advantage over classical logic.",
    level: "intermediate",
    slug: "2",
    duration: "5_WEEKS",
    icon: <Zap size={20} />,
    bg: "/bg_images/atoms.jpg"
  },
  {
    id: "06",
    title: "Error Correction",
    subtitle: "Fault Tolerance",
    desc: "Protecting fragile quantum states from environmental decoherence and noise.",
    level: "intermediate",
    slug: "3",
    duration: "4_WEEKS",
    icon: <ShieldCheck size={20} />,
    bg: "/bg_images/atoms.jpg"
  },
  {
    id: "07",
    title: "Neural Quantum States",
    subtitle: "Machine Learning",
    desc: "Intersection of quantum computing and neural network topologies.",
    level: "advanced",
    slug: "1",
    duration: "6_WEEKS",
    icon: <BrainCircuit size={20} />,
    bg: "/bg_images/logic-grid.jpg"
  },
  {
    id: "08",
    title: "Cryptographic Logic",
    subtitle: "QKD Protocols",
    desc: "Quantum Key Distribution and the post-RSA landscape.",
    level: "advanced",
    slug: "2",
    duration: "5_WEEKS",
    icon: <ShieldCheck size={20} />,
    bg: "/bg_images/logic-grid.jpg"
  },
  {
    id: "09",
    title: "Advanced Algorithms",
    subtitle: "Shor & Phase Est.",
    desc: "Deep dive into Quantum Fourier Transform and prime factorization.",
    level: "advanced",
    slug: "3",
    duration: "6_WEEKS",
    icon: <Brain size={20} />,
    bg: "/bg_images/logic-grid.jpg"
  },
];

export default function CoursesPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = courses.filter(c =>
    (filter === "all" || c.level === filter) &&
    (c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.desc.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" />
        {/* Logic Grid: Image 5 */}
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial pointer-events-none grayscale translate-y-40">
          <Image src="/bg_images/logic-grid.jpg" alt="Logic Grid" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-40 pb-20 px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
              <Activity size={14} />
              <span>Curriculum_Manifest_03</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
              Theoretical <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Syllabus</span>
            </h1>
          </div>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input
                type="text" placeholder="SEARCH_MANIFEST..."
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 pl-12 pr-6 font-mono text-[10px] uppercase tracking-widest focus:border-white/40 outline-none transition-all"
              />
            </div>
            <div className="flex justify-between p-1 bg-white/[0.03] rounded-full border border-white/5">
              {['all', 'beginner', 'intermediate', 'advanced'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 3. THE SYLLABUS GRID */}
      <div className="relative z-20 max-w-7xl mx-auto px-12 py-32 pb-60">
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <SyllabusItem key={course.id} course={course} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-12 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700">
        <span>SUPERPOS_ACADEMIC_RECORD_v.01</span>
        <span>STATUS_ACTIVE</span>
      </footer>
    </main>
  );
}

function SyllabusItem({ course, index }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/course/${course.level}/${course.slug}`} className="group block relative rounded-[60px] border border-white/10 bg-zinc-950/40 backdrop-blur-3xl overflow-hidden dusty-visual">
        <div className="grid md:grid-cols-12 min-h-[450px]">

          {/* LEFT: Course Data */}
          <div className="md:col-span-7 p-16 flex flex-col justify-between border-r border-white/5 relative z-20 transition-all duration-700 group-hover:bg-white group-hover:text-black">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <span className="font-mono text-[11px] opacity-20 group-hover:text-black">MOD_{course.id}</span>
                <div className="h-[1px] w-12 bg-white/10 group-hover:bg-black/20" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-600">{course.level} // {course.duration}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl font-serif-italic tracking-tighter uppercase leading-[0.9] group-hover:text-glow-none">
                  {course.title}
                </h2>
                <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2] tracking-tight max-w-md group-hover:text-black transition-colors">
                  {course.desc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-12 opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em]">Access_Module</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* RIGHT: Visual Context */}
          <div className="md:col-span-5 relative bg-black overflow-hidden group-hover:bg-white transition-colors duration-700">
            {/* Background Schematic Overlay */}
            <div className="absolute inset-0 opacity-30 mix-blend-screen grayscale group-hover:invert group-hover:mix-blend-multiply group-hover:opacity-10 transition-all duration-[2s]">
              <Image src={course.bg} alt="Schematic" fill className="object-cover" />
            </div>

            {/* Icon Centerpiece */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center backdrop-blur-md group-hover:border-black/10 group-hover:bg-black/5 group-hover:scale-110 transition-all duration-700">
                <div className="text-zinc-400 group-hover:text-black transition-colors">{course.icon}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}