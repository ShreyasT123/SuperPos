'use client'

import Link from 'next/link'
// Importing necessary and relevant icons
import {
    ArrowRight, Book, Code, CircuitBoard, FlaskConical, 
    GraduationCap, Github, HelpCircle, Milestone,
    Server, Database, BrainCircuit, Cloud, Puzzle, BarChart3, Layers3, Newspaper, BotMessageSquare
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import React from 'react'

function documentation() {
  return (
    // Increased vertical padding and spacing, adjusted background
    <div className="min-h-screen space-y-20 px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-gray-950 via-black to-gray-950 text-gray-300">

      {/* --- Hero Section --- */}
      <section className="relative overflow-hidden rounded-lg py-16 px-8 bg-gray-900/80 border border-cyan-500/20 shadow-2xl backdrop-blur-sm">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-transparent"></div>
         <div className="absolute inset-0 opacity-5 bg-[url('/path/to/subtle/circuit/pattern.svg')] bg-repeat"></div> {/* Optional subtle pattern */}

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 mb-6 leading-tight">
            Superpos Documentation Hub
          </h1>
          {/* Updated description based on Problem Statement */}
          <p className="text-lg sm:text-xl text-gray-400 mb-6 max-w-3xl mx-auto">
            Quantum computing is advancing rapidly, creating a need for effective educational tools. Superpos addresses the complexity and accessibility barriers of existing simulators by providing a <strong className="text-cyan-400">free, web-based interactive platform</strong> designed to democratize quantum education.
          </p>
          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Our goal is to offer an <strong className="text-purple-400">intuitive environment</strong> for constructing, visualizing, and simulating quantum circuits, complete with real-time feedback, dynamic visualizations, courses, and news updates for learners of all levels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-lg">
              <Link href="/simulator" className="flex items-center"> {/* Fix 1: Added className and wrapped Link content */}
                Launch Circuit Builder <CircuitBoard className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 shadow-lg backdrop-blur-sm">
               <Link href="/course" className="flex items-center"> {/* Fix 2: Added className and wrapped Link content */}
                 Explore Courses <GraduationCap className="ml-2 h-5 w-5" />
               </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* --- Core Features Section (Enhanced with Report Details) --- */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          Superpos Core Functionality
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Circuit Builder & Simulation */}
          <FeatureCard
            icon={<CircuitBoard className="h-8 w-8 text-cyan-400" />}
            title="Circuit Design & Simulation"
            description="Intuitive drag-and-drop interface supporting up to 10 qubits and various gates (H, X, CNOT, CCX, etc.)."
            content="Real-time simulation via the Cirq backend provides instant state vectors and measurement outputs. Dynamic JSON generation aids learning."
            link="/documentation/simulator"
            linkText="Builder Guide"
            borderColor="border-cyan-500/30 hover:border-cyan-500/60"
            iconBg="bg-cyan-500/10"
          />

          {/* Card 2: Visualization */}
           <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-lime-400" />} // Changed icon
            title="Interactive Visualization"
            description="Understand quantum states with comprehensive 2D and 3D visualizations."
            content="Includes probability histograms, state phase plots (Plotly.js), and rotatable 3D circuit views (Three.js) for in-depth analysis."
            link="/documentation/visualization" // Adjust link
            linkText="Visualization Tools"
            borderColor="border-lime-500/30 hover:border-lime-500/60" // Changed color
            iconBg="bg-lime-500/10"
          />

          {/* Card 3: Quantum Applications */}
           <FeatureCard
            icon={<Puzzle className="h-8 w-8 text-orange-400" />} // Changed icon
            title="Quantum Application Demos"
            description="Explore key quantum algorithms through hands-on simulations."
            content="Includes simulations for Shor's Algorithm (RSA factoring demo) and Fault Tolerance to illustrate practical concepts."
            link="/applications" // Adjust link
            linkText="Application Demos"
            borderColor="border-orange-500/30 hover:border-orange-500/60" // Changed color
            iconBg="bg-orange-500/10"
          />

           {/* Card 4: Learning Environment */}
           <FeatureCard
            icon={<GraduationCap className="h-8 w-8 text-purple-400" />} // Changed icon
            title="Interactive Learning"
            description="Structured courses and AI assistance to guide your quantum journey."
            content="Access beginner, intermediate, and advanced courses. Get real-time help and explanations from the Gemini-powered Quantum Chatbot."
            link="/courses"
            linkText="View Courses & Chatbot"
            borderColor="border-purple-500/30 hover:border-purple-500/60" // Changed color
            iconBg="bg-purple-500/10"
          />

           {/* Card 5: Quantum News */}
           <FeatureCard
            icon={<Newspaper className="h-8 w-8 text-blue-400" />} // Changed icon
            title="Quantum News Feed"
            description="Stay updated with the latest developments in quantum technology."
            content="Features real-time news fetched via the Tavily API, summarized and categorized using Gemini AI for quick insights."
            link="/news" // Adjust link
            linkText="Latest News"
            borderColor="border-blue-500/30 hover:border-blue-500/60" // Changed color
            iconBg="bg-blue-500/10"
          />

           {/* Card 6: Target Audience */}
           <FeatureCard
            icon={<Book className="h-8 w-8 text-pink-400" />} // Changed icon
            title="Education & Research Tool"
            description="Designed to bridge theory and practice for diverse users."
            content="Superpos serves students learning quantum concepts, researchers needing quick simulations, and educators demonstrating quantum principles."
            link="/documentation/overview" // Adjust link
            linkText="About Superpos"
            borderColor="border-pink-500/30 hover:border-pink-500/60" // Changed color
            iconBg="bg-pink-500/10"
          />
        </div>
      </section>

      {/* --- Technology Stack Section --- */}
      <section className="max-w-5xl mx-auto bg-gray-800/60 border border-gray-700 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
            Technology Stack
          </h2>
          <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
              Superpos leverages a modern stack chosen for performance, user experience, and robust quantum simulation capabilities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Frontend */}
              <TechCategory
                  icon={<Layers3 className="text-cyan-400" />}
                  title="Frontend Development"
                  items={[
                      { name: "Next.js", reason: "Dynamic UI, SSR for performance, API routes." },
                      { name: "ShadCN UI", reason: "Modern, customizable components for a clean UX." },
                      { name: "Plotly.js", reason: "Interactive 2D data visualization (histograms, phases)." },
                      { name: "Three.js", reason: "Dynamic 3D circuit rendering (improved compatibility)." },
                      { name: "Axios", reason: "Efficient asynchronous HTTP requests to backend." },
                       { name: "Tailwind CSS", reason: "Utility-first CSS for rapid UI development." },
                  ]}
              />
              {/* Backend */}
              <TechCategory
                  icon={<Server className="text-purple-400" />}
                  title="Backend Development"
                  items={[
                      { name: "Django REST Framework", reason: "Efficient & secure API management, Python-based." },
                      { name: "Python", reason: "Core backend language, extensive library support." },
                  ]}
              />
               {/* Quantum & AI */}
              <TechCategory
                  icon={<BrainCircuit className="text-pink-400" />}
                  title="Quantum & AI Libraries"
                  items={[
                      { name: "Cirq", reason: "Primary engine for quantum circuit simulation." },
                      { name: "Tavily API", reason: "Real-time fetching of quantum news articles." },
                      { name: "Gemini AI API", reason: "AI assistance (chatbot) & news summarization." },
                  ]}
              />
               {/* Development Tools */}
              <TechCategory
                  icon={<Code className="text-yellow-400" />}
                  title="Development Tools"
                  items={[
                      { name: "VS Code / PyCharm", reason: "Code editing and debugging." },
                      { name: "Git", reason: "Version control and collaboration." },
                  ]}
              />
          </div>
      </section>


      {/* --- Documentation Guide Section (Using DocLinkCard) --- */}
      <section className="max-w-5xl mx-auto bg-gray-800/50 border border-gray-700 rounded-lg p-8 shadow-lg">
         <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
           Documentation Guide
         </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           <DocLinkCard icon={<Milestone className="text-cyan-400" />} title="Platform Overview" description="Mission, core features, target audience." href="/documentation/overview" />
           <DocLinkCard icon={<CircuitBoard className="text-lime-400" />} title="Circuit Builder" description="Using the visual editor, gates, simulation controls." href="/documentation/simulator" />
           <DocLinkCard icon={<FlaskConical className="text-orange-400" />} title="Application Demos" description="Guides for RSA/Shor's and Fault Tolerance simulators." href="/documentation/applications" />
           <DocLinkCard icon={<Book className="text-purple-400" />} title="Quantum Concepts" description="Explanations of superposition, entanglement, gates, etc." href="/documentation/concepts" />
            <DocLinkCard icon={<BotMessageSquare className="text-blue-400" />} title="Quantum Chatbot" description="How to use the AI assistant effectively." href="/documentation/chatbot" />
           <DocLinkCard icon={<Code className="text-pink-400" />} title="Technology & API" description="Details on the tech stack and backend API (if public)." href="/documentation/tech-api" /> {/* Combined Tech/API */}
           <DocLinkCard icon={<Newspaper className="text-teal-400" />} title="Quantum News Feed" description="Understanding the news aggregation feature." href="/documentation/news-feed"/>
           <DocLinkCard icon={<HelpCircle className="text-red-400" />} title="FAQ & Glossary" description="Common questions and quantum term definitions." href="/documentation/faq-glossary"/>
         </div>
       </section>

        {/* --- Future Prospects Section --- */}
        <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                Future Prospects
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
                Superpos is continuously evolving. Here are some exciting directions we plan to explore:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <FutureProspectCard
                    icon={<Database className="text-yellow-400" />}
                    title="Multi-Backend Support"
                    description="Integrate with various quantum simulators and real hardware providers (e.g., IBM Quantum, Rigetti) for broader simulation options and practical experience."
                />
                <FutureProspectCard
                    icon={<Cloud className="text-sky-400" />}
                    title="Cloud Integration"
                    description="Leverage cloud computing resources to simulate larger, more complex circuits beyond local hardware limitations, enhancing scalability."
                />
                 <FutureProspectCard
                    icon={<Puzzle className="text-green-400" />} // Using Puzzle again for gamification
                    title="Gamification"
                    description="Introduce achievements, progress tracking, and challenges to make learning more engaging, interactive, and rewarding."
                />
            </div>
        </section>


      {/* --- Developer / Contribution Section --- */}
       <section className="max-w-4xl mx-auto text-center border-t border-gray-800 pt-12">
         <h2 className="text-2xl font-semibold mb-4 text-gray-400">Contribute to Superpos</h2>
         <p className="text-gray-500 mb-4">
           Superpos is an open project. We welcome contributions! Find our repository and contribution guidelines on GitHub.
         </p>
         <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
           <Link href="https://github.com/your-repo/superpos" target="_blank" rel="noopener noreferrer" className="flex items-center"> {/* Fix 4: Added className and wrapped Link content */}
             <Github className="mr-2 h-5 w-5" /> View on GitHub
           </Link>
         </Button>
       </section>

       {/* --- Footer --- */}
      <footer className="text-center text-gray-500 max-w-4xl mx-auto border-t border-gray-800 pt-10 mt-16">
        <p>Need help or want to discuss quantum computing?</p>
        <Button className="mt-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white">
          <Link href="/forum" className="text-white"> {/* Fix 5: Added className */}
            Visit the Community Forum 
          </Link>
        </Button>
         <p className="text-xs mt-8">© {new Date().getFullYear()} Superpos Project. All rights reserved.</p> {/* Optional copyright */}
      </footer>
    </div>
  )
}

