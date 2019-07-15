import * as React from 'react';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';
import { StateContext } from '../../App';

//import * as Singapore from './Tracks/Singapore.svg';
const styles = require('./TrackMapPanel.css');

export function TrackMapPanel() {
  const state = React.useContext(StateContext);
  const { worldPositions, participants } = state;

  // 20% of screen
  const canvasWidth = window.innerWidth * 0.2;

  console.log(JSON.stringify(worldPositions));

  const renderDrivers = () =>
    worldPositions.map((worldPosition: Coordinate, index: number) => {
      const translateX = worldPosition.x + canvasWidth / 2;
      const translateY = worldPosition.y + canvasWidth / 2;
      const transform = `translate(${translateX}px, ${translateY}px)`;

      const teamColor =
        participants &&
        participants.participantList &&
        participants.participantList[index] &&
        participants.participantList[index].team.color;
      const backgroundColor = teamColor || '#ffffff';

      return (
        <div
          key={index}
          className={styles.driver}
          style={{ transform, backgroundColor }}
        />
      );
    });

  return (
    <div
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasWidth}px`,
        border: '1px #2e2e2e solid'
      }}
    >
      {/*<Singapore />*/}
      {renderDrivers()}
    </div>
  );
}
