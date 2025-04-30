import React from 'react';
import Head from 'next/head';


export default function QuantumMachineLearningPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Quantum Machine Learning | Advanced Course</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-red-500 to-orange-500">
        Quantum Machine Learning
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Explore the exciting intersection of quantum computing and machine learning. This module delves
          into how quantum algorithms might enhance ML tasks and introduces key QML concepts.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 1: Quantum Enhancements for ML</h3>
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2 text-white">Lesson Summary</h4>
            <p className="text-gray-300">
              Topics introduced in this lesson:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>Encoding classical data into quantum states (amplitude encoding, basis encoding)</li>
              <li>Quantum algorithms for linear algebra (HHL algorithm - overview)</li>
              <li>Variational Quantum Algorithms (VQAs) for optimization and ML</li>
              <li>Quantum Support Vector Machines (QSVM) and Quantum Neural Networks (QNN) concepts</li>
              <li>Current research trends and challenges in QML</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-red-400">QML Paradigms</h4>
            <p className="text-gray-300">
              Understand the different approaches to QML, including quantum-enhanced classical ML and
              fully quantum ML models.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-orange-400">Potential Applications</h4>
            <p className="text-gray-300">
              Explore areas where QML might offer advantages, such as drug discovery, materials science,
              and financial modeling, acknowledging near-term limitations.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 6 weeks | Difficulty: Advanced | Prerequisites: Intermediate Level Courses, Basic ML Knowledge Recommended
        </p>
      </div>
    </div>
  );
}