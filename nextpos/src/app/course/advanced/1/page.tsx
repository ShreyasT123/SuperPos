import React from "react";
import Head from "next/head";
// Import relevant icons if needed
import {
  BrainCircuit,
  Cpu,
  Dna,
  Link as LinkIcon,
  Settings,
  AlertTriangle,
  Wrench,
  RocketIcon,
} from "lucide-react"; // Example icons


export default function QuantumMachineLearningPage() {
  return (
    // Using dark theme consistent with previous examples
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>
          🧠 Course 7: Advanced – Quantum Machine Learning (QML) | Quantum
          Course
        </title>
        <meta
          name="description"
          content="Explore the intersection of quantum computing and machine learning (QML), including concepts like VQCs, quantum kernels, hybrid algorithms, and potential applications."
        />
      </Head>
      {/* Gradient Title - Using Red/Orange */}
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
        🧠 Course 7: Advanced – Quantum Machine Learning (QML)
      </h1>
      {/* Intro Quote */}
      <p className="text-center italic text-lg text-gray-400 mb-10">
        "Where quantum computing meets artificial intelligence to redefine what
        machines can learn."
      </p>
      {/* Main Content Area */}
      <div className="space-y-10">
        {/* Video Section (Placeholder) */}

        {/* What is QML Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <BrainCircuit className="mr-3 h-7 w-7 text-red-400" /> 🤖 What is
            Quantum Machine Learning?
          </h2>
          <p className="mb-3">
            Quantum Machine Learning (QML) represents the exciting fusion of two
            cutting-edge fields:{" "}
            <strong className="text-cyan-400">quantum computing</strong> and{" "}
            <strong className="text-purple-400">machine learning</strong>. It's
            an interdisciplinary area investigating how quantum mechanical
            principles like superposition, entanglement, and interference can be
            leveraged to potentially accelerate, enhance, or even completely
            transform machine learning algorithms.
          </p>
          <p className="font-semibold text-gray-100 mb-2">
            The primary goals are to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4 mb-4 text-gray-400">
            <li>
              Harness quantum systems to process vast and complex datasets more
              efficiently than classical computers.
            </li>
            <li>
              Develop algorithms capable of solving high-dimensional problems
              often encountered in ML.
            </li>
            <li>
              Discover patterns or correlations in data that might be
              undetectable by classical algorithms alone.
            </li>
          </ul>
          <p className="italic text-gray-500">
            Essentially, QML aims to use the unique properties of quantum
            mechanics as a new computational resource for artificial
            intelligence tasks.
          </p>
        </section>

        {/* Why Quantum for ML Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Dna className="mr-3 h-7 w-7 text-orange-400" /> 🧬 Why Quantum for
            Machine Learning?
          </h2>
          <p className="mb-4">
            Quantum computing offers potential advantages for specific
            challenges faced by classical machine learning:
          </p>
          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-orange-300">
                <tr>
                  <th className="border border-gray-700 px-4 py-2">
                    Classical ML Challenge
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Potential Quantum Advantage
                  </th>
                  <th className="border border-gray-700 px-4 py-2">
                    Quantum Mechanism
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-850 text-sm">
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Processing High-Dimensional Data (e.g., feature vectors)
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Quantum states naturally exist in exponentially large
                    Hilbert spaces.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <code className="text-green-400">Superposition</code>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Bottlenecks in Linear Algebra (Matrix Operations)
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Quantum algorithms (like HHL, though practical use is
                    debated) can potentially perform certain linear algebra
                    tasks faster.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <code className="text-green-400">Quantum Parallelism</code>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Complex Feature Mapping (Kernel Trick Limitations)
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Quantum kernels can map data to extremely high-dimensional
                    quantum feature spaces, potentially finding non-linear
                    patterns missed by classical kernels.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <code className="text-green-400">
                      Quantum Kernels / Hilbert Space
                    </code>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Optimization & Training Time for Complex Models
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    Quantum optimization algorithms (e.g., QAOA) or subroutines
                    within hybrid models might accelerate training or find
                    better solutions.
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    <code className="text-green-400">
                      Hybrid Algorithms / Interference
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 italic text-gray-400">
            Think of QML not necessarily as a replacement for all classical ML,
            but as a specialized toolbox that leverages quantum phenomena to
            tackle problems that are currently intractable classically.
          </p>
        </section>

        {/* Key Concepts Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Settings className="mr-3 h-7 w-7 text-yellow-400" /> ⚛️ Key
            Concepts in QML
          </h2>
          <div className="space-y-6">
            {/* 1. Quantum Data */}
            <div className="p-4 bg-gray-900/50 rounded border border-gray-600">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                1. Quantum Data & Encoding
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                QML algorithms operate on quantum states. Data needs to be
                encoded into qubits:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-xs text-gray-400">
                <li>
                  <strong className="text-gray-200">
                    Naturally Quantum Data:
                  </strong>{" "}
                  Output from quantum simulations (chemistry, physics).
                </li>
                <li>
                  <strong className="text-gray-200">
                    Classical Data Encoding:
                  </strong>{" "}
                  Techniques to represent classical vectors/features as quantum
                  states:
                  <ul className="list-circle list-inside pl-6 mt-1">
                    <li>
                      <strong className="text-cyan-300">
                        Amplitude Encoding:
                      </strong>{" "}
                      Data values encoded in the amplitudes (
                      <code className="text-green-400">α, β</code>) of the
                      qubits. Very data-dense but can be hard to load.
                    </li>
                    <li>
                      <strong className="text-cyan-300">
                        Angle/Basis Encoding:
                      </strong>{" "}
                      Data values encoded as rotation angles of single-qubit
                      gates. Less dense but often easier to implement.
                    </li>
                    <li>
                      <strong className="text-cyan-300">
                        QSample Encoding:
                      </strong>{" "}
                      Data represented as a probability distribution over basis
                      states.
                    </li>
                    {/* Add others if relevant */}
                  </ul>
                </li>
              </ul>
              <p className="text-xs text-red-400 italic mt-2">
                Efficiently loading large classical datasets onto qubits (the
                "Quantum Data Loading Problem") is a significant bottleneck.
              </p>
            </div>

            {/* 2. VQCs */}
            <div className="p-4 bg-gray-900/50 rounded border border-gray-600">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                2. Variational Quantum Circuits (VQCs)
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                VQCs are a cornerstone of near-term QML. They are quantum
                circuits containing gates whose parameters (e.g., rotation
                angles) can be adjusted.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-xs text-gray-400">
                <li>
                  <strong className="text-gray-200">Parameterized:</strong>{" "}
                  Gates depend on tunable parameters (
                  <code className="text-green-400">θ</code>).
                </li>
                <li>
                  <strong className="text-gray-200">Hybrid Training:</strong> A
                  classical optimizer (like gradient descent) adjusts the
                  parameters (<code className="text-green-400">θ</code>) based
                  on measurements from the quantum circuit to minimize a cost
                  function.
                </li>
                <li>
                  <strong className="text-gray-200">Analogy:</strong> Similar to
                  training classical neural networks, but the "layers" are
                  quantum circuits.
                </li>
                <li>
                  <strong className="text-gray-200">Application:</strong> Used
                  in VQE, QAOA, Quantum Circuit Learning (QCL), and many QNNs.
                </li>
              </ul>
            </div>

            {/* 3. Quantum Kernels */}
            <div className="p-4 bg-gray-900/50 rounded border border-gray-600">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                3. Quantum Kernel Methods
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                Leverages the ability of quantum computers to efficiently
                compute inner products (similarity measures) between data points
                mapped to high-dimensional quantum feature spaces.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-xs text-gray-400">
                <li>
                  <strong className="text-gray-200">Feature Map:</strong> A
                  quantum circuit maps classical data{" "}
                  <code className="text-green-400">x</code> to a quantum state{" "}
                  <code className="text-green-400">|Φ(x)⟩</code> in a Hilbert
                  space.
                </li>
                <li>
                  <strong className="text-gray-200">Kernel Calculation:</strong>{" "}
                  The quantum computer estimates the kernel function{" "}
                  <code className="text-green-400">
                    k(x, x') = |⟨Φ(x)|Φ(x')⟩|²
                  </code>
                  , which measures similarity in the quantum feature space.
                </li>
                <li>
                  <strong className="text-gray-200">Integration:</strong> This
                  quantum-computed kernel matrix is then fed into classical
                  kernel-based algorithms like Support Vector Machines (SVM),
                  leading to Quantum SVM (QSVM).
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Example QNN Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Cpu className="mr-3 h-7 w-7 text-cyan-400" /> 🧠 Example: Quantum
            Neural Network (QNN)
          </h2>
          <p className="mb-3">
            A common QML approach is the hybrid Quantum Neural Network (QNN).
            Imagine replacing some layers of a classical neural network with
            trainable quantum circuits (VQCs).
          </p>
          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            Typical Workflow:
          </h3>
          <ol className="list-decimal list-inside space-y-2 pl-4 mb-4 text-sm text-gray-400 bg-gray-900 p-4 rounded">
            <li>
              <strong className="text-cyan-300">Encode Input Data:</strong>{" "}
              Classical input features (
              <code className="text-green-400">x</code>) are encoded into the
              initial state of qubits (e.g., using angle encoding).
            </li>
            <li>
              <strong className="text-purple-300">Apply Quantum Layers:</strong>{" "}
              The encoded qubits pass through one or more parameterized quantum
              circuits (VQCs) with tunable parameters (
              <code className="text-green-400">θ</code>).
            </li>
            <li>
              <strong className="text-pink-300">Measure Qubits:</strong> Measure
              some or all qubits to obtain classical expectation values or
              probabilities.
            </li>
            <li>
              <strong className="text-orange-300">
                Classical Processing & Cost Function:
              </strong>{" "}
              The measurement results might be post-processed classically and
              used to calculate a cost function (comparing the output to the
              desired target).
            </li>
            <li>
              <strong className="text-yellow-300">Parameter Update:</strong> A
              classical optimizer (e.g., gradient descent variant) calculates
              how to adjust the parameters (
              <code className="text-green-400">θ</code>) of the quantum gates to
              minimize the cost.
            </li>
            <li>
              <strong className="text-gray-300">Repeat:</strong> Steps 2-5 form
              the training loop, iteratively refining the VQC parameters.
            </li>
          </ol>
          <p className="italic text-gray-400">
            The hope is that the quantum layers can efficiently capture complex
            correlations or features in the data that might require very deep or
            wide classical networks.
          </p>
        </section>

        {/* Hybrid Algorithms Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <LinkIcon className="mr-3 h-7 w-7 text-lime-400" /> 🔁 Hybrid
            Quantum-Classical Algorithms
          </h2>
          <p className="mb-4">
            Given the limitations of current Noisy Intermediate-Scale Quantum
            (NISQ) hardware, most practical QML relies on hybrid approaches that
            combine quantum and classical computation:
          </p>
          <ul className="list-disc list-inside space-y-3 pl-4 text-sm">
            <li>
              <strong className="text-lime-300">
                VQE (Variational Quantum Eigensolver):
              </strong>{" "}
              Primarily for finding the ground state energy of molecules
              (quantum chemistry), but the variational principle is widely
              adapted for optimization tasks in ML. Uses a VQC and classical
              optimization.
            </li>
            <li>
              <strong className="text-lime-300">
                QAOA (Quantum Approximate Optimization Algorithm):
              </strong>{" "}
              Designed for finding approximate solutions to combinatorial
              optimization problems, which frequently appear in ML (e.g.,
              feature selection, clustering). Also uses a specific type of VQC.
            </li>
            <li>
              <strong className="text-lime-300">
                QCL (Quantum Circuit Learning):
              </strong>{" "}
              A general framework where VQCs are trained to learn specific
              functions or data distributions. QNNs often fall under this
              category.
            </li>
          </ul>
          <p className="mt-3 italic text-gray-400">
            These algorithms leverage the quantum computer for parts of the task
            where it might excel (like exploring complex state spaces) while
            relying on classical computers for parameter optimization and
            control.
          </p>
        </section>

        {/* Use Cases Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <RocketIcon className="mr-3 h-7 w-7 text-blue-400" /> 🚀 Potential
            Use Cases of QML
          </h2>
          <p className="mb-4">
            While many applications are still exploratory, QML shows potential
            in areas involving complex data or optimization:
          </p>
          {/* Using a grid for better layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <UseCaseItem
              field="Drug Discovery & Materials Science"
              application="Accelerate learning of molecular properties, simulate complex interactions, predict material characteristics."
            />
            <UseCaseItem
              field="Finance"
              application="Portfolio optimization, risk analysis, fraud detection, potentially faster derivative pricing."
            />
            <UseCaseItem
              field="Cybersecurity"
              application="Learning attack patterns, potentially analyzing quantum communication data, developing quantum-resistant ML."
            />
            <UseCaseItem
              field="Climate Modeling & Earth Science"
              application="Faster pattern recognition in large climate datasets, optimizing environmental models."
            />
            <UseCaseItem
              field="Natural Language Processing (NLP)"
              application="Potentially enhanced semantic analysis or search using quantum kernels."
            />
            <UseCaseItem
              field="Optimization Problems"
              application="Solving complex logistics, scheduling, or resource allocation problems relevant to various industries."
            />
          </div>
          <p className="mt-4 text-xs text-red-400 italic">
            Note: Significant quantum advantage for most real-world, large-scale
            ML tasks has yet to be conclusively demonstrated on current
            hardware.
          </p>
        </section>

        {/* Challenges Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-red-500/50">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-red-700 pb-2 flex items-center">
            <AlertTriangle className="mr-3 h-7 w-7 text-red-400" /> 📉
            Challenges and Limitations
          </h2>
          <p className="mb-4 text-gray-400">
            Despite the excitement, QML faces significant hurdles:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4 text-sm text-red-200/80">
            <li>
              <strong className="text-red-300">
                Quantum Data Loading Bottleneck:
              </strong>{" "}
              Efficiently encoding large classical datasets into quantum states
              remains a major challenge.
            </li>
            <li>
              <strong className="text-red-300">
                Hardware Noise & Decoherence:
              </strong>{" "}
              Errors in current NISQ devices severely limit the depth and width
              of trainable quantum circuits.
            </li>
            <li>
              <strong className="text-red-300">Barren Plateaus:</strong> In some
              VQC landscapes, gradients can vanish exponentially with the number
              of qubits, making training extremely difficult.
            </li>
            <li>
              <strong className="text-red-300">Hybrid Loop Overhead:</strong>{" "}
              Repeatedly passing information between quantum (QPU) and classical
              (CPU/GPU) processors for optimization can be slow and negate
              potential speedups.
            </li>
            <li>
              <strong className="text-red-300">
                Lack of Proven Advantage:
              </strong>{" "}
              While theoretical speedups exist for certain subroutines,
              demonstrating practical, end-to-end quantum advantage over
              state-of-the-art classical ML for real-world problems is still an
              active area of research.
            </li>
          </ul>
          <p className="mt-4 italic text-gray-400">
            Progress is rapid, but overcoming these obstacles is crucial for QML
            to realize its full potential. Hybrid approaches are the most
            promising path in the near term.
          </p>
        </section>

        {/* Toolkits Section */}
        <section className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2 flex items-center">
            <Wrench className="mr-3 h-7 w-7 text-teal-400" /> 🛠️ Toolkits for
            QML
          </h2>
          <p className="mb-4 text-gray-400">
            Several software libraries facilitate development in QML:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ToolkitItem
              name="PennyLane (Xanadu)"
              description="Popular framework focusing on quantum differentiable programming, integrating well with PyTorch, TensorFlow."
            />
            <ToolkitItem
              name="TensorFlow Quantum (TFQ - Google)"
              description="Integrates Cirq with TensorFlow for building hybrid quantum-classical models."
            />
            <ToolkitItem
              name="Qiskit Machine Learning (IBM)"
              description="Provides QML algorithms and tools within the broader Qiskit ecosystem."
            />
            <ToolkitItem
              name="Cirq + OpenFermion (Google)"
              description="Cirq for circuits, OpenFermion for mapping chemistry/physics problems often relevant to VQCs."
            />
            {/* Add others if needed */}
          </div>
        </section>
      </div>{" "}
      {/* End Main Content Area */}
      {/* Footer/Metadata */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-400 italic text-sm">
          Estimated Duration: ~3 Lessons | Difficulty: Advanced | Prerequisites:
          Intermediate Courses (Algorithms, Circuits), Basic ML Knowledge
          Recommended
        </p>
      </div>
    </div>
  );
}

// Helper component for Use Case Items
const UseCaseItem = ({
  field,
  application,
}: {
  field: string;
  application: string;
}) => (
  <div className="bg-gray-900 p-3 rounded border border-gray-700">
    <h4 className="font-semibold text-blue-300 mb-1">{field}</h4>
    <p className="text-xs text-gray-400">{application}</p>
  </div>
);

// Helper component for Toolkit Items
const ToolkitItem = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div className="bg-gray-900 p-3 rounded border border-gray-700">
    <h4 className="font-semibold text-teal-300 mb-1">{name}</h4>
    <p className="text-xs text-gray-400">{description}</p>
  </div>
);
