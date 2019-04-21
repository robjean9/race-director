import * as React from 'react';

const styles = require('./TimeDisplay.css');

export class TimeDisplay extends React.PureComponent {
  render() {
    return (
      <div className={styles.timeDisplayWrapper}>
        <div>Current Lap Time</div>
        <div>Last Lap Time</div>
        <div>Best Lap Time</div>
        <div>Sector 1 Time</div>
        <div>Sector 2 Time</div>
        <div>Car Position</div>
        <div>Current Lap Num</div>
        <div>Penalties</div>
      </div>
    );
  }
}
