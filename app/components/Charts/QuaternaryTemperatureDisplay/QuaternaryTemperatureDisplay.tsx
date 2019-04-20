import * as React from 'react';
import { UnitDisplay } from '../UnitDisplay/UnitDisplay';
import { Props } from './types';

const styles = require('./QuaternaryTemperatureDisplay.css');

export class QuaternaryTemperatureDisplay extends React.PureComponent<Props> {
  render() {
    const { title } = this.props;
    return (
      <div className={styles.quaternaryTemperatureDisplay}>
        <div className={styles.quaternaryTemperatureDisplayRow}>
          <UnitDisplay title={`${title} FL`} value={120} />
          <UnitDisplay title={`${title} FR`} value={52} />
        </div>
        <div className={styles.quaternaryTemperatureDisplayRow}>
          <UnitDisplay title={`${title} RL`} value={245} />
          <UnitDisplay title={`${title} RR`} value={1} />
        </div>
      </div>
    );
  }
}
