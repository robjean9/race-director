import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { IProps } from './types';

export default class SpeedChart extends PureComponent<IProps, any> {
  getSpeedChart = () => {
    const { currentLapTimes, currentLapNumber } = this.props;

    // currentLapTimes[milliseconds][lap]
    // every lap cover a different set of milliseconds
    const xAxisData = currentLapTimes
      // gets times (each index represents a time)
      .map((_, index) => index)
      // takes out null values (times that were not recorded)
      // eg. received a package about 1424 ms and then 1429 ms
      // doing a !!time filter takes out empty
      // array positions from 1425 to 1428
      .filter(time => !!time);

    // prints last two laps
    const series = [
      {
        name: `Lap ${currentLapNumber + 1}`,
        smooth: true,
        connectNulls: true,
        type: 'line',
        large: true,
        data: xAxisData.map(time => currentLapTimes[time][currentLapNumber])
      },
      {
        name: `Lap ${currentLapNumber}`,
        smooth: true,
        connectNulls: true,
        type: 'line',
        large: true,
        data: xAxisData.map(time => currentLapTimes[time][currentLapNumber - 1])
      }
    ];

    return {
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
            formatter: function(value) {
              // Formatted to be month/day; display year only in the first label]
              // Get hours from milliseconds
              var hours = value / (1000 * 60 * 60);
              var absoluteHours = Math.floor(hours);

              // Get remainder from hours and convert to minutes
              var minutes = (hours - absoluteHours) * 60;
              var absoluteMinutes = Math.floor(minutes);
              var m = absoluteMinutes;

              // Get remainder from minutes and convert to seconds
              var seconds = (minutes - absoluteMinutes) * 60;
              var absoluteSeconds = Math.floor(seconds);
              var s =
                absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

              var milliseconds = (seconds - absoluteSeconds) * 60;
              var absoluteMilliseconds = Math.floor(milliseconds);
              var ms =
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
      <ReactEcharts
        option={this.getSpeedChart()}
        style={{ height: '350px', width: '100%' }}
        className="react_for_echarts"
      />
    );
  }
}
