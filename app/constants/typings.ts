import { IParticipant } from '../components/ParticipantPanel/types';

// TODO: move this to f1-telemetry-client

export const MERCEDES = 'Mercedes';
export const FERRARI = 'Ferrari';
export const RED_BULL = 'Red Bull';
export const WILLIAMS = 'Williams';
export const FORCE_INDIA = 'Force India';
export const RENAULT = 'Renault';
export const TORO_ROSSO = 'Toro Rosso';
export const HAAS = 'Haas';
export const MCLAREN = 'McLaren';
export const SAUBER = 'Sauber';
export const MCLAREN_1988 = 'McLaren 1988';
export const MCLAREN_1991 = 'McLaren 1991';
export const WILLIAMS_1992 = 'Williams 1992';
export const FERRARI_1995 = 'Ferrari 1995';
export const WILLIAMS_1996 = 'Williams 1996';
export const MCLAREN_1998 = 'McLaren 1998';
export const FERRARI_2002 = 'Ferrari 2002';
export const FERRARI_2004 = 'Ferrari 2004';
export const RENAULT_2006 = 'Renault 2006';
export const FERRARI_2007 = 'Ferrari 2007';

export interface ITeam {
  name: string;
  color: string;
}

// using an object with numbered keys since this is not sequential
export const DRIVERS = {
  0: {
    abbreviation: 'SAI',
    firstName: 'Carlos',
    lastName: 'Sainz'
  },
  2: {
    abbreviation: 'RIC',
    firstName: 'Daniel',
    lastName: 'Ricciardo'
  },
  3: {
    abbreviation: 'ALO',
    firstName: 'Fernando',
    lastName: 'Alonso'
  },
  6: {
    abbreviation: 'RAI',
    firstName: 'Kimi',
    lastName: 'Raikkonen'
  },
  7: {
    abbreviation: 'HAM',
    firstName: 'Lewis',
    lastName: 'Hamilton'
  },
  8: {
    abbreviation: 'ERI',
    firstName: 'Marcus',
    lastName: 'Ericsson'
  },
  9: {
    abbreviation: 'VER',
    firstName: 'Max',
    lastName: 'Verstappen'
  },
  10: {
    abbreviation: 'HUL',
    firstName: 'Nico',
    lastName: 'Hulkenburg'
  },
  11: {
    abbreviation: 'MAG',
    firstName: 'Kevin',
    lastName: 'Magnusson'
  },
  12: {
    abbreviation: 'GRO',
    firstName: 'Roman',
    lastName: 'Grosjean'
  },
  13: {
    abbreviation: 'VET',
    firstName: 'Sebastien',
    lastName: 'Vettel'
  },
  14: {
    abbreviation: 'PER',
    firstName: 'Sergio',
    lastName: 'Perez'
  },
  15: {
    abbreviation: 'BOT',
    firstName: 'Valterie',
    lastName: 'Bottas'
  },
  17: {
    abbreviation: 'OCO',
    firstName: 'Esteban',
    lastName: 'Ocon'
  },
  18: {
    abbreviation: 'VAN',
    firstName: 'Stoffel',
    lastName: 'Vandorne'
  },
  19: {
    abbreviation: 'STR',
    firstName: 'Lance',
    lastName: 'Stroll'
  },
  20: {
    abbreviation: 'BAR',
    firstName: 'Arron',
    lastName: 'Barnes'
  },
  21: {
    abbreviation: 'GIL',
    firstName: 'Martin',
    lastName: 'Giles'
  },
  22: {
    abbreviation: 'MUR',
    firstName: 'Alex',
    lastName: 'Murray'
  },
  23: {
    abbreviation: 'ROT',
    firstName: 'Lucas',
    lastName: 'Roth'
  },
  24: {
    abbreviation: 'COR',
    firstName: 'Igor',
    lastName: 'Correia'
  },
  25: {
    abbreviation: 'LEV',
    firstName: 'Sophie',
    lastName: 'Levasseur'
  },
  26: {
    abbreviation: 'SCH',
    firstName: 'Jonas',
    lastName: 'Schiffer'
  },
  27: {
    abbreviation: 'FOR',
    firstName: 'Alain',
    lastName: 'Forest'
  },
  28: {
    abbreviation: 'LET',
    firstName: 'Jay',
    lastName: 'Letorneau'
  },
  29: {
    abbreviation: 'SAA',
    firstName: 'Esto',
    lastName: 'Saari'
  },
  30: {
    abbreviation: 'ATI',
    firstName: 'Yasar',
    lastName: 'Atiyeh'
  },
  31: {
    abbreviation: 'CAL',
    firstName: 'Callisto',
    lastName: 'Calabresi'
  },
  32: {
    abbreviation: 'IZU',
    firstName: 'Naota',
    lastName: 'Izum'
  },
  33: {
    abbreviation: 'CLA',
    firstName: 'Howard',
    lastName: 'Clarke'
  },
  34: {
    abbreviation: 'KAU',
    firstName: 'Wilheim',
    lastName: 'Kaufmann'
  },
  35: {
    abbreviation: 'LAU',
    firstName: 'Marie',
    lastName: 'Laursen'
  },
  36: {
    abbreviation: 'NIE',
    firstName: 'Flavio',
    lastName: 'Nieves'
  },
  58: {
    abbreviation: 'LEC',
    firstName: 'Charles',
    lastName: 'Leclerc'
  },
  59: {
    abbreviation: 'GAS',
    firstName: 'Pierre',
    lastName: 'Gasly'
  },
  60: {
    abbreviation: 'HAR',
    firstName: 'Brendon',
    lastName: 'Hatley'
  },
  61: {
    abbreviation: 'SIR',
    firstName: 'Sergey',
    lastName: 'Sirotkin'
  }
};

export const TEAMS: ITeam[] = [
  {
    name: MERCEDES,
    color: '#50d3c8'
  },
  {
    name: FERRARI,
    color: '#b01c20'
  },
  {
    name: RED_BULL,
    color: '#2c4cbd'
  },
  {
    name: WILLIAMS,
    color: '#fbfbfb'
  },
  {
    name: FORCE_INDIA,
    color: '#f2a9cf'
  },
  {
    name: RENAULT,
    color: '#f7e979'
  },
  {
    name: TORO_ROSSO,
    color: '#5fa7e7'
  },
  {
    name: HAAS,
    color: '#8e8f94'
  },
  {
    name: MCLAREN,
    color: '#e29b4f'
  },
  {
    name: SAUBER,
    color: '#811817'
  },
  {
    name: MCLAREN_1988,
    color: '#e29b4f'
  },
  {
    name: MCLAREN_1991,
    color: '#e29b4f'
  },
  {
    name: WILLIAMS_1992,
    color: '#fbfbfb'
  },
  {
    name: FERRARI_1995,
    color: '#b01c20'
  },
  {
    name: WILLIAMS_1996,
    color: '#fbfbfb'
  },
  {
    name: MCLAREN_1998,
    color: '#e29b4f'
  },
  {
    name: FERRARI_2002,
    color: '#b01c20'
  },
  {
    name: FERRARI_2004,
    color: '#b01c20'
  },
  {
    name: RENAULT_2006,
    color: '#f7e979'
  },
  {
    name: FERRARI_2007,
    color: '#b01c20'
  }
];
