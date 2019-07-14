import {
  ParticipantData,
  PacketMotionData
} from 'f1-telemetry-client/build/src/parsers/packets/types';
import { Participant, Telemetry } from '../components/types';

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

// Calculates XAxis (ms)
export const getXAxisData = (telemetryMatrix: Telemetry[][]) => {
  return (
    telemetryMatrix
      // gets times (each index represents a time)
      // tslint:disable-next-line:no-any
      .map((_: any, index: number) => index)
      // takes out null values (times that were not recorded)
      // eg. received a package about 1424 ms and then 1429 ms
      // doing a !!time filter takes out empty
      // array positions from 1425 to 1428
      .filter((time: number) => !!time)
  );
};
