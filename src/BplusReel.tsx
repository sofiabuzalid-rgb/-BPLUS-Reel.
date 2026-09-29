import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import './components/fonts';
import {COLORS} from './copy';
import {SHOT_STARTS, TIMELINE, type Shot} from './timeline';
import {EndShotView, GridShotView, PhotoShotView, SplitShotView} from './components/Shots';
import {BigLine, OpenMark} from './components/Type';
import {Analog, Flash, Grain, useGateWeave} from './components/Film';

const ShotView: React.FC<{shot: Shot}> = ({shot}) => {
  switch (shot.kind) {
    case 'photo':
      return <PhotoShotView shot={shot} />;
    case 'split':
      return <SplitShotView shot={shot} />;
    case 'grid':
      return <GridShotView shot={shot} />;
    case 'end':
      return <EndShotView shot={shot} />;
  }
};

// Type sits on specific shots: the opening close-up and the first hero.
const OPEN_SHOT = 0;
const HERO_SHOT = TIMELINE.findIndex((s) => s.kind === 'photo' && s.slot === 'HERO_B');

export const BplusReel: React.FC = () => {
  const weave = useGateWeave();
  const isEnd = (i: number) => TIMELINE[i].kind === 'end';

  return (
    <AbsoluteFill style={{background: COLORS.ink}}>
      <AbsoluteFill style={{transform: weave}}>
        {TIMELINE.map((shot, i) => (
          <Sequence key={i} from={SHOT_STARTS[i]} durationInFrames={shot.dur} layout="none">
            <AbsoluteFill>
              <ShotView shot={shot} />
              {/* the end card stays clean: no vignette/flicker, grain only */}
              {!isEnd(i) && shot.kind !== 'grid' && <Analog />}
              {shot.flash && <Flash />}
            </AbsoluteFill>
          </Sequence>
        ))}

        <Sequence from={SHOT_STARTS[OPEN_SHOT]} durationInFrames={TIMELINE[OPEN_SHOT].dur}>
          <OpenMark />
        </Sequence>
        <Sequence from={SHOT_STARTS[HERO_SHOT] + 6} durationInFrames={TIMELINE[HERO_SHOT].dur - 6}>
          <BigLine />
        </Sequence>
      </AbsoluteFill>

      <Grain />
    </AbsoluteFill>
  );
};
