import { Participant } from '../../../types';

export interface Props {
  // tslint:disable-next-line:no-any
  handleParticipantChange: (participant: any) => void;
  currentParticipants: Participant[];
}