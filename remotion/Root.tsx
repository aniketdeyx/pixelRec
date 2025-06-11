import React from 'react';
import {Composition} from 'remotion';
import RemotionComposition from '../components/RemotionComposition';
 
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={RemotionComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};