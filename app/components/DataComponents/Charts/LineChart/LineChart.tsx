import * as React from 'react';
import { useContext } from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import { getChartOptions, getSeriesForLap } from '../transformations';
import { StateContext } from '../../../App';

export function LineChart(props: Props) {
  const { telemetryMatrix, currentLapNumber, xAxisData } = useContext(
    StateContext
  );

  const getLineChart = () => {
    const { telemetryType, unit } = props;

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      telemetryType
    );

    return getChartOptions(unit, xAxisData, series);
  };

  return <EChart option={getLineChart()} />;
}
