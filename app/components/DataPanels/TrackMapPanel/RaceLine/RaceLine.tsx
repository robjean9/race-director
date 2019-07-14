import * as React from 'react';
import { PureComponent } from 'react';
import { Image, Circle, FastLayer, Layer } from 'react-konva';
import { Props, State } from './types';
import { Coordinate } from '../../../types';

export class RaceLine extends PureComponent<Props, State> {
  // tslint:disable-next-line:no-any
  image: any;
  lastPointerPosition?: Coordinate;

  constructor(props: Props) {
    super(props);

    const { width, height } = this.props;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    this.state = { canvas, context };
  }

  distanceBetweenCoordinates = (
    coordinateA: Coordinate,
    coordinateB: Coordinate
  ): number => {
    const a = coordinateA.x - coordinateB.x;
    const b = coordinateA.y - coordinateB.y;
    return Math.sqrt(a * a + b * b);
  };

  drawToCoordinate = (coordinate: Coordinate) => {
    const { context } = this.state;

    if (!this.image) {
      return;
    }

    if (
      !this.lastPointerPosition ||
      this.distanceBetweenCoordinates(this.lastPointerPosition, coordinate) > 5
    ) {
      this.lastPointerPosition = coordinate;
    }

    // TODO: Don't always get a new context
    context.strokeStyle = '#ffffff';
    context.lineJoin = 'round';
    context.lineWidth = 2;
    context.globalCompositeOperation = 'source-over';
    context.beginPath();

    let localPos = {
      x: this.lastPointerPosition.x - this.image.x(),
      y: this.lastPointerPosition.y - this.image.y()
    };
    context.moveTo(localPos.x, localPos.y);

    localPos = {
      x: coordinate.x - this.image.x(),
      y: coordinate.y - this.image.y()
    };
    context.lineTo(localPos.x, localPos.y);
    context.closePath();
    context.stroke();

    this.lastPointerPosition = coordinate;
    this.image.getLayer().draw();
  };

  render() {
    const { worldPositions, width, height } = this.props;
    const { canvas } = this.state;

    /*
    for (var i = 0; i < worldPositions.length; i++) {
      this.drawToCoordinate(worldPositions[i]);
    }
    */

    return (
      <Layer hitGraphEnabled={false}>
        <Image
          image={canvas}
          // tslint:disable-next-line:no-any
          ref={(node: any) => (this.image = node)}
          width={width}
          height={height}
        />
        {worldPositions.map((worldPosition, index) => (
          <Circle
            key={index}
            x={worldPosition.x + width / 2}
            y={worldPosition.y + width / 2}
            fill={'red'}
            stroke={'black'}
            strokeWidth={4}
            radius={4}
          />
        ))}
      </Layer>
    );
  }
}
