import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { IProps } from './types';

export default class SpeedChart extends PureComponent<IProps, any> {
  getSpeedChart = () => {
    const { currentLapTimes, currentPlayerSpeeds } = this.props;

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
      // if we dont copy the array then the chart does not render
      data: data.slice()
    }));

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
    return (
      <ReactEcharts
        option={this.getSpeedChart()}
        style={{ height: '350px', width: '100%' }}
        className="react_for_echarts"
      />
    );
  }
}
