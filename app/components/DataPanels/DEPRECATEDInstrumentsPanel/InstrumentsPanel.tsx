import * as React from 'react';
import { Props } from './types';
//import {} from '../../DataPanels/Charts';

const styles = require('./InstrumentsPanel.css');

export class InstrumentsPanel extends React.PureComponent<Props> {
  render() {
    return (
      <React.Fragment>
        <div className={styles.carSetupWrapper}>
          {/*
        <div className={styles.engineDisplays}>
          <RPMGaugeChart />
          <SingleBarChart
            title={'Fuel' /* in tank / Fuel capacity */}
          {/*value={20}
            maxValue={200}
          />
          <SingleBarChart
            title={'ERS' /* Stored Energy / total energy */}
          {/*value={50}
            maxValue={100}
          />
        </div>
        <div className={styles.timeDisplays}>
          <LapTimingGrid title={'Lap Timing'} />
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
        </div>
      </React.Fragment>
    );
  }
}
