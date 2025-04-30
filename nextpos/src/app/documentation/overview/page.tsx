import Head from 'next/head';
import Link from 'next/link';
import { Milestone, CircuitBoard, FlaskConical, GraduationCap, Newspaper, BotMessageSquare, Users, BarChart3 } from 'lucide-react'; // Example icons

export default function OverviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>Platform Overview | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <Milestone className="h-8 w-8 mr-3 text-cyan-400" />
        <h1 className="text-3xl font-bold text-gray-100">Superpos Platform Overview</h1>
      </div>

      <p className="text-lg text-gray-400 mb-6">
        Welcome to Superpos! This platform is designed to make quantum computing accessible and understandable for everyone, from curious beginners to seasoned researchers. Our mission is to <strong className="text-cyan-400">democratize quantum education</strong> by providing intuitive tools and comprehensive resources.
      </p>

       <p className="mb-8">
        Superpos addresses the common challenges of learning quantum computing – complexity and accessibility – by offering a free, web-based, interactive environment.
      </p>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Core Features</h2>
      <ul className="list-disc list-inside space-y-3 mb-8 pl-4">
        <li>
            <strong className="text-lime-300 flex items-center"><CircuitBoard size={18} className="mr-2"/>Quantum Circuit Builder:</strong> Design circuits visually using drag-and-drop, configure qubits/gates, and get instant simulation results.
        </li>
        <li>
            <strong className="text-orange-300 flex items-center"><FlaskConical size={18} className="mr-2"/>Application Demonstrations:</strong> Explore practical concepts like Shor's algorithm (RSA) and Fault Tolerance through interactive simulations.
        </li>
         <li>
            <strong className="text-purple-300 flex items-center"><GraduationCap size={18} className="mr-2"/>Interactive Courses:</strong> Follow structured learning paths covering quantum fundamentals, algorithms, and error correction.
        </li>
        <li>
            <strong className="text-teal-300 flex items-center"><Newspaper size={18} className="mr-2"/>Quantum News Feed:</strong> Stay updated with the latest breakthroughs and developments in the quantum world, powered by Tavily and Gemini AI.
        </li>
         <li>
            <strong className="text-blue-300 flex items-center"><BotMessageSquare size={18} className="mr-2"/>Quantum Chatbot Assistant:</strong> Get real-time explanations, guidance, and troubleshooting help powered by Gemini AI.
        </li>
        <li>
            <strong className="text-pink-300 flex items-center"><BarChart3 size={18} className="mr-2"/>Rich Visualizations:</strong> Understand simulation outputs with state vectors, probability histograms, phase plots (2D), and interactive 3D circuit views.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Who is Superpos For?</h2>
       <div className="flex items-start p-4 bg-gray-800/50 rounded border border-gray-700">
        <Users className="h-6 w-6 mr-3 text-cyan-400 mt-1" />
        <p className="text-gray-400">
            Superpos is designed for a diverse audience, including <strong className="text-gray-200">students</strong> learning quantum concepts, <strong className="text-gray-200">researchers</strong> needing quick simulations or demonstrations, <strong className="text-gray-200">educators</strong> teaching quantum principles, and <strong className="text-gray-200">enthusiasts</strong> curious about the future of computing.
        </p>
      </div>

       <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">Getting Started</h2>
       <p>
            Ready to dive in? We recommend starting with the <Link href="/docs/circuit-builder" className="text-cyan-400 hover:underline">Circuit Builder Tutorial</Link> or exploring the <Link href="/courses" className="text-cyan-400 hover:underline">Beginner Course</Link>.
       </p>
    </div>
  );
}