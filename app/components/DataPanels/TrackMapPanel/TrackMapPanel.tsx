import * as React from 'react';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';
import Singapore from './Tracks/Singapore.svg';
import { StateContext } from '../../App';
import styles from './TrackMapPanel.css';

let mapRef: any;

export function TrackMapPanel() {
  const state = React.useContext(StateContext);
  const { worldPositions, participants } = state;

  React.useEffect(() => {
    mapRef = React.createRef();
  }, []);

  const getDriverColor = (index: number) => {
    const teamColor =
      participants &&
      participants.participantList &&
      participants.participantList[index] &&
      participants.participantList[index].team.color;
    return teamColor || '#ffffff';
  };

  const renderDrivers = () =>
    worldPositions.map((worldPosition: Coordinate, index: number) => {
      const mapWidth = mapRef.current.clientWidth;
      let relativeSize = mapWidth / 297;
      console.log('mapWidth', mapWidth);
      const translateX = mapWidth / 2 - 6 + worldPosition.x * relativeSize;
      const translateY = worldPosition.y * relativeSize;

      const transform = `translate(${translateX}px, ${translateY}px)`;
      const backgroundColor = getDriverColor(index);

      return (
        <div
          key={index}
          className={styles.driver}
          style={{ transform, backgroundColor }}
        />
      );
    });

  const handleScaleChange = (e: any) => {
    //relativeSize = e.target.value;
  };

  return (
    <React.Fragment>
      <input
        className={styles.txt1}
        type="text"
        onChange={handleScaleChange}
        placeholder="scale"
      />
      <div className={styles.trackMapWrapper} ref={mapRef}>
        <img src={Singapore} className={styles.trackMap} />
        {/*renderCurrentDriver()*/}
        {renderDrivers()}
      </div>
    </React.Fragment>
  );
}
