import React from "react";
import Head from "next/head";
// Import relevant icons
import {
  BrainCircuit,
  Search,
  Cpu,
  FlaskConical,
  GitBranch,
  BarChartHorizontalBig,
  Microscope,
  Zap,
  Sigma,
  Waves,
  Network,
  Code,
} from "lucide-react"; // Example icons


export default function AdvancedQuantumAlgorithmsPage() {
  return (
    // Using dark theme
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>
          ⚛️ Course 9: Advanced – Quantum Algorithms | Quantum Course
        </title>
        <meta
          name="description"
          content="Explore advanced quantum algorithms like QPE, HHL, VQE, QAOA, Quantum Walks, and Hamiltonian Simulation, understanding their principles and potential applications."
        />
      </Head>
      {/* Gradient Title - Using Purple/Pink */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        ⚛️ Course 9: Advanced – Quantum Algorithms
      </h1>
      {/* Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-10">
        "Unlock the core power of quantum computers through advanced algorithmic
        design."
      </p>
      {/* Main Content Area */}
      <div className="space-y-10">

        {/* What Are Advanced Quantum Algorithms? */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <BrainCircuit className="mr-3 h-7 w-7 text-purple-400" /> 🧠 What
            Are Advanced Quantum Algorithms?
          </h2>
          <p className="mb-3">
            Quantum algorithms are precisely defined sequences of quantum
            operations (gates) designed to solve specific computational problems
            by exploiting principles like{" "}
            <strong className="text-cyan-400">superposition</strong>,{" "}
            <strong className="text-pink-400">interference</strong>, and{" "}
            <strong className="text-yellow-400">entanglement</strong>. While
            foundational algorithms like Grover's and Shor's demonstrated
            potential speedups, this advanced course focuses on algorithms often
            central to current research, particularly those geared towards
            simulation, optimization, and near-term hardware capabilities.
          </p>
          <p>
            These algorithms frequently aim to achieve significant (often
            exponential or quadratic) performance advantages over the best known
            classical algorithms for particular tasks, pushing the boundaries of
            what's computationally feasible.
          </p>
        </section>

        {/* What Makes Them Special? */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Search className="mr-3 h-7 w-7 text-pink-400" /> 🔍 What Makes
            Quantum Algorithms Special?
          </h2>
          <p className="mb-4 text-gray-400">
            Quantum algorithms operate under a fundamentally different paradigm
            compared to classical computation:
          </p>
          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-pink-300">
                <tr>
                  <th className="border border-gray-700 px-4 py-2">
                    Classical Thinking / Approach
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Quantum Thinking / Mechanism
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850 text-sm">
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Process one possibility or path at a time (or limited
                    parallel paths).
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <strong className="text-cyan-300">Superposition:</strong>{" "}
                    Explore an exponential number of states/paths
                    simultaneously.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Follows deterministic, logical steps based on input bits.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <strong className="text-pink-300">Interference:</strong>{" "}
                    Manipulate probability amplitudes so that incorrect paths
                    cancel out and correct paths reinforce, leading to a high
                    probability of the desired outcome upon measurement.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Speedup often achieved through repetition or clever data
                    structures.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <strong className="text-yellow-300">
                      Amplitude Amplification:
                    </strong>{" "}
                    Iteratively increase the amplitude (probability) of desired
                    states (e.g., in Grover's algorithm).
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Randomness is often treated as noise or used for sampling.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <strong className="text-purple-300">Entanglement:</strong>{" "}
                    Create non-classical correlations between qubits that can
                    reveal hidden structures or enable distributed computations
                    impossible classically.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Advanced Algorithms */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Zap className="mr-3 h-7 w-7 text-yellow-400" /> ⚡️ Key Advanced
            Quantum Algorithms
          </h2>
          <p className="mb-6 text-gray-400">
            This course explores several influential algorithms beyond the
            introductory examples:
          </p>
          <div className="space-y-6">
            <AlgorithmCard
              name="1. Quantum Phase Estimation (QPE)"
              icon={<Sigma className="text-cyan-400" />}
              description="A fundamental subroutine used to estimate the eigenvalue (often represented as a phase) of an eigenvector of a given unitary operator."
              applications={[
                "Core component of Shor's Algorithm",
                "Quantum chemistry simulations (finding energy levels)",
                "Hamiltonian modeling",
                "Input to other algorithms like HHL",
              ]}
            />
            <AlgorithmCard
              name="2. HHL Algorithm (Harrow–Hassidim–Lloyd)"
              icon={<BarChartHorizontalBig className="text-lime-400" />}
              description="Provides a potential exponential speedup for solving systems of linear equations (Ax = b), under specific conditions (sparse matrix A, efficient state preparation)."
              applications={[
                "Quantum machine learning (certain models)",
                "Network analysis",
                "Data fitting problems",
                "Computational fluid dynamics (potential)",
              ]}
              note="Practical application often limited by data loading and result extraction."
            />
            <AlgorithmCard
              name="3. Quantum Approximate Optimization Algorithm (QAOA)"
              icon={<GitBranch className="text-orange-400" />}
              description="A hybrid quantum-classical variational algorithm designed to find approximate solutions to combinatorial optimization problems."
              applications={[
                "Max-Cut problem on graphs",
                "Traveling Salesperson Problem (TSP) variants",
                "Scheduling and logistics",
                "Portfolio optimization in finance",
              ]}
              note="Well-suited for NISQ devices, performance depends heavily on parameter tuning."
            />
            <AlgorithmCard
              name="4. Variational Quantum Eigensolver (VQE)"
              icon={<FlaskConical className="text-red-400" />}
              description="Another hybrid algorithm primarily used to find the lowest energy state (ground state) of a given Hamiltonian (a system's energy operator)."
              applications={[
                "Quantum chemistry (calculating molecular ground state energies)",
                "Materials science simulations",
                "Optimization problems mapped to Hamiltonians",
              ]}
              note="Relies on classical optimizers to train a parameterized quantum circuit (ansatz)."
            />
            <AlgorithmCard
              name="5. Quantum Walks"
              icon={<Network className="text-blue-400" />}
              description="The quantum mechanical analogue of classical random walks. Interference allows quantum walks to spread faster and explore graphs differently."
              applications={[
                "Search algorithms on graphs (can provide speedups over classical)",
                "Element distinctness problem",
                "Graph isomorphism testing (potential)",
                "Modeling transport phenomena in quantum systems",
              ]}
            />
            <AlgorithmCard
              name="6. Quantum Principal Component Analysis (QPCA)"
              icon={<Microscope className="text-indigo-400" />}
              description="A quantum version of PCA, a classical technique for dimensionality reduction, designed to work on quantum states (density matrices)."
              applications={[
                "Quantum machine learning (feature extraction from quantum data)",
                "Quantum state tomography (characterizing quantum states)",
                "Identifying correlations in quantum datasets",
              ]}
            />
            <AlgorithmCard
              name="7. Hamiltonian Simulation Algorithms"
              icon={<Cpu className="text-teal-400" />}
              description="Algorithms designed to simulate the time evolution of a quantum system governed by a specific Hamiltonian (H). Crucial for understanding physics and chemistry."
              applications={[
                "Simulating molecular dynamics",
                "Materials science research",
                "Condensed matter physics",
                "High-energy physics simulations",
              ]}
              note="Includes various techniques like Trotterization, LCU, QDrift, each with different trade-offs."
            />
          </div>
        </section>

        {/* Building Blocks */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Cpu className="mr-3 h-7 w-7 text-gray-400" /> 🧱 Building Blocks
            Behind the Scenes
          </h2>
          <p className="mb-4 text-gray-400">
            Many advanced algorithms rely on powerful quantum subroutines:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-gray-300">
                <tr>
                  <th className="border border-gray-700 px-4 py-2">
                    Building Block
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Purpose & Role
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Used In (Examples)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850 text-sm">
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold flex items-center">
                    <Waves className="inline h-4 w-4 mr-2 text-cyan-400" />
                    Quantum Fourier Transform (QFT)
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Quantum analogue of the classical DFT. Efficiently
                    transforms between computational basis and Fourier basis.
                    Key for phase/frequency analysis.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    QPE, Shor's Algorithm, Period Finding.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold flex items-center">
                    <Zap className="inline h-4 w-4 mr-2 text-yellow-400" />
                    Amplitude Amplification
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    A general technique to increase the probability amplitude of
                    desired quantum states, often providing quadratic speedup.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Grover's Algorithm, Amplitude Estimation.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2 font-semibold flex items-center">
                    <Network className="inline h-4 w-4 mr-2 text-pink-400" />
                    Entanglement & Interference
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Fundamental quantum resources. Entanglement creates
                    correlations; interference selectively cancels/enhances
                    amplitudes to highlight solutions.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Virtually all non-trivial quantum algorithms.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tools Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Code className="mr-3 h-7 w-7 text-lime-400" /> 🧰 Tools and
            Frameworks
          </h2>
          <p className="mb-4 text-gray-400">
            Software toolkits provide implementations and interfaces for these
            algorithms:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToolkitItem
              name="Qiskit (IBM)"
              features="Comprehensive suite including VQE, QAOA, QPE, QFT modules, transpilation, hardware access."
            />
            <ToolkitItem
              name="Cirq (Google)"
              features="Focuses on NISQ algorithms, allows custom gate definitions, good for research workflows."
            />
            <ToolkitItem
              name="PennyLane (Xanadu)"
              features="Excellent for QML and hybrid algorithms, integrates with ML frameworks (PyTorch, TensorFlow)."
            />
            <ToolkitItem
              name="Ocean SDK (D-Wave)"
              features="Specifically for D-Wave's quantum annealers, focused on QUBO problems and optimization (relevant to QAOA principles)."
            />
            {/* Add others if needed */}
          </div>
        </section>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: ~4 Lessons | Difficulty: Advanced | Prerequisites:
          Intermediate Courses (Especially Circuits, Algorithms), Strong Linear
          Algebra Recommended
        </p>
      </div>
    </div>
  );
}

// Helper component for Algorithm Cards
const AlgorithmCard = ({
  name,
  icon,
  description,
  applications,
  note,
}: {
  name: string;
  icon: React.ReactNode;
  description: string;
  applications: string[];
  note?: string;
}) => (
  <div className="p-4 bg-gray-900/50 rounded border border-gray-600 hover:border-yellow-500/50 transition-colors duration-200">
    <div className="flex items-center mb-2">
      <span className="mr-3">{icon}</span>
      <h3 className="text-xl font-semibold text-gray-100">{name}</h3>
    </div>
    <p className="text-sm text-gray-400 mb-2 pl-10">{description}</p>
    <div className="pl-10">
      <p className="text-xs font-semibold text-gray-300 mb-1">
        Key Applications:
      </p>
      <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-400">
        {applications.map((app, index) => (
          <li key={index}>{app}</li>
        ))}
      </ul>
      {note && <p className="text-xs italic text-yellow-300/80 mt-2">{note}</p>}
    </div>
  </div>
);

// Helper component for Toolkit Items
const ToolkitItem = ({
  name,
  features,
}: {
  name: string;
  features: string;
}) => (
  <div className="bg-gray-900 p-3 rounded border border-gray-600">
    <h4 className="font-semibold text-lime-300 mb-1">{name}</h4>
    <p className="text-xs text-gray-400">{features}</p>
  </div>
);
