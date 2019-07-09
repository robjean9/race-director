import * as React from 'react';
import { useMemo } from 'react';
import { StateContext, DispatchContext } from '../../App';
import { Participant } from '../../types';
import { actions } from '../../reducer';

const styles = require('./ParticipantsPanel.css');

export function ParticipantsPanel() {
  const { currentParticipants } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const selectParticipant = (participant: Participant) => {
    dispatch({ type: actions.UPDATE_PARTICIPANT, participant });
  };

  const renderNames = () => {
    return currentParticipants.map(
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

  return useMemo(
    () => <div className={styles.racerPanelWrapper}>{renderNames()}</div>,
    [currentParticipants]
  );
}
