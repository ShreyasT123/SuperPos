'use client'

import './globals.css'
import '@fontsource/rajdhani/500.css';
import '@fontsource/rajdhani/600.css';
import '@fontsource/rajdhani/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

import { useState, useEffect } from 'react'
import { ThemeProvider } from './theme-provider'
import { ChatWindow } from '@/components/ui/ChatWindow'
import { Navigation } from '@/components/ui/navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <html lang="en" className="dark" suppressHydrationWarning>
        <body className="min-h-screen bg-black text-gray-100 font-body" />
      </html>
    )
  }

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-body overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>

          {/* Deep Space Schematic Background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            {/* Void Black Base */}
            <div className="absolute inset-0 bg-black" />
            {/* Schematic Grid Pattern */}
            <div className="absolute inset-0 bg-schematic-grid opacity-20" />
            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/5 via-transparent to-purple-900/5" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
              {children}
            </main>

            <footer className="border-t border-white/5 py-8 text-center text-sm text-zinc-400 font-heading tracking-widest uppercase text-glow">
              SuperPos // Quantum Learning Initiative
            </footer>

            <ChatWindow />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}