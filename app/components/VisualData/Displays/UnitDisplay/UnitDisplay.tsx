import * as React from 'react';
import { Props } from './types';

const styles = require('./UnitDisplay.css');

export class UnitDisplay extends React.PureComponent<Props> {
  render() {
    const { title, value } = this.props;
    return (
      <div className={styles.unitDisplay}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
}
