import React from 'react';
import Image from 'next/image';
import { Search, Plus, Target, Share2, ArrowUpRight } from 'lucide-react';

export default function QuantumLanding() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC LIGHTING (Crucial for clarity) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-white/[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[150px] rounded-full" />
      </div>

      {/* 2. LAYERED BACKGROUNDS */}
      <div className="fixed inset-0 z-0">
        {/* <div className="absolute inset-0 grayscale mix-blend-overlay"
          style={{ opacity: 'var(--bg-marble-opacity)' }}>
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" priority />
        </div> */}
        <div className="absolute inset-0 mix-blend-screen dusty-visual"
          style={{ opacity: 'calc(var(--bg-stars-opacity) - 0.1)' }}>
          {/* <Image src="/bg_images/atoms.jpg" alt="Atmosphere" fill className="object-cover" /> */}
          <Image src="/bg_images/land.jpg" alt="Atmosphere" fill className="object-cover" />
        </div>
      </div>

      {/* GLOBAL GRAIN OVERLAY */}
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 3. NAVIGATION */}
      <nav className="relative z-[110] flex items-center justify-between px-12 py-10 text-[10px] tracking-[0.4em] uppercase font-mono opacity-60 hover:opacity-100 transition-opacity">
        <div className="flex gap-12">
          <a href="#" className="hover:text-white border-b border-transparent hover:border-white/20 pb-1 text-glow">Origins</a>
          <a href="#" className="hover:text-white border-b border-transparent hover:border-white/20 pb-1 text-glow">Particles</a>
        </div>
        <div className="text-2xl tracking-[0.6em] font-light text-glow">QUANTUM</div>
        <Search size={16} className="cursor-pointer opacity-50 hover:opacity-100" />
      </nav>

      {/* 4. HERO TITLE */}
      <div className="relative z-10 flex flex-col items-center pt-12 pb-24">
        {/* 1. Catchy Opener: Poetic Italic Serif */}
        <span className="font-serif-italic text-xl md:text-3xl text-zinc-500 mb-4 opacity-80 tracking-tight text-glow animate-in fade-in slide-in-from-bottom-2 duration-1000">
          Collapse your uncertainty.
        </span>

        {/* 2. Main Title */}
        <h1 className="text-[14vw] leading-[0.85] text-quantum uppercase text-center tracking-tighter text-glow">
          Quantum <br /> Physics
        </h1>

        {/* 3. Catchy Slogan: Technical Monospace with "Superpos" highlight */}
        <p className="mt-10 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-zinc-500 text-center max-w-2xl leading-loose">
          Architecting the fundamental reality <br /> through the mechanics of <span className="text-white text-glow">Superpos</span>
        </p>

        {/* 4. Technical Metadata Links */}
        <div className="mt-14 flex items-center gap-8 opacity-30 font-mono text-[8px] md:text-[9px] tracking-[0.6em] uppercase transition-opacity hover:opacity-100 duration-700">
          <div className="w-12 h-[1px] bg-white/40" />
          <span className="text-glow cursor-default hover:text-white transition-colors">Observe.</span>
          <span className="text-glow cursor-default hover:text-white transition-colors">Simulate.</span>
          <span className="text-glow cursor-default hover:text-white transition-colors">Transcend.</span>
          <div className="w-12 h-[1px] bg-white/40" />
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 space-y-32 pb-40">
        <section
          className="relative group rounded-[60px] border border-white/10 backdrop-blur-3xl aspect-[16/7] overflow-hidden flex flex-col justify-between p-12"
          style={{ backgroundColor: 'rgba(0, 0, 0, var(--glass-opacity))' }}
        >
          {/* Background Visual using mix-blend-screen for "Clear" look */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen group-hover:opacity-60 transition-all duration-1000 dusty-visual">
            <Image
              // src="/bg_images/download (24).jpg"
              src="/bg_images/atomst.jpg"
              alt="Wave Pattern"
              fill
              className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>

          <div className="flex justify-between items-start opacity-30">
            <div className="border-t border-l border-white w-8 h-8" />
            <Plus size={18} />
            <div className="border-t border-r border-white w-8 h-8" />
          </div>

          <div className="flex justify-between items-end relative z-10">
            <div className="space-y-3">
              <span className="text-6xl font-serif-italic tracking-tighter text-glow">Wave Resonance</span>
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.4em] opacity-80">System_Analysis // 0x992</p>
            </div>
            <div className="border-b border-r border-white w-10 h-10 opacity-30" />
          </div>
        </section>

        {/* 6. FEATURE GRID (Three Columns) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Entanglement", img: "/bg_images/download (41).jpg", },
            { title: "Superposition", img: "/bg_images/atoms.jpg", },
            { title: "Tunneling", img: "/bg_images/download (22).jpg", }
          ].map((item, i) => (
            <div key={i}
              className="group relative rounded-[48px] border border-white/10 h-[650px] p-12 flex flex-col justify-between overflow-hidden hover:border-white/30 transition-all duration-700"
              style={{ backgroundColor: 'rgba(0, 0, 0, var(--glass-opacity))', backdropFilter: 'blur(40px)' }}>

              <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 dusty-visual mix-blend-lighten">
                <Image src={item.img} alt={item.title} fill className="object-cover scale-110 group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>

              <div className="relative z-10 font-mono text-[11px] opacity-40 tracking-widest"></div>

              <div className="relative z-10">
                <h3 className="text-5xl font-serif-italic leading-tight mb-8 text-glow">{item.title}</h3>
                <p className="text-[10px] leading-relaxed text-zinc-300 font-mono uppercase tracking-[0.2em] opacity-70 border-t border-white/10 pt-8">
                  Particles can exist in multiple states <br /> simultaneously until measured.
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* 7. DETAILED FEATURE CARD */}
        <section
          className="relative rounded-[70px] border border-white/10 overflow-hidden p-24"
          style={{ backgroundColor: 'rgba(0, 0, 0, var(--glass-opacity))', backdropFilter: 'blur(50px)' }}
        >
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative z-10">
              <div className="mb-12 flex gap-6 opacity-60">
                <div className="w-14 h-14 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                  <Target size={22} />
                </div>
                <div className="w-14 h-14 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                  <Share2 size={22} />
                </div>
              </div>

              <h2 className="text-6xl font-serif tracking-tighter uppercase mb-10 leading-[0.9] text-glow">
                Quantum <br /> <span className="italic text-zinc-500">Entanglement</span>
              </h2>

              <p className="text-[11px] font-mono text-zinc-300 max-w-sm leading-[2.2] tracking-[0.1em] uppercase opacity-80">
                In atoms even if particles are separated by thousands of light years,
                they influence each other instantaneously through non-locality.
              </p>
            </div>

            <div className="md:col-span-6 relative aspect-[4/5] dusty-visual mix-blend-screen opacity-50 grayscale invert translate-x-20 rounded-[60px] overflow-hidden">
              <Image
                src="/bg_images/atoms.jpg"
                alt="Schematic"
                fill
                className="object-cover scale-110 rounded-[60px]"
              />
            </div>
          </div>
        </section>

      </div>

      <footer className="relative z-20 border-t border-white/10 py-16 px-16 flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-400 text-glow">
        <p className="text-glow">© 2024 Lab. Theoretical Physics</p>
        <div className="flex gap-16">
          <a href="#" className="hover:text-white transition-all text-glow">Index</a>
          <a href="#" className="hover:text-white transition-all flex items-center gap-3 text-glow">
            CONNECT <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}