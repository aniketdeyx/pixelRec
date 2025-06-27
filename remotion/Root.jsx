import {Composition} from 'remotion';
import RemotionComposition from '../components/RemotionComposition';
 
export const RemotionRoot = () => {
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