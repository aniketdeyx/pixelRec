import { Video } from '@imagekit/next';
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-4xl p-4  rounded-xl shadow-md ">
        <Video
          urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
          src={videoUrl}
          width={640}
          height={360}
          controls
          className="rounded-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
