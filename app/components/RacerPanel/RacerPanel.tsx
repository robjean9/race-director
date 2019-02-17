import React, { PureComponent } from 'react';
import { IProps } from './types';

const styles = require('./RacerPanel.css');

export default class RacerPanel extends PureComponent<IProps, any> {
  renderNames = () => {
    const { currentParticipants } = this.props;
    return currentParticipants.map(participant => participant.abbr);
  };

  render() {
    return (
      <div className={styles.racerPanelWrapper}>
        <span>Racer Panel</span>
        {this.renderNames()}
      </div>
    );
  }
}
