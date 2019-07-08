import * as React from 'react';
import * as openSocket from 'socket.io-client';

const styles = require('./App.css');

import { State, Participant } from './types';
import { Toolbar } from './Toolbar';
import {
  PacketLapData,
  PacketCarTelemetryData,
  PacketMotionData,
  PacketParticipantsData
} from 'f1-telemetry-client/build/src/parsers/packets/types';
import { PACKETS } from 'f1-telemetry-client/build/src/constants';
import { Canvas } from './Canvas';
import { reducer, actions } from './reducer';

const initialState: State = {
  telemetryMatrix: [[]],
  currentLapTime: 0,
  currentPlayerSpeeds: [],
  currentWorldPosition: { x: 0, y: 0 },
  currentParticipants: [],
  currentLapNumber: 0,
  participantIndex: 0,
  sessionStarted: false,
  currentTrackId: -1
};

export const RaceDirectorContext = React.createContext({
  state: initialState,
  dispatch: {}
});

// bigger packet loss means more packets being skipped
// (improves performance, lowers accuracy)
const PACKAGE_LOSS = 3;

const packetCounts = {
  lapData: 0,
  carTelemetry: 0,
  motion: 0
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

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
    const { sessionStarted } = state;

    if (sessionStarted && packetCounts.lapData % PACKAGE_LOSS === 0) {
      dispatch({ type: actions.UPDATE_CURRENT_LAP_TIME, lapTimePacket });
    }

    packetCounts.lapData++;
  };

  const handleCarTelemetryPacket = (
    carTelemetryPacket: PacketCarTelemetryData
  ) => {
    const { sessionStarted } = state;

    if (sessionStarted && packetCounts.carTelemetry % PACKAGE_LOSS === 0) {
      dispatch({ type: actions.UPDATE_CAR_TELEMETRY, carTelemetryPacket });
    }

    packetCounts.carTelemetry++;
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
  React.useEffect(() => {
    const socket = openSocket('http://localhost:24500');
    socket.on(PACKETS.lapData, handleLapDataPacket);
    socket.on(PACKETS.carTelemetry, handleCarTelemetryPacket);
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
      <RaceDirectorContext.Provider value={{ state, dispatch }}>
        <Canvas onParticipantChange={handleParticipantChange} />
      </RaceDirectorContext.Provider>
    </div>
  );
}
