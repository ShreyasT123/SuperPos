import React from 'react';
import Head from 'next/head';


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

export default function QuantumCryptographyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Quantum Cryptography | Advanced Course</title>
      </Head>

      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-red-500 to-orange-500">
        Quantum Cryptography
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Learn how quantum mechanics impacts cryptography, both by breaking existing classical schemes
          (like RSA via Shor&apos;s algorithm) and by enabling new, secure communication protocols (like QKD).
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 2: Security in the Quantum Era</h3>
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
              Topics covered:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>Recap: Shor&apos;s Algorithm and its threat to public-key cryptography (RSA, ECC)</li>
              <li>Quantum Key Distribution (QKD): Principles and protocols (BB84)</li>
              <li>Security proofs for QKD based on quantum measurement</li>
              <li>Practical challenges and limitations of QKD implementation</li>
              <li>Introduction to Post-Quantum Cryptography (PQC): Classical algorithms resistant to quantum attacks</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-red-400">Quantum Security Principles</h4>
            <p className="text-gray-300">
              Understand how quantum phenomena like the no-cloning theorem and measurement disturbance
              enable fundamentally secure key distribution.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-orange-400">Future of Cryptography</h4>
            <p className="text-gray-300">
              Appreciate the dual impact of quantum computing on security – breaking old methods and
              enabling new ones – and the importance of PQC.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 5 weeks | Difficulty: Advanced | Prerequisites: Intermediate Level Courses, Basic Cryptography Knowledge Recommended
        </p>
      </div>
    </div>
  );
}