import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart/EChart';
import { dateFormatter } from '../transformations';

export class SpeedChart extends React.PureComponent<Props> {
  getSpeedChart = () => {
    const { speedMatrix, currentLapNumber } = this.props;

    // speedMatrix[milliseconds][lap]
    // every lap cover a different set of milliseconds
    const xAxisData = speedMatrix
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
          (time: number) => speedMatrix[time][currentLapNumber]
        )
      },
      {
        name: `Lap ${currentLapNumber}`,
        smooth: true,
        connectNulls: true,
        type: 'line',
        large: true,
        data: xAxisData.map(
          (time: number) => speedMatrix[time][currentLapNumber - 1]
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
            dateFormatter
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
    return <EChart option={this.getSpeedChart()} />;
  }
}
