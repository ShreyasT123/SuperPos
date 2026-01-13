'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;
  return <>{children}</>;
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <ClientOnly>
      {/* 
        Background: Lowered opacity to let the "Marble/Star" bg bleed through.
        Border: Switched from Cyan to a very subtle white line.
      */}
      <nav className="fixed top-0 left-0 right-0 z-[150] bg-black/20 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO: Editorial Serif Style */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl tracking-[0.3em] font-didone uppercase text-quantum">
                SuperPOS
              </Link>
            </div>

            {/* DESKTOP NAV: Technical Monospace Style */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/laboratory">Laboratory</NavLink>
              <NavLink href="/algorithms">Algorithms</NavLink>
              <NavLink href="/documentation">Documentation</NavLink>
              <NavLink href="/course">Course</NavLink>
              <NavLink href="/news">News</NavLink>

              <div className="w-[1px] h-4 bg-white/10 mx-4" />

              <button className="p-2 opacity-40 hover:opacity-100 transition-opacity">
                <Search size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white opacity-60">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU: Fullscreen Low-key Overaly */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center">
          <div className="flex flex-col space-y-8 text-center">
            <NavLink href="/laboratory" onClick={toggleMenu} mobile>Laboratory</NavLink>
            <NavLink href="/algorithms" onClick={toggleMenu} mobile>Algorithms</NavLink>
            <NavLink href="/course" onClick={toggleMenu} mobile>Course</NavLink>
            <NavLink href="/documentation" onClick={toggleMenu} mobile>Documentation</NavLink>
            <NavLink href="/news" onClick={toggleMenu} mobile>News</NavLink>
          </div>
          <div className="absolute bottom-12 font-mono text-[10px] opacity-20 tracking-[0.5em]">
            SYSTEM_ACCESS_V.01
          </div>
        </div>
      )}
    </ClientOnly>
  )
}

function NavLink({
  href,
  children,
  onClick,
  mobile
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  mobile?: boolean
}) {
  return (
    <Link
      href={href}
      className={`
        ${mobile ? 'text-2xl font-serif-italic' : 'text-[10px] font-mono'}
        block py-2 px-4 text-zinc-400 hover:text-white uppercase 
        tracking-[0.3em] transition-all duration-500 ease-out
        hover:bg-white/5 rounded-sm
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}