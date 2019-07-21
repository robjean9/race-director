import * as React from 'react';
import { Props } from './types';
import classNames from 'classnames';

import styles from './ModeIndicator.css';

export class ModeIndicator extends React.PureComponent<Props> {
  render() {
    const { title, value, className } = this.props;

    const ModeIndicatorClassname = classNames(
      styles.RangedValueIndicator,
      className
    );

    return (
      <div className={ModeIndicatorClassname}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
}
