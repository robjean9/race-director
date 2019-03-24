import { IParticipant } from '../components/ParticipantPanel/types';
import { IParticipantData, IPacketMotionData } from '../components/types';
const remote = require('electron').remote;
const { DRIVERS, TEAMS } = remote.getGlobal('telemetryClientConstants');

// Returns IParticipant[] or void
export const getCurrentParticipants = (
  participantList: IParticipantData[]
): IParticipant[] | void => {
  if (participantList.length === 0) {
    return;
  }

  const currentParticipants: IParticipant[] = participantList.map(
    (participant, index) => {
      // move this to Participant class constructor
      const driver: IParticipant = DRIVERS[participant.m_driverId] || {
        abbreviation: participant.m_name.substr(0, 3),
        firstName: participant.m_name
      };
      driver.team = TEAMS[participant.m_teamId];
      driver.index = index;

      return driver;
    }
  );
  return currentParticipants;
};

// Transforms received position to be usable by the map
export const getCurrentWorldPosition = (
  motionPackage: IPacketMotionData,
  participantIndex: number
) => {
  const x =
    motionPackage.m_carMotionData[participantIndex].m_worldPositionX / 4;
  const y =
    motionPackage.m_carMotionData[participantIndex].m_worldPositionZ / 4;
  return { x, y };
};
