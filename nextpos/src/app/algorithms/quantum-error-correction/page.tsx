"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Terminal, ShieldCheck, ShieldAlert, Cpu,
  Settings2, Activity, Zap, Plus, ArrowUpRight
} from "lucide-react";

export default function FaultToleranceSimulator() {
  // --- STATE ---
  const [numQubits, setNumQubits] = useState<number>(3);
  const [errors, setErrors] = useState<number[]>([]);
  const [protocol, setProtocol] = useState<string>("non_ft");
  const [syndromeRounds, setSyndromeRounds] = useState<number>(3);
  const [measurementError, setMeasurementError] = useState<number>(0.0);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- HANDLERS ---
  const toggleError = (qubitIndex: number) => {
    if (isLoading) return;
    setErrors(prev => prev.includes(qubitIndex) ? prev.filter(e => e !== qubitIndex) : [...prev, qubitIndex]);
    setSimulationResult(null);
  };

  const runSimulation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/superpos/run_fault_tolerance/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          num_qubits: numQubits,
          errors: errors,
          protocol: protocol,
          syndrome_rounds: syndromeRounds,
          measurement_error_prob: measurementError,
        }),
      });
      const data = await response.json();
      setSimulationResult(data);
    } catch (err: any) {
      setError("SIGNAL_INTERFERENCE: Connection to QEC_Kernel failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC BACKGROUNDS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grayscale mix-blend-soft-light opacity-10 pointer-events-none">
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial">
          <Image src="/bg_images/algosbg.jpg" alt="Schematic" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-32 pb-20 px-12 max-w-7xl mx-auto text-center">
        <span className="font-serif-italic text-2xl text-zinc-500 mb-4 block italic">Research_Module // 04</span>
        <h1 className="text-[8vw] leading-[0.85] text-quantum uppercase tracking-tighter text-glow mb-8">
          Fault <br /> Tolerance
        </h1>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-500 max-w-2xl mx-auto leading-loose">
          Simulating the resilience of repetition codes <br />
          against stochastic bit-flip and measurement noise.
        </p>
      </header>

      <div className="relative z-20 max-w-7xl mx-auto px-12 pb-60 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* 3. WORKBENCH ABSTRACT (Left Side) */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="glass-pane-dark p-10 rounded-[48px] space-y-8">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500 opacity-60">
              <Terminal size={14} />
              <span>Abstract</span>
            </div>
            <p className="text-[11px] font-mono uppercase text-zinc-400 leading-relaxed tracking-tight">
              This environment allows researchers to manually introduce <span className="text-white">Bit-Flip (X)</span> errors onto physical qubits and observe how
              syndrome measurement rounds mitigate decoherence.
            </p>
            <ul className="space-y-4 font-mono text-[9px] uppercase tracking-widest text-zinc-600">
              <li className="flex gap-4 items-start"><Plus size={10} className="mt-1" /> Majority-vote decoding</li>
              <li className="flex gap-4 items-start"><Plus size={10} className="mt-1" /> Repetition code parity</li>
              <li className="flex gap-4 items-start"><Plus size={10} className="mt-1" /> Syndrome decoherence</li>
            </ul>
          </div>
        </aside>

        {/* 4. CONFIGURATION CONSOLE (Center) */}
        <div className="lg:col-span-8 space-y-12">
          <section className="glass-pane-dark p-12 rounded-[54px] space-y-12">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em]">
                <Settings2 size={16} className="opacity-40" />
                <span>Console_Configuration</span>
              </div>
              <div className="text-[9px] font-mono text-zinc-600">SYS_V.01.2</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Physical Qubits Input */}
              <div className="panel-glass p-8 rounded-3xl group transition-all">
                <label className="block text-[8px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4">Physical_Qubits_Count</label>
                <input
                  type="number"
                  value={numQubits}
                  onChange={(e) => setNumQubits(parseInt(e.target.value) || 0)}
                  className="bg-transparent text-3xl font-mono text-white outline-none w-full"
                />
              </div>

              {/* Protocol Select */}
              <div className="panel-glass p-8 rounded-3xl group transition-all">
                <label className="block text-[8px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4">Correction_Protocol</label>
                <select
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value)}
                  className="bg-transparent text-lg font-mono text-white outline-none w-full uppercase"
                >
                  <option value="non_ft" className="bg-zinc-950">Direct_Measurement</option>
                  <option value="ft" className="bg-zinc-950">Syndrome_Parity</option>
                </select>
              </div>
            </div>

            {/* Error Injection Grid */}
            <div className="space-y-6">
              <label className="block text-[9px] font-mono uppercase tracking-[0.5em] text-zinc-500 text-center">Injected_Error_Array</label>
              <div className="flex flex-wrap justify-center gap-4">
                {[...Array(numQubits)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => toggleError(i)}
                    className={`
                        w-16 h-16 rounded-2xl border transition-all duration-500 font-mono text-[10px]
                        ${errors.includes(i)
                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                        : 'bg-zinc-900/90 border-white/10 text-zinc-600 hover:border-white/40'}
                      `}
                  >
                    Q[{i}] <br /> {errors.includes(i) ? 'X_ERR' : 'IDLE'}
                  </button>
                ))}
              </div>
            </div>

            {/* FT Parameters (Conditional) */}
            {protocol === "ft" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="panel-glass p-8 rounded-3xl">
                  <label className="block text-[8px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4">Syndrome_Rounds</label>
                  <input type="number" value={syndromeRounds} onChange={(e) => setSyndromeRounds(parseInt(e.target.value) || 1)} className="bg-transparent text-2xl font-mono w-full" />
                </div>
                <div className="panel-glass p-8 rounded-3xl">
                  <label className="block text-[8px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4">Measure_Noise_Prob</label>
                  <input type="number" step="0.01" value={measurementError} onChange={(e) => setMeasurementError(parseFloat(e.target.value) || 0)} className="bg-transparent text-2xl font-mono w-full" />
                </div>
              </div>
            )}

            <button
              onClick={runSimulation}
              disabled={isLoading}
              className="w-full py-6 rounded-full border border-white/10 bg-white text-black font-mono text-[10px] uppercase tracking-[0.5em] hover:bg-zinc-200 transition-all disabled:opacity-20"
            >
              {isLoading ? "Executing_Sequence..." : "Initiate Simulation"}
            </button>
          </section>

          {/* 5. ANALYTICAL REPORT (Results) */}
          {simulationResult && !isLoading && (
            <section className="glass-pane-dark rounded-[60px] p-16 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    <Activity size={14} />
                    <span>Analytical_Report</span>
                  </div>
                  <h2 className="text-6xl font-serif tracking-tighter uppercase leading-[0.85] text-glow">
                    Simulation <br /> <span className="italic text-zinc-500">Outcome</span>
                  </h2>
                </div>

                {/* Status Indicator */}
                <div className={`p-8 rounded-full border ${simulationResult.success ? 'border-emerald-500/20 text-emerald-500' : 'border-red-500/20 text-red-500'}`}>
                  {simulationResult.success ? <ShieldCheck size={48} className="text-glow" /> : <ShieldAlert size={48} className="text-glow" />}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 border-t border-white/5 pt-12">
                <div className="space-y-6">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="opacity-40">Encoded_Secret</span>
                    <span className="text-white">|{simulationResult.secret}⟩</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="opacity-40">Decoded_State</span>
                    <span className={`${simulationResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
                      |{simulationResult.corrected_state ?? "VOID"}⟩
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="opacity-40">Ideal_Measure</span>
                    <span className="text-zinc-500">{simulationResult.ideal_measurement.join("")}</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="opacity-40">Final_Stream</span>
                    <span className="text-red-500">{simulationResult.final_measurement.join("")}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] opacity-40">Circuit_Readout</h3>
                <pre className="bg-black/60 p-10 border border-white/5 rounded-3xl overflow-x-auto font-mono text-[10px] leading-relaxed text-zinc-400 scrollbar-hide">
                  {simulationResult.circuit_text}
                </pre>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}