import * as React from 'react';
import { PureComponent } from 'react';
import { Stage } from 'react-konva';
import { IProps } from './types';
import RaceLine from './RaceLine';
import { ICoordinate } from './RaceLine/types';

const WIDTH = 400;
const HEIGHT = 400;

export default class Track extends PureComponent<IProps> {
  render() {
    const { worldPosition } = this.props;

    const centeredWorldPosition: ICoordinate = {
      x: worldPosition.x + WIDTH / 2,
      y: worldPosition.y + HEIGHT / 2
    };

    return (
      <Stage
        width={WIDTH}
        height={HEIGHT}
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
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
