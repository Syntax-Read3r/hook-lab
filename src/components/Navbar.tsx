'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/hooks/use-state" className="hover:underline">useState</Link>
      <Link href="/hooks/use-effect" className="hover:underline">useEffect</Link>
      <Link href="/next-features/routing" className="hover:underline">Routing</Link>
      {/* Add more links as needed */}
    </nav>
  )
}
