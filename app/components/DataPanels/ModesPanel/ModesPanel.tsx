import * as React from 'react';
import { useContext } from 'react';
import { StateContext } from '../../App';
import { Props } from './types';
import { ModeIndicator } from '../../DataComponents';
import { TYRES, FUEL_MIX, ERS_DEPLOY_MODE } from 'f1-telemetry-client/build/src/constants';

import styles from './ModesPanel.css';

export function ModesPanel(props: Props) {
  const { tyreCompound, fuelMix, ersMode, drsAllowed,drsStatus} = useContext(StateContext);

  return (
    <div>
    <div className={styles.modesPanelWrapper}>
      <ModeIndicator
        className={styles.modesPanelIndicator}
        title="Tyre Compound"
        value={tyreCompound ? (TYRES[tyreCompound] && TYRES[tyreCompound].name) : 'NONE'}
      />
      <ModeIndicator
        className={styles.modesPanelIndicator}
        title="Fuel Mix"
        value={fuelMix  && FUEL_MIX[fuelMix] ? FUEL_MIX[fuelMix] : 'NONE'}
      />
      
    </div>
    <div className={styles.modesPanelWrapper}>
    <ModeIndicator
        className={styles.modesPanelIndicator}
        title="ERS Deploy Mode"
        value={ersMode && ERS_DEPLOY_MODE[ersMode] ? ERS_DEPLOY_MODE[ersMode] : 'NONE'}
      />
    <ModeIndicator
      className={styles.modesPanelIndicator}
      title="DRS Allowed"
      value={drsAllowed ? 'YES' : (drsStatus ? 'USING': 'NO') }
    />
  </div>
  </div>
  );
}
