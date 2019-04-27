import * as React from 'react';
import { Props } from './types';
import { TrackMap } from './../../DataComponents';

export class SessionPanel extends React.PureComponent<Props> {
  render() {
    const { currentTrackId, currentWorldPosition } = this.props;
    return (
      <React.Fragment>
        Track Data
        <div>Weather</div>
        <div>Safety Car Deployed</div>
        <div>Track Temperature</div>
        <div>Air Temperature</div>
        <TrackMap
          trackId={currentTrackId}
          worldPosition={currentWorldPosition}
        />
      </React.Fragment>
    );
  }
}
