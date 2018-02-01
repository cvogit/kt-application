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
	var screenElectron = electron.screen;
	var mainScreen = screenElectron.getPrimaryDisplay();
	var dimensions = mainScreen.size;
	
	win = new BrowserWindow({backgroundColor: '#fff', show: false, height: dimensions.height, width: dimensions.width});
	win.webContents.openDevTools();
	win.setResizable(false);
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

function createRequestWindow() {
	requestWin = new BrowserWindow({width:800, height:600, show:false});
	requestWin.loadURL(isDev ? `file://${path.join(__dirname, './electron-win/Requests.html')}` : `file://${path.join(__dirname, '../build/electron-win/Request.html')}`);
	requestWin.webContents.openDevTools();
	requestWin.on('closed', () => requestWin = null);
}

app.on('ready', createWindow);
app.on('ready', createRequestWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null)
		createWindow();
});

// **********************
// Requests to the server
// **********************

// Register user
ipcMain.on('postRegisterRequest', (event, arg) => {
	// TODO: Validate request
	requestWin.webContents.send('postRegisterRequest', arg);
});

// Login
ipcMain.on('getLoginRequest', (event, arg) => {
	// TODO: validate login??
	requestWin.webContents.send('getLoginRequest', arg);
});

// Get Announcements
ipcMain.on('getAnnouncementsRequest', (event, arg) => {
	requestWin.webContents.send('getAnnouncementsRequest');
});

// ***********************
// Results from the server
// ***********************

// To: Register
ipcMain.on('registerSuccess', (event, arg) => {
	win.webContents.send('registerSuccess', arg);
});
ipcMain.on('registerFailure', (event, arg) => {
	win.webContents.send('registerFailure', arg);
});

// To: App
ipcMain.on('loginSuccess', (event,arg) => {
	// Tell user login is successful and initate loading resources
	win.webContents.send('loginSuccess');
});
ipcMain.on('loginFailure', (event, arg) => {
	win.webContents.send('loginFailure');
});

// To: App
ipcMain.on('userInfoSuccess', (event, arg) => {
	win.webContents.send('appReady');
});

// To: Sidebar
ipcMain.on('userRolesSuccess', (event, arg) => {
	win.webContents.send('userRolesSuccess', arg.roles);
});
ipcMain.on('setUpFailure', (event, arg) => {
	win.webContents.send('setUpFailure');
});


ipcMain.on('getAnnouncementsSuccess', (event, arg) => {
	win.webContents.send('getAnnouncementsSuccess', arg.result, arg.offset, arg.total);
});
ipcMain.on('getAnnouncementsFailure', (event, arg) => {
	console.log(arg);
});



// ****************
// Client data flow
// ****************

// From: Sidebar, Tab
ipcMain.on('appSelectContent', (event, arg) => {
	console.log(arg);
	win.webContents.send('appChangeContent', arg);
});
















	// var regexTest = /^([a-zA-Z0-9_-]){1,64}$/;
	// if (regexTest.test(arg.firstName)	&&
	// 		regexTest.test(arg.lastName)		&& 
	// 		regexTest.test(arg.email)			&&
	// 		regexTest.test(arg.password)		&&
	// 		regexTest.test(arg.passwordConfirmation)			&&
	// 		(arg.password) === (arg.passwordConfirmation)	)
// 	win.webContents.send('postRegisterRequestInvalid', "An input field is missing or incorrect.");