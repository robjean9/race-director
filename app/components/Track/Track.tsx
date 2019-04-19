import * as React from 'react';
import { PureComponent } from 'react';

import { Stage } from 'react-konva';
import { Props } from './types';
import { RaceLine } from './RaceLine';
import { Coordinate } from './RaceLine/types';

export class Track extends PureComponent<Props> {
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
          border: '1px black solid'
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
