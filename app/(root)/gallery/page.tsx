'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useScreenRecording } from "@/lib/hooks/useScreenRecording"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from 'next/navigation'
import { getAllVideosAction } from "@/actions/upload"
import VideoThumbnail from "@/components/VideoThumbnail"

export default function Page() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [videos, setVideos] = useState<{ video: any; user: any }[]>([])

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
      const res = await getAllVideosAction()
      setVideos(res.videos)
    }
    fetchVideos()
  }, [])    

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
    <div className="p-10">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-10">Video Gallery</h2>
        <Button className='bg-blue-400' onClick={() => setIsOpen(true)}>Record Video</Button>
      </div>

      {videos.length === 0 ? (
        <p>No videos available.</p>
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
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
                      className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
                    >
                      Record Again
                    </button>
                    <button
                      onClick={goToUpload}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
  )
}
