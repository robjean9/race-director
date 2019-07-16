import * as React from 'react';
import { Column, Panel } from './types';
import { TelemetryType } from '../types';

import { LineChart } from '../DataComponents';
import {
  BrakeTemperaturePanel,
  TrackMapPanel,
  DataPanelBox,
  ParticipantsPanel,
  TyreWearPanel,
  TyresSurfaceTemperaturePanel,
  ModesPanel
} from '../DataPanels';

/*
import { InstrumentsPanel } from './InstrumentsPanel';
import { SessionPanel } from './SessionPanel';
*/

const styles = require('./Canvas.css');

const canvasSetup: Column[] = [
  { width: 8, panels: [<ParticipantsPanel />] },
  {
    width: 44,
    panels: [
      // make non-generic components (panels) for each LineChart
      <LineChart
        title="Speed"
        telemetryType={TelemetryType.Speed}
        unit={' km/h'}
      />,
      <LineChart
        title="RPM"
        telemetryType={TelemetryType.EngineRPM}
        unit=" rpm"
      />,
      <LineChart title="Gear" telemetryType={TelemetryType.Gear} />,
      <LineChart
        title="Throttle"
        telemetryType={TelemetryType.Throttle}
        unit="%"
      />,
      <LineChart title="Brake" telemetryType={TelemetryType.Brake} unit="%" />,
      <LineChart title="Steer" telemetryType={TelemetryType.Steer} unit="%" />
    ]
  },
  {
    width: 24,
    panels: [
      <TyresSurfaceTemperaturePanel
        unit="℃"
        title="Tyre Surface Temperature"
      />,
      <BrakeTemperaturePanel unit="℃" title="Brake Temperature" />,
      <TyreWearPanel unit="%" title="Tyre Wear" />,
      <ModesPanel title="Modes" />
    ]
  },
  {
    width: 19,
    panels: [<TrackMapPanel />]
  }
];

export function Canvas() {
  const renderColumn = (column: Column, index: number) => (
    <div
      key={index}
      className={styles.column}
      style={{ flex: `0 0 ${column.width}vw` }}
    >
      {column.panels.map(renderPanel)}
    </div>
  );

  const renderPanel = (panel: Panel, index: number) => (
    <DataPanelBox key={index}>{panel}</DataPanelBox>
  );

  return (
    <div className={styles.telemetryPanels}>
      {canvasSetup.map(renderColumn)}
    </div>
  );
}
