import * as React from 'react';
import { Telemetry, TelemetryType } from '../../types';

export const dateFormatter = (value: any) => {
  // Formatted to be month/day; display year only in the first label]
  // Get hours from milliseconds
  const hours = value / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours);

  // Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes);
  const m = absoluteMinutes;

  // Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds);
  const s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  const milliseconds = (seconds - absoluteSeconds) * 60;
  const absoluteMilliseconds = Math.floor(milliseconds);
  const ms =
    absoluteMilliseconds > 9
      ? absoluteMilliseconds
      : '0' + absoluteMilliseconds;

  return `${m}:${s}:${ms}`;
};

// TODO: this crashes when new lap happens
export const getSeriesForLap = (
  telemetryMatrix: Telemetry[][],
  xAxisData: number[],
  lapNumber: number,
  telemetryType: TelemetryType
) => {
  // get series for last lap
  return [
    {
      name: `Lap ${lapNumber + 1}`,
      smooth: true,
      connectNulls: true,
      type: 'line',
      large: true,
      showSymbol: false,
      data: xAxisData.map(
        (time: number) => telemetryMatrix[time][lapNumber][telemetryType]
      ),
      itemStyle: {
        color: 'rgba(0, 215, 143, 1.0)'
      },
      areaStyle: {
        color: 'rgba(0, 215, 143, 0.1)'
      }
    }
  ];
};

export const getChartOptions = (unit: string = '', data: any, series: any) => {
  return {
    title: {
      show: false,
      textStyle: {
        color: '#8a96ae',
        fontWeight: 'lighter',
        fontSize: '12px'
      }
    },
    grid: {
      left: 45,
      top: 25,
      right: 15,
      bottom: 20
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      },
      formatter: (value: any) => {
        return value.map(
          (v: any) =>
            `${dateFormatter(v.axisValue)}: ${
              v.value % 1 == 0 ? v.value : v.value.toFixed(3)
            }${unit}`
        );
      }
    },
    xAxis: [
      {
        boundaryGap: false,
        silent: true,
        data,
        axisLabel: {
          formatter: dateFormatter
        },
        axisLine: {
          lineStyle: { color: '#0f1424' }
        },
        splitLine: {
          show: false,
          lineStyle: { color: '#0f1424' }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: { color: '#0f1424' }
        },
        splitLine: {
          lineStyle: { color: '#0f1424' }
        }
      }
    ],
    series
  };
};
