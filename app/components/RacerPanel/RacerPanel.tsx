import * as React from 'react';
import { PureComponent } from 'react';
import { IProps } from './types';

const styles = require('./RacerPanel.css');

// tslint:disable-next-line:no-any
export class RacerPanel extends PureComponent<IProps, any> {
  renderNames = () => {
    const { currentParticipants } = this.props;
    return currentParticipants.map((participant, index) => (
      <div key={index} className={styles.participantLabel}>
        {participant.abbr}
      </div>
    ));
  };

  render() {
    return <div className={styles.racerPanelWrapper}>{this.renderNames()}</div>;
  }
}
