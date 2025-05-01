/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Award, Atom, Zap, Brain, Sparkles, BrainCircuit, ShieldCheck, Binary, Route } from 'lucide-react' // Added more icons
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
// import { MermaidDiagram } from "@/components/ui/MermaidComponent" // Assuming this is commented out

// Updated courses array to match the 9 specific topics and routes
const courses = [
  // Beginner
  {
    id: 1,
    title: "Introduction to Quantum Computing",
    description: "Your first step into the fascinating world of quantum computation.",
    level: "course/beginner", // Lowercase for path
    slug: "1",
    duration: "4 weeks",
    instructor: "Dr. Quantum",
    icon: <Atom className="h-6 w-6 text-cyan-400" />,
  },
  {
    id: 2,
    title: "Qubits and Superposition",
    description: "Understand the fundamental building block: the qubit and its unique properties.",
    level: "course/beginner",
    slug: "2",
    duration: "3 weeks",
    instructor: "Dr. Quantum",
    icon: <Sparkles className="h-6 w-6 text-cyan-500" />,
  },
  {
    id: 3,
    title: "Quantum Gates",
    description: "Learn how quantum gates manipulate qubits to perform computations.",
    level: "course/beginner",
    slug: "3",
    duration: "4 weeks",
    instructor: "Dr. Quantum",
    icon: <Binary className="h-6 w-6 text-cyan-600" />,
  },
  // Intermediate
  {
    id: 4,
    title: "Quantum Circuits",
    description: "Combine quantum gates into circuits to perform computational tasks.",
    level: "course/intermediate", // Lowercase for path
    slug: "1",
    duration: "4 weeks",
    instructor: "Prof. Qubit",
    icon: <Route className="h-6 w-6 text-emerald-400" />,
  },
  {
    id: 5,
    title: "Quantum Algorithms",
    description: "Explore foundational algorithms like Deutsch-Jozsa and Grover's Search.",
    level: "course/intermediate",
    slug: "2",
    duration: "5 weeks",
    instructor: "Prof. Qubit",
    icon: <Zap className="h-6 w-6 text-emerald-500" />,
  },
  {
    id: 6,
    title: "Quantum Error Correction",
    description: "Introduction to protecting fragile quantum states from noise.",
    level: "course/intermediate",
    slug: "3",
    duration: "4 weeks",
    instructor: "Dr. Entanglement",
    icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
  },
  // Advanced
  {
    id: 7,
    title: "Quantum Machine Learning",
    description: "Explore the intersection of quantum computing and machine learning.",
    level: "course/advanced", // Lowercase for path
    slug: "1",
    duration: "6 weeks",
    instructor: "Dr. Einstein",
    icon: <BrainCircuit className="h-6 w-6 text-red-400" />,
  },
  {
    id: 8,
    title: "Quantum Cryptography",
    description: "Understand QKD and the impact of quantum on classical cryptography.",
    level: "course/advanced",
    slug: "2",
    duration: "5 weeks",
    instructor: "Dr. Cipher", // Changed instructor for variety
    icon: <ShieldCheck className="h-6 w-6 text-red-500" />, // Reused icon, consider alternatives
  },
  {
    id: 9,
    title: "Advanced Quantum Algorithms",
    description: "Dive deeper into QFT, Phase Estimation, and Shor's Algorithm.",
    level: "course/advanced",
    slug: "3",
    duration: "6 weeks",
    instructor: "Prof. Feynman", // Changed instructor
    icon: <Brain className="h-6 w-6 text-red-600" />,
  },
];


