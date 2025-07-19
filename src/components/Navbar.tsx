'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  status?: 'completed' | 'in-progress' | 'planned';
}

interface NavSection {
  name: string;
  items: NavItem[];
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navSections: NavSection[] = [
    {
      name: 'React Hooks',
      items: [
        { name: 'useState', href: '/hooks/use-state', status: 'completed' },
        { name: 'useEffect', href: '/hooks/use-effect', status: 'completed' },
        { name: 'useRef', href: '/hooks/use-ref', status: 'completed' },
        { name: 'useReducer', href: '/hooks/use-reducer', status: 'in-progress' },
        { name: 'useContext', href: '/hooks/use-context', status: 'planned' },
        { name: 'useLayoutEffect', href: '/hooks/use-layout-effect', status: 'planned' },
        { name: 'useInsertionEffect', href: '/hooks/use-insertion-effect', status: 'planned' },
        { name: 'useDeferredValue', href: '/hooks/use-deferred-value', status: 'planned' },
        { name: 'useImperativeHandle', href: '/hooks/use-imperative-handle', status: 'planned' },
        { name: 'useTransition', href: '/hooks/use-transition', status: 'planned' },
        { name: 'useSyncExternalStore', href: '/hooks/use-sync-external-store', status: 'planned' },
        { name: 'useId', href: '/hooks/use-id', status: 'planned' },
      ]
    },
    {
      name: 'Next.js Features',
      items: [
        { name: 'Routing', href: '/next-features/routing', status: 'planned' },
        { name: 'Layouts', href: '/next-features/layout-demo', status: 'planned' },
        { name: 'Metadata', href: '/next-features/metadata', status: 'planned' },
        { name: 'Loading States', href: '/next-features/loading', status: 'planned' },
        { name: 'API Routes', href: '/next-features/api-example', status: 'planned' },
        { name: 'Server vs Client', href: '/next-features/server-client-fetch', status: 'planned' },
      ]
    }
  ];

  const isActiveLink = (href: string) => pathname === href;

  const getStatusIndicator = (status?: string) => {
    switch (status) {
      case 'completed':
        return <span className="ml-1 text-green-400 text-xs">✓</span>;
      case 'in-progress':
        return <span className="ml-1 text-yellow-400 text-xs">⚠</span>;
      case 'planned':
        return <span className="ml-1 text-gray-400 text-xs">○</span>;
      default:
        return null;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                H
              </div>
              <span>Hook Lab</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navSections.map((section) => (
              <div key={section.name} className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  <span>{section.name}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 border-b border-gray-100">
                      {section.name}
                    </div>
                    <div className="mt-2 space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                            isActiveLink(item.href)
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }`}
                        >
                          <span>{item.name}</span>
                          {getStatusIndicator(item.status)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* GitHub Link */}
            <a
              href="https://github.com/syntax-read3r/hook-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="hidden xl:inline">GitHub</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              <svg
                className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-6 space-y-6">
            {navSections.map((section) => (
              <div key={section.name} className="space-y-3">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {section.name}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        isActiveLink(item.href)
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-white hover:text-blue-600'
                      }`}
                    >
                      <span>{item.name}</span>
                      {getStatusIndicator(item.status)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Mobile GitHub Link */}
            <div className="pt-4 border-t border-gray-200">
              <a
                href="https://github.com/syntax-read3r/hook-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
