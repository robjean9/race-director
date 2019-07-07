import * as React from 'react';
import { Props } from './types';
import { Participant } from '../../../types';
import { RaceDirectorContext } from '../../../App';

const styles = require('./ParticipantsGrid.css');

export function ParticipantsGrid(props: Props) {
  const selectParticipant = (participant: Participant) => {
    props.handleParticipantChange(participant);
  };

  const renderNames = () => {
    const { currentParticipants } = React.useContext(RaceDirectorContext);
    return currentParticipants.map((participant, index) => (
      <div
        key={index}
        className={styles.participantWrapper}
        onClick={() => selectParticipant(participant)}
      >
        <div
          className={styles.teamTag}
          style={{
            backgroundColor: participant.team.color
          }}
        />
        <span className={styles.nameLabel}>{participant.abbreviation}</span>
      </div>
    ));
  };

  return <div className={styles.racerPanelWrapper}>{renderNames()}</div>;
}
