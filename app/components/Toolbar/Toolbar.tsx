import * as React from 'react';
import { ipcRenderer } from 'electron';
import { Props } from './types';
const styles = require('./Toolbar.css');

const START_F1_CLIENT = 'startF1Client';
const STOP_F1_CLIENT = 'stopF1Client';

export class Toolbar extends React.PureComponent<Props> {
  handleStartRecording = () => ipcRenderer.send(START_F1_CLIENT);

  handleStopRecording = () => ipcRenderer.send(STOP_F1_CLIENT);

  render() {
    const {
      onHandleSessionRestart,
      onHandleSaveState,
      onHandleLoadState
    } = this.props;

    return (
      <div className={styles.navbar}>
        <button type="button" onClick={this.handleStartRecording}>
          Start Recording
        </button>
        <button type="button" onClick={this.handleStopRecording}>
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
