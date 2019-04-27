import * as React from 'react';
import { Props, Participant } from './types';

const styles = require('./ParticipantPanel.css');

export class ParticipantPanel extends React.PureComponent<Props> {
  selectParticipant = (participant: Participant) =>
    this.props.handleParticipantChange(participant);

  renderNames = () => {
    const { currentParticipants } = this.props;
    return currentParticipants.map((participant, index) => (
      <div
        key={index}
        className={styles.participantWrapper}
        onClick={() => this.selectParticipant(participant)}
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

  render() {
    return <div className={styles.racerPanelWrapper}>{this.renderNames()}</div>;
  }
}
