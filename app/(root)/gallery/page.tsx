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
  image?: string; // Add the image field
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
      <div className="px-10 py-8">
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-[90vw] mx-auto mb-8'>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Video Gallery</h2>
            <p className="text-gray-600">Manage and share your screen recordings</p>
          </div>
          <Button 
            className='bg-gradient-to-r from-[#0077b6] to-[#0096c7] hover:from-[#023e8a] hover:to-[#48cae4] cursor-pointer text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-semibold transform hover:-translate-y-1' 
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
              {videos.map(({ video, user }) => (
                <VideoThumbnail key={video.id} video={video} user={user} />
              ))}
            </div>
          )}

        {/* Modal */}
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={closeModal} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-[650px] ring-1 ring-gray-200">
                <figure className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Screen Recording</h3>
                  <button 
                    onClick={closeModal} 
                    className="text-gray-400 hover:text-gray-600 text-2xl font-light hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </figure>

                <section className="mb-6">
                  {isRecording ? (
                    <article className="flex items-center justify-center gap-3 text-red-600 bg-red-50 p-6 rounded-xl border border-red-200">
                      <div className="h-4 w-4 rounded-full bg-red-600 animate-pulse" />
                      <span className="font-semibold text-lg">Recording in progress...</span>
                      <div className="ml-2 text-sm text-red-500">
                        {Math.floor(recordingDuration || 0)}s
                      </div>
                    </article>
                  ) : recordedVideoUrl ? (
                    <div className="space-y-4">
                      <video
                        ref={videoRef}
                        src={recordedVideoUrl}
                        controls
                        className="w-full rounded-xl shadow-lg ring-1 ring-gray-200"
                      />
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-green-800 font-medium">✓ Recording completed successfully!</p>
                        <p className="text-green-600 text-sm mt-1">Duration: {Math.floor(recordingDuration || 0)} seconds</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Video className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-gray-600 text-lg font-medium mb-2">Ready to record your screen</p>
                      <p className="text-gray-500 text-sm">Click the record button below to start capturing</p>
                    </div>
                  )}
                </section>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  {!isRecording && !recordedVideoUrl && (
                    <button
                      onClick={handleStart}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 justify-center"
                    >
                      <Video className="w-5 h-5" />
                      Start Recording
                    </button>
                  )}
                  {isRecording && (
                    <button
                      onClick={stopRecording}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 justify-center"
                    >
                      <div className="w-4 h-4 rounded-sm bg-white" />
                      Stop Recording
                    </button>
                  )}
                  {recordedVideoUrl && (
                    <>
                      <button
                        onClick={recordAgain}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 transition-all duration-200 flex items-center gap-2 justify-center"
                      >
                        <Video className="w-4 h-4" />
                        Record Again
                      </button>
                      <button
                        onClick={goToUpload}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 justify-center"
                      >
                        <Plus className="w-4 h-4" />
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
