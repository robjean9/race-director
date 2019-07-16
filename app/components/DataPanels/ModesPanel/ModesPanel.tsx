import * as React from 'react';
import { useContext } from 'react';
import { StateContext } from '../../App';
import { Props } from './types';
import { ModeIndicator } from '../../DataComponents';

const styles = require('./ModesPanel.css');

export function ModesPanel(props: Props) {
  const { tyreCompound } = useContext(StateContext);
  return (
    <div className={styles.modesPanelWrapper}>
      <ModeIndicator
        className={styles.modesPanelIndicator}
        title="Tyre Compound"
        value={'OK'}
      />
      <ModeIndicator
        className={styles.modesPanelIndicator}
        title="Fuel Mix"
        value={'OK'}
      />
      <ModeIndicator
        className={styles.modesPanelIndicator}
        title="ERS Deploy Mode"
        value={'OK'}
      />
    </div>
  );
}
