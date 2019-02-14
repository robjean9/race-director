import * as React from 'react';
import { PureComponent } from 'react';
import { Stage, Layer } from 'react-konva';
import { IProps } from './types';
import RaceLine from './RaceLine/RaceLine';

export default class Track extends PureComponent<IProps, any> {
  render() {
    const { worldPosition } = this.props;
    return (
      <Stage width={1500} height={1500} style={{ border: '1px red solid' }}>
        <Layer>
          <RaceLine worldPosition={worldPosition} />
        </Layer>
      </Stage>
    );
  }
}

/*
export default class MyRect extends PureComponent<any, any> {
  lastWorldPosition: number[];

  drawRaceLine = () => {
    const { worldPosition } = this.props;
    return (
      <Shape
        fill="#00D2FF"
        draggable
        sceneFunc={(context, shape) => {
          //context.strokeStyle = '#df4b26';
          //context.lineJoin = 'round';
          //context.lineWidth = 5;

          shape.globalCompositeOperation('source-over');

          context.beginPath();
          if (this.lastWorldPosition) {
            context.moveTo(0, 0);
          }
          context.lineTo(worldPosition[0], worldPosition[1]);
          context.closePath();
          context.stroke();

          this.lastWorldPosition = worldPosition;
        }}
      />
    );
  };

  render() {
    return (
      <Stage width={300} height={500} style={{ border: '1px red solid' }}>
        <Layer>{this.drawRaceLine()}</Layer>
      </Stage>
    );
  }
}
*/
