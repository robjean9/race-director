import * as React from 'react';
import { PureComponent } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { IState, IProps } from './types';

class Drawing extends PureComponent<any, IState> {
  image;
  accumulator;
  lastPointerPosition;

  constructor(props) {
    super(props);

    this.state = { canvas: undefined, context: undefined, mode: undefined };

    this.lastPointerPosition = { x: 0, y: 0 };
    this.accumulator = 5;

    setInterval(() => {
      this.accumulator = this.accumulator + 5;
      console.log('interval!');
      this.drawToCoordinate({
        x: this.accumulator,
        y: this.accumulator
      });
    }, 2000);
  }

  componentDidMount() {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    this.setState({ canvas, context });
  }

  drawToCoordinate = coordinate => {
    const { context, mode } = this.state;

    // TODO: Don't always get a new context
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 5;

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
    const { canvas } = this.state;
    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={300}
        height={300}
        stroke="blue"
      />
    );
  }
}

export default class RaceLine extends PureComponent<IProps, any> {
  render() {
    return (
      <Stage width={500} height={500} style={{ border: '1px red solid' }}>
        <Layer>
          <Drawing />
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
