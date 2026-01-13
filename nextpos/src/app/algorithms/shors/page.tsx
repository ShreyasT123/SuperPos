"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldAlert, Lock, Unlock,
  Terminal, Zap, RefreshCcw, Activity
} from "lucide-react";

export default function RSAEncryptionApp() {
  // --- EXISTING LOGIC (Preserved) ---
  const [message, setMessage] = useState("");
  const [keys, setKeys] = useState<{ n: string; e: string } | null>(null);
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [decryptInput, setDecryptInput] = useState({ encryptedMessage: "", n: "", e: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async (url: string, options: RequestInit, onSuccess: (data: any) => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "System Error");
      onSuccess(data);
    } catch (err: any) {
      setError(err.message || "SIGNAL_INTERFERENCE: Connection lost.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateKeys = () => handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/superpos/rsa_generate_keys/`, { method: "POST" }, (data) => setKeys(data));

  const encryptMessage = () => {
    if (!keys || !message) return;
    handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/superpos/rsa_encrypt/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, n: keys.n, e: keys.e }),
    }, (data) => setEncryptedMessage(data.encrypted_message));
  };

  const decryptMessage = () => {
    if (!decryptInput.encryptedMessage || !decryptInput.n || !decryptInput.e) return;
    handleApiCall(`${process.env.NEXT_PUBLIC_API_URL}/superpos/rsa_decrypt/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ encrypted_message: decryptInput.encryptedMessage, n: decryptInput.n, e: decryptInput.e }),
    }, (data) => setDecryptedMessage(data.decrypted_message));
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC SCHEMATICS (Using your assets) */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grayscale mix-blend-overlay opacity-10 pointer-events-none">
          <Image src="/marble-bg.png" alt="Texture" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial">
          <Image src="/bg_images/algosbg.jpg" alt="Logic Grid" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. PAGE HEADER */}
      <header className="relative z-10 pt-32 pb-20 px-12 max-w-7xl mx-auto text-center">
        <span className="font-serif-italic text-2xl text-zinc-500 mb-4 block italic">Research_Module // 05</span>
        <h1 className="text-[8vw] leading-[0.85] text-quantum uppercase tracking-tighter text-glow mb-8">
          Quantum <br /> Decryption
        </h1>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-500 max-w-2xl mx-auto leading-loose">
          The Architecture of Secrecy // Simulating the vulnerability <br />
          of RSA Moduli to Shor's Factorization logic.
        </p>
      </header>

      <div className="relative z-20 max-w-7xl mx-auto px-12 pb-60 space-y-24">

        {/* 3. ABSTRACT SECTION */}
        <section className="glass-pane-dark p-12 rounded-[54px] grid md:grid-cols-2 gap-12 items-center dusty-visual">
          <div className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              <Terminal size={14} />
              <span>Technical_Abstract</span>
            </div>
            <h2 className="text-4xl font-serif-italic italic text-white/80">Prime factorization is the lock. Quantum computing is the key.</h2>
            <p className="text-[11px] font-mono text-zinc-500 uppercase leading-[2] tracking-tight">
              Shor's algorithm finds the <span className="text-white">period of a function</span> to factor large integers exponentially faster than classical sieves. This demonstration simulates that efficiency.
            </p>
          </div>
          <div className="relative aspect-video opacity-40 grayscale blend-screen">
            <Image src="/bg_images/download (25).jpg" alt="Waves" fill className="object-contain" />
          </div>
        </section>

        {/* 4. WORKBENCH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* STEP 1: ENCRYPTION */}
          <section className="glass-pane-dark p-12 rounded-[54px] space-y-10">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h3 className="text-xl font-didone tracking-widest uppercase flex items-center gap-3">
                <Lock size={18} className="opacity-40" /> 01_Encryption
              </h3>
              <button onClick={generateKeys} className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                <RefreshCcw size={14} className={isLoading ? 'animate-spin' : ''} />
              </button>
            </div>

            {keys && (
              <div className="panel-glass p-6 rounded-2xl font-mono text-[10px] text-zinc-500 space-y-2">
                <p className="break-all"><span className="text-zinc-400">MODULUS_N:</span> {keys.n}</p>
                <p><span className="text-zinc-400">PUBLIC_E:</span> {keys.e}</p>
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40">Plaintext_Inquiry</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="TYPE MESSAGE..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 font-mono text-xs uppercase tracking-widest h-32 focus:border-white/40 outline-none"
              />
            </div>

            <button
              onClick={encryptMessage}
              disabled={!keys || !message}
              className="w-full py-5 rounded-full bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all disabled:opacity-20"
            >
              Encode Sequence
            </button>

            {encryptedMessage && (
              <div className="p-8 rounded-3xl bg-black/60 border border-white/5 space-y-4">
                <span className="text-[9px] font-mono uppercase opacity-40">Ciphertext_Output (Base64)</span>
                <p className="font-mono text-[10px] break-all text-zinc-400 leading-relaxed uppercase">{encryptedMessage}</p>
              </div>
            )}
          </section>

          {/* STEP 2: DECRYPTION / SHOR'S */}
          <section className="glass-pane-dark p-12 rounded-[54px] space-y-10">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <h3 className="text-xl font-didone tracking-widest uppercase flex items-center gap-3">
                <Zap size={18} className="text-white opacity-40" /> 02_Shor_Break
              </h3>
              <span className="text-[9px] font-mono text-zinc-500">SIMULATED_FACTORIZATION</span>
            </div>

            <div className="space-y-6">
              <div className="panel-glass p-4 rounded-2xl">
                <label className="text-[8px] font-mono uppercase opacity-40 block mb-2">Ciphertext_Input</label>
                <textarea
                  value={decryptInput.encryptedMessage}
                  onChange={(e) => setDecryptInput({ ...decryptInput, encryptedMessage: e.target.value })}
                  className="w-full bg-transparent border-none p-0 font-mono text-[9px] h-20 outline-none uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="panel-glass p-4 rounded-2xl">
                  <label className="text-[8px] font-mono uppercase opacity-40 block mb-2">Target_N</label>
                  <input
                    type="text" value={decryptInput.n}
                    onChange={(e) => setDecryptInput({ ...decryptInput, n: e.target.value })}
                    className="w-full bg-transparent border-none p-0 font-mono text-xs outline-none"
                  />
                </div>
                <div className="panel-glass p-4 rounded-2xl">
                  <label className="text-[8px] font-mono uppercase opacity-40 block mb-2">Target_E</label>
                  <input
                    type="text" value={decryptInput.e}
                    onChange={(e) => setDecryptInput({ ...decryptInput, e: e.target.value })}
                    className="w-full bg-transparent border-none p-0 font-mono text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={decryptMessage}
              className="w-full py-5 rounded-full border border-white/20 hover:bg-white hover:text-black font-mono text-[10px] uppercase tracking-[0.4em] transition-all"
            >
              Initiate Shor's Simulation
            </button>

            {decryptedMessage && (
              <div className="p-8 rounded-3xl bg-white text-black space-y-4 animate-in fade-in duration-700">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
                  <Unlock size={12} /> <span>Decrypted_Payload</span>
                </div>
                <p className="text-2xl font-serif tracking-tight">{decryptedMessage}</p>
              </div>
            )}
          </section>
        </div>

        {/* 5. ERROR LOGS (Hardware style) */}
        {error && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl border border-red-500/20 bg-red-500/[0.02] flex items-center gap-6">
            <ShieldAlert className="text-red-500" size={32} />
            <div className="font-mono text-[10px] uppercase tracking-widest text-red-500/80">
              <span className="block font-bold mb-1">System_Interrupt</span>
              {error}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/5 py-12 px-12 flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.5em] text-zinc-600">
        <p>© 2024 Cryptographic Theory Lab</p>
        <div className="flex gap-12">
          <a href="#" className="hover:text-white transition-colors">Archive</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2">Lab_Brief <Activity size={12} /></a>
        </div>
      </footer>
    </main>
  );
}