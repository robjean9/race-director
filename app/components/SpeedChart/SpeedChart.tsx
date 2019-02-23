import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { IProps } from './types';

export default class SpeedChart extends PureComponent<IProps, any> {
  getSpeedChart = () => {
    const { currentLapTimes, currentLapNumber } = this.props;

    const xAxisData = currentLapTimes
      .map((_, index) => index)
      .filter(lap => !!lap);

    const yAxisData = xAxisData.map(
      time => currentLapTimes[time][currentLapNumber]
    );

    const series = {
      name: `Lap ${currentLapNumber + 1}`,
      smooth: true,
      connectNulls: true,
      type: 'line',
      large: true,
      // if we dont copy the array then the chart does not render
      data: yAxisData
    };

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
          data: xAxisData
        }
      ],
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
