import * as React from 'react';
import { ParticipantsGrid } from '../../DataComponents';
import { Props } from './types';

export class ParticipantsPanel extends React.PureComponent<Props> {
  render() {
    const { onParticipantChange, currentParticipants } = this.props;
    return (
      <React.Fragment>
        <div>Session Type</div>
        <ParticipantsGrid handleParticipantChange={onParticipantChange} />
      </React.Fragment>
    );
  }
}
