export interface ISession {
  PARTICIPANTS?: IPacketParticipantsData[];
  CAR_TELEMETRY?: IPacketCarTelemetryData[];
  LAP_DATA?: IPacketLapData[];
}

export interface IState {
  // lap x time
  currentLapTimes: number[][];
  // lap x speed
  currentPlayerSpeeds: number[][];
  currentLapNumber: number;
  sessionStarted: boolean;
}

interface IPacketLapData {
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

interface IPacketParticipantsData {
  m_numCars: number;
  m_participants: IParticipantData[];
}

interface IPacketCarTelemetryData {
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
