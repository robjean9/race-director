import * as React from 'react';
import { Props } from './types';

const styles = require('./DataPanel.css');

export class DataPanel extends React.PureComponent<Props> {
  render() {
    return <div className={styles.dataPanelWrapper}>{this.props.children}</div>;
  }
}
