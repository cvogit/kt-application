const electron = require('electron');

const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let win;
let requestWin = null;

function createWindow() {
	win = new BrowserWindow({width: 900, height: 680, backgroundColor: '#fff', show: false});
	win.webContents.openDevTools();
	showWindow();
	win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
	win.on('closed', () => win = null);
}

function showWindow() {
	win.once('ready-to-show', () => {
		win.maximize();
		win.show();
	});
}

function createRequest() {
	requestWin = new BrowserWindow({width:800, height:600, show:false});
	requestWin.loadURL(isDev ? `file://${path.join(__dirname, './electron-win/Request.html')}` : `file://${path.join(__dirname, '../build/electron-win/Request.html')}`);
	requestWin.on('closed', () => requestWin = null);
}

app.on('ready', createWindow);
app.on('ready', createRequest);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null)
		createWindow();
});


// Listen to get request
ipcMain.on('getRequest', (event, arg) => {
	requestWin.webContents.send('getRequest', arg);
});

ipcMain.on('getResult', (event, arg) => {
	win.webContents.send('getResult', arg);
});

// Listen to post request
ipcMain.on('postRequest', (event, arg) => {
	requestWin.webContents.send('postRequest', arg);
});

ipcMain.on('postResult', (event, arg) => {
	win.webContents.send('postResult', arg);
});

// Listen to delete request
ipcMain.on('deleteRequest', (event, arg) => {
	if(arg > 0 && arg < 101)
		requestWin.webContents.send('deleteRequest', arg);
	else
		win.webContents.send('deleteResult', arg);
});

ipcMain.on('deleteResult', (event, status, arg) => {
	if(status === 'OK')
		win.webContents.send('deleteResult', arg);
	else
		win.webContents.send('deleteError', arg);
});