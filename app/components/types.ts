import { Team } from 'f1-telemetry-client/build/src/constants/types';

export interface State {
  // time x telemetry
  // tslint:disable-next-line:no-any
  telemetryMatrix: any; //Telemetry[][];
  currentLapTime: number;
  // tslint:disable-next-line:no-any
  currentPlayerSpeeds: any;
  // world positions
  currentWorldPosition: Coordinate;
  currentLapNumber: number;
  sessionStarted: boolean;
  currentTrackId: number;
  // tslint:disable-next-line:no-any
  currentParticipants: any;
  participantIndex: number;
}

export interface Participant {
  team: Team;
  abbreviation: string;
  firstName: string;
  lastName: string;
  index: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Telemetry {
  speed?: number;
  engineRPM?: number;
  gear?: number;
  throttle?: number;
  brake?: number;
  steer?: number;
}

export enum TelemetryType {
  Speed = 'speed',
  EngineRPM = 'engineRPM',
  Gear = 'gear',
  Throttle = 'throttle',
  Brake = 'brake',
  Steer = 'steer'
}
