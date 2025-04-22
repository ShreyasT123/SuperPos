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
export default function QuantumCircuitsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Quantum Circuits | Intermediate Course</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-emerald-500 to-lime-500">
        Quantum Circuits
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Learn how to combine quantum gates into sequences, known as quantum circuits, to perform specific
          computational tasks. This module covers circuit diagrams, measurement, and basic circuit patterns.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 1: Constructing Quantum Computations</h3>
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
              Topics explored in this lesson:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>Reading and understanding standard quantum circuit notation</li>
              <li>Initializing qubits and applying gate sequences</li>
              <li>Performing measurements on single and multiple qubits</li>
              <li>How circuits create and utilize entanglement (e.g., Bell states)</li>
              <li>Simulating simple quantum circuits</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-emerald-400">Circuit Design</h4>
            <p className="text-gray-300">
              Gain the ability to design basic quantum circuits to achieve specific outcomes, like creating
              entangled pairs or simple state transformations.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-lime-400">Simulation and Analysis</h4>
            <p className="text-gray-300">
              Understand how to trace the evolution of quantum states through a circuit and interpret the
              probabilistic results of measurements.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 4 weeks | Difficulty: Intermediate | Prerequisites: Beginner Level Courses
        </p>
      </div>
    </div>
  );
}