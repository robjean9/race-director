import * as React from 'react';
import { useMemo, useContext } from 'react';
import { Props } from './types';
import { EChart } from '../EChart';
import {
  getChartOptions,
  getSeriesForLap,
  getXAxisData
} from '../transformations';
import { StateContext } from '../../../App';

export function LineChart(props: Props) {
  const { telemetryMatrix, currentLapNumber } = useContext(StateContext);

  const getLineChart = () => {
    const { telemetryType, title } = props;

    const xAxisData = getXAxisData(telemetryMatrix);

    const series = getSeriesForLap(
      telemetryMatrix,
      xAxisData,
      currentLapNumber,
      telemetryType
    );

    return getChartOptions(title, title, xAxisData, series);
  };

  return <EChart option={getLineChart()} />;
}
