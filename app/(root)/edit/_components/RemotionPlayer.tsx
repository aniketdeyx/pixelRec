"use client";
import React from 'react'
import { Player } from '@remotion/player';
import RemotionComposition from '@/components/RemotionComposition';

function RemotionPlayer({ videoUrl, duration }: { videoUrl: string; duration?: number }) {
  // Calculate duration in frames (default to 10 seconds if not provided)
  const fps = 30;
  const durationInSeconds = duration || 10;
  const durationInFrames = Math.ceil(durationInSeconds * fps);

  return (
    <div className="w-full h-full">
      <Player
        component={RemotionComposition}
        inputProps={{ videoUrl }}
        durationInFrames={durationInFrames}
        compositionWidth={1920}
        compositionHeight={1080}
        controls
        fps={fps}
        style={{
          width: '100%',
          height: '100%',
        }}
        clickToPlay
        loop
        showVolumeControls
        allowFullscreen
      />
    </div>
  )
}

export default RemotionPlayer