import React, { PureComponent } from 'react';
import { IProps, IParticipant } from './types';

const styles = require('./ParticipantPanel.css');

export default class ParticipantPanel extends PureComponent<IProps, any> {
  selectParticipant = (participant: IParticipant) =>
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
