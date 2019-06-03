import { Telemetry, TelemetryType } from '../../../types';

export interface Props {
  // tslint:disable-next-line:no-any
  currentLapNumber: any;
  // tslint:disable-next-line:no-any
  currentPlayerSpeeds: any;
  xAxisData: number[];
  telemetryType: TelemetryType;
  title: string;
  telemetryMatrix: Telemetry[][];
}
