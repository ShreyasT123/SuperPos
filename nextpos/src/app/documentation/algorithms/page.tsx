"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Binary, Activity,
    ArrowUpRight, Plus
} from "lucide-react";
import { motion } from "framer-motion";

const protocols = [
    {
        id: "0x01",
        title: "Shor's Factorization",
        complexity: "O((log n)³)",
        abstract: "A quantum protocol for finding the prime factors of an integer. It exploits the efficiency of quantum period-finding to destabilize classical RSA encryption.",
        tags: ["RSA_BREAK", "PERIOD_FINDING"],
        link: "/applications/rsa",
        img: "/bg_images/grid2.jpg"
    },
    {
        id: "0x02",
        title: "Grover's Search",
        complexity: "O(√N)",
        abstract: "Providing a quadratic speedup for searching unstructured databases via amplitude amplification. Reconfigures statevector probabilities toward the target index.",
        tags: ["AMPLIFICATION", "SEARCH_LOGIC"],
        link: "/simulator",
        img: "/bg_images/machine0.jpg"
    },
    {
        id: "0x03",
        title: "Error Correction",
        complexity: "N_PHYSICAL > N_LOGICAL",
        abstract: "Mitigating stochastic decoherence through repetition codes and syndrome measurement. The foundation of fault-tolerant quantum computation.",
        tags: ["DECOHERENCE", "SYNDROME"],
        link: "/applications/quantum-error-correction",
        img: "/bg_images/download (22).jpg"
    }
];

export default function AlgorithmsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

            {/* 1. ATMOSPHERIC SCHEMATICS */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" />
                {/* Logic Grid: Image 5 */}
                <div className="absolute inset-0 opacity-20 blend-screen mask-radial pointer-events-none grayscale translate-y-40">
                    <Image src="/bg_images/download (24).jpg" alt="Logic Grid" fill className="object-cover" />
                </div>
                {/* Core Energy: Image 4 */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] opacity-[0.05] blend-screen animate-pulse pointer-events-none">
                    <Image src="/bg_images/logic-grid.jpg" alt="Fracture Core" fill className="object-contain" />
                </div>
            </div>
            <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

            {/* 2. EDITORIAL HEADER */}
            <header className="relative z-10 pt-40 pb-20 px-12 max-w-7xl mx-auto">
                <div className="space-y-8">
                    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
                        <Binary size={14} className="text-glow" />
                        <span>Reference_Doc // ALGO_MNF_07</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
                        Computational <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Protocols</span>
                    </h1>
                    <p className="text-xl font-serif-italic text-zinc-400 italic leading-relaxed max-w-2xl">
                        &quot;A catalog of implemented quantum logic sequences, from amplitude amplification to prime factorization.&quot;
                    </p>
                </div>
            </header>

            {/* 3. ALGORITHM GRID */}
            <div className="relative z-20 max-w-7xl mx-auto px-12 py-32 space-y-12 pb-60">
                <div className="grid grid-cols-1 gap-12">
                    {protocols.map((protocol, index) => (
                        <ProtocolSpecimen key={protocol.id} protocol={protocol} index={index} />
                    ))}
                </div>
            </div>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-white/5 py-12 px-12 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700">
                <span>SUPERPOS_ALGO_MANIFEST_v.01</span>
                <span>SYNC_COMPLETED</span>
            </footer>
        </main>
    );
}

/* --- THEME SPECIFIC COMPONENTS --- */

function ProtocolSpecimen({ protocol, index }: { protocol: { id: string; title: string; complexity: string; abstract: string; tags: string[]; link: string; img: string }; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        >
            <Link href={protocol.link} className="group block relative rounded-[60px] border border-white/10 bg-zinc-950/40 backdrop-blur-3xl overflow-hidden dusty-visual">
                <div className="grid md:grid-cols-12 min-h-[550px]">

                    {/* LEFT: Technical Data */}
                    <div className="md:col-span-7 p-16 flex flex-col justify-between border-r border-white/5 relative z-10 transition-all duration-700 group-hover:bg-white group-hover:text-black">
                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-[11px] opacity-20 group-hover:text-black">{protocol.id}</span>
                                <div className="h-[1px] w-12 bg-white/10 group-hover:bg-black/20" />
                                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-600">Complexity: {protocol.complexity}</span>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-6xl font-serif-italic tracking-tighter uppercase leading-[0.9] group-hover:text-glow-none">
                                    {protocol.title}
                                </h2>
                                <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2.2] tracking-tight max-w-md group-hover:text-black transition-colors">
                                    {protocol.abstract}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {protocol.tags.map((tag: string) => (
                                <span key={tag} className="px-4 py-1.5 border border-white/10 rounded-full font-mono text-[8px] uppercase tracking-widest group-hover:border-black/20 group-hover:text-black">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight size={24} className="text-black" />
                        </div>
                    </div>

                    {/* RIGHT: Specimen Visual */}
                    <div className="md:col-span-5 relative bg-black overflow-hidden group-hover:bg-white transition-colors duration-700">
                        {/* Background Schematic Overlay */}
                        <div className="absolute inset-0 opacity-40 mix-blend-screen grayscale group-hover:invert group-hover:mix-blend-multiply group-hover:opacity-20 transition-all [transition-duration:2s]">
                            <Image
                                src={protocol.img}
                                alt="Visual"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Central Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center backdrop-blur-md group-hover:border-black/10 group-hover:bg-black/5 group-hover:scale-125 transition-all duration-700">
                                <Activity size={32} className="text-zinc-500 group-hover:text-black" />
                            </div>
                        </div>

                        {/* Decorative HUD corners */}
                        <div className="absolute top-10 right-10 p-2 opacity-10 group-hover:opacity-100 group-hover:text-black transition-all">
                            <Plus size={14} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}