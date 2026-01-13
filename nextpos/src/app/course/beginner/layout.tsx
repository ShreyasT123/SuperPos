"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

// (Keep your courseStructure object exactly as is)
const courseStructure = {
  beginner: [
    { id: 1, title: "Quantum Fundamentals", path: "/course/beginner/1" },
    { id: 2, title: "Qubits & Superposition", path: "/course/beginner/2" },
    { id: 3, title: "Quantum Gates", path: "/course/beginner/3" },
    { id: 4, title: "Assessment Protocol", path: "/course/beginner/quiz" },
  ],
  intermediate: [
    { id: 1, title: "Quantum Circuits", path: "/course/intermediate/1" },
    { id: 2, title: "Quantum Algorithms", path: "/course/intermediate/2" },
    { id: 3, title: "Error Correction", path: "/course/intermediate/3" },
    { id: 4, title: "Assessment Protocol", path: "/course/intermediate/quiz" },
  ],
  advanced: [
    { id: 1, title: "Neural Quantum States", path: "/course/advanced/1" },
    { id: 2, title: "Cryptography Logic", path: "/course/advanced/2" },
    { id: 3, title: "Advanced Shor's", path: "/course/advanced/3" },
    { id: 4, title: "Assessment Protocol", path: "/course/advanced/quiz" },
  ],
};

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-black">

      {/* SIDEBAR: Added 'z-50' to force it above page backgrounds */}
      <aside className="w-80 h-screen sticky top-0 border-r border-white/5 bg-black/40 backdrop-blur-xl hidden lg:flex flex-col z-50">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center gap-3 opacity-40 font-mono text-[10px] uppercase tracking-widest">
            <Terminal size={14} />
            <span>Module_Index</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto lab-scroll p-8 space-y-12">
          {Object.entries(courseStructure).map(([level, courses]) => (
            <div key={level} className="space-y-6">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-500 border-b border-white/5 pb-2">
                Level_{level}
              </h3>
              <ul className="space-y-1">
                {courses.map((course) => {
                  const isActive = pathname === course.path;
                  return (
                    <li key={course.path}>
                      <Link
                        href={course.path}
                        className={cn(
                          "block py-3 px-4 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all duration-500 border border-transparent",
                          isActive
                            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            : "text-zinc-500 hover:text-white hover:bg-white/[0.03] hover:border-white/10"
                        )}
                      >
                        <span className="opacity-30 mr-3">{course.id.toString().padStart(2, '0')}</span>
                        {course.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 opacity-20 font-mono text-[8px] uppercase tracking-widest text-center">
          Superpos_Academic_V1
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative z-0">
        {children}
      </div>
    </div>
  );
}