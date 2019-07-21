import * as React from 'react';
import { Props } from './types';

import styles from './DataPanelBox.css';

// This is the wrapper for DataPanels, adds border, and generic controls
export class DataPanelBox extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    const title = (children as any).props.title;
    return (
      <div className={styles.dataPanelBox}>
        {title && title.length > 0 && (
          <div className={styles.title}>{title}</div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}
