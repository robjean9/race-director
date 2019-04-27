import * as React from 'react';
import { UnitDisplay } from '../UnitDisplay/UnitDisplay';
import { Props } from './types';

const styles = require('./quaternaryUnitDisplay.css');

export class quaternaryUnitDisplay extends React.PureComponent<Props> {
  render() {
    const { title } = this.props;
    return (
      <div className={styles.quaternaryUnitDisplay}>
        <span className={styles.quaternaryUnitDisplayTitle}>{title}</span>
        <div className={styles.quaternaryUnitDisplayRow}>
          <UnitDisplay title={`${title} FL`} value={120} />
          <UnitDisplay title={`${title} FR`} value={52} />
        </div>
        <div className={styles.quaternaryUnitDisplayRow}>
          <UnitDisplay title={`${title} RL`} value={245} />
          <UnitDisplay title={`${title} RR`} value={1} />
        </div>
      </div>
    );
  }
}
