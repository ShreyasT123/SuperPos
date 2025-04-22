import React from 'react';
import Head from 'next/head';

// Reusable Video Player Component (Consider moving to a shared components folder)
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

export default function QubitsSuperpositionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Qubits and Superposition | Beginner Course</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-cyan-500 to-purple-500">
        Qubits and Superposition
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Dive deeper into the fundamental building block of quantum computers: the qubit. This module explores
          how qubits differ from classical bits and introduces the counter-intuitive concept of superposition.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 2: The Quantum Bit</h3>
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
              In this lesson, we cover:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>What exactly is a qubit?</li>
              <li>Comparing classical bits (0 or 1) with qubits (0, 1, or both)</li>
              <li>Understanding the principle of superposition</li>
              <li>Visualizing qubit states using the Bloch sphere (introduction)</li>
              <li>The role of measurement in collapsing superposition</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-cyan-400">Representing Qubits</h4>
            <p className="text-gray-300">
              Learn the mathematical notation for qubits and how to represent their states, including
              superposition states.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-purple-400">Superposition in Action</h4>
            <p className="text-gray-300">
              Grasp the implications of superposition for quantum computation and why it allows for
              potentially greater processing power.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 3 weeks | Difficulty: Beginner | Prerequisites: Introduction to Quantum Computing
        </p>
      </div>
    </div>
  );
}