import Head from 'next/head';
import { Layers3, ArrowRightLeft, Component, Database } from 'lucide-react'; // Example icons
import Image from 'next/image'; // If you have diagrams
import Link from 'next/link';

export default function ArchitecturePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>System Architecture | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <Layers3 className="h-8 w-8 mr-3 text-yellow-400" />
        <h1 className="text-3xl font-bold text-gray-100">System Architecture</h1>
      </div>

      <p className="text-lg text-gray-400 mb-8">
        Superpos is built using a modern client-server architecture designed for responsiveness, scalability, and efficient handling of quantum simulations and external API interactions.
      </p>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">High-Level Overview</h2>
      <p className="mb-6">
        The system primarily consists of a <strong className="text-cyan-400">Frontend Client</strong> (built with Next.js) that users interact with, and a <strong className="text-purple-400">Backend Server</strong> (built with Django REST Framework) that handles logic, performs simulations via Cirq, and communicates with external services.
      </p>
      {/* Optional: Insert high-level diagram image */}
      {/* <div className="my-8 p-4 bg-gray-800 rounded border border-gray-700 flex justify-center">
           <Image src="/path/to/high-level-diagram.png" alt="High Level Architecture Diagram" width={600} height={400} />
      </div> */}

        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Component Breakdown</h2>
        <p className="mb-6">The system is modular, with distinct components responsible for specific functionalities:</p>

       <div className="space-y-6">
            {/* Frontend Components */}
            <ArchComponentCategory title="Frontend Components (Next.js/React)" borderColor="border-cyan-500/50">
                <ArchComponent name="Circuit Designer UI (1)" role="Visual circuit design and manipulation." tech="Next.js, ShadCN, Three.js" />
                <ArchComponent name="Visualization Component (5)" role="Displays 2D/3D simulation results." tech="Plotly.js, Three.js" />
                <ArchComponent name="Course Material Interface (2)" role="Presents educational content." tech="React components" />
                <ArchComponent name="Quantum Chatbot UI (3)" role="Handles user interaction with the AI assistant." tech="React components" />
                <ArchComponent name="Algorithm Demos UI (4)" role="Interface for RSA & FT simulators." tech="React components" />
                <ArchComponent name="Quantum News Feed UI (6)" role="Displays fetched and summarized news." tech="React components" />
                <ArchComponent name="(State Management)" role="Manages application state (e.g., using React Context or Zustand)." tech="React Hooks/Libraries" />
                <ArchComponent name="(API Client)" role="Handles communication with backend API." tech="Axios" />
            </ArchComponentCategory>

            {/* Backend Components */}
            <ArchComponentCategory title="Backend Components (Django REST)" borderColor="border-purple-500/50">
                <ArchComponent name="REST API Controller (7)" role="Manages API requests, routes data, central coordinator." tech="Django REST Framework" />
                 <ArchComponent name="Circuit Interpreter (9)" role="Parses circuit JSON from frontend requests." tech="Python" />
                <ArchComponent name="Quantum Circuit Builder (10)" role="Constructs Cirq circuit objects." tech="Python, Cirq" />
                <ArchComponent name="Simulation Processor (11)" role="Executes simulations using Cirq engine." tech="Cirq" />
                <ArchComponent name="Result Analyzer (12)" role="Formats raw Cirq results for frontend." tech="Python" />
                <ArchComponent name="News Aggregator (8)" role="Fetches, caches, and processes news via Tavily API." tech="Python, Django Cache/Redis" />
                 <ArchComponent name="(Chatbot Handler)" role="Interfaces with Gemini API for chatbot responses." tech="Python, Google AI SDK" />
                  {/* Add Database Models if applicable */}
                 {/* <ArchComponent name="(Database Models)" role="Stores user data, saved circuits, etc. (if implemented)." tech="Django ORM, PostgreSQL/SQLite" /> */}
            </ArchComponentCategory>

             {/* External Services */}
            <ArchComponentCategory title="External Services" borderColor="border-pink-500/50">
                <ArchComponent name="Cirq (as library)" role="Core quantum simulation engine." tech="Google Quantum AI" />
                <ArchComponent name="Gemini API (13)" role="Provides AI for chatbot and summarization." tech="Google AI" />
                <ArchComponent name="Tavily API (14)" role="Supplies real-time quantum news search." tech="Tavily AI" />
            </ArchComponentCategory>
       </div>


       <h2 className="text-2xl font-semibold text-gray-100 mt-10 mb-4">Data Flow Examples</h2>
       {/* Use text or link to diagrams from report */}
       <p className="mb-4">
           Refer to the flow diagrams in the project report (Figures 1, 2, 3) or the descriptions below for typical interaction flows:
       </p>
       <ul className="list-disc list-inside space-y-2 pl-4 text-sm">
            <li><strong className="text-gray-200">Circuit Simulation:</strong> UI -> Frontend Request -> API Controller -> Interpreter -> Builder -> Processor (Cirq) -> Analyzer -> API Response -> Frontend Visualization.</li>
            <li><strong className="text-gray-200">News Request:</strong> UI -> Frontend Request -> API Controller -> News Aggregator (Tavily) -> API Response -> Frontend Display.</li>
             <li><strong className="text-gray-200">Chatbot Query:</strong> UI -> Frontend Request -> API Controller -> Chatbot Handler (Gemini) -> API Response -> Frontend Display.</li>
       </ul>

        <p className="mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">
            For details on specific technologies, see the <Link href="/docs/tech-api" className="text-cyan-400 hover:underline">Technology Stack</Link> page.
        </p>

    </div>
  );
}

// Helper Components for Architecture
const ArchComponentCategory = ({ title, children, borderColor }: { title: string, children: React.ReactNode, borderColor: string }) => (
    <div className={`p-4 rounded border ${borderColor} bg-gray-800/30`}>
        <h3 className="text-xl font-semibold text-gray-100 mb-3">{title}</h3>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

const ArchComponent = ({ name, role, tech }: { name: string, role: string, tech: string }) => (
    <div className="text-sm p-2 bg-gray-900/50 rounded border border-gray-700">
        <p><strong className="text-gray-200">{name}:</strong> {role}</p>
        <p className="text-xs text-gray-500">Tech: {tech}</p>
    </div>
);