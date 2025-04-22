
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
  
  export default function QuantumAlgorithmsPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Head>
          <title>Quantum Algorithms | Intermediate Course</title>
        </Head>
  
        <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-emerald-500 to-lime-500">
          Quantum Algorithms
        </h1>
  
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Course Overview</h2>
          <p className="text-gray-300 mb-4">
            Explore some of the foundational quantum algorithms that demonstrate the potential power of quantum
            computation over classical methods for specific problems.
          </p>
        </div>
  
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Module 2: Leveraging Quantum Phenomena</h3>
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
                Algorithms introduced in this lesson:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2">
                <li>The Deutsch-Jozsa Algorithm: Distinguishing function types</li>
                <li>Grover&apos;s Search Algorithm: Quantum search in unstructured databases</li>
                <li>Simon&apos;s Algorithm (optional introduction): Period finding</li>
                <li>Understanding query complexity and quantum speedup</li>
                <li>Building the circuits for these algorithms</li>
              </ul>
            </div>
          </div>
        </div>
  
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">What You&apos;ll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-2 text-emerald-400">Algorithmic Concepts</h4>
              <p className="text-gray-300">
                Understand the logic and key quantum components (like oracles and interference) behind these
                fundamental algorithms.
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-2 text-lime-400">Quantum Advantage</h4>
              <p className="text-gray-300">
                Appreciate how these algorithms achieve speedups compared to the best known classical
                algorithms for the same tasks.
              </p>
            </div>
          </div>
        </div>
  
        <div className="mt-8 text-center">
          <p className="text-gray-300 italic">
            Duration: 5 weeks | Difficulty: Intermediate | Prerequisites: Quantum Circuits
          </p>
        </div>
      </div>
    );
  }