"use client";

import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useScreenRecording } from "@/lib/hooks/useScreenRecording";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { is } from "drizzle-orm";

const RecordScreen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const goToUpload = () => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    sessionStorage.setItem(
      "recordedVideo",
      JSON.stringify({
        url,
        name: "screen-recording.webm",
        type: recordedBlob.type,
        size: recordedBlob.size,
        duration: recordingDuration || 0
      })
    );
    router.push("/upload");
    closeModal();
  };

  const {
    resetRecording,
    stopRecording,
    startRecording,
    isRecording,
    recordedBlob,
    recordedVideoUrl,
    recordingDuration,
  } = useScreenRecording();

  const closeModal = () => {
    resetRecording();
    setIsOpen(false);
  };

  const handleStart = async () => {
    await startRecording(true);

  };

  const recordAgain = async () => {
    resetRecording();
    await startRecording(true);

    if (recordedVideoUrl && videoRef.current) {
      videoRef.current.src = recordedVideoUrl;
    }
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} className="bg-blue-800 text-white">
        Record a video
      </Button>

      {isOpen && (
        <div onClick={() => {
          if (!isRecording) closeModal();
        }} className="fixed inset-0 z-50 bg-white/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
          <div onClick={(e) => e.stopPropagation()}  className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">

            <h2 className="text-xl font-semibold mb-4">Screen Recorder</h2>
            <Button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </Button>

            <section>
              {isRecording ? (
                <article>
                  <div />
                  <span>Recording in progress...</span>
                </article>
              ) : recordedVideoUrl ? (
                <video ref={videoRef} src={recordedVideoUrl} controls />
              ) : (
                <p>Click record to start capturing your screen</p>
              )}
            </section>

            <div className="flex flex-wrap gap-3 justify-end">
              {!isRecording && !recordedVideoUrl && (
                <Button onClick={handleStart} className="bg-green-600 text-white">
                  Start Recording
                </Button>
              )}

              {isRecording && (
                <Button onClick={stopRecording} className="record-stop">

                  Stop Recording
                </Button>
              )}
              {recordedVideoUrl && (
                <>
                  <Button onClick={recordAgain} className="record-again">
                    Record Again
                  </Button>
                  <Button onClick={goToUpload} className="record-upload">

                    Continue to Upload
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordScreen;
