"use client"

import FeatureCard from '@/components/FeatureCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import { featureCards } from '@/constants'
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const page = () => {

  const router = useRouter();
  return (
    <div className='h-screen'>
      <div className='py-10 px-10 h-[70vh] flex flex-col gap-8'>
        <div className='text-5xl font-bold'>
          <h2 className=''>Screen Recording</h2>
          <h3 className='text-[#5471FF]'>Reimagined</h3>
        </div>
        <div className='text-lg w-1/3'><p>
          Record, edit, and share high-quality screen captures in seconds. The perfect tool for creators, remote teams, and educators.

        </p>
        </div>
        <div className='flex gap-4'>
          <Button onClick={() => router.push('/gallery')} className='bg-[#5271FF] text-white'>Start Recording</Button>
          <Button className='bg-white'>View Gallery</Button>
        </div>
      </div>
      <div className='flex flex-col items-center gap-4 mt-20'>
        <h4 className='text-3xl font-bold'>Powerful Features, Simple Interface
        </h4>
        <p>Everything you need to create professional screen recordings without the complexity.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-10'>
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
        <div className='flex flex-col items-center gap-4 mt-20'>
          <h4 className='text-4xl font-bold'>How it works</h4>
          <p>Three simple steps to create and share professional screen recordings.

          </p>
        </div>

      </div>
    </div>
  )
}

export default page