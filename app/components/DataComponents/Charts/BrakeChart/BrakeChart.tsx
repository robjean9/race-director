import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import { TelemetryType } from '../../../types';
import { getChartOptions, getSeriesForLap } from '../transformations';

export class BrakeChart extends React.PureComponent<Props> {
  getBrakeChart = () => {
    const { telemetryMatrix, currentLapNumber, xAxisData } = this.props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      TelemetryType.Brake
    );

    return getChartOptions('Brake', 'Brake', xAxisData, series);
  };

  render() {
    return <EChart option={this.getBrakeChart()} />;
  }
}
