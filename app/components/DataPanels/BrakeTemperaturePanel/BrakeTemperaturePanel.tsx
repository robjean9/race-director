import * as React from 'react';
import { useContext } from 'react';
import { QuaternaryIndicator } from '../../DataComponents';
import { StateContext } from '../../App';

export function BrakeTemperaturePanel() {
  const { brakesTemperature } = useContext(StateContext);
  return (
    <QuaternaryIndicator
      title="Brake Temperature"
      values={brakesTemperature}
      minValue={400}
      maxValue={1100}
    />
  );
}
