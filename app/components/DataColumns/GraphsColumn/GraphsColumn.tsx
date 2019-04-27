import * as React from 'react';
import { SpeedChart, EngineChart } from '../../VisualData';
import { Props } from './types';

export class GraphsColumn extends React.PureComponent<Props> {
  render() {
    const { lapTimes, currentPlayerSpeeds, currentLapNumber } = this.props;
    return (
      <React.Fragment>
        {/* Speed */}
        <SpeedChart
          currentLapTimes={lapTimes}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Engine */}
        <EngineChart
          currentLapTimes={lapTimes}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Gear */}
        <SpeedChart
          currentLapTimes={lapTimes}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Throttle */}
        <SpeedChart
          currentLapTimes={lapTimes}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Brake */}
        <SpeedChart
          currentLapTimes={lapTimes}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Steer */}
        <SpeedChart
          currentLapTimes={lapTimes}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
      </React.Fragment>
    );
  }
}
