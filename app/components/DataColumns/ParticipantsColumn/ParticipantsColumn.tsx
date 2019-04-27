import * as React from 'react';
import { ParticipantPanel } from '../../ParticipantPanel';
import { Props } from './types';

export class ParticipantsColumn extends React.PureComponent<Props> {
  render() {
    const { onParticipantChange, currentParticipants } = this.props;
    return (
      <React.Fragment>
        <div>Session Type</div>
        <ParticipantPanel
          handleParticipantChange={onParticipantChange}
          currentParticipants={currentParticipants}
        />
      </React.Fragment>
    );
  }
}
