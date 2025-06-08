import { getVideoByIdAction } from '@/actions/upload';
import VideoPlayer from '@/components/VideoPlayer';
import { redirect } from 'next/navigation';
import React from 'react'

const VideoDetailsPage = async({params}: {params: Promise<{videoId:string}>}) => {

  const {videoId} = await params;
  const {user, video} = await getVideoByIdAction(videoId);
  if(!video) redirect('/');

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>{video.title}</h1>
      <VideoPlayer videoUrl={video.videoUrl}/>
    </div>
  )
}

export default VideoDetailsPage