import * as React from 'react';
import { Props } from './types';
import { Participant } from '../../../types';
import { RaceDirectorContext } from '../../../App';
import { actions } from '../../../reducer';

const styles = require('./ParticipantsGrid.css');

export function ParticipantsGrid(props: Props) {
  const selectParticipant = (participant: Participant) => {
    const { dispatch } = React.useContext(RaceDirectorContext);
    dispatch({ type: actions.UPDATE_PARTICIPANT, participant });
    //props.handleParticipantChange(participant);
  };

  const renderNames = () => {
    const { state } = React.useContext(RaceDirectorContext);
    return state.currentParticipants.map(
      (participant: Participant, index: number) => (
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
      )
    );
  };

  return <div className={styles.racerPanelWrapper}>{renderNames()}</div>;
}
