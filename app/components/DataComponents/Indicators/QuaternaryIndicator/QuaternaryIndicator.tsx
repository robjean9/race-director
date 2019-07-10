import * as React from 'react';
import { UnaryIndicator } from '../UnaryIndicator';
import { Props } from './types';

const styles = require('./QuaternaryIndicator.css');

export class QuaternaryIndicator extends React.PureComponent<Props> {
  render() {
    const { title, values, minValue, maxValue } = this.props;
    return (
      <div className={styles.quaternaryIndicator}>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`${title} FL`}
            value={values[2]}
          />
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`${title} FR`}
            value={values[3]}
          />
        </div>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`${title} RL`}
            value={values[0]}
          />
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`${title} RR`}
            value={values[1]}
          />
        </div>
      </div>
    );
  }
}
