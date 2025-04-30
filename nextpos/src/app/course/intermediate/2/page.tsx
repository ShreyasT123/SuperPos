/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";

// Reusable Video Player Component (Assuming it's imported or defined elsewhere)
const VideoPlayer = ({
  src,
  poster,
  controls = true,
  width = "100%", // Default to 100% for responsive container
  height = "auto", // Default to auto for aspect ratio
}: {
  src: string;
  poster: string;
  controls?: boolean; // Make controls optional
  width?: string | number;
  height?: string | number;
}) => {
  return (
    // Container ensures max-width and centering
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <video
        src={src}
        poster={poster}
        controls={controls}
        // Apply width/height to the video element itself for explicit sizing if needed
        // but rely on CSS for responsiveness within the container
        style={{
          display: "block", // Prevents extra space below video
          maxWidth: "100%", // Ensures video scales down
          width: typeof width === "number" ? `${width}px` : width, // Apply width if specified
          height: typeof height === "number" ? `${height}px` : height, // Apply height if specified, else auto
          objectFit: "contain", // Ensures entire video is visible
          borderRadius: "8px",
          margin: "0 auto", // Center video element if container is wider
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default function QuantumAlgorithmsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      {" "}
      {/* Default text color */}
      <Head>
        <title>
          📐 Course 5: Intermediate – Quantum Algorithms | Quantum Course
        </title>
        <meta
          name="description"
          content="Explore foundational quantum algorithms like Grover's, Shor's, and Deutsch-Jozsa, understanding how they achieve quantum speedups."
        />
      </Head>
      {/* Gradient Title */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-lime-500">
        📐 Course 5: Intermediate – Quantum Algorithms
      </h1>
      {/* Optional Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-8">
        "Quantum algorithms don’t just make things faster. They rethink the
        entire path to a solution."
      </p>
      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Video Section (Placeholder) */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">
            Lesson Video: The Power of Quantum Algorithms
          </h2>
          <VideoPlayer
            src="/placeholder-video-algorithms.mp4" // Replace with actual video path
            poster="/placeholder-poster-algorithms.jpg" // Replace with actual poster image path
            controls={true}
            width={640} // Example fixed size, CSS handles responsiveness
            height={360}
          />
          {/* Optional: Add brief video summary here if needed */}
          {/* <p className="text-center text-gray-400 mt-4">This video introduces the core concepts behind famous quantum algorithms.</p> */}
        </div>

        {/* Reading Material Sections */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🧠 What is a Quantum Algorithm?
          </h3>
          <p className="mb-3">
            A quantum algorithm isn't just a classical algorithm run on a
            quantum computer. It's a sequence of{" "}
            <strong className="text-yellow-300">
              quantum operations (gates) and measurements
            </strong>{" "}
            specifically designed to solve a problem by leveraging unique
            quantum phenomena:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1 pl-4">
            <li>
              <strong className="text-cyan-400">Superposition:</strong>{" "}
              Exploring many possibilities simultaneously.
            </li>
            <li>
              <strong className="text-purple-400">Interference:</strong>{" "}
              Canceling out wrong answers and amplifying right ones.
            </li>
            <li>
              <strong className="text-pink-400">Entanglement:</strong> Creating
              correlations between qubits for complex computations.
            </li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-900 p-3 rounded">
              <h4 className="font-semibold text-white mb-1">
                Classical Computing:
              </h4>
              <p>
                You typically write step-by-step logical instructions for the
                processor to follow sequentially (or in parallel).
              </p>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <h4 className="font-semibold text-white mb-1">
                Quantum Computing:
              </h4>
              <p>
                You design a process that manipulates quantum states to{" "}
                <em className="text-lime-300">sculpt interference patterns</em>,
                making the desired solution appear with high probability upon
                measurement.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🚀 Famous Quantum Algorithms
          </h3>
          <div className="space-y-6">
            {/* Grover's Algorithm */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-xl font-semibold text-emerald-400 mb-2">
                1️⃣ Grover’s Algorithm – Unstructured Search
              </h4>
              <p className="mb-2">
                <strong className="text-gray-100">Problem:</strong> Find a
                specific marked item in a large, unsorted database (like finding
                a specific name in a phonebook with no alphabetical order).
              </p>
              <p className="mb-2">
                <strong className="text-gray-100">Comparison:</strong>
              </p>
              <ul className="list-disc list-inside mb-2 pl-4 space-y-1">
                <li>
                  Classical: On average, needs to check N/2 items (worst case
                  N), roughly <code className="text-green-400">O(N)</code>{" "}
                  steps.
                </li>
                <li>
                  Quantum (Grover's): Finds the item in roughly{" "}
                  <code className="text-green-400">O(√N)</code> steps. Provides
                  a quadratic speedup.
                </li>
              </ul>
              <p className="mb-2">
                <strong className="text-gray-100">🧠 How it works:</strong> Uses
                a clever technique called{" "}
                <strong className="text-yellow-300">
                  amplitude amplification
                </strong>
                . It repeatedly applies operations that flip the phase of the
                target item and then invert all states about the average
                amplitude. This gradually increases the amplitude (and thus
                probability) of the target state while decreasing others.
              </p>
              <p className="italic text-gray-400">
                Analogy: Imagine shouting into a cave (starting superposition).
                Grover's oracle "marks" the echo from the target by changing its
                phase. The amplification step acts like a focusing mechanism,
                making only the marked echo progressively louder relative to the
                others.
              </p>
            </div>

            {/* Shor's Algorithm */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-xl font-semibold text-emerald-400 mb-2">
                2️⃣ Shor’s Algorithm – Integer Factorization
              </h4>
              <p className="mb-2">
                <strong className="text-gray-100">Problem:</strong> Find the
                prime factors of a very large integer. This is computationally
                hard for classical computers and forms the basis of RSA
                encryption.
              </p>
              <p className="mb-2">
                <strong className="text-gray-100">Comparison:</strong>
              </p>
              <ul className="list-disc list-inside mb-2 pl-4 space-y-1">
                <li>
                  Classical: Best known algorithms take exponential time
                  relative to the number of digits.
                </li>
                <li>
                  Quantum (Shor's): Runs in polynomial time, offering an{" "}
                  <em className="text-red-400">exponential speedup</em>.
                </li>
              </ul>
              <p className="mb-2">
                <strong className="text-gray-100">How it works:</strong>{" "}
                Cleverly transforms the factoring problem into a problem of
                finding the period (repeating pattern) of a specific
                mathematical function. It uses the Quantum Fourier Transform
                (QFT), a quantum version of the classical FFT, to find this
                period efficiently.
              </p>
              <p className="font-semibold text-red-500 mt-2">
                ⚠️ Impact: Shor's algorithm demonstrated that a sufficiently
                large, fault-tolerant quantum computer could break widely used
                encryption methods, driving significant research into
                quantum-resistant cryptography (QRC).
              </p>
            </div>

            {/* Deutsch-Jozsa Algorithm */}
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-xl font-semibold text-emerald-400 mb-2">
                3️⃣ Deutsch-Jozsa Algorithm
              </h4>
              <p className="mb-2">
                <strong className="text-gray-100">Problem:</strong> Given a
                function <code className="text-green-400">f(x)</code> that takes
                binary inputs and produces a binary output, determine if the
                function is <em className="text-cyan-300">constant</em> (always
                outputs 0 or always outputs 1) or{" "}
                <em className="text-purple-300">balanced</em> (outputs 0 for
                exactly half the inputs and 1 for the other half).
              </p>
              <p className="mb-2">
                <strong className="text-gray-100">Comparison:</strong>
              </p>
              <ul className="list-disc list-inside mb-2 pl-4 space-y-1">
                <li>
                  Classical: In the worst case, requires multiple queries to the
                  function to be certain.
                </li>
                <li>
                  Quantum (Deutsch-Jozsa): Solves the problem with{" "}
                  <strong className="text-yellow-300">just one query</strong> to
                  the quantum version of the function (the oracle).
                </li>
              </ul>
              <p className="mb-2">
                <strong className="text-gray-100">🧪 Significance:</strong>{" "}
                While the problem itself is somewhat contrived, Deutsch-Jozsa
                was one of the first algorithms to provide a clear, albeit
                simple, proof of concept that quantum computers could solve
                certain problems dramatically faster (in terms of query
                complexity) than classical computers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            📊 Other Important Algorithms
          </h3>
          <p className="mb-4">
            Beyond the most famous examples, several other algorithms are
            crucial:
          </p>
          <div className="overflow-x-auto">
            {" "}
            {/* Make table responsive */}
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-lime-400">
                <tr>
                  <th className="border border-gray-700 p-2">Algorithm</th>
                  <th className="border border-gray-700 p-2">
                    Purpose / Problem Solved
                  </th>
                  <th className="border border-gray-700 p-2">
                    Type of Speedup / Importance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850">
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Simon’s Algorithm
                  </td>
                  <td className="border border-gray-700 p-2">
                    Finds a hidden period or pattern in a function
                    (specifically, a promise problem related to XOR masks).
                  </td>
                  <td className="border border-gray-700 p-2">
                    <strong className="text-red-400">Exponential</strong>{" "}
                    speedup over classical. Inspired Shor's algorithm.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Quantum Phase Estimation (QPE)
                  </td>
                  <td className="border border-gray-700 p-2">
                    Estimates the eigenvalue (phase) associated with an
                    eigenvector of a unitary operator.
                  </td>
                  <td className="border border-gray-700 p-2">
                    Key subroutine in Shor's algorithm and algorithms for
                    quantum chemistry simulations. Foundational.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Variational Quantum Eigensolver (VQE) & QAOA
                  </td>
                  <td className="border border-gray-700 p-2">
                    Find approximate solutions to optimization problems and
                    ground state energies. Designed for Noisy Intermediate-Scale
                    Quantum (NISQ) devices.
                  </td>
                  <td className="border border-gray-700 p-2">
                    Heuristic,{" "}
                    <strong className="text-yellow-300">
                      hybrid quantum-classical
                    </strong>{" "}
                    approach. Potential speedups aren't always proven but
                    promising for near-term hardware.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🎓 Strategy Behind Quantum Algorithms
          </h3>
          <p className="mb-3">
            While specifics vary, many quantum algorithms follow a general
            pattern:
          </p>
          <ol className="list-decimal list-inside mb-4 space-y-2 pl-4 bg-gray-900 p-4 rounded">
            <li>
              <strong className="text-cyan-400">
                Initialization & Superposition:
              </strong>{" "}
              Start qubits in a known state (e.g.,{" "}
              <code className="text-green-400">|0...0⟩</code>) and apply
              Hadamard (H) gates to create an equal superposition of all
              possible computational basis states.
            </li>
            <li>
              <strong className="text-purple-400">
                Problem Encoding (Oracle):
              </strong>{" "}
              Apply quantum gates that encode the problem. Often involves an
              "oracle" – a black-box operation that recognizes or marks the
              solution state(s), usually by changing their phase.
            </li>
            <li>
              <strong className="text-yellow-300">
                Interference / Amplification:
              </strong>{" "}
              Use further quantum operations (like the QFT in Shor's or the
              diffusion operator in Grover's) to manipulate phases and
              amplitudes, causing destructive interference for wrong answers and
              constructive interference for the right answer(s).
            </li>
            <li>
              <strong className="text-pink-400">Measurement:</strong> Measure
              the final state of the qubits. Due to the
              interference/amplification step, there's a high probability of
              measuring the state corresponding to the correct solution.
            </li>
          </ol>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            📌 Why Aren’t There More Famous Algorithms?
          </h3>
          <p className="mb-3">
            Discovering new quantum algorithms with significant speedups is
            challenging. Quantum computing operates on fundamentally different
            principles than classical computing.
          </p>
          <p>
            Finding problems where superposition, interference, and entanglement
            provide a true advantage often requires{" "}
            <strong className="text-lime-300">
              completely rethinking the problem's structure
            </strong>
            , rather than just translating a classical algorithm into quantum
            gates. It demands deep insights into both the problem domain and
            quantum mechanics.
          </p>
        </div>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: 2-3 Lessons | Difficulty: Intermediate |
          Prerequisites: Quantum Gates & Circuits
        </p>
      </div>
    </div>
  );
}
