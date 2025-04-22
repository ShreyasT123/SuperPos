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
export default function QuantumErrorCorrectionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Quantum Error Correction | Intermediate Course</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-emerald-500 to-lime-500">
        Quantum Error Correction
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Quantum states are fragile and susceptible to noise (decoherence). This module introduces the
          critical concepts of quantum error correction (QEC) needed to build reliable quantum computers.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 3: Protecting Quantum Information</h3>
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
              Key concepts covered:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>Sources of errors in quantum systems (decoherence, gate errors)</li>
              <li>Why classical error correction doesn&apos;t directly apply (no-cloning theorem)</li>
              <li>Basic principles: Redundancy, syndrome measurement, recovery operations</li>
              <li>Introduction to simple QEC codes (e.g., 3-qubit bit-flip code, phase-flip code)</li>
              <li>The concept of fault-tolerant quantum computation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-emerald-400">Challenges of Noise</h4>
            <p className="text-gray-300">
              Understand the fundamental challenge posed by noise in quantum systems and why QEC is
              essential for scalable quantum computing.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-lime-400">QEC Fundamentals</h4>
            <p className="text-gray-300">
              Grasp the core ideas behind detecting and correcting errors in quantum states without
              destroying the quantum information itself.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 4 weeks | Difficulty: Intermediate | Prerequisites: Quantum Circuits
        </p>
      </div>
    </div>
  );
}