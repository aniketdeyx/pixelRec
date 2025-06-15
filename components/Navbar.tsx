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

  const handleLogout = async() => {
        console.log('Logging out...')
        await signOut()
        router.push('/')

  }

  return (
    <header>
      <nav className="flex items-center justify-between max-w-7xl px-4 py-4 mx-auto shadow-sm">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          PixelRec
        </Link>

        {/* Right: Button or Profile */}
        <div className="flex items-center gap-4">
          {isPending ? null : session?.user ? (
            <>
              <Image
                src={session.user.image || 'https://i.pravatar.cc/40'}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <Button
                className="bg-red-500 cursor-pointer text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button className='bg-[#5271FF] text-white' onClick={handleSignIn}>Sign In</Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
