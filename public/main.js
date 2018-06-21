const electron 	= require('electron');
const app 			= electron.app;
const ipcMain 	= electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const path 			= require('path');
const url 			= require('url');
const isDev 		= require('electron-is-dev');
const isOnline 	= require('is-online');
const appPath 	= app.getAppPath();
const jetpack 	= require('fs-jetpack');
	
let win;
let requestWin = null;

// User Google account data
var userGoogle = null;

// Saved user data
var userLocalInfo = null;

// Current session user data

//Data for user page
var userPageResources 	= null;
var userAvatar 					= null;
var userInfo 	 					= null;
var userImagesPath 	 		= [];

// Path to navigate user files
var userFolder 					= null;
var userFolderAbsolute 	= null;
var userFolderRelative 	= null;

function createWindow() {
	var screenElectron = electron.screen;
	var mainScreen = screenElectron.getPrimaryDisplay();
	var dimensions = mainScreen.size;
	
	win = new BrowserWindow({backgroundColor: '#fff', show: false, height: dimensions.height, width: dimensions.width});
	win.webContents.openDevTools();

	// Open default browser when url is click
	/*
	win.webContents.on('will-navigate', function(e, url) {
	  e.preventDefault();
	  electron.shell.openExternal(url);
	});
	*/

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
	requestWin.loadURL(isDev ? `file://${path.join(__dirname, './Requests.html')}` : `file://${path.join(__dirname, '../build/Requests.html')}`);
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
// Interaction with local files
// **********************

// return: bool
function isFileExist(file) {
	const path = getAbsolutePath(file);
	if ( jetpack.exists(path) === "file") {
		return true;
	}
	return false;
}

// return: string
// Return absolute path for local files
// depending on dev or build environment
// Use for electron processes
function getAbsolutePath(file) {
	if (isDev)
		return appPath+'/public'+file;
	else
		return appPath+'/build'+file;
}

// Return relative path for local files
// depending on dev or build environment.
// Use for react components
function getRelativePath(file) {
	if (isDev)
		return file;
	else
		return '.'+file;
}

// return: string
// Turn absolute path to relative
function changeAbsoluteToRelativePath(path) {
	var tPath = path;
	if (isDev) {
		return tPath.replace(appPath+'/public', '');
	}
	else {
		return tPath.replace(appPath+'/build', '.');
	}
}

// Return file content as json
function read(path) {
	let absolutePath = getAbsolutePath(path);
	var result = jetpack.read(absolutePath, 'json');
	return result;
}

// Store file to local disk
function store(file, path) {
	let absolutePath = getAbsolutePath(path);
	jetpack.write(absolutePath, file);
	return getRelativePath(path);
}

// **********************
// Setting up resources
// **********************
function readyUserPageResources() {

	// Ready user avatar
	var avatar = userFolder+'/images/avatar/avatar_'+userInfo.avatarId;
	if ( !isFileExist(avatar)) {
		// Erase directory for user avatar and fetch avatar if doesn't exist locally
		jetpack.dir(getAbsolutePath(userFolder+'/images/avatar'), { empty: true,});
		isOnline().then(online => {
			requestWin.webContents.send('getUserAvatarRequest');
		});
	} else {
		userAvatar = getRelativePath(userFolder+"/images/avatar/avatar_"+userInfo.avatarId);
	}

	// Ready user images that are missing locally
	var imgArray = userInfo.imageIds;
	var userImageFolder = userFolder+'/images/personal/image_';
	for (var i = 0; i < imgArray.length; i++) {
		imagePath = userImageFolder+imgArray[i].imageId;
		if ( !isFileExist(imagePath)) {
			requestWin.webContents.send('getUserImageRequest', imgArray[i].imageId);
		} else {
			userImagesPath.push(getRelativePath(imagePath));
		}
	}
}

function readyManagerPageResources() {

}

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
	// TODO: validate login
	isOnline().then(online => {
		if(online)
			requestWin.webContents.send('getLoginRequest', arg);
		else {
			//requestWin.webContents.send('getLoginRequest', arg);
			win.webContents.send('offlineError', "There is no Internet connection");
		}
	});
});

