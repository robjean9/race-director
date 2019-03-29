import * as React from 'react';
import { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import * as openSocket from 'socket.io-client';
import Track from './Track';
import { START_F1_CLIENT, STOP_F1_CLIENT } from '../constants/f1client';
import {
  getCurrentParticipants,
  getCurrentWorldPosition
} from '../packages/transformations';
import {
  IPacketCarTelemetryData,
  IPacketLapData,
  IPacketMotionData,
  IState,
  IPacketParticipantsData
} from './types';
import SpeedChart from './SpeedChart';
import ParticipantPanel from './ParticipantPanel';
import { IParticipant } from './ParticipantPanel/types';
const styles = require('./App.css');
const remote = require('electron').remote;

const initialState: IState = {
  currentLapTimes: [[]],
  currentLapTime: 0,
  currentPlayerSpeeds: [],
  currentWorldPosition: { x: 0, y: 0 },
  currentParticipants: [],
  currentLapNumber: 0,
  participantIndex: 0,
  sessionStarted: false
};

const { PACKETS } = remote.getGlobal('telemetryClientConstants');

// bigger package loss means more package being skipped
// (improves performance, lowers accuracy)
const PACKAGE_LOSS = 3;

// tslint:disable-next-line:no-any
export class App extends PureComponent<any, IState> {
  lapDataPackageCount = 0;
  carTelemetryPackageCount = 0;
  motionPackageCount = 0;

  // tslint:disable-next-line:no-any
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.openSocket();
  }

  openSocket = () => {
    const socket = openSocket('http://localhost:24500');

    socket.on(PACKETS.lapData, (e: IPacketLapData) => {
      const { sessionStarted } = this.state;
      if (sessionStarted && this.lapDataPackageCount % PACKAGE_LOSS === 0) {
        this.updateCurrentLapTime(e);
      }
      this.lapDataPackageCount++;
    });
    socket.on(PACKETS.carTelemetry, (e: IPacketCarTelemetryData) => {
      const { sessionStarted } = this.state;
      if (
        sessionStarted &&
        this.carTelemetryPackageCount % PACKAGE_LOSS === 0
      ) {
        this.updateCurrentPlayerSpeed(e);
      }
      this.carTelemetryPackageCount++;
    });
    socket.on(
      PACKETS.session,
      (e: {
        m_sessionTimeLeft: number;
        m_sessionDuration: number;
        m_trackId: number;
      }) => {
        if (e.m_sessionTimeLeft < e.m_sessionDuration) {
          this.setState({ sessionStarted: true });
        }
        this.setState({ currentTrackId: e.m_trackId });
      }
    );
    socket.on(PACKETS.motion, (e: IPacketMotionData) => {
      if (this.motionPackageCount % PACKAGE_LOSS === 0) {
        this.updateTrack(e);
      }
      this.motionPackageCount++;
    });
    socket.on(PACKETS.participants, (e: IPacketParticipantsData) => {
      this.updateParticipants(e);
    });
  };

  // Stores current participants data to state
  updateParticipants = (participantsPackage: IPacketParticipantsData) => {
    const currentParticipants = getCurrentParticipants(
      participantsPackage.m_participants
    );
    // tslint:disable-next-line:no-unused-expression
    currentParticipants && this.setState({ currentParticipants });
  };

  // Update track position
  updateTrack = (motionPackage: IPacketMotionData) => {
    const { participantIndex } = this.state;
    const currentWorldPosition = getCurrentWorldPosition(
      motionPackage,
      participantIndex
    );
    this.setState({ currentWorldPosition });
  };

  // stores current lap time to state
  updateCurrentLapTime = (lapTimePackage: IPacketLapData) => {
    const { participantIndex } = this.state;
    const currentLapNumber =
      lapTimePackage.m_lapData[participantIndex].m_currentLapNum - 1;
    const currentLapTime = Math.round(
      lapTimePackage.m_lapData[participantIndex].m_currentLapTime * 1e3
    );

    this.setState(prevState => {
      // TODO: avoid slicing currentLapTimes if lap already exist,
      //       but return currentLapNumber either way
      const currentLapTimes = prevState.currentLapTimes.slice();
      currentLapTimes[currentLapTime] = [];
      return { currentLapTimes, currentLapTime, currentLapNumber };
    });
  };

  // stores current player speed to state
  updateCurrentPlayerSpeed = (carTelemetryPackage: IPacketCarTelemetryData) => {
    const { participantIndex } = this.state;
    const currentPlayerSpeed =
      carTelemetryPackage.m_carTelemetryData[participantIndex].m_speed;

    this.setState(
      (prevState): IState | undefined => {
        const { currentLapNumber, currentLapTime, currentLapTimes } = prevState;
        if (!currentLapTimes || currentLapTimes.length === 0) {
          return;
        }
        currentLapTimes[currentLapTime][currentLapNumber] = currentPlayerSpeed;
        return { ...prevState, currentLapTimes };
      }
    );
  };

  handleParticipantChange = (participant: IParticipant) => {
    this.setState({
      currentLapTimes: [],
      currentPlayerSpeeds: [],
      currentWorldPosition: { x: 0, y: 0 },
      participantIndex: participant.index,
      currentLapNumber: 0
    });
  };

  // resets state
  handleSessionRestart = () => this.setState(initialState);

  handleStartRecording = () => ipcRenderer.send(START_F1_CLIENT);

  handleStopRecording = () => ipcRenderer.send(STOP_F1_CLIENT);

  render() {
    const {
      currentTrackId,
      currentWorldPosition,
      currentLapTimes,
      currentLapNumber,
      currentPlayerSpeeds,
      currentParticipants
    } = this.state;

    return (
      <div className={styles.homeWrapper}>
        <button type="button" onClick={this.handleStartRecording}>
          Start Recording
        </button>
        <button type="button" onClick={this.handleStopRecording}>
          Stop Recording
        </button>
        <button type="button" onClick={this.handleSessionRestart}>
          Restart Session
        </button>
        <div className={styles.telemetryPanels}>
          <ParticipantPanel
            handleParticipantChange={this.handleParticipantChange}
            currentParticipants={currentParticipants}
          />
          <div className={styles.chartsWrapper}>
            <SpeedChart
              currentLapTimes={currentLapTimes}
              currentPlayerSpeeds={currentPlayerSpeeds}
              currentLapNumber={currentLapNumber}
            />
          </div>
          {currentTrackId && (
            <Track
              trackId={currentTrackId}
              worldPosition={currentWorldPosition}
            />
          )}
        </div>
      </div>
    );
  }
}
