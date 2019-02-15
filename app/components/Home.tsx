import * as React from 'react';
import { PureComponent } from 'react';
import { ipcRenderer } from 'electron';
import ReactEcharts from 'echarts-for-react';
import openSocket from 'socket.io-client';
import Track from './Track';
import {
  START_F1_CLIENT,
  STOP_F1_CLIENT,
  SESSION,
  LAP_DATA,
  CAR_TELEMETRY,
  MOTION,
  EVENT,
  PARTICIPANTS,
  CAR_SETUPS,
  CAR_STATUS
} from '../constants/f1client';
import {
  IPacketCarTelemetryData,
  IPacketLapData,
  IPacketMotionData,
  ILapData,
  IState
} from './types';

// const styles = require('./Home.css');

const initialState: IState = {
  currentLapTimes: [[]],
  currentPlayerSpeeds: [[]],
  currentWorldPosition: { x: 0, y: 0 },
  currentLapNumber: 0,
  sessionStarted: false,
  currentTrackId: 0
};

export default class Home extends PureComponent<any, IState> {
  constructor(props) {
    super(props);
    this.state = initialState;
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

    /*
    // MOCK HELPER
    setInterval(() => {
      this.updateCurrentLapTime(lapDataMock);
      this.updateCurrentPlayerSpeed(carTelemetryMock);
    }, 1000);
    */
  };

  // Update track position
  updateTrack = (motionPackage: IPacketMotionData) => {
    const playerIndex = motionPackage.m_header.m_playerCarIndex;
    // Note: this transformation only works for barcelona
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

  getSpeedChart = () => {
    const { currentLapTimes, currentPlayerSpeeds } = this.state;

    // converts to chartable data (adds echarts properties)
    // maps by lap
    const xAxis = currentLapTimes.map(data => ({
      boundaryGap: false,
      silent: true,
      data
    }));

    const series = currentPlayerSpeeds.map((data, idx) => ({
      name: `Lap ${idx + 1}`,
      smooth: true,
      type: 'line',
      large: true,
      // for some reason if we dont copy the array then the chart does not render
      data: data.slice()
      //data
    }));

    return {
      title: {
        text: 'Speed'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#505765'
          }
        }
      },
      legend: {
        data: series.map(serie => serie.name)
      },
      // matrix here, one element per lap
      xAxis,
      yAxis: [
        {
          type: 'value'
        }
      ],
      series,
      dataZoom: [
        {
          type: 'inside'
        },
        {
          type: 'slider'
        }
      ]
    };
  };

  render() {
    const { currentTrackId, currentWorldPosition } = this.state;
    return (
      <div>
        <h2>Race Director v0.0.1</h2>
        <button type="button" onClick={this.handleStartRecording}>
          Start Recording
        </button>
        <button type="button" onClick={this.handleStopRecording}>
          Stop Recording
        </button>
        <button type="button" onClick={this.handleSessionRestart}>
          Restart Session
        </button>
        <ReactEcharts
          option={this.getSpeedChart()}
          style={{ height: '350px', width: '100%' }}
          className="react_for_echarts"
        />
        <Track trackId={currentTrackId} worldPosition={currentWorldPosition} />
      </div>
    );
  }
}
