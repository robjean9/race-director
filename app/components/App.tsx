import * as React from 'react';
import * as openSocket from 'socket.io-client';

const fs = require('fs');
const styles = require('./App.css');

import {
  getCurrentParticipants,
  getCurrentWorldPosition
} from './transformations';
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

// bigger package loss means more packages being skipped
// (improves performance, lowers accuracy)
const PACKAGE_LOSS = 3;

// tslint:disable-next-line:no-default-export
export default class App extends React.PureComponent<{}, State> {
  packageCounts = {
    lapData: 0,
    carTelemetry: 0,
    motion: 0
  };

  // tslint:disable-next-line:no-any
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const socket = openSocket('http://localhost:24500');
    socket.on(PACKETS.lapData, this.handleLapDataPacket);
    socket.on(PACKETS.carTelemetry, this.handleCarTelemetryPacket);
    socket.on(PACKETS.session, this.handleSessionPacket);
    socket.on(PACKETS.motion, this.handleMotionPacket);
    socket.on(PACKETS.participants, this.handleParticipantsPacket);
  }

  handleLapDataPacket = (e: PacketLapData) => {
    const { sessionStarted } = this.state;

    if (sessionStarted && this.packageCounts.lapData % PACKAGE_LOSS === 0) {
      this.updateCurrentLapTime(e);
    }

    this.packageCounts.lapData++;
  };

  handleCarTelemetryPacket = (e: PacketCarTelemetryData) => {
    const { sessionStarted } = this.state;

    const shouldUpdateState =
      sessionStarted && this.packageCounts.carTelemetry % PACKAGE_LOSS === 0;

    if (shouldUpdateState) {
      this.updateCarTelemetry(e);
    }

    this.packageCounts.carTelemetry++;
  };

  handleSessionPacket = (e: {
    m_sessionTimeLeft: number;
    m_sessionDuration: number;
    m_trackId: number;
  }) => {
    if (e.m_sessionTimeLeft < e.m_sessionDuration) {
      this.setState({ sessionStarted: true });
    }
    this.setState({ currentTrackId: e.m_trackId });
  };

  handleMotionPacket = (e: PacketMotionData) => {
    if (this.packageCounts.motion % PACKAGE_LOSS === 0) {
      this.updateTrack(e);
    }
    this.packageCounts.motion++;
  };

  handleParticipantsPacket = (e: PacketParticipantsData) => {
    this.updateParticipants(e);
  };

  // Updates current participants data to state
  updateParticipants = (participantsPackage: PacketParticipantsData) => {
    const currentParticipants = getCurrentParticipants(
      participantsPackage.m_participants
    );
    currentParticipants && this.setState({ currentParticipants });
  };

  // Update track position
  updateTrack = (motionPackage: PacketMotionData) => {
    const { participantIndex } = this.state;
    const currentWorldPosition = getCurrentWorldPosition(
      motionPackage,
      participantIndex
    );
    this.setState({ currentWorldPosition });
  };

  // stores current lap time to state
  updateCurrentLapTime = (lapTimePackage: PacketLapData) => {
    const { participantIndex } = this.state;
    const currentLapNumber =
      lapTimePackage.m_lapData[participantIndex].m_currentLapNum - 1;

    // this gives us an integer representing the current lap time, in ms
    const currentLapTime = Math.round(
      lapTimePackage.m_lapData[participantIndex].m_currentLapTime * 1e3
    );

    this.setState(prevState => {
      // TODO: avoid slicing currentLapTimes if lap already exist
      const currentLapTimes = prevState.telemetryMatrix.slice();
      currentLapTimes[currentLapTime] = [];
      return {
        ...prevState,
        currentLapTimes,
        currentLapTime,
        currentLapNumber
      };
    });
  };

  // stores current player speed to state
  updateCarTelemetry = (carTelemetryPackage: PacketCarTelemetryData) => {
    const { participantIndex } = this.state;

    const playerTelemetry =
      carTelemetryPackage.m_carTelemetryData[participantIndex];

    this.setState((prevState): State | undefined => {
      const { currentLapNumber, currentLapTime, telemetryMatrix } = prevState;

      if (!telemetryMatrix) {
        return;
      }

      if (!telemetryMatrix[currentLapTime]) {
        telemetryMatrix[currentLapTime] = [];
      }

      if (!telemetryMatrix[currentLapTime][currentLapNumber]) {
        telemetryMatrix[currentLapTime][currentLapNumber] = {};
      }

      const updatedTelemetryMatrix = telemetryMatrix.slice();

      updatedTelemetryMatrix[currentLapTime][currentLapNumber] = {
        speed: playerTelemetry.m_speed,
        engineRPM: playerTelemetry.m_engineRPM,
        gear: playerTelemetry.m_gear,
        throttle: playerTelemetry.m_throttle,
        brake: playerTelemetry.m_brake,
        steer: playerTelemetry.m_steer
      };

      return { ...prevState, telemetryMatrix: updatedTelemetryMatrix };
    });
  };

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

  reducer = (state: State, action: any) => {
    switch (action.type) {
      case 'PARTICIPANT_CHANGE':
        console.log(action);
        return {
          ...state,
          telemetryMatrix: [],
          currentPlayerSpeeds: [],
          currentWorldPosition: { x: 0, y: 0 },
          participantIndex: 0, //participant.index,
          currentLapNumber: 0
        };
      default:
        throw new Error();
    }
  };

  render() {
    const {
      telemetryMatrix,
      currentTrackId,
      currentWorldPosition,
      currentLapNumber,
      currentPlayerSpeeds,
      currentParticipants
    } = this.state;

    // TODO: convert functions to reducer, pass dispatch through provider
    //      maybe do <Provider value={useReducer()}> so the children get the state and the dispatch

    const [state, dispatch] = React.useReducer(this.reducer, initialState);

    return (
      <div className={styles.homeWrapper}>
        <Toolbar
          onHandleLoadState={this.handleLoadState}
          onHandleSaveState={this.handleSaveState}
          onHandleSessionRestart={this.handleSessionRestart}
        />
        <RaceDirectorContext.Provider value={{ state, dispatch }}>
          <Canvas
            telemetryMatrix={telemetryMatrix}
            currentTrackId={currentTrackId}
            currentWorldPosition={currentWorldPosition}
            currentLapNumber={currentLapNumber}
            currentPlayerSpeeds={currentPlayerSpeeds}
            currentParticipants={currentParticipants}
            onParticipantChange={this.handleParticipantChange}
          />
        </RaceDirectorContext.Provider>
      </div>
    );
  }
}
