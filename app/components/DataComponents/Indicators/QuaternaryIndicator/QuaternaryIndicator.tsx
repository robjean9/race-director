import * as React from 'react';
import { UnaryIndicator } from '../UnaryIndicator';
import { Props } from './types';

const styles = require('./QuaternaryIndicator.css');

export class QuaternaryIndicator extends React.PureComponent<Props> {
  render() {
    const { values, minValue, maxValue, unit } = this.props;
    return (
      <div className={styles.quaternaryIndicator}>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`FL`}
            unit={unit}
            value={values[2]}
          />
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`FR`}
            unit={unit}
            value={values[3]}
          />
        </div>
        <div className={styles.quaternaryIndicatorRow}>
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`RL`}
            unit={unit}
            value={values[0]}
          />
          <UnaryIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`RR`}
            unit={unit}
            value={values[1]}
          />
        </div>
      </div>
    );
  }
}
