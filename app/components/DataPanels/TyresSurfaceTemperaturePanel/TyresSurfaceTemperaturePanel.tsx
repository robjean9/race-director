import * as React from 'react';
import { useContext } from 'react';
import { QuaternaryIndicator } from '../../DataComponents';
import { StateContext } from '../../App';
import { Props } from './types';

export function TyresSurfaceTemperaturePanel(props: Props) {
  const { tyresSurfaceTemperature } = useContext(StateContext);
  return (
    <QuaternaryIndicator
      unit={props.unit}
      values={tyresSurfaceTemperature}
      minValue={70}
      maxValue={120}
    />
  );
}
