import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import { TelemetryType } from '../../../types';
import { getChartOptions, getSeriesForLap } from '../transformations';

export class ThrottleChart extends React.PureComponent<Props> {
  getThrottleChart = () => {
    const { telemetryMatrix, currentLapNumber, xAxisData } = this.props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      TelemetryType.Throttle
    );

    return getChartOptions('Throttle', 'Throttle', xAxisData, series);
  };

  render() {
    return <EChart option={this.getThrottleChart()} />;
  }
}
