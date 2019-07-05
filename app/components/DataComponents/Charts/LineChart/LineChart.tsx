import * as React from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import { getChartOptions, getSeriesForLap } from '../transformations';

export class LineChart extends React.PureComponent<Props> {
  getLineChart = () => {
    const {
      telemetryMatrix,
      currentLapNumber,
      xAxisData,
      telemetryType,
      title
    } = this.props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      telemetryType
    );

    return getChartOptions(title, title, xAxisData, series);
  };

  render() {
    return <EChart option={this.getLineChart()} />;
  }
}
