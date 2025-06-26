'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useSession, signIn, signOut } from '@/lib/auth-client'
import Image from 'next/image'

const Navbar = () => {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  const handleSignIn = async () => {
    await signIn.social({ provider: 'google' })
    router.push('/gallery')
  }

  const handleLogout = async () => {
    console.log('Logging out...')
    await signOut()
    router.push('/')
  }

  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl bg-400 mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
        >
          <Image
          src={'/assets/images/logo.png'}
          alt="PixelRec Logo"
          width={100}
          height={12}
          className="inline-block mr-2"
           />
        </Link>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          {isPending ? null : session?.user ? (
            <>
              <div className="relative w-10 h-10">
                <Image
                  src={session.user.image || 'https://i.pravatar.cc/40'}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border-2 border-[#5271FF] shadow"
                />
              </div>
              <Button
                className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="bg-[#0096c7] hover:bg-[#0077b6] cursor-pointer transition-colors text-white px-4 py-2 rounded-lg"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
