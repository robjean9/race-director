import { Team } from 'f1-telemetry-client/build/src/constants/types';

export interface State {
  // time x lap
  lapTimes: number[][];
  currentLapTime: number;
  // tslint:disable-next-line:no-any
  currentPlayerSpeeds: any;
  // world positions
  currentWorldPosition: Coordinate;
  currentLapNumber: number;
  sessionStarted: boolean;
  currentTrackId: number;
  // tslint:disable-next-line:no-any
  currentParticipants: any[];
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
