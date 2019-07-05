import { Telemetry, Participant } from '../types';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';

export interface Props {
  // time x telemetry
  telemetryMatrix: Telemetry[][];
  // tslint:disable-next-line:no-any
  currentPlayerSpeeds: any;
  // world positions
  currentWorldPosition: Coordinate;
  currentLapNumber: number;
  currentTrackId: number;
  // tslint:disable-next-line:no-any
  currentParticipants: any[];
  onParticipantChange: (participant: Participant) => void;
}
