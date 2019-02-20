import * as React from 'react';
import { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import openSocket from 'socket.io-client';
import Track from './Track';
import {
  START_F1_CLIENT,
  STOP_F1_CLIENT,
  LAP_DATA,
  CAR_TELEMETRY,
  SESSION,
  MOTION,
  PARTICIPANTS
} from '../constants/f1client';
import { DRIVERS, TEAMS } from '../constants/typings';
import {
  IPacketCarTelemetryData,
  IPacketLapData,
  IPacketMotionData,
  IState,
  IPacketParticipantsData
} from './types';
import ParticipantsMock from '../../mocks/ParticipantsMock';
import SpeedChart from './SpeedChart';
import ParticipantPanel from './ParticipantPanel';
import { IParticipant } from './ParticipantPanel/types';

const styles = require('./Home.css');

const initialState: IState = {
  currentLapTimes: [[]],
  currentPlayerSpeeds: [[]],
  currentWorldPosition: { x: 0, y: 0 },
  currentParticipants: [],
  currentLapNumber: 0,
  participantIndex: 0,
  currentTrackId: undefined,
  sessionStarted: false
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

    // participants mock
    //this.updateParticipants(ParticipantsMock);
  };

  // stores current participants data to state
  updateParticipants = (participantsPackage: IPacketParticipantsData) => {
    const participantList = participantsPackage.m_participants;
    if (participantList.length === 0) {
      return;
    }
    const currentParticipants: IParticipant[] = participantList.map(
      (participant, index) => {
        // move this to Participant class constructor
        const driver: IParticipant = DRIVERS[participant.m_driverId] || {
          abbreviation: participant.m_name.substr(0, 3),
          firstName: participant.m_name
        };
        driver.team = TEAMS[participant.m_teamId];
        driver.index = index;

        return driver;
      }
    );
    this.setState({ currentParticipants });
  };

  // Update track position
  updateTrack = (motionPackage: IPacketMotionData) => {
    const { participantIndex } = this.state;
    // Note: this transformation only works for Catalunya
    const x =
      motionPackage.m_carMotionData[participantIndex].m_worldPositionX / 4;
    const y =
      motionPackage.m_carMotionData[participantIndex].m_worldPositionZ / 4;

    this.setState({ currentWorldPosition: { x, y } });
  };

  // stores current lap time to state
  updateCurrentLapTime = (lapTimePackage: IPacketLapData) => {
    const { participantIndex } = this.state;
    const newLapNumber =
      lapTimePackage.m_lapData[participantIndex].m_currentLapNum - 1;
    const currentTime =
      Math.round(
        lapTimePackage.m_lapData[participantIndex].m_currentLapTime * 1e3
      ) / 1e3;

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
    const { participantIndex } = this.state;
    const currentPlayerSpeed =
      carTelemetryPackage.m_carTelemetryData[participantIndex].m_speed;

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

  handleParticipantChange = (participant: IParticipant) => {
    this.setState({
      currentLapTimes: [[]],
      currentPlayerSpeeds: [[]],
      currentWorldPosition: { x: 0, y: 0 },
      participantIndex: participant.index
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
            />
          </div>
          <Track
            trackId={currentTrackId}
            worldPosition={currentWorldPosition}
          />
        </div>
      </div>
    );
  }
}
