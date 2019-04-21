import * as React from 'react';
import { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import * as openSocket from 'socket.io-client';
import { TrackMap } from './TrackMap';
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
import { SpeedChart } from './Charts/SpeedChart';
import { ParticipantPanel } from './ParticipantPanel';
import { Participant } from './ParticipantPanel/types';
import { QuaternaryTemperatureDisplay } from './Charts/QuaternaryTemperatureDisplay';
import { RPMChart } from './Charts/RPMChart/RPMChart';
import { SingleBarDisplay } from './Charts/SingleBarDisplay';
import { UnitDisplay } from './Charts/UnitDisplay/UnitDisplay';
import { TimeDisplay } from './Charts/TimeDisplay';
const fs = require('fs');
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
  sessionStarted: false,
  currentTrackId: -1
};

const { PACKETS } = remote.getGlobal('telemetryClientConstants');

// bigger package loss means more package being skipped
// (improves performance, lowers accuracy)
const PACKAGE_LOSS = 3;

// tslint:disable-next-line:no-default-export
export default class App extends PureComponent<{}, State> {
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
      return {
        ...prevState,
        currentLapTimes,
        currentLapTime,
        currentLapNumber
      };
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

  renderNavbar = () => {
    return (
      <div className={styles.navbar}>
        Tracking Hamilton
        <button type="button" onClick={this.handleStartRecording}>
          Start Recording
        </button>
        <button type="button" onClick={this.handleStopRecording}>
          Stop Recording
        </button>
        <button type="button" onClick={this.handleSessionRestart}>
          Restart Session
        </button>
        <button type="button" onClick={this.handleSaveState}>
          Save State
        </button>
        <button type="button" onClick={this.handleLoadState}>
          Load State
        </button>
      </div>
    );
  };

  render() {
    const {
      currentTrackId,
      currentWorldPosition,
      //currentLapTime,
      currentLapTimes,
      currentLapNumber,
      currentPlayerSpeeds,
      currentParticipants
    } = this.state;

    return (
      <div className={styles.homeWrapper}>
        {this.renderNavbar()}
        <div className={styles.telemetryPanels}>
          <div className={styles.column1}>
            <div>Session Type</div>
            <ParticipantPanel
              handleParticipantChange={this.handleParticipantChange}
              currentParticipants={currentParticipants}
            />
          </div>
          <div className={styles.column2}>
            {/* Speed */}
            <SpeedChart
              currentLapTimes={currentLapTimes}
              currentPlayerSpeeds={currentPlayerSpeeds}
              currentLapNumber={currentLapNumber}
            />
            {/* Engine */}
            <SpeedChart
              currentLapTimes={currentLapTimes}
              currentPlayerSpeeds={currentPlayerSpeeds}
              currentLapNumber={currentLapNumber}
            />
            {/* Gear */}
            <SpeedChart
              currentLapTimes={currentLapTimes}
              currentPlayerSpeeds={currentPlayerSpeeds}
              currentLapNumber={currentLapNumber}
            />
            {/* Throttle */}
            <SpeedChart
              currentLapTimes={currentLapTimes}
              currentPlayerSpeeds={currentPlayerSpeeds}
              currentLapNumber={currentLapNumber}
            />
            {/* Brake */}
            <SpeedChart
              currentLapTimes={currentLapTimes}
              currentPlayerSpeeds={currentPlayerSpeeds}
              currentLapNumber={currentLapNumber}
            />
            {/* Steer */}
            <SpeedChart
              currentLapTimes={currentLapTimes}
              currentPlayerSpeeds={currentPlayerSpeeds}
              currentLapNumber={currentLapNumber}
            />
          </div>
          <div className={styles.column3}>
            <div className={styles.temperatureDisplays}>
              <QuaternaryTemperatureDisplay title="Tire Temp" />
              <QuaternaryTemperatureDisplay title="Brake Temp" />
            </div>
            <div className={styles.temperatureDisplays}>
              <QuaternaryTemperatureDisplay title="Tyre wear" />
              <QuaternaryTemperatureDisplay title="Tyre damage" />
            </div>
            <div className={styles.carSetupWrapper}>
              <UnitDisplay title={`Tire Compound`} value={1} />
              <UnitDisplay title={`Fuel Mix`} value={1} />
              <UnitDisplay title={`ERS Deploy Mode`} value={1} />
            </div>
            <div className={styles.engineDisplays}>
              <RPMChart />
              <SingleBarDisplay
                title={'Fuel' /* in tank / Fuel capacity */}
                value={20}
                maxValue={200}
              />
              <SingleBarDisplay
                title={'ERS' /* Stored Energy / total energy */}
                value={50}
                maxValue={100}
              />
            </div>
            <div className={styles.timeDisplays}>
              <TimeDisplay />
            </div>

            {/*
            Car Setup
            <div>Front wing</div>
            <div>Rear wing</div>
            <div>Differential adjustment on throttle</div>
            <div>Differential adjustment off throttle</div>
            <div>Front camber angle</div>
            <div>Rear camber angle</div>
            <div>Front toe angle</div>
            <div>Rear toe angle</div>
            <div>Front suspension</div>
            <div>Rear suspension</div>
            <div>
              Front anti-roll bar Front anti-roll bar Front ride height Rear
              ride height Brake pressure (percentage) Brake bias Front tyre
              pressure Rear tyre pressure Ballast Fuel load
            </div>
             */}
          </div>
          <div className={styles.column4}>
            Track Data
            <div>Weather</div>
            <div>Safety Car Deployed</div>
            <div>Track Temperature</div>
            <div>Air Temperature</div>
            <TrackMap
              trackId={currentTrackId}
              worldPosition={currentWorldPosition}
            />
          </div>
        </div>
      </div>
    );
  }
}
