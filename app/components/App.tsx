import * as React from 'react';
import * as openSocket from 'socket.io-client';

const styles = require('./App.css');

import { State } from './types';
import { Toolbar } from './Toolbar';
import {
  PacketLapData,
  PacketCarTelemetryData,
  PacketMotionData,
  PacketParticipantsData
} from 'f1-telemetry-client/build/src/parsers/packets/types';
import { PACKETS } from 'f1-telemetry-client/build/src/constants';
import { Canvas } from './Canvas';
import { reducer } from './reducer';

const initialState: State = {
  telemetryMatrix: [[]],
  currentLapTime: 0,
  currentPlayerSpeeds: [],
  currentWorldPosition: { x: 0, y: 0 },
  currentParticipants: [],
  currentLapNumber: 0,
  participantIndex: 0,
  // should be false, set up by getting of session packet
  sessionStarted: true,
  currentTrackId: -1
};

export const RaceDirectorContext = React.createContext({
  state: initialState,
  dispatch: {}
});

// bigger package loss means more packages being skipped
// (improves performance, lowers accuracy)
const PACKAGE_LOSS = 3;

const packageCounts = {
  lapData: 0,
  carTelemetry: 0,
  motion: 0
};
// tslint:disable-next-line:no-default-export
export default function App(props: any) {
  // stores current lap time to state
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleMotionPacket = (motionPacket: PacketMotionData) => {
    if (packageCounts.motion % PACKAGE_LOSS === 0) {
      dispatch({ type: 'UPDATE_TRACK', motionPacket });
    }
    packageCounts.motion++;
  };

  const handleParticipantsPacket = (
    participantsPackage: PacketParticipantsData
  ) => {
    dispatch({ type: 'UPDATE_PARTICIPANTS', participantsPackage });
  };

  const handleLapDataPacket = (lapTimePackage: PacketLapData) => {
    const { sessionStarted } = state;

    if (sessionStarted && packageCounts.lapData % PACKAGE_LOSS === 0) {
      dispatch({ type: 'UPDATE_CURRENT_LAP_TIME', lapTimePackage });
    }

    packageCounts.lapData++;
  };

  const handleCarTelemetryPacket = (
    carTelemetryPackage: PacketCarTelemetryData
  ) => {
    const { sessionStarted } = state;

    const shouldUpdateState =
      sessionStarted && packageCounts.carTelemetry % PACKAGE_LOSS === 0;

    if (shouldUpdateState) {
      dispatch({ type: 'UPDATE_CAR_TELEMETRY', carTelemetryPackage });
    }

    packageCounts.carTelemetry++;
  };

  const handleSessionPacket = (e: {
    m_sessionTimeLeft: number;
    m_sessionDuration: number;
    m_trackId: number;
  }) => {
    if (e.m_sessionTimeLeft < e.m_sessionDuration) {
      dispatch({ type: 'SESSION_STARTED' });
    }
    dispatch({ type: 'UPDATE_TRACK_ID', trackId: e.m_trackId });
  };

  React.useEffect(() => {
    const socket = openSocket('http://localhost:24500');
    socket.on(PACKETS.lapData, handleLapDataPacket);
    socket.on(PACKETS.carTelemetry, handleCarTelemetryPacket);
    socket.on(PACKETS.session, handleSessionPacket);
    socket.on(PACKETS.participants, handleParticipantsPacket);
    socket.on(PACKETS.motion, handleMotionPacket);
  }, []);

  // Updates current participants data to state
  /*
  handleParticipantChange = (participant: Participant) => {
    this.setState({
      telemetryMatrix: [],
      currentPlayerSpeeds: [],
      currentWorldPosition: { x: 0, y: 0 },
      participantIndex: participant.index,
      currentLapNumber: 0
    });
  };

  // resets state
  handleSessionRestart = () => this.setState(initialState);

  handleSaveState = () => {
    // tslint:disable-next-line:no-any
    fs.writeFile('state.json', JSON.stringify(this.state), (err: any) => {
      if (err) {
        return console.log(err);
      }
      console.log('The state was saved!');
    });
  };

  handleLoadState = () => {
    const rawState = fs.readFileSync('state.json');
    const state = JSON.parse(rawState);
    this.setState({
      //currentLapTimes: state.currentLapTimes,
      currentLapTime: state.currentLapTime,
      currentParticipants: state.currentParticipants,
      currentWorldPosition: state.currentWorldPosition,
      currentLapNumber: state.currentLapNumber,
      participantIndex: state.participantIndex,
      sessionStarted: state.sessionStarted,
      currentTrackId: state.currentTrackId
    });
  };
  */

  const {
    telemetryMatrix,
    currentTrackId,
    currentWorldPosition,
    currentLapNumber,
    currentPlayerSpeeds,
    currentParticipants
  } = state;

  // TODO: convert functions to reducer, pass dispatch through provider
  //      maybe do <Provider value={useReducer()}> so the children get the state and the dispatch

  return (
    <div className={styles.homeWrapper}>
      <Toolbar
        onHandleLoadState={() => {}}
        onHandleSaveState={() => {}}
        onHandleSessionRestart={() => {}}
      />
      <RaceDirectorContext.Provider value={{ state, dispatch }}>
        <Canvas
          telemetryMatrix={telemetryMatrix}
          currentTrackId={currentTrackId}
          currentWorldPosition={currentWorldPosition}
          currentLapNumber={currentLapNumber}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentParticipants={currentParticipants}
          onParticipantChange={() => {}}
        />
      </RaceDirectorContext.Provider>
    </div>
  );
}
