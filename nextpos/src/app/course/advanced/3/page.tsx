import React from 'react';
import Head from 'next/head';


export default function AdvancedQuantumAlgorithmsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Advanced Quantum Algorithms | Advanced Course</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-red-500 to-orange-500">
        Advanced Quantum Algorithms
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Delve deeper into sophisticated quantum algorithms and the techniques underpinning them, such as
          the Quantum Fourier Transform and its applications, including a closer look at Shor&apos;s algorithm.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 3: Complex Quantum Procedures</h3>
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="mt-4">
            <p className="text-gray-300">
              Topics explored in detail:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>The Quantum Fourier Transform (QFT): Definition, circuit implementation, properties</li>
              <li>Quantum Phase Estimation (QPE): Algorithm and applications</li>
              <li>Detailed breakdown of Shor&apos;s Algorithm: Using QPE and QFT for factoring</li>
              <li>Introduction to Hamiltonian Simulation algorithms</li>
              <li>Overview of other advanced algorithms (e.g., Quantum Walks, Amplitude Amplification variants)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-red-400">Key Subroutines</h4>
            <p className="text-gray-300">
              Master essential quantum subroutines like QFT and QPE, which are building blocks for many
              complex quantum algorithms.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-orange-400">Algorithmic Design</h4>
            <p className="text-gray-300">
              Gain a deeper understanding of how complex quantum algorithms are constructed and the
              mathematical and quantum principles they rely on.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 6 weeks | Difficulty: Advanced | Prerequisites: Intermediate Level Courses, Strong Linear Algebra Recommended
        </p>
      </div>
    </div>
  );
}