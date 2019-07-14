import * as React from 'react';
import { Stage } from 'react-konva';
import { RaceLine } from './RaceLine';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';
import { StateContext } from '../../App';

export function TrackMapPanel() {
  const state = React.useContext(StateContext);
  const { worldPositions, participantIndex } = state;

  // 20% of screen
  const canvasWidth = window.innerWidth * 0.2;

  /*
  const checkSize = () => {
    const width = this.container.offsetWidth;
    this.setState({
      stageWidth: width
    });
  };
  */

  return (
    <div
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasWidth}px`,
        border: '1px #2e2e2e solid'
      }}
    >
      {/* goes inside div
        ref={node => {
          this.container = node;
        }}
        */}
      <Stage width={canvasWidth} height={canvasWidth}>
        <RaceLine
          width={canvasWidth}
          height={canvasWidth}
          //worldPosition={centeredWorldPosition}
          worldPositions={worldPositions}
        />
      </Stage>
    </div>
  );
}
