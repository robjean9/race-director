import * as React from 'react';
import { useContext } from 'react';
import { QuaternaryIndicator } from '../../DataComponents';
import { StateContext } from '../../App';
import { Props } from './types';

export function BrakeTemperaturePanel(props: Props) {
  const { brakesTemperature } = useContext(StateContext);
  return (
    <QuaternaryIndicator
      values={brakesTemperature}
      minValue={400}
      maxValue={1100}
      unit={props.unit}
    />
  );
}
