import * as React from 'react';
import { useContext } from 'react';
import { QuaternaryIndicator } from '../../DataComponents';
import { StateContext } from '../../App';

export function TyresSurfaceTemperaturePanel() {
  const { tyresSurfaceTemperature } = useContext(StateContext);
  return (
    <QuaternaryIndicator
      title="Tyres Surface Temperature"
      values={tyresSurfaceTemperature}
      minValue={70}
      maxValue={120}
    />
  );
}
