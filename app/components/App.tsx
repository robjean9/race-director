import * as React from 'react';
import { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import * as openSocket from 'socket.io-client';
import { Track } from './Track';
import {
  getCurrentParticipants,
  getCurrentWorldPosition
} from '../packages/transformations';
import {
  PacketCarTelemetryData,
  PacketLapData,
  PacketMotionData,
  State,
  PacketParticipantsData
} from './types';
import { SpeedChart } from './SpeedChart';
import { ParticipantPanel } from './ParticipantPanel';
import { Participant } from './ParticipantPanel/types';
const styles = require('./App.css');
const remote = require('electron').remote;
const START_F1_CLIENT = 'startF1Client';
const STOP_F1_CLIENT = 'stopF1Client';

const initialState: State = {
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
export class App extends PureComponent<any, State> {
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

    socket.on(PACKETS.lapData, (e: PacketLapData) => {
      const { sessionStarted } = this.state;
      if (sessionStarted && this.lapDataPackageCount % PACKAGE_LOSS === 0) {
        this.updateCurrentLapTime(e);
      }
      this.lapDataPackageCount++;
    });
    socket.on(PACKETS.carTelemetry, (e: PacketCarTelemetryData) => {
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
    socket.on(PACKETS.motion, (e: PacketMotionData) => {
      if (this.motionPackageCount % PACKAGE_LOSS === 0) {
        this.updateTrack(e);
      }
      this.motionPackageCount++;
    });
    socket.on(PACKETS.participants, (e: PacketParticipantsData) => {
      this.updateParticipants(e);
    });
  };

  // Stores current participants data to state
  updateParticipants = (participantsPackage: PacketParticipantsData) => {
    const currentParticipants = getCurrentParticipants(
      participantsPackage.m_participants
    );
    // tslint:disable-next-line:no-unused-expression
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
  updateCurrentPlayerSpeed = (carTelemetryPackage: PacketCarTelemetryData) => {
    const { participantIndex } = this.state;
    const currentPlayerSpeed =
      carTelemetryPackage.m_carTelemetryData[participantIndex].m_speed;

    this.setState(
      (prevState): State | undefined => {
        const { currentLapNumber, currentLapTime, currentLapTimes } = prevState;
        if (!currentLapTimes || currentLapTimes.length === 0) {
          return;
        }
        currentLapTimes[currentLapTime][currentLapNumber] = currentPlayerSpeed;
        return { ...prevState, currentLapTimes };
      }
    );
  };

  handleParticipantChange = (participant: Participant) => {
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
