"use client";
import React from 'react'
import { Player } from '@remotion/player';
import RemotionComposition from '@/components/RemotionComposition';
function RemotionPlayer({ videoUrl }: { videoUrl: string }) {
  return (
    <div>
        <div>
            <Player
      component={RemotionComposition}
      inputProps={{ videoUrl }}
      durationInFrames={120}
      compositionWidth={700}
      compositionHeight={400}
      controls
      fps={30}
    />

        </div>
    </div>
  )
}

export default RemotionPlayer