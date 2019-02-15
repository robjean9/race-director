import * as React from 'react';
import { PureComponent } from 'react';
import { Stage, Layer } from 'react-konva';
import { IProps } from './types';
import { TRACKS } from '../../constants/f1client';
import RaceLine from './RaceLine';

const WIDTH = 350;
const HEIGHT = 350;

export default class Track extends PureComponent<IProps, undefined> {
  render() {
    const { trackId, worldPosition } = this.props;

    if (trackId !== undefined) {
      console.log(TRACKS[trackId]);
    }

    return (
      <Stage
        width={WIDTH}
        height={HEIGHT}
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          border: '1px red solid'
        }}
      >
        <Layer>
          <RaceLine
            width={WIDTH}
            height={HEIGHT}
            worldPosition={worldPosition}
          />
        </Layer>
      </Stage>
    );
  }
}
