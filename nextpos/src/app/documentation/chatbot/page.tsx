import Head from 'next/head';
import { BotMessageSquare, HelpCircle, MessageSquareWarning, Lightbulb } from 'lucide-react'; // Example icons
import Link from 'next/link';

export default function ChatbotPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>Quantum Chatbot Guide | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <BotMessageSquare className="h-8 w-8 mr-3 text-blue-400" />
        <h1 className="text-3xl font-bold text-gray-100">Using the Quantum Chatbot Assistant</h1>
      </div>

      <p className="text-lg text-gray-400 mb-6">
        Superpos includes an AI-powered chatbot assistant, leveraging Google's Gemini AI, to provide you with real-time help and explanations as you navigate the platform and learn about quantum computing.
      </p>

       <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-center mb-8">
         <p className="text-blue-300"><Lightbulb className="inline h-5 w-5 mr-1"/>Think of the chatbot as your interactive guide and quick reference tool.</p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">How to Access the Chatbot</h2>
      <p className="mb-6">
          You can typically find the chatbot interface as a persistent button or panel within the Superpos application (e.g., often in the bottom-right corner). Clicking it will open the chat window.
          {/* [Add specific instructions based on your UI implementation] */}
      </p>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">What Can You Ask?</h2>
       <p className="mb-6">The chatbot is designed to assist with a variety of queries:</p>
      <ul className="list-disc list-inside space-y-3 mb-8 pl-4">
        <li>
            <strong className="text-gray-200">Conceptual Explanations:</strong> "Explain superposition in simple terms.", "What does the Hadamard gate do?", "What is quantum entanglement?"
        </li>
         <li>
            <strong className="text-gray-200">Platform Usage:</strong> "How do I add a CNOT gate?", "Where can I see the state vector?", "How does the fault tolerance simulator work?"
        </li>
        <li>
            <strong className="text-gray-200">Troubleshooting (Basic):</strong> "Why is my simulation result unexpected?", "What does this error message mean?" (Note: For complex issues, check the FAQ or Forum).
        </li>
         <li>
            <strong className="text-gray-200">Definitions:</strong> "Define 'decoherence'.", "What is a Bloch Sphere?"
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Tips for Effective Interaction</h2>
      <ul className="list-disc list-inside space-y-2 mb-8 pl-4">
        <li><strong className="text-gray-200">Be Specific:</strong> Clearer questions yield better answers. Instead of "It's not working," try "When I add an X gate after an H gate to qubit 0, the probability histogram doesn't change. Why?"</li>
        <li><strong className="text-gray-200">Ask Follow-up Questions:</strong> If an answer isn't clear, ask for clarification or examples.</li>
        <li><strong className="text-gray-200">Understand Limitations:</strong> The chatbot is an AI assistant based on its training data and the platform's context. It may not always have the answer to highly complex, cutting-edge research questions or specific coding bugs in external libraries.</li>
       </ul>

      <div className="p-4 bg-gray-800/50 rounded border border-gray-700 flex items-start">
        <MessageSquareWarning className="h-6 w-6 mr-3 text-yellow-400 mt-1 flex-shrink-0" />
        <div>
            <h3 className="font-semibold text-yellow-400">Privacy Note</h3>
            <p className="text-sm text-gray-400">
                Conversations may be processed by the underlying AI service (Gemini AI). Avoid entering sensitive personal information into the chat.
            </p>
        </div>
      </div>

       <p className="mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">
           For more detailed definitions, visit the <Link href="/docs/faq-glossary" className="text-cyan-400 hover:underline">Glossary</Link>. If the chatbot can't help, try the <Link href="/forum" className="text-cyan-400 hover:underline">Community Forum</Link>.
       </p>
    </div>
  );
}