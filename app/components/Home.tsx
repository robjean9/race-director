import * as React from 'react';
import { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { find, map } from 'lodash';
import { ICarTelemetryData, ILapData, IState } from './types';

// const styles = require('./Home.css');

export default class Home extends PureComponent<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    };
  }

  storeInSession = (type: string, data: any) => {
    const { session } = this.state;
    if (!session[type]) {
      session[type] = [];
    }
    session[type].push(data);
    this.setState({ session }, () => console.log('Session update', session));
  };

  getPlayerTelemetry = (): ICarTelemetryData[] => {
    const { session } = this.state;
    if (!session || !session.CAR_TELEMETRY) {
      return [];
    }
    const values = session.CAR_TELEMETRY.map(telemetry => {
      const playerIndex = telemetry.m_header.m_playerCarIndex;
      return telemetry.m_carTelemetryData[playerIndex];
    });
    return values;
  };

  getPlayerLapData = (): ILapData[] => {
    const { session } = this.state;
    if (!session || !session.LAP_DATA) {
      return [];
    }
    const values = session.LAP_DATA.map(lapData => {
      const playerIndex = lapData.m_header.m_playerCarIndex;
      return lapData.m_lapData[playerIndex];
    });
    return values;
  };

  getPlayerCurrentLapTime = () =>
    map(this.getPlayerLapData(), 'm_currentLapTime');

  getPlayerSpeed = () => map(this.getPlayerTelemetry(), 'm_speed');

  mergeValueWithCurrentLapTimes = values => {
    const lapTimes = this.getPlayerCurrentLapTime();
    const test = [];
    for (let i = 0; i < lapTimes.length; i++) {
      test.push({ x: lapTimes[i], y: values[i] });
    }
    return test;
  };

  /*
  handleSessionLoad = () => {
    fs.readFile("./data.rd", (err, session) => {
      if (err) {
        throw err;
      }
      this.setState({ session: JSON.parse(session.toString()) }, () =>
        console.log("Session loaded", this.state.session)
      );
    });
  };

  handleSessionSave = () => {
    const { session } = this.state;
    fs.writeFile("./data.rd", JSON.stringify(session), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Session has been saved");
    });
  };
  */

  getPlayerParticipantData = () => {
    // gets data from participants
    const { session } = this.state;
    if (!session || !session.PARTICIPANTS) {
      return;
    }
    const participants = session.PARTICIPANTS.map(data => data.m_participants);
    const playerParticipantData = participants.map(participantPacket =>
      find(participantPacket, { m_aiControlled: 0 })
    );
    console.log(playerParticipantData);
  };

  handleSessionRestart = () => {
    this.setState({ session: {} }, () => {
      const { session } = this.state;
      console.log('Session restarted', session);
    });
  };

  getOption = () => {
    return {
      title: {
        text: 'Speed'
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false
          }
        }
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
          data: this.getPlayerCurrentLapTime()
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
          data: this.getPlayerSpeed()
        }
      ]
    };
  };

  render() {
    return (
      <div>
        <h2>Race Director v0.0.1</h2>
        {/*
        <button onClick={this.handleSessionLoad}>Load Session</button>
        <button onClick={this.handleSessionSave}>Save Session</button>
         */}
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