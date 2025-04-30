import React from "react";
import Head from "next/head";

export default function QubitsSuperpositionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      {" "}
      {/* Default text color */}
      <Head>
        <title>
          🧪 Course 2: Beginner – Qubits and Superposition | Quantum Course
        </title>
        <meta
          name="description"
          content="Learn about the fundamental quantum bit (qubit), the concept of superposition, and how it powers quantum computation."
        />
      </Head>
      {/* Gradient Title */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        🧪 Course 2: Beginner – Qubits and Superposition
      </h1>
      {/* Optional Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-8">
        &quot;Imagine being in two places at once. Now imagine doing two
        calculations, two thoughts, or two simulations—simultaneously. That’s a
        qubit’s life.&quot;
      </p>
      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Reading Material Section */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🎲 Qubit: The Quantum Bit
          </h3>
          <p className="mb-3">Let’s compare:</p>
          <ul className="list-disc list-inside mb-4 space-y-1 pl-4">
            <li>
              <strong className="text-cyan-400">Classical bit:</strong> Off or
              On (represented as 0 or 1). Simple, definitive states.
            </li>
            <li>
              <strong className="text-purple-400">Qubit:</strong> A combination
              of 0 and 1, existing in a{" "}
              <em className="text-yellow-400">superposition</em> until you
              measure it.
            </li>
          </ul>
          <p className="mb-3">
            A qubit&apos;s state, often denoted by |ψ⟩ (pronounced &quot;ket psi&quot;),
            is described mathematically as:
          </p>
          <div className="bg-gray-900 p-3 rounded mb-4 text-center font-mono text-lg">
            <code>|ψ⟩ = α|0⟩ + β|1⟩</code>
          </div>
          <p className="mb-4">
            Here, <code className="text-green-400">α</code> and{" "}
            <code className="text-green-400">β</code> are complex numbers called{" "}
            <strong className="text-yellow-300">probability amplitudes</strong>.
            The square of their magnitudes represents the probability of
            measuring the qubit in the corresponding state:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1 pl-4">
            <li>
              Probability of measuring |0⟩ is{" "}
              <code className="text-green-400">|α|²</code>
            </li>
            <li>
              Probability of measuring |1⟩ is{" "}
              <code className="text-green-400">|β|²</code>
            </li>
          </ul>
          <p className="mb-4">
            Crucially, these probabilities must sum to 1 (or 100%):
          </p>
          <div className="bg-gray-900 p-3 rounded my-2 text-center font-mono text-lg">
            <code>|α|² + |β|² = 1</code>
          </div>
          <p className="italic text-gray-400">
            Think of it like your GPS showing a 70% probability you&apos;re in New
            York (<code className="text-green-400">|α|² = 0.7</code>) and a 30%
            probability you&apos;re in London (
            <code className="text-green-400">|β|² = 0.3</code>)—a physically
            impossible superposition! But the moment someone checks your phone&apos;s
            location, it definitively pins you to *one* spot (measurement
            collapses the superposition).
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🌐 Visualizing Qubits with the Bloch Sphere
          </h3>
          <p className="mb-3">
            Imagine a globe. The Bloch sphere is a way to visualize the state of
            a single qubit:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1 pl-4">
            <li>
              The <strong className="text-cyan-400">North Pole</strong>{" "}
              represents the definite state |0⟩.
            </li>
            <li>
              The <strong className="text-purple-400">South Pole</strong>{" "}
              represents the definite state |1⟩.
            </li>
            <li>
              <strong className="text-yellow-400">
                Any other point on the surface
              </strong>{" "}
              of the sphere represents a unique superposition state (|ψ⟩ = α|0⟩
              + β|1⟩).
            </li>
          </ul>
          <p className="bg-gray-900 p-3 rounded font-semibold text-yellow-300">
            <span className="font-bold">Fun Fact:</span> Unlike classical
            probabilities, the <strong className="text-pink-400">phases</strong>{" "}
            (the complex nature of α and β) matter in quantum mechanics. They
            determine how different quantum states interfere with each other,
            which is key to many quantum algorithms. It’s not just *what* result
            you get, but *how* the underlying amplitudes combine or cancel out.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🔍 What’s Superposition?
          </h3>
          <p className="mb-3">
            Superposition is the core quantum principle allowing a qubit to
            exist in a combination of multiple states (
            <em className="text-yellow-400">both</em> |0⟩ and |1⟩)
            simultaneously.
          </p>
          <p className="mb-4">
            It’s like a spinning coin: while it&apos;s spinning, it&apos;s not
            definitively heads or tails but exists in a state encompassing both
            possibilities. Only when it lands (is measured) does it settle into
            one definite outcome (collapses to |0⟩ or |1⟩). Before that moment
            of measurement, the qubit truly contains the potential for all its
            possible outcomes.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🔗 Example: Quantum Chess
          </h3>
          <p className="mb-3">Imagine a game of chess:</p>
          <ul className="list-disc list-inside mb-4 space-y-1 pl-4">
            <li>
              A <strong className="text-cyan-400">classical pawn</strong> can
              only be on *one* square at any given time.
            </li>
            <li>
              A <strong className="text-purple-400">quantum pawn</strong>,
              thanks to superposition, could exist on *multiple* squares
              simultaneously. Its next move wouldn&apos;t just be a single step but
              could depend on the complex{" "}
              <strong className="text-pink-400">interference</strong> patterns
              between its possible positions—like waves colliding to either
              reinforce or cancel each other out at different locations on the
              board.
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🧪 Use in Algorithms
          </h3>
          <p className="mb-3">
            Superposition is the powerhouse behind the speedup in many quantum
            algorithms:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2 pl-4">
            <li>
              <strong className="text-cyan-400">
                Grover&apos;s algorithm:
              </strong>{" "}
              Uses superposition to effectively explore an entire unstructured
              search database simultaneously, finding a target item much faster
              than classical algorithms.
            </li>
            <li>
              <strong className="text-purple-400">
                Shor&apos;s algorithm:
              </strong>{" "}
              Leverages superposition (and entanglement) to perform calculations
              on many numbers at once, allowing it to factor large numbers
              exponentially faster than the best known classical methods.
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🎓 Real-World Analogies
          </h3>
          <p className="mb-4">
            While analogies are imperfect, they can help grasp the strangeness
            of superposition:
          </p>
          <div className="overflow-x-auto">
            {" "}
            {/* Make table responsive */}
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-cyan-400">
                <tr>
                  <th className="border border-gray-700 p-2">Analogy</th>
                  <th className="border border-gray-700 p-2">
                    Meaning Related to Superposition
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850">
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Spinning Coin
                  </td>
                  <td className="border border-gray-700 p-2">
                    Represents an equal superposition of heads (|0⟩) and tails
                    (|1⟩) before landing (measurement).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Music Chord
                  </td>
                  <td className="border border-gray-700 p-2">
                    Multiple distinct notes (states) sounding simultaneously to
                    create a combined sound (superposition).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Paint Mixing
                  </td>
                  <td className="border border-gray-700 p-2">
                    Blending primary colors (basis states) creates a new color
                    (superposition state). Measuring might mean identifying
                    *one* of the original colors present.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 p-2 font-medium">
                    Parallel Universes (Conceptual)
                  </td>
                  <td className="border border-gray-700 p-2">
                    In some interpretations, superposition implies all possible
                    outcomes are coexisting until a measurement forces one
                    reality.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: 1 Lesson | Difficulty: Beginner | Prerequisites:
          Basic understanding of bits.
        </p>
      </div>
    </div>
  );
}
