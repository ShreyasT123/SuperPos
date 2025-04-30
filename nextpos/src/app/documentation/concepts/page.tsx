import Head from 'next/head';
import { Book, Atom, Link2, Binary, Waves, HelpCircle, CircuitBoard, ShieldCheck, Cpu } from 'lucide-react'; // Example icons
import Link from 'next/link';

export default function ConceptsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>Quantum Concepts | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <Book className="h-8 w-8 mr-3 text-purple-400" />
        <h1 className="text-3xl font-bold text-gray-100">Core Quantum Computing Concepts</h1>
      </div>

      <p className="text-lg text-gray-400 mb-8">
        Understanding the fundamental principles of quantum mechanics is crucial for effectively using the Superpos platform and comprehending quantum computation. This section provides explanations of key concepts.
      </p>

      <div className="space-y-6">
         <ConceptCard
            icon={<Atom size={20} />}
            title="Qubits: The Quantum Bit"
            description="Unlike classical bits (0 or 1), qubits can exist in a state of 0, 1, or a superposition of both simultaneously. Learn about their mathematical representation (|ψ⟩ = α|0⟩ + β|1⟩) and the Bloch sphere visualization."
            link="/docs/concepts/qubits" // Link to a dedicated page if needed
        />
         <ConceptCard
            icon={<Waves size={20} />}
            title="Superposition"
            description="The counter-intuitive ability of a quantum system (like a qubit) to be in multiple states at the same time until measured. Explore analogies and its role in quantum parallelism."
            link="/docs/concepts/superposition"
        />
        <ConceptCard
            icon={<Link2 size={20} />}
            title="Entanglement"
            description="The 'spooky action at a distance' where multiple qubits become linked, sharing the same fate regardless of the distance separating them. Understand Bell states and its importance for algorithms and communication."
             link="/docs/concepts/entanglement"
        />
         <ConceptCard
            icon={<CircuitBoard size={20} />}
            title="Quantum Gates"
            description="The building blocks of quantum circuits. Learn about common single-qubit gates (Hadamard, Pauli X/Y/Z, Phase gates) and multi-qubit gates (CNOT, SWAP, Toffoli) and their effects on qubits."
            link="/docs/concepts/gates"
        />
         <ConceptCard
            icon={<Binary size={20} />}
            title="Measurement"
            description="The process of extracting classical information from a quantum state. Understand how measurement collapses superposition and the probabilistic nature of quantum outcomes."
            link="/docs/concepts/measurement"
        />
         <ConceptCard
            icon={<ShieldCheck size={20} />}
            title="Decoherence & Quantum Errors"
            description="Why quantum states are fragile. Learn about noise sources and how errors (bit flips, phase flips) differ from classical errors, motivating the need for Quantum Error Correction."
            link="/docs/concepts/errors-decoherence"
        />
         <ConceptCard
            icon={<Cpu size={20} />}
            title="Introduction to Quantum Algorithms"
            description="Brief overview of how algorithms like Grover's (search) and Shor's (factoring) leverage quantum phenomena to potentially outperform classical algorithms."
            link="/docs/concepts/algorithms-intro"
        />
      </div>

       <p className="mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">
            These concepts are explored in more detail within the <Link href="/courses" className="text-cyan-400 hover:underline">Courses</Link> section. For definitions, see the <Link href="/docs/faq-glossary" className="text-cyan-400 hover:underline">Glossary</Link>.
       </p>

    </div>
  );
}

// Helper for Concept Cards
const ConceptCard = ({icon, title, description}: {icon: React.ReactNode, title: string, description: string, link?: string}) => (
    <div className="p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-purple-500/50 transition-colors duration-300">
        <div className="flex items-center mb-2">
            <span className="mr-3 text-purple-400">{icon}</span>
            <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm ml-8">{description}</p>
         {/* Optional link can be added here if needed */}
         {/* {link && <Link href={link} className="...">Learn More</Link>} */}
    </div>
);