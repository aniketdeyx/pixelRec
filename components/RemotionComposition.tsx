import React from 'react'
import { AbsoluteFill, Video } from 'remotion'

function RemotionComposition({ videoUrl }: { videoUrl: string }) {
    return (
        <AbsoluteFill style={{ backgroundColor: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video src={videoUrl} />
        </AbsoluteFill>
    )
}

export default RemotionComposition