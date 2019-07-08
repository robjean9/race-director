import * as React from 'react';
import classNames from 'classnames';
import { Props } from './types';
import { DataPanel } from '../DataPanels/DataPanel';
import { ParticipantsGrid } from '../DataComponents';
import { RaceDirectorContext } from '../App';

/*
import { ParticipantsPanel } from './ParticipantsPanel';
import { GraphsPanel } from './GraphsPanel';
import { InstrumentsPanel } from './InstrumentsPanel';
import { SessionPanel } from './SessionPanel';
*/

const styles = require('./Canvas.css');

export function Canvas(props: Props) {
  const { onParticipantChange } = props;

  //console.log('state ?', state);

  const column1Classname = classNames(styles.column1, styles.column);
  const column2Classname = classNames(styles.column2, styles.column);
  const column3Classname = classNames(styles.column3, styles.column);
  const column4Classname = classNames(styles.column4, styles.column);

  const participantsGrid = (
    <ParticipantsGrid handleParticipantChange={onParticipantChange} />
  );

  return (
    <div className={styles.telemetryPanels}>
      <div className={column1Classname}>
        <DataPanel>{participantsGrid}</DataPanel>
        {/*
          <ParticipantsPanel
            onParticipantChange={onParticipantChange}
            currentParticipants={currentParticipants}
          />
        */}
      </div>
      <div className={column2Classname}>
        <DataPanel>{participantsGrid}</DataPanel>
        {/*
          <GraphsPanel
            telemetryMatrix={telemetryMatrix}
            currentPlayerSpeeds={currentPlayerSpeeds}
            currentLapNumber={currentLapNumber}
          />
        */}
      </div>
      <div className={column3Classname}>
        <DataPanel>{participantsGrid}</DataPanel>
        {/* <InstrumentsPanel /> */}
      </div>
      <div className={column4Classname}>
        <DataPanel>{participantsGrid}</DataPanel>
        {/*
          <SessionPanel
            currentTrackId={currentTrackId}
            currentWorldPosition={currentWorldPosition}
          />
        */}
      </div>
    </div>
  );
}
