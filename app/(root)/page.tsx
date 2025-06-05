import Header from '@/components/Header'
import Videocard from '@/components/Videocard'
import { sampleVideos } from '@/constants'
import React from 'react'


const Home = () => {
  return (
    <div>
        <Header subHeader='Public Library' title='All videos' />
        <div className='p-5 flex flex-col gap-5 lg:grid lg:grid-cols-4 lg:gap-5'>
          {sampleVideos.map((video, id) => (
            <Videocard 
              key={id} 
              id={video.id} 
              thumbnail={video.thumbnail} 
              userImg={video.userImg} 
              username={video.username} 
              visibility={video.visibility} 
              views={video.views} 
              title={video.title} 
              createdAt={video.createdAt} 
              duration={video.duration}
            />
          ))}
        </div>
    </div>
  )
}

export default Home