import Head from 'next/head';
import { CircuitBoard, MousePointerClick, Settings, Play, FileJson, ZoomIn } from 'lucide-react'; // Example icons
import Link from 'next/link';

export default function CircuitBuilderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>Circuit Builder Tutorial | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <CircuitBoard className="h-8 w-8 mr-3 text-lime-400" />
        <h1 className="text-3xl font-bold text-gray-100">Using the Quantum Circuit Builder</h1>
      </div>

      <p className="text-lg text-gray-400 mb-8">
        The Superpos Circuit Builder provides an intuitive drag-and-drop interface to design, simulate, and visualize quantum circuits. This guide will walk you through its core functionalities.
      </p>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Interface Layout</h2>
      <p className="mb-6">The builder is typically divided into these main areas:</p>
      <ul className="list-disc list-inside space-y-2 mb-8 pl-4">
        <li><strong className="text-gray-200">Gate Toolbar:</strong> Contains available quantum gates (H, X, Z, CNOT, CCX, SWAP, custom gates, etc.).</li>
        <li><strong className="text-gray-200">Circuit Canvas:</strong> The main area where you drag gates onto qubit wires across different time steps (columns).</li>
        <li><strong className="text-gray-200">Configuration Panel:</strong> Options to set the number of qubits and simulation steps/depth.</li>
        <li><strong className="text-gray-200">Output/Visualization Panel:</strong> Displays simulation results like the state vector, probabilities, and visualizations after running the simulation.</li>
      </ul>

       <h2 className="text-2xl font-semibold text-gray-100 mb-4">Building Your First Circuit</h2>
       <div className="space-y-4">
           <Step icon={<Settings size={18}/>} title="1. Configure Qubits & Steps"> Use the configuration panel to set the desired number of qubits (e.g., 2) and steps (e.g., 4).</Step>
           <Step icon={<MousePointerClick size={18}/>} title="2. Add Gates"> Drag gates from the toolbar onto the desired qubit wire at the specific time step on the canvas. For multi-qubit gates like CNOT, drag the control part first, then connect the target.</Step>
           <Step icon={<Play size={18}/>} title="3. Run Simulation"> Once your circuit is designed, click the 'Run Simulation' or 'Simulate' button.</Step>
           <Step icon={<FileJson size={18}/>} title="4. Interpret Results"> Examine the Output Panel. Check the State Vector table (State, Magnitude, Phase, Probability), view the Probability Histogram, and explore the 2D/3D circuit visualizations.</Step>
           <Step icon={<ZoomIn size={18}/>} title="5. Explore & Iterate"> Modify the circuit by adding/removing/moving gates and re-run the simulation to observe how the quantum state evolves.</Step>
       </div>

       <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">Available Gates</h2>
       <p className="mb-4">Superpos supports a range of standard quantum gates, including:</p>
       {/* Ideally, list gates with brief descriptions or link to a separate gate reference */}
       <ul className="list-disc list-inside space-y-1 pl-4 mb-6">
           <li>Single-Qubit Gates: Hadamard (H), Pauli-X, Pauli-Y, Pauli-Z, S, T, Rotation Gates (RX, RY, RZ)...</li>
           <li>Multi-Qubit Gates: CNOT, SWAP, CZ, CY, Controlled Rotations (CRZ), Toffoli (CCX)...</li>
           <li>Measurement Gate</li>
       </ul>

       <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">Advanced Features (Optional)</h2>
       <ul className="list-disc list-inside space-y-1 pl-4">
        <li>Viewing the generated JSON representation of the circuit.</li>
        <li>Saving/Loading circuit designs (if implemented).</li>
        <li>Using the 3D visualization controls (rotate, zoom).</li>
       </ul>

        <p className="mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">
            Need more help? Try asking the <Link href="/docs/chatbot" className="text-cyan-400 hover:underline">Quantum Chatbot</Link> or check the <Link href="/docs/faq-glossary" className="text-cyan-400 hover:underline">FAQ</Link>.
        </p>
    </div>
  );
}

// Helper for steps
const Step = ({icon, title, children}: {icon: React.ReactNode, title: string, children: React.ReactNode}) => (
    <div className="flex items-start p-3 bg-gray-800/50 rounded border border-gray-700">
        <span className="mr-3 text-lime-400 mt-1">{icon}</span>
        <div>
            <h3 className="font-semibold text-gray-100">{title}</h3>
            <p className="text-sm text-gray-400">{children}</p>
        </div>
    </div>
);