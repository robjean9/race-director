import * as React from 'react';
import { UnaryIndicator } from '../UnaryIndicator';
import { Props } from './types';

const styles = require('./QuaternaryIndicator.css');

export class QuaternaryIndicator extends React.PureComponent<Props> {
  render() {
    const { title } = this.props;
    return (
      <div className={styles.quaternaryIndicator}>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator title={`${title} FL`} value={120} />
          <UnaryIndicator title={`${title} FR`} value={52} />
        </div>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator title={`${title} RL`} value={245} />
          <UnaryIndicator title={`${title} RR`} value={1} />
        </div>
      </div>
    );
  }
}
