import { Participant } from '../components/ParticipantPanel/types';
import { ParticipantData, PacketMotionData } from '../components/types';
const remote = require('electron').remote;
const { DRIVERS, TEAMS } = remote.getGlobal('telemetryClientConstants');

// Returns Participant[] or void
export const getCurrentParticipants = (
  participantList: ParticipantData[]
): Participant[] | void => {
  if (participantList.length === 0) {
    return;
  }

  const currentParticipants: Participant[] = participantList.map(
    (participant, index) => {
      // move this to Participant class constructor
      const driver: Participant = DRIVERS[participant.m_driverId] || {
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
  motionPackage: PacketMotionData,
  participantIndex: number
) => {
  const x =
    motionPackage.m_carMotionData[participantIndex].m_worldPositionX / 4;
  const y =
    motionPackage.m_carMotionData[participantIndex].m_worldPositionZ / 4;
  return { x, y };
};
