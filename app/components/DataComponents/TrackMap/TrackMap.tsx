import * as React from 'react';
import { PureComponent } from 'react';

import { Stage } from 'react-konva';
import { Props } from './types';
import { RaceLine } from './RaceLine';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';

export class TrackMap extends PureComponent<Props> {
  render() {
    const { worldPosition } = this.props;

    // 30% of screen
    const windowWidth = window.innerWidth;
    const canvasWidth = windowWidth * 0.2;

    const centeredWorldPosition: Coordinate = {
      x: worldPosition.x + canvasWidth / 2,
      y: worldPosition.y + canvasWidth / 2
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
}
