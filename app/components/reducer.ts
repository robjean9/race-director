import { State } from './types';
import {
  getCurrentParticipants,
  getCurrentWorldPosition
} from './transformations';

export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'SESSION_RESTART':
      return { ...state, ...action.initialState };

    case 'UPDATE_TRACK':
      const currentWorldPosition = getCurrentWorldPosition(
        action.motionPacket,
        state.participantIndex
      );
      return { ...state, currentWorldPosition };

    case 'UPDATE_PARTICIPANTS':
      const currentParticipants = getCurrentParticipants(
        action.participantsPacket.m_participants
      );
      return { ...state, currentParticipants };

    case 'UPDATE_TRACK_ID':
      return { ...state, currentTrackId: action.trackId };

    case 'SESSION_STARTED':
      return { ...state, sessionStarted: true };

    case 'UPDATE_CAR_TELEMETRY':
      const playerTelemetry =
        action.carTelemetryPacket.m_carTelemetryData[state.participantIndex];

      if (!state.telemetryMatrix) {
        return state;
      }

      if (!state.telemetryMatrix[state.currentLapTime]) {
        state.telemetryMatrix[state.currentLapTime] = [];
      }

      if (
        !state.telemetryMatrix[state.currentLapTime][state.currentLapNumber]
      ) {
        state.telemetryMatrix[state.currentLapTime][
          state.currentLapNumber
        ] = {};
      }

      const updatedTelemetryMatrix = state.telemetryMatrix.slice();

      updatedTelemetryMatrix[state.currentLapTime][state.currentLapNumber] = {
        speed: playerTelemetry.m_speed,
        engineRPM: playerTelemetry.m_engineRPM,
        gear: playerTelemetry.m_gear,
        throttle: playerTelemetry.m_throttle,
        brake: playerTelemetry.m_brake,
        steer: playerTelemetry.m_steer
      };

      return { ...state, telemetryMatrix: updatedTelemetryMatrix };

    case 'UPDATE_CURRENT_LAP_TIME':
      const currentLapNumber =
        action.lapTimePacket.m_lapData[state.participantIndex].m_currentLapNum -
        1;

      // this gives us an integer representing the current lap time, in ms
      const currentLapTime = Math.round(
        action.lapTimePacket.m_lapData[state.participantIndex]
          .m_currentLapTime * 1e3
      );

      const currentLapTimes = state.telemetryMatrix.slice();
      currentLapTimes[currentLapTime] = [];

      return { ...state, currentLapTimes, currentLapTime, currentLapNumber };

    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        telemetryMatrix: [],
        currentPlayerSpeeds: [],
        currentWorldPosition: { x: 0, y: 0 },
        participantIndex: action.participant.index,
        currentLapNumber: 0
      };

    default:
      throw new Error();
  }
};
