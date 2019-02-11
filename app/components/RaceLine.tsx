import * as React from 'react';
import { PureComponent } from 'react';
import { Stage, Layer, Shape } from 'react-konva';

export default class MyRect extends PureComponent<any, any> {
  drawRaceLine = () => {
    const { worldPositions } = this.props;
    return (
      <Shape
        fill="#00D2FF"
        draggable
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(window.innerWidth / 2, window.innerHeight / 2);
          worldPositions.forEach(lap => {
            lap.forEach(worldPosition => {
              context.lineTo(
                // custom transformations to draw data
                worldPosition.posY / 5 + window.innerHeight / 2,
                -worldPosition.posX / 5 + window.innerWidth / 2
              );
            });
          });
          context.stroke();
        }}
      />
    );
  };

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>{this.drawRaceLine()}</Layer>
      </Stage>
    );
  }
}
