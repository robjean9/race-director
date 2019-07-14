import * as React from 'react';
import classNames from 'classnames';
import { Props } from './types';
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

const canvasPanels = [
  [<ParticipantsPanel />],
  [
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
  ],
  [
    <TyresSurfaceTemperaturePanel unit="℃" title="Tyre Surface Temperature" />,
    <BrakeTemperaturePanel unit="℃" title="Brake Temperature" />,
    <TyreWearPanel unit="%" title="Tyre Wear" />
  ],
  [] //<TrackMapPanel />]
];

export function Canvas() {
  return (
    <div className={styles.telemetryPanels}>
      <div className={styles.column} style={{ flex: '0 0 10vw' }}>
        {canvasPanels[0].map((component, index) => (
          <DataPanelBox key={index}>{component}</DataPanelBox>
        ))}
      </div>
      <div className={styles.column} style={{ flex: '0 0 40vw' }}>
        {canvasPanels[1].map((component, index) => (
          <DataPanelBox key={index}>{component}</DataPanelBox>
        ))}
      </div>
      <div className={styles.column} style={{ flex: '0 0 30vw' }}>
        {canvasPanels[2].map((component, index) => (
          <DataPanelBox key={index}>{component}</DataPanelBox>
        ))}
      </div>
      <div className={styles.column} style={{ flex: '0 0 20vw' }}>
        {canvasPanels[3].map((component, index) => (
          <DataPanelBox key={index}>{component}</DataPanelBox>
        ))}
      </div>
    </div>
  );
}
