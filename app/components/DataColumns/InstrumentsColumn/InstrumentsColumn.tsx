import * as React from 'react';
import {
  QuaternaryIndicator,
  UnaryIndicator,
  RPMGaugeChart,
  SingleBarChart,
  TimeIndicator
} from '../../VisualData';
import { Props } from './types';

const styles = require('./InstrumentsColumn.css');

export class InstrumentsColumn extends React.PureComponent<Props> {
  render() {
    return (
      <React.Fragment>
        <div className={styles.temperatureDisplays}>
          <QuaternaryIndicator title="Tire Temp" />
          <QuaternaryIndicator title="Brake Temp" />
        </div>
        <div className={styles.temperatureDisplays}>
          <QuaternaryIndicator title="Tyre wear" />
          <QuaternaryIndicator title="Tyre damage" />
        </div>
        <div className={styles.carSetupWrapper}>
          <UnaryIndicator title={`Tire Compound`} value={1} />
          <UnaryIndicator title={`Fuel Mix`} value={1} />
          <UnaryIndicator title={`ERS Deploy Mode`} value={1} />
        </div>
        <div className={styles.engineDisplays}>
          <RPMGaugeChart />
          <SingleBarChart
            title={'Fuel' /* in tank / Fuel capacity */}
            value={20}
            maxValue={200}
          />
          <SingleBarChart
            title={'ERS' /* Stored Energy / total energy */}
            value={50}
            maxValue={100}
          />
        </div>
        <div className={styles.timeDisplays}>
          <TimeIndicator title={'Lap Timing'} />
        </div>

        {/*
          Car Setup
          <div>Front wing</div>
          <div>Rear wing</div>
          <div>Differential adjustment on throttle</div>
          <div>Differential adjustment off throttle</div>
          <div>Front camber angle</div>
          <div>Rear camber angle</div>
          <div>Front toe angle</div>
          <div>Rear toe angle</div>
          <div>Front suspension</div>
          <div>Rear suspension</div>
          <div>
            Front anti-roll bar Front anti-roll bar Front ride height Rear
            ride height Brake pressure (percentage) Brake bias Front tyre
            pressure Rear tyre pressure Ballast Fuel load
          </div>
           */}
      </React.Fragment>
    );
  }
}
