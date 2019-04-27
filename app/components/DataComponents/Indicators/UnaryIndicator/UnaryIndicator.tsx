import * as React from 'react';
import { Props } from './types';

const styles = require('./UnaryIndicator.css');

export class UnaryIndicator extends React.PureComponent<Props> {
  render() {
    const { title, value } = this.props;
    return (
      <div className={styles.unaryIndicator}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
}
