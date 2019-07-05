import * as React from 'react';
import { LineChart } from '../../DataComponents';
import { Props } from './types';
import { getXAxisData } from '../../DataComponents/Charts/transformations';
import { TelemetryType } from '../../types';

export class GraphsPanel extends React.PureComponent<Props> {
  render() {
    const {
      telemetryMatrix,
      currentPlayerSpeeds,
      currentLapNumber
    } = this.props;

    const xAxisData = getXAxisData(telemetryMatrix);

    return (
      <React.Fragment>
        {/* Speed */}
        <LineChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Speed}
          title={'Speed'}
        />
        {/* EngineRPM */}
        <LineChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.EngineRPM}
          title={'RPM'}
        />
        {/* Gear */}
        <LineChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Gear}
          title={'Gear'}
        />
        {/* Throttle */}
        <LineChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Throttle}
          title={'Throttle'}
        />
        {/* Brake */}
        <LineChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Brake}
          title={'Brake'}
        />
        {/* Steer */}
        <LineChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Steer}
          title={'Steer'}
        />
      </React.Fragment>
    );
  }
}
