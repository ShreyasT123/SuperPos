import Head from 'next/head';
import { Newspaper, Search, Brain, LayoutList } from 'lucide-react'; // Example icons

export default function NewsFeedPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-300">
      <Head>
        <title>Quantum News Feed | Superpos Docs</title>
      </Head>

      <div className="flex items-center mb-6">
        <Newspaper className="h-8 w-8 mr-3 text-teal-400" />
        <h1 className="text-3xl font-bold text-gray-100">Quantum News Feed</h1>
      </div>

      <p className="text-lg text-gray-400 mb-8">
        Stay informed about the rapidly evolving field of quantum computing directly within the Superpos platform. The Quantum News Feed feature provides curated, up-to-date articles and summaries.
      </p>

      <h2 className="text-2xl font-semibold text-gray-100 mb-4">How it Works</h2>
      <div className="p-6 bg-gray-800/50 rounded border border-gray-700 space-y-4">
         <div className="flex items-start">
             <Search className="h-6 w-6 mr-3 text-teal-300 mt-1 flex-shrink-0"/>
             <div>
                <h3 className="font-semibold text-gray-100">Sourcing News (Tavily API)</h3>
                <p className="text-sm text-gray-400">The backend uses the Tavily Search API to perform real-time searches across the web for the latest news articles specifically related to quantum computing, quantum technology, algorithms, hardware breakthroughs, and related fields.</p>
            </div>
         </div>
         <div className="flex items-start">
             <Brain className="h-6 w-6 mr-3 text-teal-300 mt-1 flex-shrink-0"/>
             <div>
                <h3 className="font-semibold text-gray-100">Summarization & Insights (Gemini AI)</h3>
                <p className="text-sm text-gray-400">To provide quick insights, the fetched articles are often processed using the Gemini AI API to generate concise summaries, highlighting the key takeaways of each news item.</p>
            </div>
         </div>
         <div className="flex items-start">
             <LayoutList className="h-6 w-6 mr-3 text-teal-300 mt-1 flex-shrink-0"/>
             <div>
                <h3 className="font-semibold text-gray-100">Display</h3>
                <p className="text-sm text-gray-400">The curated news items, along with their titles, summaries, source links, and timestamps, are displayed dynamically in the "Quantum News" section of the Superpos frontend.</p>
            </div>
         </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-100 mt-8 mb-4">Accessing the Feed</h2>
      <p className="mb-6">
        Navigate to the dedicated &quot;Quantum News&quot; page or section within the Superpos application. The feed typically updates regularly to ensure you have access to the latest information.
         {/* [Add specific navigation instructions if needed] */}
      </p>

      <p className="text-sm text-gray-500 border-t border-gray-700 pt-4">
          Note: News content is sourced from external APIs (Tavily, Gemini). While filtering is applied, Superpos does not control the content of the original articles. Always refer to the source link for the full context.
      </p>
    </div>
  );
}