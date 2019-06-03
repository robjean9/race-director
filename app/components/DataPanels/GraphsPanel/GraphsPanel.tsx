import * as React from 'react';
import { TelemetryChart } from '../../DataComponents';
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
        <TelemetryChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Speed}
          title={'Speed'}
        />
        {/* EngineRPM */}
        <TelemetryChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.EngineRPM}
          title={'RPM'}
        />
        {/* Gear */}
        <TelemetryChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Gear}
          title={'Gear'}
        />
        {/* Throttle */}
        <TelemetryChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Throttle}
          title={'Throttle'}
        />
        {/* Brake */}
        <TelemetryChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
          telemetryType={TelemetryType.Brake}
          title={'Brake'}
        />
        {/* Steer */}
        <TelemetryChart
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
