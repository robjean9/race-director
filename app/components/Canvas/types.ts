import { Telemetry, Participant } from '../types';
import { Coordinate } from 'f1-telemetry-client/build/src/constants/types';

export interface Props {
  onParticipantChange: (participant: Participant) => void;
}
