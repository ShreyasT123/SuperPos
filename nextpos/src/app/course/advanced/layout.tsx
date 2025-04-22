'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const courseStructure = {
  beginner: [
    { id: 1, title: "Introduction to Quantum Computing", path: "/course/beginner/1" },
    { id: 2, title: "Qubits and Superposition", path: "/course/beginner/2" },
    { id: 3, title: "Quantum Gates", path: "/course/beginner/3" },
  ],
  intermediate: [
    { id: 1, title: "Quantum Circuits", path: "/course/intermediate/1" },
    { id: 2, title: "Quantum Algorithms", path: "/course/intermediate/2" },
    { id: 3, title: "Quantum Error Correction", path: "/course/intermediate/3" },
  ],
  advanced: [
    { id: 1, title: "Quantum Machine Learning", path: "/course/advanced/1" },
    { id: 2, title: "Quantum Cryptography", path: "/course/advanced/2" },
    { id: 3, title: "Advanced Quantum Algorithms", path: "/course/advanced/3" },
  ],
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 p-4 fixed h-full overflow-y-auto">
        <nav className="space-y-8">
          {Object.entries(courseStructure).map(([level, courses]) => (
            <div key={level} className="space-y-2">
              <h3 className="text-lg font-semibold capitalize text-gradient bg-gradient-to-r from-cyan-500 to-purple-500 mb-2">
                {level} Level
              </h3>
              <ul className="space-y-1">
                {courses.map((course) => (
                  <li key={course.path}>
                    <Link
                      href={course.path}
                      className={cn(
                        "block px-4 py-2 rounded-lg text-sm transition-colors",
                        pathname === course.path
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      )}
                    >
                      {course.id}. {course.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 