import * as React from 'react';
import { RangedValueIndicator } from '../RangedValueIndicator';
import { Props } from './types';

const styles = require('./QuaternaryIndicator.css');

export class QuaternaryIndicator extends React.PureComponent<Props> {
  render() {
    const { values, minValue, maxValue, unit } = this.props;
    return (
      <div className={styles.quaternaryIndicator}>
        <div className={styles.quaternaryIndicatorRow}>
          <RangedValueIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`Front Left`}
            unit={unit}
            value={values[2]}
          />
          <RangedValueIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`Front Right`}
            unit={unit}
            value={values[3]}
          />
        </div>
        <div className={styles.quaternaryIndicatorRow}>
          <RangedValueIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`Rear Left`}
            unit={unit}
            value={values[0]}
          />
          <RangedValueIndicator
            minValue={minValue}
            maxValue={maxValue}
            title={`Rear Right`}
            unit={unit}
            value={values[1]}
          />
        </div>
      </div>
    );
  }
}
