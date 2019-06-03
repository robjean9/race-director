import * as React from 'react';
import { SpeedChart, EngineChart } from '../../DataComponents';
import { Props } from './types';

export class GraphsPanel extends React.PureComponent<Props> {
  render() {
    const { speedMatrix, currentPlayerSpeeds, currentLapNumber } = this.props;
    return (
      <React.Fragment>
        {/* Speed */}
        <SpeedChart
          speedMatrix={speedMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Engine */}
        <EngineChart
          speedMatrix={speedMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Gear */}
        <SpeedChart
          speedMatrix={speedMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Throttle */}
        <SpeedChart
          speedMatrix={speedMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Brake */}
        <SpeedChart
          speedMatrix={speedMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
        {/* Steer */}
        <SpeedChart
          speedMatrix={speedMatrix}
          currentPlayerSpeeds={currentPlayerSpeeds}
          currentLapNumber={currentLapNumber}
        />
      </React.Fragment>
    );
  }
}
