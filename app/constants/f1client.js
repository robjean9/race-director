// TODO move this and typings to f1-telemetry-client

export const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/racedirector';
export const START_F1_CLIENT = 'startF1Client';
export const STOP_F1_CLIENT = 'stopF1Client';

export const MOTION = 'MOTION';
export const SESSION = 'SESSION';
export const LAP_DATA = 'LAP_DATA';
export const EVENT = 'EVENT';
export const PARTICIPANTS = 'PARTICIPANTS';
export const CAR_SETUPS = 'CAR_SETUPS';
export const CAR_TELEMETRY = 'CAR_TELEMETRY';
export const CAR_STATUS = 'CAR_STATUS';

export const MELBOURNE = 'Melbourne';
export const PAUL_RICARD = 'Paul Ricard';
export const SHANGHAI = 'Shanghai';
export const SAKHIR = 'Sakhir';
export const CATALUNYA = 'Catalunya';
export const MONACO = 'Monaco';
export const MONTREAL = 'Montreal';
export const SILVERSTONE = 'Silverstone';
export const HOCKENHEIM = 'Hockenheim';
export const HUNGARORING = 'Hungaroring';
export const SPA = 'Spa';
export const MONZA = 'Monza';
export const SINGAPORE = 'Singapore';
export const SUZUKA = 'Suzuka';
export const ABU_DHABI = 'Abu Dhabi';
export const TEXAS = 'Texas';
export const BRAZIL = 'Brazil';
export const AUSTRIA = 'Austria';
export const SOCHI = 'Sochi';
export const MEXICO = 'Mexico';
export const BAKU = 'Baku';
export const SAKHIR_SHORT = 'Sakhir (Short)';
export const SILVERSTONE_SHORT = 'Silverstone (Short)';
export const TEXAS_SHORT = 'Texas (Short)';
export const SUZUKA_SHORT = 'Suzuka (Short)';

const MERCEDES = "Mercedes";
const FERRARI = "Ferrari";
const RED_BULL = "Red Bull";
const WILLIAMS = "Williams";
const FORCE_INDIA = "Force India";
const RENAULT = "Renault";
const TORO_ROSSO = "Toro Rosso";
const HAAS = "Haas";
const MCLAREN = "McLaren";
const SAUBER = "Sauber";
const MCLAREN_1988 = "McLaren 1988";
const MCLAREN_1991 = "McLaren 1991";
const WILLIAMS_1992 = "Williams 1992";
const FERRARI_1995 = "Ferrari 1995";
const WILLIAMS_1996 = "Williams 1996";
const MCLAREN_1998 = "McLaren 1998";
const FERRARI_2002 = "Ferrari 2002";
const FERRARI_2004 = "Ferrari 2004";
const RENAULT_2006 = "Renault 2006";
const FERRARI_2007 = "Ferrari 2007";

export const TRACKS = [
  MELBOURNE,
  PAUL_RICARD,
  SHANGHAI,
  SAKHIR,
  CATALUNYA,
  MONACO,
  MONTREAL,
  SILVERSTONE,
  HOCKENHEIM,
  HUNGARORING,
  SPA,
  MONZA,
  SINGAPORE,
  SUZUKA,
  ABU_DHABI,
  TEXAS,
  BRAZIL,
  AUSTRIA,
  SOCHI,
  MEXICO,
  BAKU,
  SAKHIR_SHORT,
  SILVERSTONE_SHORT,
  TEXAS_SHORT,
  SUZUKA_SHORT
];

export const createDriverObject = (abbr, firstName, lastName) => ({
  abbr,
  firstName,
  lastName
});

// improve this
export const DRIVERS = {
  0: createDriverObject('SAI', 'Carlos', 'Sainz'),
  2: createDriverObject('RIC', 'Daniel', 'Ricciardo'),
  3: createDriverObject('ALO', 'Fernando', 'Alonso'),
  6: createDriverObject('RAI', 'Kimi', 'Raikonen'),
  7: createDriverObject('HAM', 'Lewis', 'Hamilton'),
  8: createDriverObject('ERI', 'Marcus', 'Ericsson'),
  9: createDriverObject('VER', 'Max', 'Verstappen'),
  10: createDriverObject('HUL', 'Nico', 'Hulkenburg'),
  11: createDriverObject('MAG', 'Kevin', 'Magnusson'),
  12: createDriverObject('GRO', 'Roman', 'Grosjean'),
  13: createDriverObject('VET', 'Sebastien', 'Vettel'),
  14: createDriverObject('PER', 'Sergio', 'Perez'),
  15: createDriverObject('BOT', 'Valterie', 'Bottas'),
  17: createDriverObject('OCO', 'Esteban', 'Ocon'),
  18: createDriverObject('VAN', 'Stoffel', 'Vandorne'),
  19: createDriverObject('STR', 'Lance', 'Stroll'),
  20: createDriverObject('BAR', 'Arron', 'Barnes'),
  21: createDriverObject('GIL', 'Martin', 'Giles'),
  22: createDriverObject('MUR', 'Alex', 'Murray'),
  23: createDriverObject('ROT', 'Lucas', 'Roth'),
  24: createDriverObject('COR', 'Igor', 'Correia'),
  25: createDriverObject('LEV', 'Sophie', 'Levasseur'),
  26: createDriverObject('SCH', 'Jonas', 'Schiffer'),
  27: createDriverObject('FOR', 'Alain', 'Forest'),
  28: createDriverObject('LET', 'Jay', 'Letorneau'),
  29: createDriverObject('SAA', 'Esto', 'Saari'),
  30: createDriverObject('ATI', 'Yasar', 'Atiyeh'),
  31: createDriverObject('CAL', 'Callisto', 'Calabresi'),
  32: createDriverObject('IZU', 'Naota', 'Izum'),
  33: createDriverObject('CLA', 'Howard', 'Clarke'),
  34: createDriverObject('KAU', 'Wilheim', 'Kaufmann'),
  35: createDriverObject('LAU', 'Marie', 'Laursen'),
  36: createDriverObject('NIE', 'Flavio', 'Nieves'),
  58: createDriverObject('LEC', 'Charles', 'Leclerc'),
  59: createDriverObject('GAS', 'Pierre', 'Gasly'),
  60: createDriverObject('HAR', 'Brendon', 'Hatley'),
  61: createDriverObject('SIR', 'Sergey', 'Sirotkin')
};

export const TEAMS = [
  MERCEDES,
  FERRARI,
  RED_BULL,
  WILLIAMS,
  FORCE_INDIA,
  RENAULT,
  TORO_ROSSO,
  HAAS,
  MCLAREN,
  SAUBER,
  MCLAREN_1988,
  MCLAREN_1991,
  WILLIAMS_1992,
  FERRARI_1995,
  WILLIAMS_1996,
  MCLAREN_1998,
  FERRARI_2002,
  FERRARI_2004,
  RENAULT_2006,
  FERRARI_2007
]
