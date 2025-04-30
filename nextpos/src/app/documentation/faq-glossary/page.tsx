import Head from 'next/head';
import { HelpCircle, BookOpen } from 'lucide-react'; // Example icons

export default function FaqGlossaryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>FAQ & Glossary | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <HelpCircle className="h-8 w-8 mr-3 text-red-400" />
        <h1 className="text-3xl font-bold text-gray-100">FAQ & Glossary</h1>
      </div>

      <p className="text-lg text-gray-400 mb-12">
        Find answers to frequently asked questions about the Superpos platform and definitions of common quantum computing terms.
      </p>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-b border-gray-700 pb-2">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-6">
          <FAQItem question="What is Superpos?">
            Superpos is a free, web-based interactive platform designed for learning and simulating quantum circuits. It aims to make quantum computing education accessible through visual tools, simulations, courses, and news.
          </FAQItem>
          <FAQItem question="Who is Superpos for?">
            It's designed for students, educators, researchers, and anyone interested in learning about or experimenting with quantum computing concepts.
          </FAQItem>
           <FAQItem question="Is Superpos free to use?">
            Yes, Superpos is intended to be a free educational resource.
          </FAQItem>
           <FAQItem question="What quantum simulator does Superpos use?">
            The backend primarily uses Google's Cirq library for quantum circuit simulation.
          </FAQItem>
           <FAQItem question="How many qubits can I simulate?">
            The circuit builder currently supports up to 10 qubits. Simulating significantly more qubits becomes computationally intensive for classical simulators.
          </FAQItem>
           <FAQItem question="What gates are available in the Circuit Builder?">
            A range of common single-qubit (H, X, Y, Z, S, T, RZ, RX, RY) and multi-qubit gates (CNOT, SWAP, CZ, CY, CRZ, CCX) plus measurement are available. See the Circuit Builder documentation for a full list.
          </FAQItem>
           <FAQItem question="Can I save my circuits?">
            [Answer depends on implementation] Currently, saving/loading circuits may not be fully implemented, but the generated JSON can be copied manually. Future versions may include save/load functionality.
          </FAQItem>
           <FAQItem question="What are the system requirements?">
            As a web-based platform, a modern browser (Chrome, Firefox, Edge, Safari) and a stable internet connection are required. For optimal performance, especially with complex visualizations, a reasonably modern computer (e.g., Intel i5/equivalent or higher, 8GB+ RAM) is recommended. See the full requirements in the Tech Stack documentation.
          </FAQItem>
           <FAQItem question="How does the Quantum Chatbot work?">
            The chatbot uses Google's Gemini AI API to understand your questions and provide explanations related to quantum concepts and using the Superpos platform.
          </FAQItem>
            {/* Add more relevant FAQs */}
        </div>
      </section>

      {/* Glossary Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-b border-gray-700 pb-2 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-red-400"/> Glossary of Quantum Terms
        </h2>
        <div className="space-y-4">
           <GlossaryItem term="Qubit (Quantum Bit)">
                The basic unit of quantum information. Unlike a classical bit (0 or 1), a qubit can be 0, 1, or a superposition of both states. Often represented as |ψ⟩ = α|0⟩ + β|1⟩.
           </GlossaryItem>
            <GlossaryItem term="Superposition">
                A fundamental principle of quantum mechanics where a quantum system (like a qubit) can exist in a combination of multiple states simultaneously until it is measured.
           </GlossaryItem>
            <GlossaryItem term="Entanglement">
                A quantum mechanical phenomenon where two or more qubits become linked in such a way that they share the same fate, even when separated by large distances. Measuring one entangled qubit instantaneously influences the state of the other(s).
           </GlossaryItem>
            <GlossaryItem term="Quantum Gate">
                 An operation that acts on one or more qubits to change their quantum state. Quantum gates are the building blocks of quantum circuits and are represented by unitary matrices. Examples: Hadamard (H), Pauli-X, CNOT.
           </GlossaryItem>
            <GlossaryItem term="Measurement">
                The process of observing a quantum system to extract classical information. Measurement causes the quantum state (superposition/entanglement) to collapse into one of its basis states with a certain probability.
           </GlossaryItem>
            <GlossaryItem term="Decoherence">
                 The loss of quantum properties (like superposition and entanglement) in a qubit due to its interaction with the surrounding environment (noise). This is a major challenge in building quantum computers.
           </GlossaryItem>
            <GlossaryItem term="Quantum Circuit">
                A sequence of quantum gates applied to a set of qubits, representing the steps of a quantum computation. Often visualized with horizontal lines for qubits and symbols for gates.
            </GlossaryItem>
            <GlossaryItem term="State Vector">
                A mathematical representation (vector) describing the complete quantum state of a system. For n qubits, it's a vector of 2^n complex numbers (amplitudes).
            </GlossaryItem>
            <GlossaryItem term="Amplitude (Probability Amplitude)">
                 A complex number associated with each basis state in a superposition. The square of its magnitude gives the probability of measuring the system in that basis state.
            </GlossaryItem>
            <GlossaryItem term="Cirq">
                An open-source Python framework developed by Google for writing, manipulating, and optimizing quantum circuits and running them on simulators or quantum hardware. Used as the backend simulation engine in Superpos.
            </GlossaryItem>
             <GlossaryItem term="Quantum Error Correction (QEC)">
                 Techniques used to protect quantum information from errors caused by decoherence and imperfect operations, often by encoding logical qubits into multiple physical qubits.
           </GlossaryItem>
             <GlossaryItem term="Shor's Algorithm">
                 A quantum algorithm known for its ability to factor large integers efficiently, posing a threat to classical encryption methods like RSA.
           </GlossaryItem>
             <GlossaryItem term="Grover's Algorithm">
                 A quantum algorithm providing a quadratic speedup for searching unsorted databases compared to classical algorithms.
           </GlossaryItem>
            {/* Add more relevant terms */}
        </div>
      </section>
    </div>
  );
}

// Helper Components for FAQ/Glossary
const FAQItem = ({ question, children }: { question: string, children: React.ReactNode }) => (
    <div className="p-3 bg-gray-800/40 rounded border border-gray-700">
        <h3 className="font-semibold text-gray-100 mb-1">{question}</h3>
        <p className="text-sm text-gray-400">{children}</p>
    </div>
);

const GlossaryItem = ({ term, children }: { term: string, children: React.ReactNode }) => (
     <div className="p-3 bg-gray-800/40 rounded border border-gray-700">
        <h3 className="font-semibold text-gray-100 mb-1">{term}</h3>
        <p className="text-sm text-gray-400">{children}</p>
    </div>
);