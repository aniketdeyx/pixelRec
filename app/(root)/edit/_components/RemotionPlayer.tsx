"use client";
import React from 'react'
import { Player } from '@remotion/player';
import RemotionComposition from '@/components/RemotionComposition';

function RemotionPlayer({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="w-full h-full">
      <Player
        component={RemotionComposition}
        inputProps={{ videoUrl }}
        durationInFrames={300} // Increased for longer videos
        compositionWidth={1920}
        compositionHeight={1080}
        controls
        fps={30}
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