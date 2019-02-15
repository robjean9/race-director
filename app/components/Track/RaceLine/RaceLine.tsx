import * as React from 'react';
import { PureComponent } from 'react';
import { Image } from 'react-konva';
import { IProps, IState, ICoordinate } from './types';

export default class RaceLine extends PureComponent<IProps, IState> {
  image;
  lastPointerPosition;

  constructor(props) {
    super(props);

    const { width, height } = this.props;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    this.state = { canvas, context };
  }

  drawToCoordinate = (coordinate: ICoordinate) => {
    const { context } = this.state;

    if (!this.image) {
      return;
    }

    if (!this.lastPointerPosition) {
      this.lastPointerPosition = coordinate;
    }

    // TODO: Don't always get a new context
    context.strokeStyle = '#000000';
    context.lineJoin = 'round';
    context.lineWidth = 2;
    context.globalCompositeOperation = 'source-over';
    context.beginPath();

    var localPos = {
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
    const { worldPosition, width, height } = this.props;
    const { canvas } = this.state;

    this.drawToCoordinate(worldPosition);

    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={width}
        height={height}
        stroke="blue"
      />
    );
  }
}
