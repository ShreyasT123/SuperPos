"use client";

import React from "react";
import Link from "next/link";
import {
    FileText, Users, Building, MapPin,
    ArrowUpRight, Quote
} from "lucide-react";

const authors = [
    {
        name: "Azeem Arshadullah Usmani",
        role: "Lead_Author // Developer",
        link: "https://www.linkedin.com/in/azeem-usmani-a36580372/"
    },
    {
        name: "Shreyas Sushil Thale",
        role: "Co_Author // Developer",
        link: "https://www.linkedin.com/in/shreyas-thale/"
    },
    {
        name: "Nishan Naveen Menezes",
        role: "Co_Author // Developer",
        link: "https://www.linkedin.com/in/nishan-menezes-6364ba257/"
    },
    {
        name: "Krish N Pinto",
        role: "Co_Author // Developer",
        link: "https://www.linkedin.com/in/krish-pinto/"
    },
    {
        name: "Chaitanya V Mahamuni",
        role: "Co_Author // Mentor",
        link: "#" // No link provided in prompt context
    }
];

export default function OriginsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

            {/* 1. ATMOSPHERIC SCHEMATICS */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('/bg_images/p2.jpg')] bg-cover" />
            </div>
            <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

            {/* 2. HEADER */}
            <header className="relative z-10 pt-40 pb-20 px-12 max-w-5xl mx-auto border-b border-white/5">
                <div className="space-y-8">
                    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
                        <FileText size={14} />
                        <span>Project_Genesis // IEEE_10859909</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-didone uppercase tracking-tighter text-quantum text-glow">
                        The <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Origins</span>
                    </h1>
                    <p className="text-xl font-mono uppercase tracking-widest text-zinc-400 max-w-2xl leading-relaxed">
                        An interactive web-based quantum simulator with real-time 2D and 3D visualizations.
                    </p>
                </div>
            </header>

            <div className="relative z-20 max-w-5xl mx-auto px-12 py-24 space-y-32 pb-60">

                {/* SECTION 1: THE ABSTRACT */}
                <section className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-600 sticky top-40">
                        01 // Abstract_Log
                    </div>
                    <div className="md:col-span-8 space-y-12">
                        <div className="glass-pane-dark p-12 rounded-[40px] border border-white/10 dusty-visual space-y-8">
                            <Quote size={24} className="text-zinc-600 mb-4" />
                            <p className="text-[11px] font-mono text-zinc-400 uppercase leading-[2.2] tracking-wide text-justify">
                                Quantum computing demands innovative tools to support education and research.
                                This paper presents <span className="text-white">SuperPOS</span>, a web-based quantum simulator designed to fill specific gaps in current platforms by offering unique features, such as interactive 3D visualizations, that make quantum concepts more approachable for both newcomers and researchers.
                                <br /><br />
                                SuperPOS enables users to build and simulate quantum circuits with immediate, real-time feedback, providing a hands-on learning experience that brings abstract quantum principles to life. Powered by <span className="text-white">Python</span> for core computations, <span className="text-white">Flask</span> for server management, <span className="text-white">Cirq</span> for 2D, and <span className="text-white">Three.js</span> for 3D visualizations, the platform stands out for its intuitive design and accessibility.
                            </p>

                            <div className="flex gap-4 pt-8">
                                <Link href="https://ieeexplore.ieee.org/document/10859909/" target="_blank" className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white hover:text-black transition-all">
                                    <span className="font-mono text-[9px] uppercase tracking-widest">Access_IEEE_Document</span>
                                    <ArrowUpRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: THE PERSONNEL (AUTHORS) */}
                <section className="space-y-16">
                    <div className="flex items-center gap-4 opacity-30 font-mono text-[10px] uppercase tracking-widest">
                        <Users size={12} />
                        <span>Research_Personnel</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {authors.map((author, i) => (
                            <AuthorCard key={i} author={author} index={i} />
                        ))}
                    </div>
                </section>

                {/* SECTION 3: INSTITUTIONAL DATA */}
                <section className="border-t border-white/5 pt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 opacity-60 hover:opacity-100 transition-opacity duration-700">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                <Building size={14} />
                                <span>Institution</span>
                            </div>
                            <h3 className="text-2xl font-serif-italic text-zinc-300 max-w-md">
                                Agnel Charities’ <br /> Fr. C. Rodrigues Institute Of Technology
                            </h3>
                        </div>
                        <div className="space-y-4 text-right">
                            <div className="flex items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                <span>Coordinates</span>
                                <MapPin size={14} />
                            </div>
                            <p className="font-mono text-[10px] uppercase text-zinc-500 leading-relaxed">
                                Sector 9-A, Vashi <br />
                                Navi Mumbai, Maharashtra <br />
                                India PIN- 400703
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

function AuthorCard({ author, index }: { author: { name: string; role: string; link: string }; index: number }) {
    return (
        <Link href={author.link} target="_blank" className="group bg-zinc-950/40 p-10 border border-white/5 hover:bg-white hover:text-black transition-all duration-700 flex flex-col justify-between min-h-[200px]">
            <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] opacity-30 group-hover:text-black group-hover:opacity-100">AUTH_0{index + 1}</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
            </div>

            <div className="space-y-2">
                <h4 className="font-serif-italic text-2xl text-zinc-200 group-hover:text-black transition-colors">{author.name}</h4>
                <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest group-hover:text-zinc-600">
                    {author.role}
                </p>
            </div>
        </Link>
    )
}