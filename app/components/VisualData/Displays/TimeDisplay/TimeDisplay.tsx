import * as React from 'react';
import { Props } from './types';

const styles = require('./TimeDisplay.css');

export class TimeDisplay extends React.PureComponent<Props> {
  render() {
    const { title } = this.props;

    return (
      <div className={styles.timeDisplayWrapper}>
        <span className={styles.title}>{title}</span>
        <div className={styles.timings}>
          <div className={styles.timeRow}>
            <div>Current Lap Time</div>
            <div>Last Lap Time</div>
            <div>Best Lap Time</div>
          </div>
          <div className={styles.timeRow}>
            <div>Sector 1 Time</div>
            <div>Sector 2 Time</div>
            <div>Car Position</div>
          </div>
          <div className={styles.timeRow}>
            <div>Current Lap Num</div>
            <div>Penalties</div>
          </div>
        </div>
      </div>
    );
  }
}
