'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import LoginModal from './LoginModal'

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = React.useState(false)
  const router = useRouter()

  // Example auth state
  const user = null// <- replace with actual user logic

  return (
    <header className="">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-black">
          PixelRec
        </Link>

        {/* Right Side */}
        {user ? (
          <figure className="flex gap-4 items-center">
            <button
              onClick={() => router.push(`/profile/${12}`)}
              className="text-sm text-gray-700 hover:underline"
            >
              Profile
            </button>
            <button className="text-sm text-red-500">Logout</button>
          </figure>
        ) : (
          <>
            <button
              className="bg-black text-white px-4  rounded"
              onClick={() => setShowLoginModal(true)}
            >
              Sign In
            </button>
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
