import * as React from 'react';
import { PureComponent } from 'react';
import { Image } from 'react-konva';
import { IState } from './types';

export default class RaceLine extends PureComponent<any, IState> {
  image;
  lastPointerPosition;

  constructor(props) {
    super(props);

    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext('2d');

    //this.lastPointerPosition = { x: 0, y: 0 };
    this.state = { canvas, context, mode: undefined };

    //this.setState({ canvas, context });
  }

  /*
  componentDidMount() {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    this.setState({ canvas, context });
  }
  */

  drawToCoordinate = coordinate => {
    const { context, mode } = this.state;

    if (!this.image) {
      return;
    }

    if (!this.lastPointerPosition) {
      this.lastPointerPosition = coordinate;
    }

    // TODO: Don't always get a new context
    context.strokeStyle = '#000000';
    //context.lineJoin = 'round';
    context.lineWidth = 2;

    if (mode === 'brush') {
      context.globalCompositeOperation = 'source-over';
    } else if (mode === 'eraser') {
      context.globalCompositeOperation = 'destination-out';
    }
    context.beginPath();

    var localPos = {
      x: this.lastPointerPosition.x - this.image.x(),
      y: this.lastPointerPosition.y - this.image.y()
    };
    context.moveTo(localPos.x, localPos.y);

    // TODO: improve
    //const stage = this.image.parent.parent;
    //var pos = stage.getPointerPosition();
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
    const { worldPosition } = this.props;
    const { canvas } = this.state;
    this.drawToCoordinate(worldPosition);
    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={500}
        height={500}
        stroke="blue"
      />
    );
  }
}
