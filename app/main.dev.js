import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

const { ipcMain } = require('electron');

// Mongo database
const mongojs = require('mongojs');

// Socket.io
const io = require('socket.io')();

// F1 telemetry client
const {
  F1TelemetryClient,
  Packets,
  DRIVERS,
  TEAMS,
  TRACKS
} = require('f1-telemetry-client');

// exposes telemetry client constants to renderer
global.telemetryClientConstants = { Packets, DRIVERS, TEAMS, TRACKS };

const {
  MONGO_CONNECTION_STRING,
  START_F1_CLIENT,
  STOP_F1_CLIENT
} = require('./constants/f1client');

const client = new F1TelemetryClient();

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

io.listen(24500);

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line global-require
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  // eslint-disable-next-line global-require
  require('electron-debug')();
}

const installExtensions = async () => {
  // eslint-disable-next-line global-require
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
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
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
  event.sender.send(SEND_CONSTANTS, Packets);
});
*/

// Communication with renderer
io.on('connection', socket => {
  console.log('Socket connection opened');
  // Start listening to F1 client
  startRecording();
  client.on(Packets.MOTION, data =>
    registerClient(Packets.MOTION, db.motion, data, socket)
  );
  client.on(Packets.SESSION, data =>
    registerClient(Packets.SESSION, db.session, data, socket)
  );
  client.on(Packets.LAP_DATA, data =>
    registerClient(Packets.LAP_DATA, db.lapData, data, socket)
  );
  client.on(Packets.EVENT, data =>
    registerClient(Packets.EVENT, db.event, data, socket)
  );
  client.on(Packets.PARTICIPANTS, data =>
    registerClient(Packets.PARTICIPANTS, db.participants, data, socket)
  );
  client.on(Packets.CAR_SETUPS, data =>
    registerClient(Packets.CAR_SETUPS, db.carSetups, data, socket)
  );
  client.on(Packets.CAR_TELEMETRY, data =>
    registerClient(Packets.CAR_TELEMETRY, db.carTelemetry, data, socket)
  );
  client.on(Packets.CAR_STATUS, data =>
    registerClient(Packets.CAR_STATUS, db.carStatus, data, socket)
  );
});

const registerClient = (packet, collection, data, socket) => {
  storeInCollection(collection, data);
  socket.emit(packet, data);
};

const startRecording = () => {
  client.start();
  //isRecording = true;
};

const stopRecording = () => {
  client.stop();
  isRecording = false;
};

// Stores value to mongodb
const storeInCollection = (collection, data) => {
  isRecording && collection.insert(data);
};
