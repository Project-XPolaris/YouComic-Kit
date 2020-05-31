import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow } from 'electron';
// import menu from './utils/menu';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 720,
    width: 360,
    resizable:false,
    fullscreenable:false,
    frame:false,
    hasShadow:true,

  });

  //setApplicationMenu();
  // menu()



  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8989/#/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './dist/renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
