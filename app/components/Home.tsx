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
import { ICarTelemetryData, ILapData, IState } from './types';

// const styles = require('./Home.css');

export default class Home extends PureComponent<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      currentLapTimes: [],
      currentPlayerSpeeds: []
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
      this.storeCurrentLapTime(e);
    });
    socket.on(CAR_TELEMETRY, e => {
      this.storeCurrentPlayerSpeed(e);
    });
    /*
    socket.on(SESSION, e => this.storeInSession(SESSION, e));
    socket.on(MOTION, e => this.storeInSession(MOTION, e));
    socket.on(EVENT, e => this.storeInSession(EVENT, e));
    socket.on(PARTICIPANTS, e => this.storeInSession(PARTICIPANTS, e));
    socket.on(CAR_SETUPS, e => this.storeInSession(CAR_SETUPS, e));
    socket.on(CAR_STATUS, e => this.storeInSession(CAR_STATUS, e));
    */
  };

  // stores current lap time to state
  storeCurrentLapTime = (lapTimePackage: LAP_DATA) => {
    const playerIndex = lapTimePackage.m_header.m_playerCarIndex;
    const currentTime = lapTimePackage.m_lapData[playerIndex].m_currentLapTime;
    this.setState(prevState => ({
      currentLapTimes: [...prevState.currentLapTimes, currentTime]
    }));
  };

  storeCurrentPlayerSpeed = (carTelemetryPackage: CAR_TELEMETRY) => {
    const playerIndex = carTelemetryPackage.m_header.m_playerCarIndex;
    const currentPlayerSpeed =
      carTelemetryPackage.m_carTelemetryData[playerIndex].m_speed;
    this.setState(prevState => ({
      currentPlayerSpeeds: [
        ...prevState.currentPlayerSpeeds,
        currentPlayerSpeed
      ]
    }));
  };

  handleSessionRestart = () => {
    this.setState({
      currentLapTimes: [],
      currentPlayerSpeeds: []
    });
  };

  handleStartRecording = () => ipcRenderer.send(START_F1_CLIENT);

  handleStopRecording = () => ipcRenderer.send(STOP_F1_CLIENT);

  getOption = () => {
    const { currentLapTimes, currentPlayerSpeeds } = this.state;
    return {
      title: {
        text: 'Speed'
      },
      tooltip: {
        trigger: 'axis'
        /*
        formatter: function(params) {
          params = params[0];
          var date = new Date(params.name);
          return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            " : " +
            params.value[1]
          );
        }*/
      },
      xAxis: [
        {
          boundaryGap: false,
          silent: true,
          data: currentLapTimes
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      dataZoom: [
        {
          type: 'inside'
        },
        {
          type: 'slider'
        }
      ],
      series: [
        {
          name: 'Speed',
          type: 'line',
          stack: 'l',
          large: true,
          areaStyle: { normal: {} },
          data: currentPlayerSpeeds
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
          option={this.getOption()}
          style={{ height: '350px', width: '100%' }}
          className="react_for_echarts"
        />
      </div>
    );
  }
}
