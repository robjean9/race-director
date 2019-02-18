import * as React from 'react';
import { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import openSocket from 'socket.io-client';
import Track from './Track';
import {
  START_F1_CLIENT,
  STOP_F1_CLIENT,
  SESSION,
  LAP_DATA,
  PARTICIPANTS,
  CAR_TELEMETRY,
  MOTION,
  DRIVERS,
  createDriverObject
} from '../constants/f1client';
import {
  IPacketCarTelemetryData,
  IPacketLapData,
  IPacketMotionData,
  IState,
  IPacketParticipantsData
} from './types';

import ParticipantsMock from '../../mocks/ParticipantsMock';
import SpeedChart from './SpeedChart';
import RacerPanel from './RacerPanel/RacerPanel';

const styles = require('./Home.css');

const initialState: IState = {
  currentLapTimes: [[]],
  currentPlayerSpeeds: [[]],
  currentParticipants: [],
  currentWorldPosition: { x: 0, y: 0 },
  currentLapNumber: 0,
  sessionStarted: false,
  currentTrackId: undefined
};

export default class Home extends PureComponent<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.openSocket();
  }

  openSocket = () => {
    /*
    const socket = openSocket('http://localhost:24500');
    socket.on(LAP_DATA, e => {
      const { sessionStarted } = this.state;
      if (sessionStarted) {
        this.updateCurrentLapTime(e);
      }
    });
    socket.on(CAR_TELEMETRY, e => {
      const { sessionStarted } = this.state;
      if (sessionStarted) {
        this.updateCurrentPlayerSpeed(e);
      }
    });
    socket.on(SESSION, e => {
      if (e.m_sessionTimeLeft < e.m_sessionDuration) {
        this.setState({ sessionStarted: true });
      }
      this.setState({ currentTrackId: e.m_trackId });
    });
    socket.on(MOTION, e => {
      this.updateTrack(e);
    });
    socket.on(PARTICIPANTS, e => {
      this.updateParticipants(e);
    });
    */

    // participants mock
    this.updateParticipants(ParticipantsMock);
  };

  // stores current participants data to state
  updateParticipants = (participantsPackage: IPacketParticipantsData) => {
    const participantList = participantsPackage.m_participants;
    if (participantList.length === 0) {
      return;
    }
    const currentParticipants = participantList.map(participant => {
      const driver = DRIVERS[participant.m_driverId];
      return (
        driver ||
        createDriverObject(
          participant.m_name.substr(0, 3),
          participant.m_name,
          ''
        )
      );
    });
    this.setState({ currentParticipants });
  };

  // Update track position
  updateTrack = (motionPackage: IPacketMotionData) => {
    const playerIndex = motionPackage.m_header.m_playerCarIndex;
    // Note: this transformation only works for Catalunya
    const x =
      motionPackage.m_carMotionData[playerIndex].m_worldPositionX / 4 + 175;
    const y =
      motionPackage.m_carMotionData[playerIndex].m_worldPositionZ / 4 + 175;

    this.setState({ currentWorldPosition: { x, y } });
  };

  // stores current lap time to state
  updateCurrentLapTime = (lapTimePackage: IPacketLapData) => {
    const playerIndex = lapTimePackage.m_header.m_playerCarIndex;
    const newLapNumber =
      lapTimePackage.m_lapData[playerIndex].m_currentLapNum - 1;
    const currentTime =
      Math.round(lapTimePackage.m_lapData[playerIndex].m_currentLapTime * 1e3) /
      1e3;

    this.setState(prevState => {
      // add time to current lap, slices to rerender
      const currentLapTimes = prevState.currentLapTimes.slice();
      // creates a new lap
      if (!currentLapTimes[newLapNumber]) {
        currentLapTimes[newLapNumber] = [];
      }
      // saves the data in the new lap
      currentLapTimes[newLapNumber].push(currentTime);
      // updates lap times and current lap
      return { currentLapTimes, currentLapNumber: newLapNumber };
    });
  };

  // stores current player speed to state
  updateCurrentPlayerSpeed = (carTelemetryPackage: IPacketCarTelemetryData) => {
    const playerIndex = carTelemetryPackage.m_header.m_playerCarIndex;
    const currentPlayerSpeed =
      carTelemetryPackage.m_carTelemetryData[playerIndex].m_speed;

    this.setState(prevState => {
      const { currentLapNumber } = this.state;
      // add time to current lap, slices to rerender
      const currentPlayerSpeeds = prevState.currentPlayerSpeeds.slice();
      // creates a new lap
      if (!currentPlayerSpeeds[currentLapNumber]) {
        currentPlayerSpeeds[currentLapNumber] = [];
      }
      // saves the data in the new lap
      currentPlayerSpeeds[currentLapNumber].push(currentPlayerSpeed);
      return { currentPlayerSpeeds };
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
      currentPlayerSpeeds,
      currentParticipants
    } = this.state;
    return (
      <div>
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
          <RacerPanel currentParticipants={currentParticipants} />
          <SpeedChart
            currentLapTimes={currentLapTimes}
            currentPlayerSpeeds={currentPlayerSpeeds}
          />
          <Track
            trackId={currentTrackId}
            worldPosition={currentWorldPosition}
          />
        </div>
      </div>
    );
  }
}
