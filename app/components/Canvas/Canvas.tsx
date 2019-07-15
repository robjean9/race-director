import * as React from 'react';
import classNames from 'classnames';
import { Column, Panel } from './types';
import { DataPanelBox } from '../DataPanels/DataPanelBox';
import { LineChart } from '../DataComponents';
import { TelemetryType } from '../types';
import { ParticipantsPanel } from '../DataPanels/ParticipantsPanel';
import { TyresSurfaceTemperaturePanel } from '../DataPanels/TyresSurfaceTemperaturePanel';
import { BrakeTemperaturePanel } from '../DataPanels/BrakeTemperaturePanel';
import { TyreWearPanel } from '../DataPanels/TyreWearPanel';
import { TrackMapPanel } from '../DataPanels/TrackMapPanel';

/*
import { InstrumentsPanel } from './InstrumentsPanel';
import { SessionPanel } from './SessionPanel';
*/

const styles = require('./Canvas.css');

const canvasSetup: Column[] = [
  { width: 10, panels: [<ParticipantsPanel />] },
  {
    width: 40,
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
    width: 30,
    panels: [
      <TyresSurfaceTemperaturePanel
        unit="℃"
        title="Tyre Surface Temperature"
      />,
      <BrakeTemperaturePanel unit="℃" title="Brake Temperature" />,
      <TyreWearPanel unit="%" title="Tyre Wear" />
    ]
  },
  { width: 20, panels: [<TrackMapPanel />] }
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