// --- Helper Components (Keep FeatureCard and DocLinkCard as before, add TechCategory and FutureProspectCard) ---

// Feature Card (Minor style tweaks)
const FeatureCard = ({ icon, title, description, content, link, linkText, borderColor, iconBg }) => (
  <Card className={`bg-gray-900/70 border ${borderColor} transition-all duration-300 flex flex-col shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02]`}>
    <CardHeader>
      <div className={`mb-3 rounded-lg ${iconBg} p-3 w-14 h-14 flex items-center justify-center border border-white/10 shadow-inner`}>
        {icon}
      </div>
      <CardTitle className="text-xl font-semibold text-gray-100">
        {title}
      </CardTitle>
      <CardDescription className="text-gray-400 pt-1">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-gray-300 text-sm">
        {content}
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="link" className="text-cyan-400 hover:text-cyan-300 px-0">
        <Link href={link} className="flex items-center"> {/* Fix 6: Added className and wrapped Link content */}
          {linkText} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

// Documentation Link Card (Minor style tweaks)
const DocLinkCard = ({ icon, title, description, href }) => (
   <Link href={href} className="block group">
     <div className="bg-gray-800 hover:bg-gray-700/80 p-4 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col hover:shadow-md">
       <div className="flex items-center mb-2">
         <div className="mr-3 p-1.5 bg-gray-700 group-hover:bg-cyan-900/50 transition-colors rounded-md border border-gray-600 group-hover:border-cyan-700">
            {/* Ensure icon color contrasts or is set explicitly if needed */}
           {React.cloneElement(icon, { className: `h-5 w-5` })}
         </div>
         <h4 className="text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">{title}</h4>
       </div>
       <p className="text-sm text-gray-400 flex-grow mb-2">{description}</p>
        <div className="text-xs text-cyan-500 mt-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Go to Section <ArrowRight className="ml-1 h-3 w-3" />
        </div>
     </div>
   </Link>
 );

// New Helper: Tech Category Card
const TechCategory = ({ icon, title, items }) => (
    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700">
        <div className="flex items-center mb-4">
             <div className="p-2 mr-3 bg-gray-700 rounded-md">
                 {React.cloneElement(icon, { className: "h-6 w-6" })}
            </div>
            <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
        </div>
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item.name} className="text-sm">
                    <strong className="text-gray-200">{item.name}:</strong>
                    <span className="text-gray-400 ml-1">{item.reason}</span>
                </li>
            ))}
        </ul>
    </div>
);

// New Helper: Future Prospect Card
const FutureProspectCard = ({ icon, title, description }) => (
     <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors duration-300">
        <div className="flex items-center mb-3">
            <div className="p-2 mr-3 bg-gray-700 rounded-md">
                 {React.cloneElement(icon, { className: "h-6 w-6" })}
            </div>
            <h4 className="text-lg font-semibold text-gray-100">{title}</h4>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

export default documentation;