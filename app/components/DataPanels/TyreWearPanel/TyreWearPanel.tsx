import * as React from 'react';
import { QuaternaryIndicator } from '../../DataComponents';

const styles = require('./TyreWearPanel.css');

export function TyreWearPanel() {
  return (
    <QuaternaryIndicator
      title="Tyre Wear"
      values={[]}
      minValue={70}
      maxValue={120}
    />
  );
}