export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="space-y-12 relative min-h-screen py-16 px-4"> {/* Added padding */}
      {/* Background Animation Div */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10"> {/* Ensure background is behind */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-cyan-500 rounded-full opacity-10 dark:opacity-30" // Adjusted opacity
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0], // Add subtle movement
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.5 + Math.random(), 1], // Vary scale more
                opacity: [0.1, 0.3, 0.1], // Fade in/out slightly
              }}
              transition={{
                duration: Math.random() * 20 + 15, // Slightly faster animation
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror", // Makes movement smoother
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
          Quantum Computing Courses
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Embark on your quantum journey with our expert-led courses. From beginners to advanced learners, we&apos;ve got you covered.
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
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 text-center">
          Quantum Computing Learning Path
        </h2>
        {/* Mermaid Diagram Placeholder */}
        {/* <div className="bg-black/50 border border-cyan-500/20 rounded-lg p-6 mb-8">
            <p className="text-center text-gray-400 italic">[Learning Path Diagram Placeholder]</p>
            {/* <MermaidDiagram chart={mermaidChart} /> */}
        {/* </div> */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">
            Follow our structured path or choose topics that interest you. Start with the fundamentals.
          </p>
          {/* Updated Link to the first beginner course */}
          <Link href="/course/beginner/1" passHref>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
              Start Your Quantum Journey
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto relative z-10">
        <Input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-black/50 border-cyan-500/50 text-gray-100 placeholder-gray-500 mb-8 w-full" // Ensure full width
        />

        {/* Updated Tabs to include Intermediate */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4"> {/* Changed to 4 columns */}
            <TabsTrigger value="all">All Levels</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger> {/* Added Intermediate Tab */}
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* All Levels Content */}
          <TabsContent value="all">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" // Responsive grid
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05 } } // Faster stagger
              }}
              initial="hidden"
              animate="show"
            >
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => <CourseCard key={course.id} course={course} />)
              ) : (
                 <p className="text-gray-400 col-span-full text-center">No courses match your search.</p>
              )}
            </motion.div>
          </TabsContent>

          {/* Beginner Content */}
          <TabsContent value="beginner">
             <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
            >
              {filteredCourses.filter(course => course.level === "beginner").length > 0 ? (
                 filteredCourses.filter(course => course.level === "beginner").map(course => <CourseCard key={course.id} course={course} />)
              ) : (
                 <p className="text-gray-400 col-span-full text-center">No beginner courses match your search.</p>
              )}
            </motion.div>
          </TabsContent>

          {/* Intermediate Content */}
          <TabsContent value="intermediate">
             <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
            >
              {filteredCourses.filter(course => course.level === "intermediate").length > 0 ? (
                 filteredCourses.filter(course => course.level === "intermediate").map(course => <CourseCard key={course.id} course={course} />)
              ) : (
                 <p className="text-gray-400 col-span-full text-center">No intermediate courses match your search.</p>
              )}
            </motion.div>
          </TabsContent>

          {/* Advanced Content */}
          <TabsContent value="advanced">
             <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
            >
             {filteredCourses.filter(course => course.level === "advanced").length > 0 ? (
                 filteredCourses.filter(course => course.level === "advanced").map(course => <CourseCard key={course.id} course={course} />)
              ) : (
                 <p className="text-gray-400 col-span-full text-center">No advanced courses match your search.</p>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

// Updated CourseCard to use Link
function CourseCard({ course }: { course: any }) {
  const courseUrl = `/${course.level}/${course.slug}`; // Construct the URL

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
       className="h-full" // Ensure motion div takes full height for card alignment
    >
      {/* Card now acts as the container, Link wraps the Button */}
      <Card className="bg-black/60 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col justify-between transform hover:-translate-y-1">
        <div> {/* Wrapper for top content */}
          <CardHeader className="relative pb-4"> {/* Adjusted padding */}
            <div className="absolute top-4 right-4 bg-cyan-500/10 rounded-full p-2">
              {course.icon}
            </div>
            <CardTitle className="text-xl font-semibold text-gray-100 mr-10">{course.title}</CardTitle> {/* Added margin-right for icon space */}
            <CardDescription className="text-gray-400 capitalize">{course.level} • {course.duration}</CardDescription> {/* Capitalize level */}
          </CardHeader>
          <CardContent className="pb-4"> {/* Adjusted padding */}
            <p className="text-gray-300 mb-4 text-sm">{course.description}</p> {/* Slightly smaller text */}
            <div className="flex items-center text-gray-400 mb-1 text-xs"> {/* Smaller text/spacing */}
              <Clock className="mr-2 h-3 w-3" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-gray-400 text-xs">
              <Award className="mr-2 h-3 w-3" />
              <span>{course.instructor}</span>
            </div>
          </CardContent>
        </div>
        <CardFooter>
          {/* Link wraps the button */}
          <Link href={courseUrl} passHref className="w-full">
            <Button
                variant="outline" // Use outline for better contrast on dark bg
                className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 group"
             >
              View Course
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}