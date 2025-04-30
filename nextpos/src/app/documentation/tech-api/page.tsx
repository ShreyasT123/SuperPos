import Head from 'next/head';
import { Code, Layers3, Server, BrainCircuit, Database } from 'lucide-react'; // Example icons

export default function TechApiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>Technology Stack & API | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <Code className="h-8 w-8 mr-3 text-pink-400" />
        <h1 className="text-3xl font-bold text-gray-100">Technology Stack & API Reference</h1>
      </div>

      <p className="text-lg text-gray-400 mb-8">
        This section provides details about the technologies used to build the Superpos platform and documentation for its backend API, if applicable for external use.
      </p>

      {/* Technology Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">Technology Stack</h2>
        <p className="mb-6 text-gray-400">Superpos utilizes a modern web stack chosen for interactivity, performance, and robust quantum simulation capabilities:</p>

        <div className="space-y-6">
          {/* Frontend */}
          <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2 flex items-center"><Layers3 size={20} className="mr-2"/>Frontend</h3>
            <ul className="list-disc list-inside space-y-1 pl-6 text-sm">
              <li><strong className="text-gray-200">Next.js:</strong> React framework for server-side rendering, static site generation, routing, and API routes.</li>
              <li><strong className="text-gray-200">React:</strong> Core JavaScript library for building user interfaces.</li>
              <li><strong className="text-gray-200">ShadCN UI:</strong> Accessible and customizable UI components built on Radix UI and Tailwind CSS.</li>
              <li><strong className="text-gray-200">Tailwind CSS:</strong> Utility-first CSS framework for rapid styling.</li>
              <li><strong className="text-gray-200">Plotly.js:</strong> Library for creating interactive 2D charts and visualizations.</li>
              <li><strong className="text-gray-200">Three.js:</strong> Library for creating and displaying 3D graphics, used for circuit visualization.</li>
              <li><strong className="text-gray-200">Axios:</strong> Promise-based HTTP client for making requests to the backend API.</li>
               <li><strong className="text-gray-200">Lucide React:</strong> Library for clean and consistent icons.</li>
            </ul>
          </div>

          {/* Backend */}
          <div>
             <h3 className="text-xl font-semibold text-purple-400 mb-2 flex items-center"><Server size={20} className="mr-2"/>Backend</h3>
             <ul className="list-disc list-inside space-y-1 pl-6 text-sm">
                <li><strong className="text-gray-200">Python:</strong> Primary backend programming language.</li>
                <li><strong className="text-gray-200">Django & Django REST Framework:</strong> High-level Python web framework for building the backend API quickly and securely.</li>
             </ul>
          </div>

          {/* Quantum/AI */}
          <div>
             <h3 className="text-xl font-semibold text-pink-400 mb-2 flex items-center"><BrainCircuit size={20} className="mr-2"/>Quantum Simulation & AI</h3>
             <ul className="list-disc list-inside space-y-1 pl-6 text-sm">
                <li><strong className="text-gray-200">Cirq:</strong> Google's Python library for writing, manipulating, and optimizing quantum circuits and running them on quantum computers and simulators. Used as the core simulation engine.</li>
                <li><strong className="text-gray-200">Tavily API:</strong> External service used to search and retrieve relevant, real-time quantum computing news articles.</li>
                <li><strong className="text-gray-200">Gemini AI API:</strong> Google's AI service used for powering the Quantum Chatbot assistant and summarizing news content.</li>
             </ul>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">API Reference</h2>
        {/* --- CONTENT HERE DEPENDS HEAVILY on whether you expose the API and how --- */}
        <p className="text-gray-400 mb-4">
          The Superpos backend API facilitates communication between the frontend interface and the quantum simulation engine (Cirq), as well as external services like Tavily and Gemini.
        </p>
        <p className="text-gray-400 italic mb-4">
          Currently, the API is primarily designed for internal use by the Superpos frontend. Public API access details will be provided here if/when available.
        </p>
        {/* Example Placeholder:
        <h3 className="text-xl font-semibold text-gray-200 mb-2">Endpoints</h3>
        <div className="p-4 bg-gray-800/50 rounded border border-gray-700">
            <code className="text-sm">POST /api/simulate</code>
            <p className="text-xs text-gray-400 mt-1">Accepts circuit JSON, returns simulation results.</p>
            <code className="text-sm mt-2 block">GET /api/news</code>
            <p className="text-xs text-gray-400 mt-1">Returns latest quantum news articles.</p>
            {/* Add more endpoints as needed *}
        </div>
        <p className="text-sm text-gray-500 mt-4">Detailed request/response formats and authentication methods will be documented here.</p>
        */}
      </section>

    </div>
  );
}