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

export default function QuantumGatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      {" "}
      {/* Default text color */}
      <Head>
        <title>🔧 Course 3: Beginner – Quantum Gates | Quantum Course</title>
        <meta
          name="description"
          content="Learn about the fundamental quantum gates (X, H, Z, CNOT) used to manipulate qubits and build quantum circuits."
        />
      </Head>
      {/* Gradient Title */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        🔧 Course 3: Beginner – Quantum Gates
      </h1>
      {/* Optional Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-8">
        &quot;If qubits are actors, quantum gates are the directors—deciding how
        the story unfolds.&quot;
      </p>
      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Video Section (Placeholder) */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">
            Lesson Video: Introducing Quantum Gates
          </h2>
          <VideoPlayer
            src="/placeholder-video-gates.mp4" // Replace with actual video path
            poster="/placeholder-poster-gates.jpg" // Replace with actual poster image path
            controls={true}
            width={640} // Example fixed size, CSS handles responsiveness
            height={360}
          />
          {/* You could add a brief summary or key takeaways from the video here if desired */}
        </div>

        {/* Reading Material Sections */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🏗️ What Are Quantum Gates?
          </h3>
          <p className="mb-3">
            Quantum gates are the fundamental operations performed on qubits to
            change their state. Think of them as the quantum equivalent of
            classical logic gates (like AND, OR, NOT).
          </p>
          <p className="mb-3">
            However, instead of simple logic tables, quantum gates are described
            by{" "}
            <strong className="text-yellow-300">mathematical operations</strong>{" "}
            (specifically, unitary matrices from linear algebra) that transform
            the quantum state vector (
            <code className="text-green-400">|ψ⟩ = α|0⟩ + β|1⟩</code>).
          </p>
          <p>
            They are the building blocks used to create quantum circuits and
            algorithms.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🔄 Reversibility – A Key Difference
          </h3>
          <p className="mb-3">
            A crucial distinction: unlike many classical gates (e.g., AND, which
            loses information about the inputs),{" "}
            <strong className="text-cyan-400">
              all quantum gates must be reversible
            </strong>
            .
          </p>
          <p className="mb-3">
            This means no information is lost during the operation. If you know
            the final state and the gate applied, you can always determine the
            initial state by applying the inverse gate. This property stems from
            the principles of quantum mechanics (unitarity).
          </p>
          <p className="italic text-gray-400">
            Imagine twisting a Rubik’s Cube. Each twist is like a quantum gate.
            As long as you remember the sequence of twists (the gates), you can
            always reverse them to return the cube to its original solved state.
            Information about the sequence of moves isn&apos;t lost.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🎼 Key Single-Qubit Gates
          </h3>
          <p className="mb-4">
            These gates operate on a single qubit at a time, often visualized as
            rotations on the Bloch Sphere:
          </p>
          <div className="overflow-x-auto">
            {" "}
            {/* Make table responsive */}
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-cyan-400">
                <tr>
                  <th className="border border-gray-700 p-2">Gate Name</th>
                  <th className="border border-gray-700 p-2">Symbol</th>
                  <th className="border border-gray-700 p-2">Action</th>
                  <th className="border border-gray-700 p-2">
                    Visual Analogy / Bloch Sphere Effect
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850">
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Pauli-X (NOT)
                  </td>
                  <td className="border border-gray-700 p-2 font-mono text-lg text-center">
                    X
                  </td>
                  <td className="border border-gray-700 p-2">
                    Flips the state:{" "}
                    <code className="text-green-400">|0⟩ ↔ |1⟩</code>.
                  </td>
                  <td className="border border-gray-700 p-2">
                    Rotation by 180° around the X-axis.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Hadamard
                  </td>
                  <td className="border border-gray-700 p-2 font-mono text-lg text-center">
                    H
                  </td>
                  <td className="border border-gray-700 p-2">
                    Creates superposition:{" "}
                    <code className="text-green-400">|0⟩ → (|0⟩ + |1⟩)/√2</code>
                    ,{" "}
                    <code className="text-green-400">|1⟩ → (|0⟩ - |1⟩)/√2</code>
                    .
                  </td>
                  <td className="border border-gray-700 p-2">
                    Rotation by 180° around the axis midway between X and Z.
                    Maps basis states to superposition states.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Pauli-Z
                  </td>
                  <td className="border border-gray-700 p-2 font-mono text-lg text-center">
                    Z
                  </td>
                  <td className="border border-gray-700 p-2">
                    Applies a phase flip to{" "}
                    <code className="text-green-400">|1⟩</code>:{" "}
                    <code className="text-green-400">|1⟩ → -|1⟩</code>. Leaves{" "}
                    <code className="text-green-400">|0⟩</code> unchanged.
                  </td>
                  <td className="border border-gray-700 p-2">
                    Rotation by 180° around the Z-axis. Changes phase, not
                    probability amplitudes. Like changing rhythm, not volume.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Phase (S) / π/8 (T)
                  </td>
                  <td className="border border-gray-700 p-2 font-mono text-lg text-center">
                    S / T
                  </td>
                  <td className="border border-gray-700 p-2">
                    Rotates the phase of the{" "}
                    <code className="text-green-400">|1⟩</code> component (S by
                    90°, T by 45°).
                  </td>
                  <td className="border border-gray-700 p-2">
                    Rotations around the Z-axis by smaller angles (90° for S,
                    45° for T). Like finely tuning the phase - spinning the coin
                    while it spins.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🔗 Multi-Qubit Gates
          </h3>
          <p className="mb-3">
            These gates operate on two or more qubits, allowing for interaction
            and entanglement:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2 pl-4">
            <li>
              <strong className="text-purple-400">
                Controlled-NOT (CNOT or CX):
              </strong>
              Acts on two qubits (control and target). If the control qubit is
              in state <code className="text-green-400">|1⟩</code>, it applies
              an X (NOT) gate to the target qubit. Otherwise, it does nothing to
              the target. Essential for creating entanglement.
              {/* Visual/Symbol can be added here if needed */}
            </li>
            <li>
              <strong className="text-purple-400">SWAP:</strong>
              Exchanges the states of two qubits.{" "}
              <code className="text-green-400">|ψ⟩|φ⟩ → |φ⟩|ψ⟩</code>.
            </li>
            <li>
              <strong className="text-purple-400">
                Toffoli (CCNOT or Controlled-Controlled-NOT):
              </strong>
              A three-qubit gate. If the first two control qubits are both in
              state <code className="text-green-400">|1⟩</code>, it flips the
              third (target) qubit. It&apos;s a reversible version of the
              classical AND gate and is universal for classical computation.
            </li>
          </ul>
          <p className="font-semibold text-yellow-300">
            Multi-qubit gates, especially CNOT, are crucial for generating{" "}
            <strong className="text-pink-400">entanglement</strong>—the strange
            quantum connection where qubits become correlated, sharing the same
            fate even when physically separated.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🔭 Quantum Gate Design Philosophy
          </h3>
          <p className="mb-3">
            When working with quantum gates, it helps to shift your thinking:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2 pl-4">
            <li>
              Think in terms of{" "}
              <strong className="text-cyan-400">rotations</strong> on the Bloch
              sphere, not just classical logic (0s and 1s). Gates manipulate the
              direction of the qubit state vector.
            </li>
            <li>
              Remember that{" "}
              <strong className="text-pink-400">phase matters</strong>. Gates
              can change the complex amplitudes (α and β), affecting
              interference, even if they don&apos;t change the measurement
              probabilities (|α|² and |β|²).
            </li>
            <li>
              Visualize operations as orchestrating a complex dance or ballet –
              precise, mathematical, and governed by the rules of quantum
              mechanics.
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🧠 Intuition Builder: Gate Sequence Example
          </h3>
          <p className="mb-3">
            Let&apos;s trace the state of a qubit through a sequence of gates.
            Try this thought experiment:
          </p>
          <ol className="list-decimal list-inside mb-4 space-y-2 pl-4 bg-gray-900 p-4 rounded">
            <li>
              Start with the qubit in the ground state:{" "}
              <code className="text-green-400">|0⟩</code>.
            </li>
            <li>
              Apply the <strong className="text-cyan-400">Hadamard (H)</strong>{" "}
              gate. The state becomes superposition:{" "}
              <code className="text-green-400">(|0⟩ + |1⟩)/√2</code>.
            </li>
            <li>
              Apply the <strong className="text-purple-400">Pauli-Z (Z)</strong>{" "}
              gate. This flips the phase of the |1⟩ component:{" "}
              <code className="text-green-400">(|0⟩ - |1⟩)/√2</code>.
            </li>
            <li>
              Apply the <strong className="text-cyan-400">Hadamard (H)</strong>{" "}
              gate again. Due to interference effects (the H gate acting on the
              Z-modified superposition), the state transforms to:{" "}
              <code className="text-green-400">|1⟩</code>.
            </li>
          </ol>
          <p className="font-semibold text-yellow-300">
            Result: Applying H, then Z, then H to the initial state |0⟩ results
            in the final state |1⟩!
          </p>
          <p className="mt-3 italic text-gray-400">
            This demonstrates how combining gates can lead to non-intuitive
            outcomes because of the interplay between superposition, phase
            shifts, and interference – the core mechanics manipulated by quantum
            algorithms.
          </p>
        </div>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: 1-2 Lessons | Difficulty: Beginner |
          Prerequisites: Course 2 (Qubits and Superposition)
        </p>
      </div>
    </div>
  );
}
