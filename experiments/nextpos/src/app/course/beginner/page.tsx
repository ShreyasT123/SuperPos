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
          width: '640px',
          height: '640px',
          objectFit: 'contain',
          borderRadius: '8px',
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default function BeginnerCourse() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>Introduction to Quantum Computing | Course</title>
      </Head>
      
      <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-cyan-500 to-purple-500">
        Introduction to Quantum Computing
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
        <p className="text-gray-300 mb-4">
          Welcome to your first step into the fascinating world of quantum computing. This foundational course 
          is designed to introduce you to the core concepts of quantum mechanics that drive quantum computation, 
          no advanced physics or mathematics required.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Module 1: Quantum Fundamentals</h3>
        <div className="bg-gray-900 rounded-lg p-6">
          <VideoPlayer 
            src="/WhatsApp Video 2024-11-22 at 17.42.11_a8ca03ea00003815.mov" 
            poster="/next.svg" 
            controls={true}
            width={640}
            height={360}
          />
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2 text-white">Lesson Summary</h4>
            <p className="text-gray-300">
              In this introductory lesson, we&apos;ll explore:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
              <li>What makes quantum computing different from classical computing</li>
              <li>Introduction to qubits and superposition</li>
              <li>Basic quantum gates and their operations</li>
              <li>Real-world applications of quantum computing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-cyan-400">Theoretical Foundations</h4>
            <p className="text-gray-300">
              Understand the basic principles of quantum mechanics that enable quantum computing, 
              including superposition, entanglement, and quantum measurement.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2 text-purple-400">Practical Applications</h4>
            <p className="text-gray-300">
              Learn how quantum algorithms solve real-world problems and explore current 
              limitations and future possibilities in quantum technology.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-300 italic">
          Duration: 4 weeks | Difficulty: Beginner | Prerequisites: None
        </p>
      </div>
    </div>
  );
}

