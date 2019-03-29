import { Team } from '../../constants/typings';

export interface Props {
  // tslint:disable-next-line:no-any
  handleParticipantChange: (participant: any) => void;
  currentParticipants: Participant[];
}

export interface Participant {
  team: Team;
  abbreviation: string;
  firstName: string;
  lastName: string;
  index: number;
}
