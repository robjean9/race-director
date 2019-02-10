import * as React from 'react';
import { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { find, map } from 'lodash';
import { ipcRenderer } from 'electron';
import openSocket from 'socket.io-client';
import {
  START_F1_CLIENT,
  STOP_F1_CLIENT,
  MOTION,
  SESSION,
  LAP_DATA,
  EVENT,
  PARTICIPANTS,
  CAR_SETUPS,
  CAR_TELEMETRY,
  CAR_STATUS
} from '../constants/f1client';
import carTelemetryMock from './CarTelemetryMock';
import lapDataMock from './LapDataMock';
import { ICarTelemetryData, ILapData, IState } from './types';

// const styles = require('./Home.css');

export default class Home extends PureComponent<any, IState> {
  constructor(props) {
    super(props);

    // test values:
    // [[1.1, 2.1, 3.1, 4.1, 5.1], [1.2, 2.2, 3.2, 4.2, 5.2], [1.3, 2.3, 3.3, 4.3, 5.3]]
    // [[10, 20, 40, 90, 130], [15, 25, 35, 85, 160], [5, 22, 33, 56, 20]]

    this.state = {
      currentLapTimes: [[]],
      currentPlayerSpeeds: [[]],
      currentLapNumber: 0,
      sessionStarted: false
    };
    this.openSocket();
  }

  openSocket = () => {
    /*
    // Handle ipcRenderer message
    ipcRenderer.send('asynchronous-message', 'ping');
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg); // prints "pong"
    });
    */
    const socket = openSocket('http://localhost:24500');
    socket.on(LAP_DATA, e => {
      if (this.state.sessionStarted) {
        this.updateCurrentLapTime(e);
      }
    });
    socket.on(CAR_TELEMETRY, e => {
      if (this.state.sessionStarted) {
        this.updateCurrentPlayerSpeed(e);
      }
    });
    socket.on(SESSION, e => {
      console.log('e.m_sessionTimeLeft', e.m_sessionTimeLeft);
      console.log('e.m_sessionDuration', e.m_sessionDuration);
      if (e.m_sessionTimeLeft < e.m_sessionDuration) {
        this.setState({ sessionStarted: true });
      }
    });

    /*
    // MOCK HELPER
    setInterval(() => {
      this.updateCurrentLapTime(lapDataMock);
      this.updateCurrentPlayerSpeed(carTelemetryMock);
    }, 1000);
    */
    /*
    socket.on(MOTION, e => this.storeInSession(MOTION, e));
    socket.on(EVENT, e => this.storeInSession(EVENT, e));
    socket.on(PARTICIPANTS, e => this.storeInSession(PARTICIPANTS, e));
    socket.on(CAR_SETUPS, e => this.storeInSession(CAR_SETUPS, e));
    socket.on(CAR_STATUS, e => this.storeInSession(CAR_STATUS, e));
    */
  };

  // stores current lap time to state
  updateCurrentLapTime = (lapTimePackage: LAP_DATA) => {
    const playerIndex = lapTimePackage.m_header.m_playerCarIndex;
    const newLapNumber =
      lapTimePackage.m_lapData[playerIndex].m_currentLapNum - 1;
    const currentTime = lapTimePackage.m_lapData[
      playerIndex
    ].m_currentLapTime.toFixed(3);

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
  updateCurrentPlayerSpeed = (carTelemetryPackage: CAR_TELEMETRY) => {
    const { currentLapNumber } = this.state;

    const playerIndex = carTelemetryPackage.m_header.m_playerCarIndex;
    const currentPlayerSpeed =
      carTelemetryPackage.m_carTelemetryData[playerIndex].m_speed;

    this.setState(prevState => {
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

  handleSessionRestart = () => {
    this.setState({
      currentLapTimes: [],
      currentPlayerSpeeds: []
    });
  };

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

    const series = currentPlayerSpeeds.map(data => ({
      name: 'Speed',
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
        trigger: 'axis'
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
      </div>
    );
  }
}
