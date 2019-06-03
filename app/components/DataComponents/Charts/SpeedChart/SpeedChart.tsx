import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart/EChart';
import { TelemetryType } from '../../../types';
import {
  getChartOptions,
  getSeriesForLap,
  getXAxisData
} from '../transformations';

export class SpeedChart extends React.PureComponent<Props> {
  getSpeedChart = () => {
    const { telemetryMatrix, currentLapNumber, xAxisData } = this.props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      TelemetryType.Speed
    );

    return getChartOptions('Speed [km/h]', 'km/h', xAxisData, series);
  };

  render() {
    return <EChart option={this.getSpeedChart()} />;
  }
}
