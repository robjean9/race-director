import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import { TelemetryType } from '../../../types';
import { getChartOptions, getSeriesForLap } from '../transformations';

export class GearChart extends React.PureComponent<Props> {
  getGearChart = () => {
    const { telemetryMatrix, currentLapNumber, xAxisData } = this.props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      TelemetryType.Gear
    );

    return getChartOptions('Gear', 'Gear', xAxisData, series);
  };

  render() {
    return <EChart option={this.getGearChart()} />;
  }
}
