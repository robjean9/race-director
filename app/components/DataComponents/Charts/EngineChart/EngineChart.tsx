import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import { TelemetryType } from '../../../types';
import { getChartOptions, getSeriesForLap } from '../transformations';

export class EngineChart extends React.PureComponent<Props> {
  getEngineRPMChart = () => {
    const { telemetryMatrix, currentLapNumber, xAxisData } = this.props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      TelemetryType.EngineRPM
    );

    return getChartOptions('RPM', 'RPM', xAxisData, series);
  };

  render() {
    return <EChart option={this.getEngineRPMChart()} />;
  }
}
