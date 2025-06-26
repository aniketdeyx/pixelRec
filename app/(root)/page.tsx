"use client"

import FeatureCard from '@/components/FeatureCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import { featureCards } from '@/constants'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { howItWorks } from "@/constants";
import HowItWorksCard from '@/components/HowItWorksCard'
import { authClient } from '@/lib/auth-client'
import LoginModal from '@/components/LoginModal'
import Footer from '@/components/Footer'

const HomePage = () => {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOnClick = async () => {
    const { data: session } = await authClient.getSession();
    const user = session?.user;
    console.log('User:', user);
    if (!user) {
      setShowLoginModal(true);
    }
    else{
      router.push('/');
    }
  }

  const router = useRouter();
  return (
    <div className='h-screen bg-white'>
      <div className='py-10 px-20 h-[70vh] flex flex-col mt-6 gap-8' style={{
        backgroundImage: `
    linear-gradient(to right, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0) 40%),
    url('https://readdy.ai/api/search-image?query=A%20modern%2C%20clean%20workspace%20with%20a%20computer%20screen%20showing%20a%20recording%20interface.%20The%20left%20side%20of%20the%20image%20has%20a%20clean%2C%20gradient%20blue%20background%20that%20smoothly%20transitions%20to%20the%20right%20side%20showing%20a%20sleek%20desktop%20setup.%20The%20image%20has%20a%20professional%2C%20minimalist%20aesthetic%20with%20soft%20lighting%20and%20a%20cool%20color%20palette.%20The%20background%20is%20simple%20and%20uncluttered%20to%20ensure%20text%20readability%20on%20the%20left%20side.&width=1600&height=800&seq=hero1&orientation=landscape')
  `,
        backgroundSize: 'cover',
        backgroundPosition: 'right',

      }}>
        <div className='text-5xl font-bold'>
          <h2 className=''>Screen Recording</h2>
          <h3 className='text-[#5471FF]'>Reimagined</h3>
        </div>
        <div className='text-lg w-1/3'><p>
          Record, edit, and share high-quality screen captures in seconds. The perfect tool for creators, remote teams, and educators.

        </p>
        {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
        <div className='flex gap-4'>
          <Button onClick={handleOnClick} className='bg-[#5271FF] text-white cursor-pointer'>Start Recording</Button>
          <Button onClick={() => router.push('/gallery')} className='bg-[#5271FF] text-white cursor-pointer'>View Gallery</Button>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 mt-20'>
        <h4 className='text-3xl font-bold'>Powerful Features, Simple Interface
        </h4>
        <p>Everything you need to create professional screen recordings without the complexity.
        </p>
      </div>
      <div className='grid grid-cols-1 bg-white md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-10'>
        {
          featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              iconClass={card.iconClass}
              title={card.title}
              description={card.description}
            />
          ))
        }
      </div>
      <div>
        <div className='flex flex-col bg-white items-center gap-4 pt-20'>
          <h4 className='text-4xl font-bold'>How it works</h4>
          <p>Three simple steps to create and share professional screen recordings.
          </p>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-10'>
              {
                howItWorks.map((card, index) => (
                  <HowItWorksCard
                    key={index}
                    iconClass={card.iconClass}
                    title={card.title}
                    description={card.description}
                  />
                ))
              }
            </div>
          </div>
          <Button className='bg-[#5271FF] text-white text-lg mt-6 mb-7' onClick={() => router.push('/gallery')}>
            Try it out
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage