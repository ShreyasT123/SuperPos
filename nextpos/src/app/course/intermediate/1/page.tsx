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
          maxHeight: "450px", // Add max height to prevent overly tall videos
          objectFit: "contain", // Ensures entire video is visible
          borderRadius: "8px",
          margin: "0 auto", // Center video element if container is wider
          backgroundColor: "#000", // Add black background for letterboxing if needed
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Renamed component to reflect the course content
export default function QuantumCircuitsPage() {
  return (
    // Default text color set to gray-300 for readability on dark background
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>
          🧱 Course 4: Intermediate – Quantum Circuits | Quantum Course
        </title>
        <meta
          name="description"
          content="Learn how quantum circuits are constructed, their components (qubits, gates, measurement), notation, and significance in quantum computation."
        />
      </Head>
      {/* Gradient Title - Adjusted colors slightly for variety */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
        🧱 Course 4: Intermediate – Quantum Circuits
      </h1>
      {/* Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-8">
        &quot;Quantum circuits are to quantum computing what blueprints are to
        architecture. They describe not just what the building looks like, but
        how it&apos;s built—step by step, gate by gate.&quot;
      </p>
      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Video Section (Placeholder) */}
        <section className="bg-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">
            Lesson Video: Building with Quantum Circuits
          </h2>
          <VideoPlayer
            src="/placeholder-video-circuits.mp4" // *** Replace with actual video path ***
            poster="/placeholder-poster-circuits.jpg" // *** Replace with actual poster image path ***
            controls={true}
            // Width/Height handled by component's responsive styles
          />
          {/* Summary points relevant to circuits */}
          <div className="mt-6">
            <h4 className="text-lg font-medium mb-2 text-white text-center">
              Key Concepts Covered:
            </h4>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1 max-w-md mx-auto">
              <li>Reading quantum circuit diagrams.</li>
              <li>The role of qubits, gates, and measurement.</li>
              <li>Constructing basic circuits (e.g., for Bell states).</li>
              <li>Understanding circuit width and depth.</li>
              <li>Introduction to circuit simulators.</li>
            </ul>
          </div>
        </section>

        {/* Reading Material Sections */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🌀 What is a Quantum Circuit?
          </h2>
          <p className="mb-3">
            A quantum circuit is the standard model for quantum computation. It
            represents a sequence of{" "}
            <strong className="text-yellow-300">quantum gates</strong> applied
            to a set of <strong className="text-cyan-400">qubits</strong>,
            followed typically by{" "}
            <strong className="text-pink-400">measurements</strong>.
          </p>
          <p className="mb-3">
            Think of it as a diagram (or a program specification) that clearly
            outlines how the quantum state of the qubits evolves over time due
            to these operations.
          </p>
          <p className="mb-4">In the standard visual representation:</p>
          <ul className="list-disc list-inside pl-4 mt-2">
            <li>Each horizontal line (wire) represents a single qubit...</li>
            <li>Time flows from left to right.</li>
            <li>Symbols placed on these wires represent quantum gates...</li>
          </ul>
          <div className="bg-gray-900 p-4 rounded mt-4 italic">
            <p className="text-gray-400">
              <strong className="text-white block mb-1">
                🎵 Analogy: The Musical Score
              </strong>
              Quantum circuits are like musical scores for a quantum orchestra.
              Each qubit is an instrument, each gate is a note or instruction
              telling the instrument how to change its sound (state), and the
              final measurement is the performance&apos;s conclusion, revealing the
              resulting harmony (classical outcome).
            </p>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            ⚙️ Components of a Quantum Circuit
          </h2>
          <p className="mb-4">
            Every quantum circuit is built from these fundamental parts:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-2xl mt-1">🧮</span>
              <div>
                <h3 className="font-semibold text-lg text-cyan-400 mb-1">
                  1. Qubits (Wires)
                </h3>
                <p>
                  These are the horizontal lines in the circuit diagram. They
                  carry the quantum information. Circuits typically start by
                  initializing these qubits into a known basis state, most
                  commonly <code className="text-green-400">|0⟩</code> for each
                  qubit.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl mt-1">🔧</span>
              <div>
                <h3 className="font-semibold text-lg text-purple-400 mb-1">
                  2. Quantum Gates
                </h3>
                <p>
                  These are the symbols placed on the qubit wires. They
                  represent the quantum operations that modify the state of one
                  or more qubits. We&apos;ve encountered single-qubit gates (like H,
                  X, Z) and multi-qubit gates (like CNOT, SWAP, Toffoli).
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl mt-1">🧪</span>
              <div>
                <h3 className="font-semibold text-lg text-pink-400 mb-1">
                  3. Measurement
                </h3>
                <p>
                  Usually depicted at the far right end of the circuit (often
                  with a meter symbol). This operation extracts classical
                  information from the quantum state. When a qubit is measured,
                  its superposition collapses into a definite classical state (0
                  or 1) according to the probabilities defined by its quantum
                  state amplitudes just before measurement.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            📏 Quantum Circuit Notation (Visual Example)
          </h2>
          <p className="mb-4">
            Let&apos;s look at a common example – creating a Bell state (a
            fundamental entangled state):
          </p>
          {/* Using <pre> for preserving whitespace and monospace font */}
          <pre className="bg-gray-900 p-4 rounded-lg text-center text-sm md:text-base overflow-x-auto font-mono whitespace-pre">
            {`
 q₀: |0⟩ ─── H ─── ● ─── M ───
                  │
 q₁: |0⟩ ─────── X ─── M ───
                `}
          </pre>
          <p className="mt-4 mb-2">
            This circuit performs the following steps:
          </p>
          <ol className="list-decimal list-inside pl-4 space-y-1">
            <li>
              Initialize two qubits, q₀ and q₁, both in the{" "}
              <code className="text-green-400">|0⟩</code> state.
            </li>
            <li>
              Apply a <strong className="text-cyan-400">Hadamard (H)</strong>{" "}
              gate to the first qubit (q₀), putting it into the superposition
              state <code className="text-green-400">(|0⟩ + |1⟩)/√2</code>.
            </li>
            <li>
              Apply a{" "}
              <strong className="text-purple-400">Controlled-NOT (CNOT)</strong>{" "}
              gate:
              <ul className="list-disc list-inside pl-6">
                <li>
                  q₀ is the control qubit (indicated by{" "}
                  <code className="text-purple-400">●</code>).
                </li>
                <li>
                  q₁ is the target qubit (indicated by{" "}
                  <code className="text-purple-400">X</code> or{" "}
                  <code className="text-purple-400">⊕</code>).
                </li>
                <li>
                  If q₀ is <code className="text-green-400">|1⟩</code>, flip q₁.
                  Since q₀ is in superposition, this entangles the qubits.
                </li>
              </ul>
            </li>
            <li>
              <strong className="text-pink-400">Measure (M)</strong> both qubits
              to get classical outcomes (00 or 11, each with 50% probability for
              this specific Bell state{" "}
              <code className="text-green-400">|Φ⁺⟩</code>).
            </li>
          </ol>
          <p className="mt-3 font-semibold text-yellow-300">
            The result of steps 1-3 is the Bell state{" "}
            <code className="text-green-400">(|00⟩ + |11⟩)/√2</code>, a simple
            yet crucial example of quantum entanglement.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🧱 Circuit Depth and Width
          </h2>
          <p className="mb-3">
            Two important metrics describe the size and complexity of a quantum
            circuit:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
            <li>
              <strong className="text-lime-400">Width:</strong> The number of
              qubits used in the circuit (the number of horizontal wires).
            </li>
            <li>
              <strong className="text-lime-400">Depth:</strong> Roughly, the
              minimum number of time steps or layers required to execute all the
              gates, assuming gates on different qubits can sometimes run in
              parallel. It represents the longest path of sequential gate
              operations from input to output.
            </li>
          </ul>
          <h3 className="font-semibold text-lg text-yellow-300 mb-1">
            Why do Width and Depth Matter?
          </h3>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong className="text-red-400">
                Hardware Limitations (NISQ Era):
              </strong>{" "}
              Today&apos;s quantum computers (Noisy Intermediate-Scale Quantum) have
              limited qubit counts (width) and coherence times. Qubits lose
              their quantum state over time due to noise.
            </li>
            <li>
              <strong className="text-red-400">Error Accumulation:</strong>{" "}
              Every gate operation introduces a small amount of error. Longer
              circuits (greater depth) accumulate more errors, making the final
              result less reliable.
            </li>
            <li>
              <strong className="text-white">Optimization Goal:</strong> A major
              goal in quantum algorithm implementation is{" "}
              <strong className="text-yellow-300">circuit optimization</strong>{" "}
              – finding ways to achieve the same computational result using
              circuits with smaller width and, especially, shallower depth to
              improve success rates on current hardware.
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🔄 Unitary Evolution
          </h2>
          <p className="mb-3">
            From a mathematical perspective, the evolution of a closed quantum
            system (like the qubits in a circuit before measurement) is
            described by a{" "}
            <strong className="text-yellow-300">unitary transformation</strong>.
          </p>
          <p className="mb-3">
            Each quantum gate corresponds to a specific unitary matrix (e.g., H,
            X, Z, CNOT matrices). Applying a sequence of gates is equivalent to
            multiplying their corresponding unitary matrices together.
          </p>
          <p className="mb-3">
            If <code className="text-green-400">|ψ_initial⟩</code> is the
            starting state of the qubits and the entire circuit corresponds to a
            single combined unitary matrix{" "}
            <code className="text-orange-400">U_circuit</code> (product of all
            gate matrices in order), then the final state just before
            measurement is:
          </p>
          <div className="bg-gray-900 p-3 rounded my-2 text-center font-mono text-lg">
            <code>|ψ_final⟩ = U_circuit × |ψ_initial⟩</code>
          </div>
          <p className="mt-3">
            Quantum circuits provide a practical, visual way to build up complex
            unitary transformations from simpler, fundamental gate operations.
            The reversibility of quantum gates ensures this overall
            transformation is always unitary.
          </p>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🛠️ Tools and Simulators
          </h2>
          <p className="mb-4">
            You can design, simulate, and even run quantum circuits using
            various software tools and frameworks:
          </p>
          <ul className="list-disc list-inside space-y-3 pl-4">
            <li>
              <strong className="text-cyan-400">SuperPOS:</strong> A platform
              highlighted for its visual, drag-and-drop interface, making it
              excellent for hands-on learning and constructing circuits
              intuitively. (Note: Assuming &quot;SuperPOS&quot; is the intended name based
              on the text, adjust if it&apos;s different).
            </li>
            <li>
              <strong className="text-purple-400">Qiskit:</strong> An
              open-source Python framework developed by IBM. Widely used for
              programming quantum computers, simulating circuits, and running
              experiments on IBM&apos;s quantum hardware.
            </li>
            <li>
              <strong className="text-emerald-400">Cirq:</strong> An open-source
              Python library from Google, focused on developing and optimizing
              quantum circuits for near-term quantum computers.
            </li>
            <li>
              <strong className="text-yellow-300">Others:</strong> Many other
              platforms exist, including Microsoft&apos;s Q#, Amazon Braket SDK,
              Pennylane (for quantum machine learning), etc.
            </li>
          </ul>
          <p className="mt-4 italic text-gray-400">
            These tools allow you to experiment with circuits without needing
            direct access to physical quantum hardware, which is crucial for
            learning and development.
          </p>
        </section>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: 1-2 Lessons | Difficulty: Intermediate |
          Prerequisites: Course 3 (Quantum Gates)
        </p>
      </div>
    </div>
  );
}
