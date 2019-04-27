import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

const { ipcMain } = require('electron');

// Mongo database
const mongojs = require('mongojs');

// Socket.io
const io = require('socket.io')();

// F1 telemetry client
import { F1TelemetryClient, constants } from 'f1-telemetry-client';
const { PACKETS, DRIVERS, TEAMS, TRACKS } = constants;

// exposes telemetry client constants to renderer
// tslint:disable-next-line:no-any
(global as any).telemetryClientConstants = {
  PACKETS,
  DRIVERS,
  TEAMS,
  TRACKS
};

const {
  MONGO_CONNECTION_STRING,
  START_F1_CLIENT,
  STOP_F1_CLIENT
} = require('./constants/f1client');

const client = new F1TelemetryClient({ port: 20790 });

export class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

io.listen(24500);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

app.on('will-quit', () => {
  // closes f1-telemetry-client
  console.log('Socket connection closed');
  client.stop();
});

// Add event listeners
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    titleBarStyle: 'default',
    show: false,
    width: 1281,
    height: 800,
    minWidth: 1281,
    minHeight: 800,
    backgroundColor: '#17171f'
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.once('ready-to-show', () => {
    // tslint:disable-next-line:no-unused-expression
    mainWindow && mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Remove this if your app does not use auto updates
  // tslint:disable-next-line:no-unused-expression
  new AppUpdater();
});

// Mongo database
const db = mongojs(MONGO_CONNECTION_STRING);

db.on('connect', () => {
  console.log('Connected to Mongo Database');
});

/* 
// Read from database
db.racedirector.find((err, docs) => {
  // Docs is an array of all the documents in mycollection
  // console.log(docs);
});
*/

// F1 client logic
let isRecording = false;
ipcMain.on(START_F1_CLIENT, () => !isRecording && startRecording());
ipcMain.on(STOP_F1_CLIENT, () => isRecording && stopRecording());

// Handle ipcMain message
/*
ipcMain.on(GET_CONSTANTS, event => {
  event.sender.send(SEND_CONSTANTS, PACKETS);
});
*/

// Communication with renderer
// tslint:disable-next-line:no-any
io.on('connection', (socket: any) => {
  console.log('Socket connection opened');
  // Start listening to F1 client
  startRecording();
  // tslint:disable-next-line:no-any
  client.on(PACKETS.motion, (data: any) =>
    registerClient(PACKETS.motion, db.motion, data, socket)
  );
  // tslint:disable-next-line:no-any
  client.on(PACKETS.session, (data: any) =>
    registerClient(PACKETS.session, db.session, data, socket)
  );
  // tslint:disable-next-line:no-any
  client.on(PACKETS.lapData, (data: any) =>
    registerClient(PACKETS.lapData, db.lapData, data, socket)
  );
  // tslint:disable-next-line:no-any
  client.on(PACKETS.event, (data: any) =>
    registerClient(PACKETS.event, db.event, data, socket)
  );
  // tslint:disable-next-line:no-any
  client.on(PACKETS.participants, (data: any) =>
    registerClient(PACKETS.participants, db.participants, data, socket)
  );
  // tslint:disable-next-line:no-any
  client.on(PACKETS.carSetups, (data: any) =>
    registerClient(PACKETS.carSetups, db.carSetups, data, socket)
  );
  // tslint:disable-next-line:no-any
  client.on(PACKETS.carTelemetry, (data: any) =>
    registerClient(PACKETS.carTelemetry, db.carTelemetry, data, socket)
  );
  // tslint:disable-next-line:no-any
  client.on(PACKETS.carStatus, (data: any) =>
    registerClient(PACKETS.carStatus, db.carStatus, data, socket)
  );
});

const registerClient = (
  // tslint:disable-next-line:no-any
  packet: any,
  // tslint:disable-next-line:no-any
  collection: any,
  // tslint:disable-next-line:no-any
  data: any,
  // tslint:disable-next-line:no-any
  socket: { emit: (arg0: any, arg1: any) => void }
) => {
  storeInCollection(collection, data);
  socket.emit(packet, data);
};

const startRecording = () => {
  //client.start();
  //isRecording = true;
};

const stopRecording = () => {
  client.stop();
  isRecording = false;
};

// Stores value to mongodb
// tslint:disable-next-line:no-any
const storeInCollection = (
  // tslint:disable-next-line:no-any
  collection: { insert: (arg0: any) => void },
  // tslint:disable-next-line:no-any
  data: any
) => {
  // tslint:disable-next-line:no-unused-expression
  isRecording && collection.insert(data);
};
