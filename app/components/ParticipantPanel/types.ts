import { ITeam } from '../../constants/typings';

export interface IProps {
  handleParticipantChange: (participant) => void;
  currentParticipants: IParticipant[];
}

export interface IParticipant {
  team: ITeam;
  abbreviation: string;
  firstName: string;
  lastName: string;
  index: number;
}
