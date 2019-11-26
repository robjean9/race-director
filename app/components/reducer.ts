import { State } from './types';
import { getCurrentParticipants, getXAxisData } from './transformations';

export const actions = {
  SESSION_RESTART: 'Session Restart',
  SESSION_STARTED: 'Session Started',
  UPDATE_TRACK: 'Update Track',
  UPDATE_PARTICIPANTS: 'Update Participants',
  UPDATE_TRACK_ID: 'Update Track Id',
  UPDATE_CAR_TELEMETRY: 'Update Car Telemetry',
  UPDATE_CAR_STATUS: 'Update Car Status',
  UPDATE_CURRENT_LAP_TIME: 'Update Current Lap Time',
  UPDATE_PARTICIPANT: 'Update Participant'
};
console.log('teste');
export const reducer = (state: State, action: any) => {
  switch (action.type) {
    case actions.SESSION_RESTART:
      return { ...state, ...action.initialState };

    case actions.UPDATE_TRACK:
      const worldPositions = action.motionPacket.m_carMotionData.map(
        (motionData: any) => ({
          x: motionData.m_worldPositionX / 6,
          y: motionData.m_worldPositionZ / 6
        })
      );

      return { ...state, worldPositions };

    case actions.UPDATE_PARTICIPANTS:
      const participantList = state.participants.participantList;

      if (!participantList || participantList.length > 0) {
        return state;
      }

      const currentParticipants = getCurrentParticipants(
        action.participantsPacket.m_participants
      );

      return {
        ...state,
        participants: {
          ...state.participants,
          participantList: currentParticipants
        }
      };

    case actions.UPDATE_TRACK_ID:
      return { ...state, currentTrackId: action.trackId };

    case actions.SESSION_STARTED:
      return { ...state, sessionStarted: true };

    case actions.UPDATE_CAR_STATUS:
      const currentParticipant = state.participants.selectedParticipant;

      // grabs tyres wear of current participant
      const tyresWear =
        action.carStatusPacket.m_carStatusData[currentParticipant].m_tyresWear;

      const tyreCompound =
        action.carStatusPacket.m_carStatusData[currentParticipant]
          .m_actualTyreCompound;

      const fuelMix = 
        action.carStatusPacket.m_carStatusData[currentParticipant].m_fuelMix;


      const drsAllowed = 
        action.carStatusPacket.m_carStatusData[currentParticipant]
        .m_drsAllowed;

      const ersMode = 
        action.carStatusPacket.m_carStatusData[currentParticipant]
        .m_ersDeployMode;

      return { ...state, tyresWear, tyreCompound, drsAllowed, fuelMix, ersMode};

    case actions.UPDATE_CAR_TELEMETRY:
      const playerTelemetry =
        action.carTelemetryPacket.m_carTelemetryData[
          state.participants.selectedParticipant
        ];

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

      const {
        m_speed,
        m_engineRPM,
        m_gear,
        m_throttle,
        m_brake,
        m_steer,
        m_brakesTemperature,
        m_tyresSurfaceTemperature,
        m_drs
      } = playerTelemetry;

      updatedTelemetryMatrix[state.currentLapTime][state.currentLapNumber] = {
        speed: m_speed,
        engineRPM: m_engineRPM,
        gear: m_gear,
        throttle: m_throttle * 100,
        brake: m_brake * 100,
        steer: m_steer
      };

      const xAxisData = getXAxisData(updatedTelemetryMatrix);

      const brakesTemperature = m_brakesTemperature;

      const tyresSurfaceTemperature = m_tyresSurfaceTemperature;
      
      const drsStatus = m_drs;

      return {
        ...state,
        xAxisData,
        telemetryMatrix: updatedTelemetryMatrix,
        brakesTemperature,
        tyresSurfaceTemperature,
        drsStatus
      };

    case actions.UPDATE_CURRENT_LAP_TIME:
      const currentLapNumber =
        action.lapTimePacket.m_lapData[state.participants.selectedParticipant]
          .m_currentLapNum - 1;

      // this gives us an integer representing the current lap time, in s
      const currentLapTime = Math.round(
        action.lapTimePacket.m_lapData[state.participants.selectedParticipant]
          .m_currentLapTime
      );

      const participantData = action.lapTimePacket.m_lapData[state.participants.selectedParticipant];
      let sector1Time = participantData.m_sector1Time.toFixed(2);
      let sector2Time = participantData.m_sector2Time.toFixed(2);
      let sector3Time;
      console.log(participantData.m_sector);
      if(participantData.m_sector == 0){
        sector1Time = participantData.m_currentLapTime.toFixed(2);
      }else if(participantData.m_sector == 1){
        sector2Time = (participantData.m_currentLapTime - sector1Time).toFixed(2);
    }else {
        sector3Time = (participantData.m_currentLapTime - sector1Time - sector2Time).toFixed(2);
    }
      
      return { ...state, currentLapTime, currentLapNumber, sector1Time, sector2Time, sector3Time };

    case actions.UPDATE_PARTICIPANT:
      return {
        ...state,
        telemetryMatrix: [],
        currentPlayerSpeeds: [],
        currentWorldPosition: { x: 0, y: 0 },
        currentLapNumber: 0,
        tyresWear: [],
        participants: {
          ...state.participants,
          selectedParticipant: action.participant.index
        }
      };

    default:
      throw new Error();
  }
};
