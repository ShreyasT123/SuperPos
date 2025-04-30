import React from "react";
import Head from "next/head";


export default function BeginnerCourse() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      {" "}
      {/* Default text color */}
      <Head>
        <title>
          📘 Course 1: Beginner – Introduction to Quantum Computing | Quantum
          Course
        </title>
        <meta
          name="description"
          content="An introduction to the fundamental concepts of quantum computing, comparing it with classical computing and exploring its potential applications."
        />
      </Head>
      {/* Gradient Title */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        📘 Course 1: Beginner – Introduction to Quantum Computing
      </h1>
      {/* Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-8">
        &quot;Welcome to the multiverse of computation, where Schrödinger meets
        silicon, and 1s and 0s are just the beginning.&quot;
      </p>
      {/* Main Content Area */}
      <div className="space-y-8">
        {/* Reading Material Sections */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🧠 What Is Quantum Computing?
          </h2>
          <p className="mb-3">
            Quantum computing represents a fundamentally new paradigm of
            computation. It&apos;s not just about making existing computers faster;
            it&apos;s about{" "}
            <strong className="text-yellow-300">
              redefining how certain types of problems can be solved
            </strong>
            .
          </p>
          <p className="mb-3">
            Classical computers, the ones we use every day, operate using{" "}
            <strong className="text-cyan-400">bits</strong>. A bit is the
            smallest unit of data and can only be in one of two states: 0 or 1.
          </p>
          <p className="mb-4">
            Quantum computers, however, use{" "}
            <strong className="text-purple-400">qubits</strong>. Thanks to a
            quantum mechanical principle called{" "}
            <strong className="text-yellow-300">superposition</strong>, a qubit
            can represent 0, 1, or a combination of both states simultaneously.
            This ability to hold multiple values at once is key to their power.
          </p>
          <div className="bg-gray-900 p-4 rounded mt-4 italic">
            <p className="text-gray-400">
              <strong className="text-white block mb-1">
                Analogy: The Maze Solver
              </strong>
              Imagine trying to find the exit in a complex maze. A{" "}
              <strong className="text-cyan-400">classical computer</strong>{" "}
              might try each possible path sequentially, one after another,
              until it finds the exit. A{" "}
              <strong className="text-purple-400">quantum computer</strong>,
              leveraging superposition, could conceptually explore{" "}
              <em className="text-lime-300">
                all possible paths simultaneously
              </em>
              , drastically reducing the time needed to find the solution for
              certain maze-like problems. This is often referred to as quantum
              parallelism.
            </p>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            ⚛️ Classical vs Quantum – The Game Changer
          </h2>
          <p className="mb-4">Here&apos;s a breakdown of the core differences:</p>
          <div className="overflow-x-auto">
            {" "}
            {/* Ensure table is responsive */}
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-cyan-400">
                <tr>
                  <th className="border border-gray-700 px-4 py-2">Feature</th>
                  <th className="border border-gray-700 px-4 py-2">
                    Classical Computer
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Quantum Computer
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850">
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-medium">
                    Basic Unit
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Bit (State is 0 OR 1)
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Qubit (State can be 0, 1, OR a superposition of both)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-medium">
                    Information Processing
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Processes information sequentially or via limited
                    parallelism.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Leverages superposition and entanglement for massive
                    intrinsic parallelism.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-medium">
                    Core Principles
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Based on classical physics and Boolean logic. Deterministic
                    outcomes.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Based on quantum mechanics (superposition, interference,
                    entanglement). Probabilistic outcomes.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-medium">
                    Algorithms
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Typically sequential, logical steps (e.g., loops,
                    conditionals).
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Designed to manipulate probabilities and create interference
                    patterns (e.g., Grover&apos;s, Shor&apos;s).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-medium">
                    Potential Speedup (Specific Problems)
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Efficient for many tasks (polynomial time). Struggles with
                    certain complex problems (exponential time).
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Can offer{" "}
                    <strong className="text-red-400">
                      exponential speedups
                    </strong>{" "}
                    for specific problems (e.g., factoring, simulation). Not
                    faster for everything.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🌍 Real-Life Examples & Potential Impact
          </h2>
          <p className="mb-4">
            While still developing, quantum computing holds promise for
            revolutionizing various fields:
          </p>
          <ul className="space-y-4">
            <li className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-emerald-400 mb-1">
                🎯 1. Optimization & Search (e.g., Password Cracking)
              </h3>
              <p>
                Consider searching a huge database or trying countless
                combinations, like cracking a password. A classical computer
                checks possibilities one by one.{" "}
                <strong className="text-yellow-300">Grover&apos;s algorithm</strong>,
                run on a quantum computer, could explore all possibilities in a
                superposition and use interference to significantly speed up
                finding the correct one (quadratic speedup).
              </p>
            </li>
            <li className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-emerald-400 mb-1">
                🧪 2. Drug Discovery & Materials Science
              </h3>
              <p>
                Simulating the exact behavior of molecules, especially large
                ones, is incredibly complex for classical computers due to the
                exponential number of interactions. Quantum computers, operating
                on quantum principles themselves, are naturally suited to
                simulate these quantum systems accurately. This could accelerate
                the discovery of new medicines and materials.
              </p>
            </li>
            <li className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-emerald-400 mb-1">
                🔐 3. Encryption & Cybersecurity
              </h3>
              <p>
                This is a double-edged sword. Current encryption methods like
                RSA rely on the difficulty of factoring large numbers for
                classical computers.{" "}
                <strong className="text-red-400">Shor&apos;s algorithm</strong>, run
                on a powerful quantum computer, could potentially break this
                encryption relatively easily. This necessitates the development
                of new, quantum-resistant cryptographic methods.
              </p>
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            🚀 Analogies That Stick (Use with Caution!)
          </h2>
          <p className="mb-3 italic text-gray-400">
            Analogies help intuition but can be misleading. Quantum mechanics is
            weird!
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              Quantum computing is sometimes compared to{" "}
              <strong className="text-cyan-400">
                reading every page in a library simultaneously
              </strong>{" "}
              to find information, rather than reading page by page.
            </li>
            <li>
              The qubit&apos;s superposition is like a{" "}
              <strong className="text-purple-400">spinning coin</strong> that is
              neither heads nor tails until it lands (is measured), but embodies
              both possibilities while spinning.
            </li>
            <li>
              If a classical computer follows fixed paths like a{" "}
              <strong className="text-cyan-400">train on tracks</strong>, a
              quantum computer explores possibilities more like a{" "}
              <strong className="text-purple-400">
                drone that can instantly explore multiple locations
              </strong>{" "}
              (though the &apos;how&apos; involves interference, not actual
              teleportation).
            </li>
          </ul>
        </section>

        <section className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
            💭 But… Is It Just Hype?
          </h2>
          <p className="mb-3">
            There&apos;s definitely hype, but it&apos;s backed by significant progress and
            investment. Quantum computing is{" "}
            <strong className="text-yellow-300">real</strong>, though still in
            its early stages.
          </p>
          <p className="mb-3">
            Companies like{" "}
            <strong className="text-white">
              IBM, Google, Microsoft, Quantinuum, IonQ, Rigetti
            </strong>
            , and many others, along with governments worldwide, are investing
            billions in research and development.
          </p>
          <p>
            Think of the current state like the early days of classical
            computers (or perhaps the &quot;Nokia brick phone&quot; era as the text
            suggests) – machines are often large, require specialized
            environments (like extreme cold), are prone to errors (noise), and
            have a limited number of high-quality qubits. However, the
            underlying principles are sound, and the potential impact on
            science, industry, and security is{" "}
            <strong className="text-lime-300">enormous</strong>, driving the
            continued effort. It&apos;s a long-term technological marathon, not a
            sprint.
          </p>
        </section>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: 1 Lesson | Difficulty: Beginner | Prerequisites:
          None - Just curiosity!
        </p>
      </div>
    </div>
  );
}
