import * as React from 'react';
import { TrackMap } from '../../TrackMap';
import { Props } from './types';

export class SessionColumn extends React.PureComponent<Props> {
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
