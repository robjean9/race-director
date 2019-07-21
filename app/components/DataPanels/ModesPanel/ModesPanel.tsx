import * as React from 'react';
import { useContext } from 'react';
import { StateContext } from '../../App';
import { Props } from './types';
import { ModeIndicator } from '../../DataComponents';
import { TYRES } from 'f1-telemetry-client/build/src/constants';

import styles from './ModesPanel.css';

export function ModesPanel(props: Props) {
  const { tyreCompound } = useContext(StateContext);

  return (
    <div className={styles.modesPanelWrapper}>
      <ModeIndicator
        className={styles.modesPanelIndicator}
        title="Tyre Compound"
        value={tyreCompound && TYRES[tyreCompound] && TYRES[tyreCompound].name}
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
