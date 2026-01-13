'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import {
  ShieldCheck, ShieldAlert, Terminal, Check, X,
  Circle, Activity, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA (Same as before) ---
const quizData = {
  multipleChoice: [
    {
      id: 'mc1',
      question: 'What is the smallest unit of information in quantum computing?',
      options: [
        { id: 'A', text: 'Byte' },
        { id: 'B', text: 'Classical Bit' },
        { id: 'C', text: 'Qubit' },
        { id: 'D', text: 'Quantum Gate' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 'mc2',
      question: 'Which gate is responsible for putting a qubit into superposition?',
      options: [
        { id: 'A', text: 'X Gate' },
        { id: 'B', text: 'Hadamard' },
        { id: 'C', text: 'Z Gate' },
        { id: 'D', text: 'CNOT' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 'mc3',
      question: 'Which state represents a qubit in superposition?',
      options: [
        { id: 'A', text: '|0⟩' },
        { id: 'B', text: '|1⟩' },
        { id: 'C', text: '0.6|0⟩ + 0.8|1⟩' },
        { id: 'D', text: 'Null' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 'mc4',
      question: 'Which gate flips the state from |0⟩ to |1⟩?',
      options: [
        { id: 'A', text: 'H Gate' },
        { id: 'B', text: 'Z Gate' },
        { id: 'C', text: 'X Gate' },
        { id: 'D', text: 'T Gate' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 'mc5',
      question: 'What does measurement in quantum computing do?',
      options: [
        { id: 'A', text: 'Execution' },
        { id: 'B', text: 'Entanglement' },
        { id: 'C', text: 'Collapse' },
        { id: 'D', text: 'Encryption' },
      ],
      correctAnswer: 'C',
    },
  ],
  trueFalse: [
    {
      id: 'tf1',
      question: 'A qubit can only be in one definite state at a time.',
      correctAnswer: false,
    },
    {
      id: 'tf2',
      question: 'Quantum gates are always reversible.',
      correctAnswer: true,
    },
    {
      id: 'tf3',
      question: 'Superposition violates the laws of classical physics.',
      correctAnswer: true,
    },
  ],
};

export default function BeginnerQuizPage() {
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = quizData.multipleChoice.length + quizData.trueFalse.length;

  const handleAnswerChange = (questionId: string, answer: string | boolean) => {
    if (showResults) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    if (showResults) return;
    let calculatedScore = 0;
    quizData.multipleChoice.forEach((q) => { if (userAnswers[q.id] === q.correctAnswer) calculatedScore++; });
    quizData.trueFalse.forEach((q) => {
      const ans = userAnswers[q.id];
      const boolAns = typeof ans === 'string' ? ans === 'true' : ans;
      if (boolAns === q.correctAnswer) calculatedScore++;
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0">
        {/* <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.jpg')] bg-cover" /> */}
        <div className="absolute inset-0 opacity-20 blend-screen mask-radial pointer-events-none">
          <Image src="/bg_images/compass.jpg" alt="Grid" fill className="object-cover" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-32 pb-20 px-12 max-w-5xl mx-auto border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500">
              <Terminal size={12} />
              <span>Examination_Protocol</span>
            </div>
            <h1 className="text-6xl font-didone uppercase tracking-tighter text-quantum text-glow">
              Proficiency <br /> <span className="italic font-serif-italic text-zinc-500">Check_01</span>
            </h1>
          </div>
          <div className="text-right font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            <p>Status: {showResults ? "COMPLETED" : "IN_PROGRESS"}</p>
            <p>Questions: {totalQuestions}</p>
          </div>
        </div>
      </header>

      <div className="relative z-20 max-w-5xl mx-auto px-12 py-24 pb-60 space-y-32">

        {/* SECTION A: MULTIPLE CHOICE */}
        <section className="space-y-0">
          {quizData.multipleChoice.map((q, index) => {
            const isSelected = (optId: string) => userAnswers[q.id] === optId;
            const isCorrect = (optId: string) => q.correctAnswer === optId;
            const statusColor = showResults
              ? (isCorrect(userAnswers[q.id] as string) ? 'text-emerald-500' : 'text-red-500')
              : 'text-zinc-500';

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={q.id}
                className="group relative border-b border-white/5 py-16 grid md:grid-cols-12 gap-12"
              >
                {/* Left: Index & Status */}
                <div className="md:col-span-4 flex flex-col justify-between">
                  <span className="font-didone text-5xl opacity-20 group-hover:opacity-60 transition-opacity">0{index + 1}</span>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] flex items-center gap-2">
                    <Activity size={10} className={statusColor} />
                    <span className={statusColor}>
                      {showResults
                        ? (isCorrect(userAnswers[q.id] as string) ? "CORRECT_RESPONSE" : "ERROR_DETECTED")
                        : "AWAITING_INPUT"}
                    </span>
                  </div>
                </div>

                {/* Right: Question & Options */}
                <div className="md:col-span-8 space-y-10">
                  <h3 className="font-serif-italic text-2xl text-zinc-200 leading-relaxed">
                    {q.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.options.map((opt) => {
                      const selected = isSelected(opt.id);

                      // GLASS EFFECT LOGIC:
                      // 1. Default: bg-white/[0.02] (2% white) + subtle border -> "Frosted Glass"
                      // 2. Hover: bg-white/[0.05] (5% white) + bright border -> "Active Glass"
                      // 3. Selected: bg-white (Solid) -> "Collapsed State"

                      let btnStyle = "bg-white/[0.02] border-white/10 text-zinc-500 hover:bg-white/[0.05] hover:border-white/40 hover:text-white backdrop-blur-xl transition-all duration-500";

                      if (showResults) {
                        if (isCorrect(opt.id)) btnStyle = "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]";
                        else if (selected) btnStyle = "border-red-500 text-red-500 bg-red-500/10";
                        else btnStyle = "border-white/5 text-zinc-700 opacity-30 bg-transparent";
                      } else if (selected) {
                        btnStyle = "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]";
                      }

                      return (
                        <label key={opt.id} className={`
                                            cursor-pointer p-6 border transition-all duration-300 relative group/opt
                                            ${btnStyle}
                                        `}>
                          <input
                            type="radio" name={q.id} value={opt.id}
                            checked={selected}
                            onChange={() => handleAnswerChange(q.id, opt.id)}
                            className="hidden" disabled={showResults}
                          />
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] uppercase tracking-widest">{opt.text}</span>
                            <span className="font-mono text-[9px] opacity-50 group-hover/opt:opacity-100">[{opt.id}]</span>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </section>

        {/* SECTION B: LOGIC VALIDATION (True/False) */}
        <section className="border-t border-white/20 pt-24 space-y-16">
          <div className="flex items-center gap-4 opacity-40 font-mono text-[10px] uppercase tracking-widest">
            <ShieldCheck size={14} />
            <span>Section_B // Logic_Validation</span>
          </div>

          <div className="space-y-1">
            {quizData.trueFalse.map((q, i) => {
              const idx = quizData.multipleChoice.length + i + 1;
              const ans = userAnswers[q.id];
              const userVal = typeof ans === 'string' ? (ans === 'true') : ans;

              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={q.id}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-baseline gap-6 md:w-2/3">
                    <span className="font-mono text-zinc-600">0{idx}</span>
                    <p className="font-serif-italic text-xl text-zinc-300 group-hover:text-white transition-colors">{q.question}</p>
                  </div>

                  <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest">
                    {[true, false].map((val) => {
                      const isSel = userVal === val;
                      const isCorr = q.correctAnswer === val;

                      // Same Glass Logic applied to T/F
                      let style = "bg-white/[0.02] border-white/10 text-zinc-600 hover:text-white hover:border-white/40 hover:bg-white/[0.05] backdrop-blur-xl transition-all duration-500";

                      if (showResults) {
                        if (isCorr) style = "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]";
                        else if (isSel) style = "bg-red-500/10 text-red-500 border-red-500";
                      } else if (isSel) {
                        style = "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]";
                      }

                      return (
                        <label key={String(val)} className={`
                                            cursor-pointer px-8 py-4 border transition-all duration-300 ${style}
                                        `}>
                          <input
                            type="radio" name={q.id} value={String(val)}
                            checked={isSel}
                            onChange={() => handleAnswerChange(q.id, val)}
                            className="hidden" disabled={showResults}
                          />
                          {val ? "TRUE" : "FALSE"}
                        </label>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

      </div>

      {/* STICKY FOOTER / RESULTS (Same as before) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-6 md:p-12 pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-end pointer-events-auto">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              className="group bg-white/[0.03] backdrop-blur-2xl text-white px-12 py-6 rounded-none border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all duration-700 flex items-center gap-4 shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Finalize_Protocol</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          ) : (
            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 min-w-[300px] flex items-center justify-between gap-12 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div>
                <span className="block font-mono text-[8px] uppercase tracking-[0.4em] text-zinc-500 mb-1">Efficiency</span>
                <div className="text-4xl font-didone text-white">
                  {Math.round((score / totalQuestions) * 100)}<span className="text-sm align-top opacity-50">%</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-mono text-[8px] uppercase tracking-[0.4em] text-zinc-500 mb-1">Status</span>
                <span className={`text-lg font-serif-italic ${score === totalQuestions ? 'text-emerald-400' : 'text-white'}`}>
                  {score === totalQuestions ? "Optimal" : "Suboptimal"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

    </main>
  );
}