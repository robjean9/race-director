import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';

export interface State {
  // tslint:disable-next-line:no-any
  canvas: any;
  // tslint:disable-next-line:no-any
  context: any;
}

export interface Props {
  width: number;
  height: number;
  worldPositions: Coordinate[];
}
