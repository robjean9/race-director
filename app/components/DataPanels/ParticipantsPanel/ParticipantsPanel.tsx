import * as React from 'react';
import { useContext } from 'react';
import { DispatchContext, ParticipantsContext } from '../../App';
import { Participant } from '../../types';
import { actions } from '../../reducer';
import classNames = require('classnames');

import styles from './ParticipantsPanel.css';

export function ParticipantsPanel() {
  const participants = useContext(ParticipantsContext);

  const dispatch = useContext(DispatchContext);

  const selectParticipant = (participant: Participant) => {
    dispatch({ type: actions.UPDATE_PARTICIPANT, participant });
  };

  const renderNames = () => {
    return participants.participantList.map(
      (participant: Participant, index: number) => {
        const participantClassname = classNames(
          styles.participantWrapper,
          participants.selectedParticipant === index &&
            styles.selectedParticipantWrapper
        );

        return (
          <div
            key={index}
            className={participantClassname}
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
        );
      }
    );
  };

  return <div className={styles.racerPanelWrapper}>{renderNames()}</div>;
}
