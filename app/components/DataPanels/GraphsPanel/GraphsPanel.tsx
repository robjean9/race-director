import * as React from 'react';
import {
  SpeedChart,
  EngineChart,
  GearChart,
  ThrottleChart,
  BrakeChart,
  SteerChart
} from '../../DataComponents';
import { Props } from './types';
import { getXAxisData } from '../../DataComponents/Charts/transformations';

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
        <SpeedChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
        />
        {/* Engine */}
        <EngineChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
        />
        {/* Gear */}
        <GearChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
        />
        {/* Throttle */}
        <ThrottleChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
        />
        {/* Brake */}
        <BrakeChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
        />
        {/* Steer */}
        <SteerChart
          telemetryMatrix={telemetryMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
          xAxisData={xAxisData}
        />
      </React.Fragment>
    );
  }
}
