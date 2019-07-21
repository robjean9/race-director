import * as React from 'react';
import { QuaternaryIndicator } from '../../DataComponents';
import { Props } from './types';
import { StateContext } from '../../App';

import styles from './TyreWearPanel.css';

export function TyreWearPanel(props: Props) {
  const { tyresWear } = React.useContext(StateContext);
  return (
    <QuaternaryIndicator
      unit={props.unit}
      values={tyresWear}
      minValue={0}
      maxValue={100}
    />
  );
}
