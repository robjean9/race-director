export interface IState {
  canvas: any;
  context: any;
}

export interface IProps {
  width: number;
  height: number;
  worldPosition: ICoordinate;
}

export interface ICoordinate {
  x: number;
  y: number;
}
