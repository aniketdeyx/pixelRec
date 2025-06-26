'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useScreenRecording } from "@/lib/hooks/useScreenRecording"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from 'next/navigation'
import { getAllVideosAction } from "@/actions/upload"
import VideoThumbnail from "@/components/VideoThumbnail"
import Footer from '@/components/Footer'
import { Video, Plus } from 'lucide-react'

interface Video {
  id: string;
  videoId: string;
  title: string;
  description: string;
  videoUrl: string;
  visibility: "public" | "private";
  userId: string;
  views: number;
  duration?: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

type RawVideo = {
  video: Video;
  user: User | null;
};

interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

export default function Page() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [videos, setVideos] = useState<{ video: Video; user: User }[]>([])
  const [loading, setLoading] = useState(false)

  const {
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
    startRecording,
    stopRecording,
    resetRecording,
  } = useScreenRecording()

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await getAllVideosAction();

        const rawVideos = res.videos as RawVideo[];

        const validVideos = rawVideos
          .filter((v): v is { video: Video; user: User } => v.user !== null)
          .map(({ video, user }) => ({
            video: {
              ...video,
              duration: video.duration ?? undefined, // fix duration typing
            },
            user,
          }));

        setVideos(validVideos);
      } catch (err) {
        console.error("Failed to load videos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);


  const closeModal = () => {
    resetRecording()
    setIsOpen(false)
  }

  const handleStart = async () => {
    await startRecording()
  }

  const recordAgain = async () => {
    resetRecording()
    await startRecording()
    if (recordedVideoUrl && videoRef.current)
      videoRef.current.src = recordedVideoUrl
  }

  const goToUpload = () => {
    const videoId = uuidv4()
    if (!recordedBlob) return
    const url = URL.createObjectURL(recordedBlob)
    console.log(recordingDuration)
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        id: videoId,
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0,
      })
    )
    router.push(`/edit/${videoId}`)
    closeModal()
  }

  return (
    <div>
      <div className="px-10 py-5">
        <div className='flex justify-between h-20 w-[90vw] mx-auto items-center'>
          <h2 className="text-2xl font-bold">Video Gallery</h2>
          <Button 
            className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium' 
            onClick={() => setIsOpen(true)}
          >
            <Video className="w-5 h-5" />
            Record Video
          </Button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              {/* Spinning loader */}
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              {/* Inner pulse */}
              <div className="absolute inset-2 w-12 h-12 border-2 border-blue-100 border-t-blue-300 rounded-full animate-spin animate-reverse"></div>
            </div>
            <p className="text-gray-600 mt-4 text-lg font-medium">Loading your videos...</p>
            <p className="text-gray-400 text-sm mt-1">This may take a moment</p>
          </div>
        ) :

          videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos yet</h3>
              <p className="text-gray-500 mb-6">Create your first screen recording to get started</p>
              <Button 
                className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium' 
                onClick={() => setIsOpen(true)}
              >
                <Plus className="w-5 h-5" />
                Record Your First Video
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(({ video, user }) => (
                <VideoThumbnail key={video.id} video={video} user={user} />
              ))}
            </div>
          )}

        {/* Modal */}
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[600px]">
                <figure className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Screen Recording</h3>
                  <button onClick={closeModal} className="text-gray-500 text-lg">×</button>
                </figure>

                <section className="mb-4">
                  {isRecording ? (
                    <article className="flex items-center gap-2 text-red-600">
                      <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
                      <span>Recording in progress...</span>
                    </article>
                  ) : recordedVideoUrl ? (
                    <video
                      ref={videoRef}
                      src={recordedVideoUrl}
                      controls
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-600">Click record to start capturing your screen</p>
                  )}
                </section>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  {!isRecording && !recordedVideoUrl && (
                    <button
                      onClick={handleStart}
                      className="bg-blue-400 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-500"
                    >
                      Record
                    </button>
                  )}
                  {isRecording && (
                    <button
                      onClick={stopRecording}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Stop Recording
                    </button>
                  )}
                  {recordedVideoUrl && (
                    <>
                      <button
                        onClick={recordAgain}
                        className="bg-gray-200 cursor-pointer text-black px-4 py-2 rounded hover:bg-gray-300"
                      >
                        Record Again
                      </button>
                      <button
                        onClick={goToUpload}
                        className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Continue to Upload
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

      </div>
      <Footer />
    </div>

  )
}
