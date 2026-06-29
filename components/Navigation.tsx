'use client'

import Link from 'next/link'
import { NAVIGATION_MENU } from '@/lib/constants'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ttb-dark/80 backdrop-blur-md border-b border-ttb-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gradient-ttb">
            TTB
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {NAVIGATION_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-white hover:text-ttb-blue transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden md:inline-block px-6 py-2 bg-ttb-blue text-ttb-dark rounded-lg font-semibold hover:bg-ttb-cyan transition-colors glow-effect"
          >
            Get Started
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ttb-blue"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {NAVIGATION_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-white hover:text-ttb-blue transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}