import { State } from './types';
import {
  getCurrentParticipants,
  getCurrentWorldPosition
} from './transformations';

export const actions = {
  SESSION_RESTART: 'Session Restart',
  SESSION_STARTED: 'Session Started',
  UPDATE_TRACK: 'Update Track',
  UPDATE_PARTICIPANTS: 'Update Participants',
  UPDATE_TRACK_ID: 'Update Track Id',
  UPDATE_CAR_TELEMETRY: 'Update Car Telemetry',
  UPDATE_CURRENT_LAP_TIME: 'Update Current Lap Time',
  UPDATE_PARTICIPANT: 'Update Participant'
};

export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case actions.SESSION_RESTART:
      return { ...state, ...action.initialState };

    case actions.UPDATE_TRACK:
      const currentWorldPosition = getCurrentWorldPosition(
        action.motionPacket,
        state.participantIndex
      );
      return { ...state, currentWorldPosition };

    case actions.UPDATE_PARTICIPANTS:
      if (!state.currentParticipants || state.currentParticipants.length > 0) {
        return state;
      }
      const currentParticipants = getCurrentParticipants(
        action.participantsPacket.m_participants
      );
      return { ...state, currentParticipants };

    case actions.UPDATE_TRACK_ID:
      return { ...state, currentTrackId: action.trackId };

    case actions.SESSION_STARTED:
      return { ...state, sessionStarted: true };

    case actions.UPDATE_CAR_TELEMETRY:
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

      const updatedTelemetryMatrix = state.telemetryMatrix;

      updatedTelemetryMatrix[state.currentLapTime][state.currentLapNumber] = {
        speed: playerTelemetry.m_speed,
        engineRPM: playerTelemetry.m_engineRPM,
        gear: playerTelemetry.m_gear,
        throttle: playerTelemetry.m_throttle,
        brake: playerTelemetry.m_brake,
        steer: playerTelemetry.m_steer
      };

      return { ...state, telemetryMatrix: updatedTelemetryMatrix };

    case actions.UPDATE_CURRENT_LAP_TIME:
      const currentLapNumber =
        action.lapTimePacket.m_lapData[state.participantIndex].m_currentLapNum -
        1;

      // this gives us an integer representing the current lap time, in ms
      const currentLapTime = Math.round(
        action.lapTimePacket.m_lapData[state.participantIndex]
          .m_currentLapTime * 1e3
      );

      return { ...state, currentLapTime, currentLapNumber };

    case actions.UPDATE_PARTICIPANT:
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
