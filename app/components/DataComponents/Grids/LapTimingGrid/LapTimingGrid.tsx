import * as React from 'react';
import { Props } from './types';

import styles from './LapTimingGrid.css';

import { useContext } from 'react';
import { StateContext } from '../../../App';

export function LapTimingGrid(props: Props) {
  const { currentLapTime,currentLapNumber,sector1Time,sector2Time,sector3Time } = useContext(StateContext);
 
   

    return (
      <div className={styles.lapTimingGridWrapper}>
        <div className={styles.timings}>
          <div className={styles.timeRow}>
            <div>Current Lap Time</div>
            <div>Last Lap Time</div>
            <div>Best Lap Time</div>
          </div>
          <div className={styles.timeRow}>
            <div>{currentLapTime}</div>
            <div>Last Lap Time</div>
            <div>Best Lap Time</div>
          </div>
          <div className={styles.timeRow}>
            <div>Sector 1 Time</div>
            <div>Sector 2 Time</div>
            <div>Sector 3 Time</div>
            <div>Car Position</div>
          </div>
          <div className={styles.timeRow}>
            <div>{sector1Time}</div>
            <div>{sector2Time}</div>
            <div>{sector3Time}</div>
            <div>Car Position</div>
          </div>
          <div className={styles.timeRow}>
    <div>{currentLapNumber}</div>
            <div>Penalties</div>
          </div>
        </div>
      </div>
    );
}