// Set up home page
ipcMain.on('homePageReady', (event, arg) => {
	requestWin.webContents.send('getAnnouncementsRequest');
});

// Set up user message feeds
ipcMain.on('userFeedReady', (event, arg) => {
	
});

// ***********************
// Request to Google
// ***********************

// Request for usr mails
ipcMain.on('getGoogleMailRequest', (event, arg) => {
	requestWin.webContents.send('getGoogleMailRequest', arg);
});

ipcMain.on('resultGoogleMailRequest', (event, result) => {
	console.log(result);
});

// ***********************
// Results from the server
// ***********************

// To: Register
ipcMain.on('registerSuccess', (event, result) => {
	console.log(result);
	win.webContents.send('registerSuccess', result);
});
ipcMain.on('registerFailure', (event, arg) => {
	win.webContents.send('registerFailure', arg);
});

// To: App
ipcMain.on('loginSuccess', (event,arg) => {
	win.webContents.send('loginSuccess');
});
ipcMain.on('loginFailure', (event, arg) => {
	win.webContents.send('loginFailure');
});

// To: App
// Set up app resources before app is functional
ipcMain.on('userInfoSuccess', (event, user) => {

	// Set current user session
	userInfo = user[0];

	// Set user folder and path
	userFolder 		= '/users/'+userInfo.lastName+'_'+userInfo.firstName+'_'+userInfo.id;
	var userInfoPath 	= userFolder+'/user_info/data';

	// Get user last session info
	userLocalInfo = read(userInfoPath);

	// Write user info to file
	store(userInfo, userInfoPath);

	// Get absolute path to check for local resources
	userFolderAbsolute = getAbsolutePath(userFolder);
	userFolderRelative = getRelativePath(userFolder);

	var userRoles = "user "+userInfo.roles;
	userRoles = userRoles.split(" ");
	userRoles.map(function(role){
		if (role === "user")
			readyUserPageResources();
		else if(role === "manager")
			readyManagerPageResources();
	});

	win.webContents.send('userRolesSuccess', user[0].roles);
	win.webContents.send('appReady', true);
});

// To: Homepage
ipcMain.on('getAnnouncementsSuccess', (event, arg) => {
	win.webContents.send('updateAnnouncements', arg.result, arg.offset, arg.total);
});
ipcMain.on('getAnnouncementsFailure', (event, arg) => {
	console.log(arg);
});

// *******************
// Data to set up session
// *******************
ipcMain.on('getUserAvatarSuccess', (event, image, imageName) => {
	var avatarPath = userFolder+'/images/avatar/avatar_'+userInfo.avatarId;

	// Write the file and set path to avatar
	store(image, avatarPath);
	userAvatar = avatarPath;
});

ipcMain.on('getUserImageSuccess', (event, image, imageId) => {
	var imagePath = userFolder+'/images/personal/image_'+imageId;

	// Write the file and set path to avatar
	store(image, imagePath);
	userImagesPath.push(getRelativePath(imagePath));
});

ipcMain.on('getUserPaymentsSuccess', (event, payments) => {
	var avatarPath = userFolder+'/user_info/payments';

	// Write the file and set path to avatar
	store(payments, avatarPath);
});



ipcMain.on('connectionError', (event, arg) => {
	console.log(arg);
});


// ****************
// Client data flow
// ****************

// From: Sidebar.js
// To:   Content.js
ipcMain.on('appSelectContent', (event, arg) => {
	if (arg === "user")	{
		userResources = { "avatar": userAvatar, 
											"userInfo": userInfo, 
											"userImages": userImagesPath};

		win.webContents.send('appChangeContent', arg,	userResources);
	}
	win.webContents.send('appChangeContent', arg);
});

// Set user google data
ipcMain.on('appUserGoogleLogin', (event, arg) => {
	userGoogle = arg;
});

// Return user google data
ipcMain.on('registerSuccess', (event, result) => {
	//win.webContents.send('registerSuccess', userGoogle);
});