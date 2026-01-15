'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Globe, Zap, Terminal, Radar, Loader2, ShieldAlert } from 'lucide-react';
import { getLatestBriefings } from './actions';

export default function QuantumNewsPage() {
    const [newsData, setNewsData] = useState<{ title: string; url: string; summary: string; source: string }[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleScan = async () => {
        setError(null);
        setIsScanning(true);

        const result = await getLatestBriefings();

        if (result.success) {
            setNewsData(result.data);
            setLastUpdated(new Date().toLocaleTimeString());
        } else {
            setError(result.error || "CONNECTION_LOST");
        }
        setIsScanning(false);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

            {/* 1. ATMOSPHERIC BACKGROUNDS */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 grayscale mix-blend-soft-light opacity-10 pointer-events-none">
                    <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
                </div>
                {/* Dynamic Glow: Brightens when scanning */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-white/5 blur-[120px] transition-opacity duration-1000 ${isScanning ? 'opacity-100' : 'opacity-20'}`} />
            </div>
            <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

            {/* 2. HEADER & CONTROL PANEL */}
            <div className="relative z-10 pt-32 pb-16 px-12 max-w-7xl mx-auto border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em] text-zinc-500">
                            <Radar size={14} className={isScanning ? "animate-spin text-white" : ""} />
                            <span>Signal Intelligence</span>
                        </div>
                        <h1 className="text-7xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow">
                            Field <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Briefings</span>
                        </h1>
                    </div>

                    {/* THE SCAN CONTROLLER */}
                    <div className="flex flex-col items-end gap-6">
                        <div className="text-right">
                            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-1">System_Status</p>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                                {isScanning ? "Decoding_Stream..." : lastUpdated ? `Last_Sync: ${lastUpdated}` : "Waiting_For_Input"}
                            </p>
                        </div>

                        <button
                            onClick={handleScan}
                            disabled={isScanning}
                            className="group relative px-12 py-5 rounded-full border border-white/10 overflow-hidden bg-white/[0.02] transition-all hover:border-white disabled:opacity-50"
                        >
                            <div className="relative z-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em]">
                                {isScanning ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                                <span>{isScanning ? "Scanning..." : "Initiate Scan"}</span>
                            </div>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="absolute inset-0 z-20 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono tracking-[0.4em] uppercase">
                                Initiate Scan
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. DYNAMIC CONTENT AREA */}
            <div className="relative z-10 max-w-7xl mx-auto px-12 py-20 pb-60">

                {/* STATE A: Error */}
                {error && (
                    <div className="py-20 flex flex-col items-center gap-4 text-center">
                        <ShieldAlert size={32} className="text-zinc-600 mb-4" />
                        <h3 className="font-mono text-xs uppercase tracking-[0.5em] text-white">Signal Interference</h3>
                        <p className="font-mono text-[10px] uppercase text-zinc-500">{error}</p>
                    </div>
                )}

                {/* STATE B: Initial Standby (Before first scan) */}
                {!isScanning && newsData.length === 0 && !error && (
                    <div className="py-40 flex flex-col items-center justify-center opacity-20">
                        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                            <div className="absolute inset-0 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <Terminal size={24} />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-center">
                            Standby Mode // Awaiting Intelligence Command
                        </span>
                    </div>
                )}

                {/* STATE C: Loading Pulse */}
                {isScanning && (
                    <div className="space-y-1 opacity-40">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 border-b border-white/5 animate-pulse flex items-center">
                                <div className="w-full h-4 bg-white/5 rounded-full" />
                            </div>
                        ))}
                    </div>
                )}

                {/* STATE D: Results List */}
                {!isScanning && newsData.length > 0 && (
                    <div className="space-y-1 animate-in fade-in duration-1000">
                        {newsData.map((item, index) => (
                            <NewsArticle key={item.url || index} item={item} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

// --- SUB-COMPONENT: NEWS ARTICLE (Editorial Line Item) ---
function NewsArticle({ item, index }: { item: { title: string; url: string; summary: string; source: string }; index: number }) {
    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative border-b border-white/5 py-14 transition-all duration-700 hover:px-12 hover:bg-white/[0.02]"
        >
            <div className="flex flex-col md:flex-row gap-12 md:items-start">
                <div className="flex md:flex-col justify-between md:justify-start gap-4 min-w-[140px]">
                    <span className="font-mono text-[11px] opacity-20">INTELL_0{index + 1}</span>
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                        <Globe size={10} />
                        <span>{item.source}</span>
                    </div>
                </div>

                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-serif-italic leading-tight tracking-tight group-hover:text-glow transition-all duration-500">
                        {item.title}
                    </h2>
                    <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2] tracking-tighter max-w-2xl group-hover:text-zinc-300 transition-colors">
                        {item.summary}
                    </p>
                </div>

                <div className="hidden md:flex items-center justify-center p-4 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <ArrowUpRight size={20} />
                </div>
            </div>

            {/* Hover Mask */}
            <div className="absolute inset-0 dusty-visual opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
        </a>
    );
}