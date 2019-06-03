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

export const getXAxisData = (telemetryMatrix: Telemetry[][]) => {
  return (
    telemetryMatrix
      // gets times (each index represents a time)
      // tslint:disable-next-line:no-any
      .map((_: any, index: number) => index)
      // takes out null values (times that were not recorded)
      // eg. received a package about 1424 ms and then 1429 ms
      // doing a !!time filter takes out empty
      // array positions from 1425 to 1428
      .filter((time: number) => !!time)
  );
};

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
      data: xAxisData.map(
        (time: number) => telemetryMatrix[time][lapNumber][telemetryType]
      )
    }
  ];
};

export const getChartOptions = (
  title: string,
  unit: string,
  data: any,
  series: any
) => {
  return {
    title: {
      text: title,
      //left: '60px',
      //top: '30px',
      textStyle: {
        color: '#00d2be',
        fontWeight: 'lighter',
        fontSize: '12px'
      }
    },
    grid: {
      left: 5,
      top: 25,
      right: 15,
      bottom: 10
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      }
    },
    xAxis: [
      {
        boundaryGap: false,
        silent: true,
        data,
        axisLabel: {
          dateFormatter
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value} ' + unit
        }
      }
    ],
    series
  };
};
