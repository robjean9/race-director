import * as React from 'react';
import { PureComponent } from 'react';
import { Stage } from 'react-konva';
import { Props } from './types';
import { RaceLine } from './RaceLine';
import { Coordinate } from './RaceLine/types';

const WIDTH = 400;
const HEIGHT = 400;

export class Track extends PureComponent<Props> {
  render() {
    const { worldPosition } = this.props;

    const centeredWorldPosition: Coordinate = {
      x: worldPosition.x + WIDTH / 2,
      y: worldPosition.y + HEIGHT / 2
    };

    return (
      <Stage
        style={{
          flexBasis: 'auto',
          width: `${WIDTH}px`,
          minWidth: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          minHeight: `${HEIGHT}px`,
          border: '1px black solid'
        }}
      >
        <RaceLine
          width={WIDTH}
          height={HEIGHT}
          worldPosition={centeredWorldPosition}
        />
      </Stage>
    );
  }
}
