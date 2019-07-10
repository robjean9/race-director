import * as React from 'react';
import { UnaryIndicator } from '../UnaryIndicator';
import { Props } from './types';

const styles = require('./QuaternaryIndicator.css');

export class QuaternaryIndicator extends React.PureComponent<Props> {
  render() {
    const { title, values } = this.props;
    return (
      <div className={styles.quaternaryIndicator}>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator title={`${title} FL`} value={values[0]} />
          <UnaryIndicator title={`${title} FR`} value={values[1]} />
        </div>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator title={`${title} RL`} value={values[2]} />
          <UnaryIndicator title={`${title} RR`} value={values[3]} />
        </div>
      </div>
    );
  }
}
