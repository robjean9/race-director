import * as React from 'react';
import { Props } from './types';

const styles = require('./UnaryIndicator.css');

export class UnaryIndicator extends React.PureComponent<Props> {
  render() {
    const { title, value, minValue, maxValue } = this.props;
    const valuePercentage = ((value - minValue) / (maxValue - minValue)) * 100;

    let backgroundPosition = valuePercentage;
    if (value < minValue) {
      backgroundPosition = 0;
    } else if (value > maxValue) {
      backgroundPosition = 100;
    }

    return (
      <div
        className={styles.unaryIndicator}
        style={{ backgroundPosition: `${backgroundPosition}% 0%` }}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
}
