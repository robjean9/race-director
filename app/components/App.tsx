import * as React from 'react';
import { createContext, useReducer, useEffect, Dispatch } from 'react';

import openSocket from 'socket.io-client';
import styles from './App.css';

import { State, Participant } from './types';
import { Toolbar } from './Toolbar';
import {
  PacketLapData,
  PacketCarTelemetryData,
  PacketMotionData,
  PacketParticipantsData,
  PacketCarStatusData
} from 'f1-telemetry-client/build/src/parsers/packets/types';
import { PACKETS } from 'f1-telemetry-client/build/src/constants';
import { Canvas } from './Canvas';
import { reducer, actions } from './reducer';

const initialState: State = {
  telemetryMatrix: [[]],
  currentLapTime: 0,
  currentPlayerSpeeds: [],
  worldPositions: [],
  currentLapNumber: 0,
  sessionStarted: false,
  currentTrackId: -1,
  xAxisData: [],
  brakesTemperature: [],
  tyresSurfaceTemperature: [],
  tyresWear: [],
  tyreCompound: undefined,
  participants: { selectedParticipant: 0, participantList: [] }
};

export const StateContext = createContext({} as State);
export const DispatchContext = createContext({} as Dispatch<any>);
export const ParticipantsContext = createContext(initialState.participants);

// bigger packet loss means more packets being skipped
// (improves performance, lowers accuracy)
const PACKAGE_LOSS = 3;

const packetCounts = {
  lapData: 0,
  carTelemetry: 0,
  motion: 0,
  carStatus: 0
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleMotionPacket = (motionPacket: PacketMotionData) => {
    if (packetCounts.motion % PACKAGE_LOSS === 0) {
      dispatch({ type: actions.UPDATE_TRACK, motionPacket });
    }
    packetCounts.motion++;
  };

  const handleParticipantsPacket = (
    participantsPacket: PacketParticipantsData
  ) => {
    dispatch({ type: actions.UPDATE_PARTICIPANTS, participantsPacket });
  };

  const handleLapDataPacket = (lapTimePacket: PacketLapData) => {
    if (packetCounts.lapData % PACKAGE_LOSS === 0) {
      dispatch({ type: actions.UPDATE_CURRENT_LAP_TIME, lapTimePacket });
    }

    packetCounts.lapData++;
  };

  const handleCarTelemetryPacket = (
    carTelemetryPacket: PacketCarTelemetryData
  ) => {
    if (packetCounts.carTelemetry % PACKAGE_LOSS === 0) {
      dispatch({ type: actions.UPDATE_CAR_TELEMETRY, carTelemetryPacket });
    }

    packetCounts.carTelemetry++;
  };

  const handleCarStatusPacket = (carStatusPacket: PacketCarStatusData) => {
    if (packetCounts.carStatus % PACKAGE_LOSS === 0) {
      dispatch({ type: actions.UPDATE_CAR_STATUS, carStatusPacket });
    }

    packetCounts.carStatus++;
  };

  const handleSessionPacket = (e: {
    m_sessionTimeLeft: number;
    m_sessionDuration: number;
    m_trackId: number;
  }) => {
    if (e.m_sessionTimeLeft < e.m_sessionDuration) {
      dispatch({ type: actions.SESSION_STARTED });
    }
    dispatch({ type: actions.UPDATE_TRACK_ID, trackId: e.m_trackId });
  };

  const handleParticipantChange = (participant: Participant) => {
    dispatch({ type: actions.UPDATE_PARTICIPANT, participant });
  };

  const handleSessionRestart = () =>
    dispatch({ type: actions.SESSION_RESTART, initialState });

  // runs when component mounts
  useEffect(() => {
    const socket = openSocket('http://localhost:24500');
    socket.on(PACKETS.lapData, handleLapDataPacket);
    socket.on(PACKETS.carTelemetry, handleCarTelemetryPacket);
    socket.on(PACKETS.carStatus, handleCarStatusPacket);
    socket.on(PACKETS.session, handleSessionPacket);
    socket.on(PACKETS.participants, handleParticipantsPacket);
    socket.on(PACKETS.motion, handleMotionPacket);
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <Toolbar
        onHandleLoadState={() => {}}
        onHandleSaveState={() => {}}
        onHandleSessionRestart={handleSessionRestart}
      />
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <ParticipantsContext.Provider value={state.participants}>
            <Canvas />
          </ParticipantsContext.Provider>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
}
