import * as React from 'react';
import { Props } from './types';
const styles = require('./Toolbar.css');

export class Toolbar extends React.PureComponent<Props> {
  render() {
    const {
      onHandleStartRecording,
      onHandleStopRecording,
      onHandleSessionRestart,
      onHandleSaveState,
      onHandleLoadState
    } = this.props;

    return (
      <div className={styles.navbar}>
        Tracking Hamilton
        <button type="button" onClick={onHandleStartRecording}>
          Start Recording
        </button>
        <button type="button" onClick={onHandleStopRecording}>
          Stop Recording
        </button>
        <button type="button" onClick={onHandleSessionRestart}>
          Restart Session
        </button>
        <button type="button" onClick={onHandleSaveState}>
          Save State
        </button>
        <button type="button" onClick={onHandleLoadState}>
          Load State
        </button>
      </div>
    );
  }
}
