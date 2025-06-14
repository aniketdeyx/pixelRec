'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { authClient } from '@/lib/auth-client'

const Navbar = () => {
  const router = useRouter()
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google'
    })
  router.push('/gallery'); // Redirect to home after sign-in
  }
  // Example auth state
  const user = null// <- replace with actual user logic

  return (
      <header className="">
      <nav className="flex items-end pt-6 justify-between max-w-7xl px-2 mx-auto">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-black">
          PixelRec
        </Link>

        {/* Right Side */}
        {user ? (
          <figure className="flex gap-4 items-center">
            <Button
              onClick={() => router.push(`/profile/${12}`)}
              className="text-sm text-gray-700 hover:underline"
            >
              Profile
            </Button>
            <Button className="text-sm text-red-500">Logout</Button>
          </figure>
        ) : (
          <>
            <Button
              className="bg-[#5271FF] text-white px-4 cursor-pointer rounded"
              onClick={() => handleSignIn()}
            >
              Sign In with
              <img
                className='bg-gray-100 rounded-full h-6 w-6'
                src={'/assets/images/google.svg'} alt="" />
            </Button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
