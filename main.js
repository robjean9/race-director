const electron = require("electron");
const path = require('path')

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Devtools
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require("electron-devtools-installer");

// Mongo database
var mongojs = require("mongojs");

// F1 telemetry client
const F1TelemetryClient = require("f1-telemetry-client").default;
const client = new F1TelemetryClient();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let isDev = process.env["NODE_ENV"] === "development";

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // See https://electronjs.org/docs/tutorial/security#2-disable-nodejs-integration-for-remote-content
    webPreferences: {
      nodeIntegration: false
    }
  });

  if (isDev) {
    // Load index.html via webpack dev server.
    require("./webpack-server.js");
    mainWindow.loadURL("http://localhost:3000/index.html");

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    // Load index.html from the file system.
    mainWindow.loadFile("dist/index.html");
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension:  ${name}`);
        createWindow();
      })
      .catch(err => console.log("An error occurred: ", err));
  } else {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Mongo database
var db = mongojs("mongodb://localhost:27017/racedirector");
db.on("connect", function () {
  console.log("Connected to Mongo Database");
});
db.racedirector.find(function (err, docs) {
  // Docs is an array of all the documents in mycollection
  //console.log(docs);
});
const insertInMongo = m => db.racedirector.insert(m);

// F1 client logic
client.start();
client.on("MOTION", m => insertInMongo(m));
client.on("SESSION", m => insertInMongo(m));
client.on("LAP_DATA", m => insertInMongo(m));
client.on("EVENT", m => insertInMongo(m));
client.on("PARTICIPANTS", m => insertInMongo(m));
client.on("CAR_SETUPS", m => insertInMongo(m));
client.on("CAR_TELEMETRY", m => insertInMongo(m));
client.on("CAR_STATUS", m => insertInMongo(m));