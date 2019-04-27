import * as React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Props } from './types';

const styles = require('./SpeedChart.css');

export class SpeedChart extends React.PureComponent<Props> {
  getSpeedChart = () => {
    const { currentLapTimes, currentLapNumber } = this.props;

    // currentLapTimes[milliseconds][lap]
    // every lap cover a different set of milliseconds
    const xAxisData = currentLapTimes
      // gets times (each index represents a time)
      // tslint:disable-next-line:no-any
      .map((_: any, index: number) => index)
      // takes out null values (times that were not recorded)
      // eg. received a package about 1424 ms and then 1429 ms
      // doing a !!time filter takes out empty
      // array positions from 1425 to 1428
      // tslint:disable-next-line:no-any
      .filter((time: number) => !!time);

    // prints last two laps
    const series = [
      {
        name: `Lap ${currentLapNumber + 1}`,
        smooth: true,
        connectNulls: true,
        type: 'line',
        large: true,
        data: xAxisData.map(
          (time: number) => currentLapTimes[time][currentLapNumber]
        )
      },
      {
        name: `Lap ${currentLapNumber}`,
        smooth: true,
        connectNulls: true,
        type: 'line',
        large: true,
        data: xAxisData.map(
          (time: number) => currentLapTimes[time][currentLapNumber - 1]
        )
      }
    ];

    return {
      title: {
        text: 'Speed [km/h]',
        //left: '60px',
        //top: '30px',
        textStyle: {
          color: '#00d2be',
          fontWeight: 'lighter',
          fontSize: '12px'
        }
      },
      grid: {
        left: 5,
        top: 25,
        right: 15,
        bottom: 10
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
      xAxis: [
        {
          boundaryGap: false,
          silent: true,
          data: xAxisData,
          axisLabel: {
            // tslint:disable-next-line:no-any
            formatter(value: any) {
              // Formatted to be month/day; display year only in the first label]
              // Get hours from milliseconds
              const hours = value / (1000 * 60 * 60);
              const absoluteHours = Math.floor(hours);

              // Get remainder from hours and convert to minutes
              const minutes = (hours - absoluteHours) * 60;
              const absoluteMinutes = Math.floor(minutes);
              const m = absoluteMinutes;

              // Get remainder from minutes and convert to seconds
              const seconds = (minutes - absoluteMinutes) * 60;
              const absoluteSeconds = Math.floor(seconds);
              const s =
                absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

              const milliseconds = (seconds - absoluteSeconds) * 60;
              const absoluteMilliseconds = Math.floor(milliseconds);
              const ms =
                absoluteMilliseconds > 9
                  ? absoluteMilliseconds
                  : '0' + absoluteMilliseconds;

              return `${m}:${s}:${ms}`;
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} km/h'
          }
        }
      ],
      series
    };
  };

  render() {
    return (
      <ReactEcharts
        style={{ height: '20vh' }}
        option={this.getSpeedChart()}
        className={styles.echart}
      />
    );
  }
}
