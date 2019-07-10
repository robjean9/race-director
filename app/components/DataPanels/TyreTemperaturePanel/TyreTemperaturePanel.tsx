import * as React from 'react';
import { QuaternaryIndicator } from '../../DataComponents';

export function TyreTemperaturePanel() {
  return <QuaternaryIndicator title="Tyre Temp" values={[1, 2, 3, 4]} />;
}
