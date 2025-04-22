import React from 'react';
import Head from 'next/head';

// Reusable Video Player Component
const VideoPlayer = ({
    src,
    poster,
    controls = true,
    width = "100%",
    height = "auto"
  }: {
    src: string,
    poster: string,
    controls: boolean,
    width?: string | number,
    height?: string | number
  }) => {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <video
          src={src}
          poster={poster}
          controls={controls}
          width={width}
          height={height}
          style={{
            width: '640px', // Fixed width example
            height: '360px', // Fixed height example
            objectFit: 'contain',
            borderRadius: '8px',
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };


export default function QuantumGatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Quantum Gates | Beginner Course</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-cyan-500 to-purple-500">
        Quantum Gates
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Just like classical computers use logic gates (AND, OR, NOT), quantum computers use quantum gates
          to manipulate qubits. This module introduces the most fundamental quantum gates.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 3: Manipulating Qubits</h3>
        <div className="bg-gray-900 rounded-lg p-6">
          <VideoPlayer
            src="/placeholder-video.mp4" // Replace with actual video path
            poster="/placeholder-poster.jpg" // Replace with actual poster image path
            controls={true}
            width={640}
            height={360}
          />
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2 text-white">Lesson Summary</h4>
            <p className="text-gray-300">
              Key gates covered in this lesson:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>Single-qubit gates: Pauli-X (NOT), Pauli-Y, Pauli-Z, Hadamard (H)</li>
              <li>How these gates transform qubit states (e.g., H gate creating superposition)</li>
              <li>Introduction to multi-qubit gates: The Controlled-NOT (CNOT) gate</li>
              <li>Understanding the concept of quantum entanglement via CNOT</li>
              <li>The reversibility of quantum gates</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-cyan-400">Gate Operations</h4>
            <p className="text-gray-300">
              Understand how common quantum gates affect single and multiple qubits mathematically and
              conceptually.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-purple-400">Building Blocks</h4>
            <p className="text-gray-300">
              Recognize these gates as the fundamental building blocks for constructing more complex
              quantum circuits and algorithms.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 4 weeks | Difficulty: Beginner | Prerequisites: Qubits and Superposition
        </p>
      </div>
    </div>
  );
}