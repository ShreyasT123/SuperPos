"use client";

import React from "react";
import Link from "next/link";
import { Terminal, RefreshCcw, Home, ShieldAlert, Plus, Activity } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-red-500/30 selection:text-red-200 overflow-x-hidden relative flex flex-col items-center justify-center">

            {/* 1. ATMOSPHERIC SCHEMATICS */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 opacity-80 mix-blend-overlay pointer-events-none bg-[url('/bg_images/p0.jpg')] bg-cover bg-center" />

            </div>

            {/* Grain & Red Tint for Error State */}
            <div className="fixed inset-0 z-[50] pointer-events-none bg-red-500/[0.02] mix-blend-overlay" />
            <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

            {/* 2. ERROR HUD */}
            <div className="relative z-10 text-center space-y-12 px-6">

                {/* Technical Status Alert */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.6em] text-red-500/80 text-glow">
                        <ShieldAlert size={14} />
                        <span>Critical_System_Interrupt</span>
                    </div>
                    {/* Connecting Line */}
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-red-500/40 to-transparent" />
                </div>

                {/* Main 404 Title */}
                <div className="space-y-2">
                    {/* Glitchy Huge Text */}
                    <h1 className="text-[20vw] leading-[0.7] font-didone uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-900 opacity-90 select-none">
                        404
                    </h1>
                    <h2 className="font-serif-italic italic text-2xl md:text-4xl text-zinc-500 tracking-tight">
                        The requested state has <span className="text-white text-glow">collapsed.</span>
                    </h2>
                </div>

                {/* Technical Description */}
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-zinc-600 max-w-lg mx-auto leading-loose">
                    The coordinate in Hilbert space you are attempting to access <br />
                    is undefined or has undergone total decoherence.
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap justify-center gap-6 pt-16">
                    <Link href="/" className="group flex items-center gap-4 px-10 py-5 rounded-full border border-white/10 bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                        <Home size={14} />
                        <span>Origin_Resync</span>
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="group flex items-center gap-4 px-10 py-5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all"
                    >
                        <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                        <span>Recalibrate</span>
                    </button>
                </div>

                {/* Decorative corner data: Top Right */}
                <div className="absolute -top-40 right-0 p-10 hidden md:block opacity-30 font-mono text-[9px] uppercase tracking-[0.4em] text-right space-y-2">
                    <div className="flex items-center justify-end gap-3 text-red-500">
                        <span>ERR_0x99</span>
                        <Activity size={12} />
                    </div>
                    <p>Sector: UNK_NULL</p>
                    <p>Phase: UNDEFINED</p>
                </div>

                {/* Decorative corner data: Top Left */}
                <div className="absolute -top-40 left-0 p-10 hidden md:block opacity-20 font-mono text-[9px] uppercase tracking-[0.4em] text-left space-y-2">
                    <Terminal size={12} className="mb-2" />
                    <p className="text-zinc-500">Last_Known_Packet:</p>
                    <p>0010110...[LOST]</p>
                </div>
            </div>

            {/* 3. FOOTER */}
            <footer className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700 pointer-events-none">
                <span>SUPERPOS_STABILITY_PROTOCOL</span>
                <div className="flex gap-4 opacity-20">
                    <Plus size={8} /> <Plus size={8} /> <Plus size={8} />
                </div>
                <span>VOID_RESPONSE_CXT</span>
            </footer>
        </main>
    );
}