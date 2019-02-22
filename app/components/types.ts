import { ICoordinate } from './Track/RaceLine/types';

export interface IDriver {
  firstName: string;
  lastName: string;
  abbreviation: string;
}

export interface IState {
  // lap x time
  currentLapTimes: number[][];
  currentLapTime: number;
  // lap x speed
  currentPlayerSpeeds: any;
  // world positions
  currentWorldPosition: ICoordinate;
  currentLapNumber: number;
  sessionStarted: boolean;
  currentTrackId: number;
  currentParticipants: any[];
  participantIndex: number;
}

// TODO: Move typings to f1-telemetry-client
export interface ISession {
  PARTICIPANTS?: IPacketParticipantsData[];
  CAR_TELEMETRY?: IPacketCarTelemetryData[];
  LAP_DATA?: IPacketLapData[];
}

export interface IPacketMotionData {
  m_header: IPacketHeader;
  m_carMotionData: IMotionData[];
}

export interface IMotionData {
  m_worldPositionX: number;
  m_worldPositionY: number;
  m_worldPositionZ: number;
  m_worldVelocityX: number;
  m_worldVelocityY: number;
  m_worldVelocityZ: number;
  m_worldForwardDirX: number;
  m_worldForwardDirY: number;
  m_worldForwardDirZ: number;
  m_worldRightDirX: number;
  m_worldRightDirY: number;
  m_worldRightDirZ: number;
  m_gForceLateral: number;
  m_gForceLongitudinal: number;
  m_gForceVertical: number;
  m_yaw: number;
  m_pitch: number;
  m_roll: number;
}

export interface IPacketLapData {
  m_header: IPacketHeader;
  m_lapData: ILapData[];
}

export interface ILapData {
  m_lastLapTime: number;
  m_currentLapTime: number;
  m_bestLapTime: number;
  m_sector1Time: number;
  m_sector2Time: number;
  m_lapDistance: number;
  m_totalDistance: number;
  m_safetyCarDelta: number;
  m_carPosition: number;
  m_currentLapNum: number;
  m_pitStatus: number;
  m_sector: number;
  m_currentLapInvalid: number;
  m_penalties: number;
  m_gridPosition: number;
  m_driverStatus: number;
  m_resultStatus: number;
}

export interface IPacketParticipantsData {
  m_header: IPacketHeader;
  m_numCars: number;
  m_participants: IParticipantData[];
}

export interface IPacketCarTelemetryData {
  m_header: IPacketHeader;
  m_buttonStatus: number;
  m_carTelemetryData: ICarTelemetryData[];
}

interface IPacketHeader {
  m_packetFormat: number;
  m_packetVersion: number;
  m_packetId: number;
  m_sessionUID: number;
  m_sessionTime: number;
  m_frameIdentifier: number;
  m_playerCarIndex: number;
}

export interface ICarTelemetryData {
  m_speed: number;
  m_throttle: number;
  m_steer: number;
  m_brake: number;
  m_clutch: number;
  m_gear: number;
  m_tyresPressure: number[];
  m_brakesTemperature: number[];
  m_tyresSurfaceTemperature: number[];
  m_tyresInnerTemperature: number[];
  m_engineRPM: number;
  m_drs: number;
  m_revLightsPercent: number;
  m_engineTemperature: number;
}

interface IParticipantData {
  m_aiControlled: number;
  m_driverId: number;
  m_name: string;
  m_nationality: number;
  m_raceNumber: number;
  m_teamId: number;
}
