import { Telemetry } from '../../types';

export interface Props {
  telemetryMatrix: Telemetry[][];
  // tslint:disable-next-line:no-any
  currentPlayerSpeeds: any;
  // tslint:disable-next-line:no-any
  currentLapNumber: any;
}
