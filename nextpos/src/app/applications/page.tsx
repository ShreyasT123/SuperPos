/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Atom, Zap, Brain, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from 'next/link'

const demos = [
  {
    id: 1,
    title: "Shor's Algorithm",
    description: "A quantum algorithm for factoring integers, which is exponentially faster than classical algorithms.",
    link: "/applications/shors-algorithm",
    icon: <Atom className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 2,
    title: "Grover's Algorithm",
    description: "A quantum search algorithm that provides a quadratic speedup over classical search algorithms.",
    link: "/applications/grovers-algorithm",
    icon: <Zap className="h-6 w-6 text-purple-400" />,
  },
  {
    id: 3,
    title: "Quantum Machine Learning",
    description: "Explore how quantum computing can enhance machine learning models and techniques.",
    link: "/applications/quantum-ml",
    icon: <Brain className="h-6 w-6 text-green-400" />,
  },
  {
    id: 4,
    title: "Quantum Error Correction",
    description: "Learn about quantum error correction techniques to protect quantum information from errors.",
    link: "/applications/quantum-error-correction",
    icon: <Brain className="h-6 w-6 text-red-400" />,
  }
]

export default function DemosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredDemos = demos.filter(demo =>
    demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-500 rounded-full opacity-30"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                opacity: [0.3, 0.5, 0.5, 0.3, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      <motion.section 
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
          Quantum Computing Demos
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore our interactive quantum demos. From algorithms to real-world applications, experience quantum computing in action.
        </p>
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: isLoaded ? 1 : 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
        </motion.div>
      </motion.section>

      <section className="max-w-4xl mx-auto relative z-10 mb-16">
        <Input
          type="text"
          placeholder="Search demos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-black/50 border-cyan-500/50 text-gray-100 placeholder-gray-500 mb-8"
        />

        <motion.div 
          className="grid gap-6 mt-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {filteredDemos.map(demo => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </motion.div>
      </section>
    </div>
  )
}

function DemoCard({ demo }: { demo: any }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      <Card className="bg-black/50 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
        <CardHeader className="relative">
          <div className="absolute top-4 right-4 bg-cyan-500/10 rounded-full p-2">
            {demo.icon}
          </div>
          <CardTitle className="text-xl font-semibold text-gray-100">{demo.title}</CardTitle>
          <CardDescription className="text-gray-400">{demo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{demo.description}</p>
        </CardContent>
        <CardFooter>
          <Link href={demo.link} className="w-full">
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white group">
              Explore Now 
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
