import * as React from 'react';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';
import Singapore from './Tracks/Singapore.svg';
import { StateContext } from '../../App';
import styles from './TrackMapPanel.css';
debugger;
export function TrackMapPanel() {
  const state = React.useContext(StateContext);
  const { worldPositions, participants } = state;

  // 20% of screen
  const canvasWidth = window.innerWidth * 0.2;

  //console.log(JSON.stringify(worldPositions));

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
    <div className={styles.trackMapWrapper}>
      <img src={Singapore} />
      {renderDrivers()}
    </div>
  );
}
