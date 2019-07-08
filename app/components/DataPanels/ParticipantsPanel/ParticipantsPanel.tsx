import * as React from 'react';
import { Props } from './types';
import { RaceDirectorContext } from '../../App';
import { Participant } from '../../types';
import { actions } from '../../reducer';

const styles = require('./ParticipantsPanel.css');

export function ParticipantsPanel(props: Props) {
  const { dispatch } = React.useContext(RaceDirectorContext);

  const selectParticipant = (participant: Participant) => {
    dispatch({ type: actions.UPDATE_PARTICIPANT, participant });
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
