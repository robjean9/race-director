import * as React from 'react';
import { QuaternaryIndicator } from '../../DataComponents';

const styles = require('./TyreDamagePanel.css');

export function TyreDamagePanel() {
  return <QuaternaryIndicator values={[]} minValue={70} maxValue={120} />;
}
