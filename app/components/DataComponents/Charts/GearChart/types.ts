import { Telemetry } from '../../../types';

export interface Props {
  telemetryMatrix: Telemetry[][];
  // tslint:disable-next-line:no-any
  currentLapNumber: any;
  // tslint:disable-next-line:no-any
  currentPlayerSpeeds: any;
  xAxisData: number[];
}
