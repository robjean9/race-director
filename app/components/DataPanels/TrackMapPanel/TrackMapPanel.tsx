import * as React from 'react';
import { Stage } from 'react-konva';
import { RaceLine } from './RaceLine';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';
import { StateContext } from '../../App';

export function TrackMapPanel() {
  //const { worldPosition } = props;

  const state = React.useContext(StateContext);
  const { currentWorldPosition } = state;

  // 30% of screen
  const windowWidth = window.innerWidth;
  const canvasWidth = windowWidth * 0.2;

  const centeredWorldPosition: Coordinate = {
    x: currentWorldPosition.x + canvasWidth / 2,
    y: currentWorldPosition.y + canvasWidth / 2
  };

  return (
    <Stage
      width={canvasWidth}
      height={canvasWidth}
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasWidth}px`,
        border: '1px #2e2e2e solid'
      }}
    >
      <RaceLine
        width={canvasWidth}
        height={canvasWidth}
        worldPosition={centeredWorldPosition}
      />
    </Stage>
  );
}
