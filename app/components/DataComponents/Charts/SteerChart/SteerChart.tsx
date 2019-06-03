import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import { TelemetryType } from '../../../types';
import { getChartOptions, getSeriesForLap } from '../transformations';

export class SteerChart extends React.PureComponent<Props> {
  getSteerChart = () => {
    const { telemetryMatrix, currentLapNumber, xAxisData } = this.props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      TelemetryType.Steer
    );

    return getChartOptions('Steer', 'Steer', xAxisData, series);
  };

  render() {
    return <EChart option={this.getSteerChart()} />;
  }
}
