"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Award, CheckCircle2, XCircle, Terminal,
  HelpCircle, ShieldCheck, RefreshCcw, ArrowRight
} from "lucide-react";

// --- DATA ---
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
        { id: 'B', text: 'Hadamard Gate' },
        { id: 'C', text: 'Z Gate' },
        { id: 'D', text: 'CNOT Gate' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 'mc3',
      question: 'Which of the following states represent a qubit in superposition?',
      options: [
        { id: 'A', text: '|0⟩' },
        { id: 'B', text: '|1⟩' },
        { id: 'C', text: '0.6|0⟩ + 0.8|1⟩' },
        { id: 'D', text: 'None of the above' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 'mc4',
      question: 'Which gate flips the state of a qubit from |0⟩ to |1⟩ or vice versa?',
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
        { id: 'A', text: 'Runs a program' },
        { id: 'B', text: 'Creates entanglement' },
        { id: 'C', text: 'Collapses a qubit to |0⟩ or |1⟩' },
        { id: 'D', text: 'Encrypts the qubit' },
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
      question: 'Quantum gates are always irreversible.',
      correctAnswer: false,
    },
    {
      id: 'tf3',
      question: 'Classical computers can simulate basic quantum systems with enough resources.',
      correctAnswer: true,
    },
    {
      id: 'tf4',
      question: 'Applying the Hadamard gate twice returns the qubit to its original state.',
      correctAnswer: true, // H * H = I (Identity)
    },
    {
      id: 'tf5',
      question: 'Superposition violates the laws of classical physics.',
      correctAnswer: true, // Classical physics doesn't allow an object to be in multiple states simultaneously in this way.
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 overflow-x-hidden relative">

      {/* 1. ATMOSPHERIC BACKGROUNDS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grayscale opacity-10 mix-blend-overlay pointer-events-none bg-[url('/marble-bg.png')] bg-cover" />
        {/* Seal Watermark: Image 1 */}
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] opacity-[0.05] blend-screen animate-[spin_120s_linear_infinite] pointer-events-none">
          <Image src="/bg_images/compass.jpg" alt="Seal" fill className="object-contain" />
        </div>
      </div>
      <div className="fixed inset-0 z-[100] pointer-events-none grain-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 pt-32 pb-20 px-12 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-6">
          <ShieldCheck size={14} className={showResults ? "text-emerald-500" : "text-zinc-500"} />
          <span>Examination_Module // 01</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-didone uppercase tracking-tighter text-quantum text-glow mb-8">
          Beginner <br /> <span className="italic font-serif-italic capitalize tracking-normal text-zinc-500">Evaluation</span>
        </h1>
      </header>

      {/* 3. RESULTS HUD (Appears at Top after Submit) */}
      {showResults && (
        <section className="relative z-20 max-w-4xl mx-auto px-6 mb-20 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="glass-pane-dark p-12 rounded-[48px] border border-emerald-500/20 bg-emerald-950/10 flex flex-col items-center text-center space-y-6">
            <Award size={48} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <div>
              <h2 className="text-4xl font-serif-italic text-white">Evaluation Complete</h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-500/80 mt-2">Score: {score} / {totalQuestions}</p>
            </div>
            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden max-w-md mt-4 border border-white/5">
              <div
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-[2s]"
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. THE EXAM PAPER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-60 space-y-16">

        {/* MULTIPLE CHOICE */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 opacity-40 font-mono text-[10px] uppercase tracking-widest border-b border-white/10 pb-4">
            <Terminal size={14} />
            <span>Section_A // Multiple_Choice</span>
          </div>

          {quizData.multipleChoice.map((q, i) => (
            <QuestionBlock
              key={q.id}
              q={q}
              index={i + 1}
              userAnswer={userAnswers[q.id]}
              onChange={handleAnswerChange}
              showResults={showResults}
            />
          ))}
        </section>

        {/* TRUE / FALSE */}
        <section className="space-y-12">
          <div className="flex items-center gap-4 opacity-40 font-mono text-[10px] uppercase tracking-widest border-b border-white/10 pb-4">
            <HelpCircle size={14} />
            <span>Section_B // Boolean_Logic</span>
          </div>

          {quizData.trueFalse.map((q, i) => (
            <BooleanBlock
              key={q.id}
              q={q}
              index={i + 1}
              userAnswer={userAnswers[q.id]}
              onChange={handleAnswerChange}
              showResults={showResults}
            />
          ))}
        </section>

        {/* SUBMIT ACTION */}
        {!showResults && (
          <div className="flex justify-center pt-12">
            <button
              onClick={handleSubmit}
              className="group relative px-12 py-5 rounded-full border border-white/10 bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">Submit_Evaluation <ArrowRight size={14} /></span>
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

/* --- THEME COMPONENTS --- */

function QuestionBlock({ q, index, userAnswer, onChange, showResults }: any) {
  const isCorrect = showResults && userAnswer === q.correctAnswer;
  const isWrong = showResults && userAnswer !== q.correctAnswer && userAnswer;

  return (
    <div className={`p-8 rounded-[32px] border transition-all duration-500 ${showResults ? (isCorrect ? 'border-emerald-500/30 bg-emerald-950/10' : isWrong ? 'border-red-500/30 bg-red-950/10' : 'border-white/5 opacity-50') : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}>
      <div className="flex gap-6 mb-6">
        <span className="font-mono text-[10px] opacity-30">Q{index < 10 ? `0${index}` : index}</span>
        <h3 className="text-lg font-serif-italic text-zinc-200">{q.question}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
        {q.options.map((opt: any) => {
          const isSelected = userAnswer === opt.id;
          const isTheCorrectOne = showResults && opt.id === q.correctAnswer;

          return (
            <div
              key={opt.id}
              onClick={() => !showResults && onChange(q.id, opt.id)}
              className={`
                                cursor-pointer px-6 py-4 rounded-xl border font-mono text-[10px] uppercase tracking-widest transition-all flex justify-between items-center
                                ${isSelected
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent border-white/10 text-zinc-500 hover:text-white hover:border-white/30'}
                                ${isTheCorrectOne ? '!bg-emerald-500 !text-black !border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : ''}
                                ${showResults && isSelected && !isCorrect ? '!bg-red-500 !text-black !border-red-500' : ''}
                            `}
            >
              <span>{opt.id}) {opt.text}</span>
              {isTheCorrectOne && <CheckCircle2 size={14} />}
              {showResults && isSelected && !isCorrect && <XCircle size={14} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BooleanBlock({ q, index, userAnswer, onChange, showResults }: any) {
  const isCorrect = showResults && (userAnswer === 'true' || userAnswer === true) === q.correctAnswer;

  return (
    <div className={`p-8 rounded-[32px] border transition-all duration-500 ${showResults ? (isCorrect ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-red-500/30 bg-red-950/10') : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div className="flex gap-6 max-w-xl">
          <span className="font-mono text-[10px] opacity-30">Q{index < 10 ? `0${index}` : index}</span>
          <h3 className="text-lg font-serif-italic text-zinc-200">{q.question}</h3>
        </div>
        <div className="flex gap-2">
          {['True', 'False'].map((opt) => {
            const val = opt === 'True';
            const isSelected = (userAnswer === 'true' || userAnswer === true) === val;
            const isTheCorrectOne = showResults && val === q.correctAnswer;

            return (
              <button
                key={opt}
                onClick={() => !showResults && onChange(q.id, val)}
                className={`
                                    px-8 py-3 rounded-full border font-mono text-[9px] uppercase tracking-widest transition-all
                                    ${isSelected ? 'bg-white text-black' : 'border-white/10 text-zinc-500 hover:border-white/40'}
                                    ${isTheCorrectOne ? '!bg-emerald-500 !text-black' : ''}
                                `}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}