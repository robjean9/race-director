export interface State {
  // tslint:disable-next-line:no-any
  canvas: any;
  // tslint:disable-next-line:no-any
  context: any;
}

export interface Props {
  width: number;
  height: number;
  worldPosition: Coordinate;
}

export interface Coordinate {
  x: number;
  y: number;
}
