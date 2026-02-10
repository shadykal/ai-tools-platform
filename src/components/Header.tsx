'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Tools Hub</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">منصة أدوات الذكاء الاصطناعي</p>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="#tools"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              الأدوات
            </Link>
            <Link
              href="#features"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              المميزات
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4">
            <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              الرئيسية
            </Link>
            <Link href="#tools" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              الأدوات
            </Link>
            <Link href="#features" className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              المميزات
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
