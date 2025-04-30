import Head from 'next/head';
import { BarChart3, Orbit, FileText, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function VisualizationPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>Visualization Tools | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <BarChart3 className="h-8 w-8 mr-3 text-lime-400" />
        <h1 className="text-3xl font-bold text-gray-100">Understanding Simulation Visualizations</h1>
      </div>

      <p className="text-lg text-gray-400 mb-8">
        Visualizing the results of quantum simulations is key to understanding the behavior of quantum circuits. Superpos provides several interactive tools to help you interpret the output data.
      </p>

      {/* State Vector */}
      <section id="state-vector" className="mb-10 p-6 bg-gray-800/50 rounded border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
            <FileText size={22} className="mr-2 text-lime-300"/> State Vector Table
        </h2>
        <p className="mb-4 text-gray-400">
            This table provides the raw mathematical description of the quantum system's state *before* any measurement collapses it. It lists all possible computational basis states and their associated complex amplitudes.
        </p>
        <h3 className="font-semibold text-gray-200 mb-2">Columns Explained:</h3>
        <ul className="list-disc list-inside space-y-1 pl-4 text-sm mb-4">
            <li><strong className="text-gray-100">State:</strong> The basis state label (e.g., <code className="bg-gray-700 px-1 rounded text-green-300">|00⟩</code>, <code className="bg-gray-700 px-1 rounded text-green-300">|01⟩</code>, <code className="bg-gray-700 px-1 rounded text-green-300">|10⟩</code>, <code className="bg-gray-700 px-1 rounded text-green-300">|11⟩</code> for a 2-qubit system).</li>
            <li><strong className="text-gray-100">Amplitude:</strong> The complex number (<code className="bg-gray-700 px-1 rounded text-green-300">α</code> or <code className="bg-gray-700 px-1 rounded text-green-300">β</code>...) associated with that state. It encodes both magnitude and phase.</li>
            <li><strong className="text-gray-100">Magnitude:</strong> The absolute value of the amplitude (<code className="bg-gray-700 px-1 rounded text-green-300">|α|</code>). Represents the "size" or "weight" of that state in the superposition.</li>
            <li><strong className="text-gray-100">Phase:</strong> The angle of the complex amplitude in the complex plane (often shown in radians or degrees). Crucial for interference effects.</li>
            <li><strong className="text-gray-100">Probability:</strong> The probability (<code className="bg-gray-700 px-1 rounded text-green-300">|α|²</code>) of measuring the system and finding it in that specific basis state. Probabilities for all states sum to 1.</li>
        </ul>
         <p className="text-xs text-gray-500 italic">Focus on how amplitudes (magnitude and phase) change as you modify the circuit.</p>
      </section>

      {/* 2D Plots */}
       <section id="histogram" className="mb-10 p-6 bg-gray-800/50 rounded border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
            <BarChart3 size={22} className="mr-2 text-lime-300"/> 2D Visualizations (Plotly.js)
        </h2>
        <p className="mb-4 text-gray-400">
            Superpos uses Plotly.js to generate interactive 2D plots for easier interpretation of probabilities and phases.
        </p>
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold text-gray-200 mb-1">Probability Histogram</h3>
                <p className="text-sm text-gray-400">Visualizes the measurement outcome probabilities calculated from the state vector amplitudes. Each bar represents a basis state (e.g., '00', '01'), and its height indicates the probability of measuring that outcome. Useful for quickly seeing the most likely results.</p>
            </div>
             <div id="other-plots">
                <h3 className="font-semibold text-gray-200 mb-1">State Phase Plot (Polar Plot)</h3>
                <p className="text-sm text-gray-400">Represents each basis state as a point on a polar chart. The distance from the center typically indicates the magnitude (or probability), and the angle represents the phase. This helps visualize the relative phases between different components of the superposition, which is crucial for understanding interference.</p>
            </div>
            {/* Add other Plotly plots if implemented */}
        </div>
         <p className="text-xs text-gray-500 italic mt-4">Hover over plot elements (bars, points) to often see exact values.</p>
      </section>

      {/* 3D View */}
       <section id="3d-view" className="p-6 bg-gray-800/50 rounded border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center">
            <Orbit size={22} className="mr-2 text-lime-300"/> 3D Circuit Visualization (Three.js)
        </h2>
        <p className="mb-4 text-gray-400">
            To help understand the structure of more complex circuits, especially those with many qubits or steps, Superpos provides an interactive 3D view rendered using Three.js.
        </p>
         <h3 className="font-semibold text-gray-200 mb-2">Features:</h3>
        <ul className="list-disc list-inside space-y-1 pl-4 text-sm mb-4">
             <li><strong className="text-gray-100">Rotation:</strong> Click and drag to rotate the circuit view around different axes.</li>
             <li><strong className="text-gray-100">Zooming:</strong> Use the mouse wheel or pinch gestures to zoom in and out for detailed inspection or overall view.</li>
             <li><strong className="text-gray-100">Panning:</strong> Usually involves right-click dragging or specific key combinations to move the view horizontally and vertically.</li>
        </ul>
        <p className="text-xs text-gray-500 italic">This view primarily shows the circuit layout (qubits, gates, connections) rather than the quantum state itself.</p>
      </section>

       <p className="mt-10 border-t border-gray-700 pt-4 text-gray-400 text-sm">
           Understanding these visualizations is key to debugging circuits and analyzing algorithm behavior. Refer to the <Link href="/docs/simulation-guide" className="text-cyan-400 hover:underline">Simulation Guide</Link> for how these results are generated.
       </p>

    </div>
  );
}