import * as React from 'react';
import { Props } from './types';

const styles = require('./DataPanelBox.css');

// This is the wrapper for DataPanels, adds border, and generic controls
export class DataPanelBox extends React.PureComponent<Props> {
  render() {
    return <div className={styles.dataPanelBox}>{this.props.children}</div>;
  }
}
