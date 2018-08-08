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

// Data for user page
var userPageResources 	= null;
var userAvatar 					= null;
var userInfo 	 					= null;
var userImagesPath 	 		= [];

// Data for manager page
var managerInfo = null;
var managerPageResources = null;
var managerUserList 		= [];
var managerNewUserList 	= [];
var managerStudentList 	= [];
var managerInactiveStudentList 	= [];
var managerReportList 	= [];

// Data for teacher
var teacherInfo = null;
var teacherPageResources = null;
var teacherManagerList 	= [];
var teacherStudentList 	= [];
var teacherReportList 	= [];

// Path to navigate user files
var userFolder 					= null;
var userFolderAbsolute 	= null; // Electron usage
var userFolderRelative 	= null; // Reactjs usage

// Path to navigate manager files
var managerFolder						= null;
var managerFolderAbsolute 	= null;
var managerFolderRelative 	= null;

// Path to navigate teacher files
var teacherFolder						= null;
var teacherFolderAbsolute 	= null;
var teacherFolderRelative 	= null;

function createWindow() {
	var screenElectron = electron.screen;
	var mainScreen = screenElectron.getPrimaryDisplay();
	var dimensions = mainScreen.size;
	
	win = new BrowserWindow({
		backgroundColor: '#fff', 
		show: false, 
		height: dimensions.height, 
		width: dimensions.width
	});
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
	if(userInfo.avatarId !== 0 && userInfo.avatarId) {
		var avatar = userFolder+'/images/avatar/avatar_'+userInfo.avatarId;
		if ( !isFileExist(avatar)) {
			// Erase directory for user avatar and fetch avatar if doesn't exist locally
			jetpack.remove(getAbsolutePath(userFolder+'/images/avatar'));
			isOnline().then(online => {
				requestWin.webContents.send('getUserAvatarRequest');
			});
		} else {
			userAvatar = getRelativePath(userFolder+"/images/avatar/avatar_"+userInfo.avatarId);
		}
	}

	// Ready user images that are missing locally
	var imgArray = userInfo.imageIds;
	var imagePath;
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
	managerFolder = '/managers/'+userInfo.lastName+'_'+userInfo.firstName+'_'+userInfo.id;

	// Get absolute path and relative path to check for local resources
	managerFolderAbsolute = getAbsolutePath(managerFolder);
	managerFolderRelative = getRelativePath(managerFolder);

	// Make the manager folder if doesn't exist
	jetpack.dir(managerFolderAbsolute);

	// Store the current user list into file
	const userFilePath = managerFolder + '/files/users';
	store(managerUserList, userFilePath);

	// Store the current students list into file
	const studentFilePath = managerFolder + '/files/students';
	store(managerStudentList, studentFilePath);

	// Store the current students list into file
	const inactiveStudentFilePath = managerFolder + '/files/inactiveStudents';
	store(managerInactiveStudentList, inactiveStudentFilePath);

	// Store the current report list into file
	const reportFilePath = managerFolder + '/files/reports';
	store(managerReportList, reportFilePath);

	// Check active users resources
	managerUserList.forEach( (user) => {

		if(user.images) {
			var imagePath = '/users/' + user.lastName + '_' + user.firstName + '_' + user.id + '/images/image_';

			// Check user images, if doesn't exist locally, fetch it
			user.images.forEach( (image) => {
				if ( !isFileExist(managerFolderAbsolute+imagePath + image.imageId)) {
					var relativePath = managerFolderRelative + imagePath + image.imageId;
					isOnline().then(online => {
						requestWin.webContents.send('getAnotherUserImageRequest', user.id, image.imageId, relativePath);
					});
				} 
			});
		}
	});

	// Check student resources
	managerStudentList.forEach( (student) => {

	});
}

function readyTeacherPageResources() {
	teacherFolder = '/teachers/'+userInfo.lastName+'_'+userInfo.firstName+'_'+userInfo.id;

	// Get absolute path and relative path to check for local resources
	teacherFolderAbsolute = getAbsolutePath(teacherFolder);
	teacherFolderRelative = getRelativePath(teacherFolder);

	// Make the teacher folder if doesn't exist
	jetpack.dir(teacherFolderAbsolute);

	// Store the current report list into file
	const reportFilePath = teacherFolder + '/files/reports';
	store(teacherReportList, reportFilePath);

	// Store the manager list into file
	const managerFilePath = teacherFolder + '/files/managers';
	store(teacherManagerList, managerFilePath);

	// Store the student list into file
	const studentFilePath = teacherFolder + '/files/students';
	store(teacherStudentList, studentFilePath);

	// Check manager resources
	teacherManagerList.forEach( (manager) => {

		// Check each manager have their own folder
		var tManagerFolder = '/managers/' + manager.lastName + '_' + manager.firstName + '_' + manager.id;
		jetpack.dir(teacherFolderAbsolute + tManagerFolder);
		
		// Check for avatar image
		if(manager.avatarId !== 0) {

			// path for manager avatar
			var avatarPath = teacherFolder + tManagerFolder + '/images/image_' + manager.avatarId;	
			if ( !isFileExist(avatarPath)) {
				isOnline().then(online => {
					requestWin.webContents.send('getAnotherUserAvatarRequest', manager.id, avatarPath);
				});
			} 
		}
	});

	// Check student resources
	teacherStudentList.forEach( (student) => {

		// Check each student have their own folder
		var tStudentFolder = '/students/' + student.name + '_' + student.id;
		jetpack.dir(teacherFolderAbsolute + tStudentFolder);
		
		// Check for student images
		if(student.images.length !== 0) {

			// path for student images
			var imagePath = teacherFolder + tStudentFolder + '/images/image_';	

			student.images.forEach( (image) => {
				if ( !isFileExist(imagePath+image.imageId)) {
					isOnline().then(online => {
						requestWin.webContents.send('getStudentImageRequest', student.id, image.imageId, imagePath+image.imageId);
					});
				} 
			});
		}
	});
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
			win.webContents.send('offlineError', "There is no Internet connection");
		}
	});
});

// Set up home page
ipcMain.on('homePageReady', (event) => {
	requestWin.webContents.send('getAnnouncementsRequest');
});

// Send a post request with the image file
ipcMain.on('postImagesRequest', (event, pImageFileBase64, pImageType) => {
	requestWin.webContents.send('postImagesRequest', pImageFileBase64, pImageType);
});

// Get the image id and send a delete request
ipcMain.on('deleteImagesRequest', (event, pImageDeleteArray) => {
	var imageId;
	pImageDeleteArray.forEach( (imageSrc) => {
		imageId = parseInt(imageSrc.split(userFolder+'/images/personal/image_')[1]);
		requestWin.webContents.send('deleteImagesRequest', imageId);
	});
});

// Get the image id and send a delete request
ipcMain.on('AssignStudentRequest', (event, pTeacherId, pStudentId) => {
	requestWin.webContents.send('assignStudentRequest', pTeacherId, pStudentId);
});

// Get the image id and send a delete request
ipcMain.on('UnAssignStudentRequest', (event, pTeacherId, pStudentId) => {
	requestWin.webContents.send('unAssignStudentRequest', pTeacherId, pStudentId);
});

// Activate an unactivated employee
ipcMain.on('addEmployeeRequest', (event, pUserId) => {
	requestWin.webContents.send('addUserRequest', pUserId);
});

// Add a new student
ipcMain.on('addStudentRequest', (event, studentName, DoB) => {
	requestWin.webContents.send('addStudentRequest', studentName, DoB);
});

// Add a new report
ipcMain.on('addReportRequest', (event, report, studentId) => {
	requestWin.webContents.send('addReportRequest', report, studentId);
});

// ***********************
// Results from the server
// ***********************

ipcMain.on('snackbarMessage', (event, pMessage) => {
	win.webContents.send('snackbarMessage', pMessage);
});

// To: Register
ipcMain.on('registerSuccess', (event, result) => {
	win.webContents.send('snackbarMessage', 'Registered, awaiting confirmation.');
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

	// Get absolute path and relative path to check for local resources
	userFolderAbsolute = getAbsolutePath(userFolder);
	userFolderRelative = getRelativePath(userFolder);

	// Ready user needed resources
	var userRoles = "user "+userInfo.roles;
	userRoles = userRoles.split(" ");
	userRoles.map(function(role){
		if (role === "user")
			readyUserPageResources();
		else if(role === "manager") {
			// TODO get how many report already on local file and not load those again
			requestWin.webContents.send('getManagerResources');
		}
		else if(role === "teacher") {
			// TODO get how many report already on local file and not load those again
			requestWin.webContents.send('getTeacherResources');
		}
	});

	win.webContents.send('userRolesSuccess', user[0].roles);
	win.webContents.send('appReady', true);
});

// To: Homepage
ipcMain.on('getAnnouncementsSuccess', (event, data) => {
	win.webContents.send('updateAnnouncements', data.result, data.offset, data.total);
});

ipcMain.on('postImagesSuccess', (event, pImageId) => {
	requestWin.webContents.send('getUserImageRequest', pImageId);
});

ipcMain.on('deleteImagesSuccess', (event, pImageId) => {
	var imagePath = userFolder+'/images/personal/image_'+pImageId;
	jetpack.remove(getAbsolutePath(imagePath));

	var i = -1;
	while( i++ < userImagesPath.length ) {
		if( imagePath === userImagesPath[i] ) {
			userImagesPath.splice(i, 1);
			break;
		}
	}
	// Reload UserPictures.js
	win.webContents.send('loadUserPictures', userImagesPath);
});

// Update user info request
ipcMain.on('putUserInfoRequest', (event, pEmail, pPhoneNum) => {
	requestWin.webContents.send('putUserInfoRequest', pEmail, pPhoneNum);
});

// Update a report request
ipcMain.on('putReportRequest', (event, report, reportId, reportPart) => {
	requestWin.webContents.send('putReportRequest', report, reportId, reportPart);
});

// Update a basic form request
ipcMain.on('updateBasicFormRequest', (event, formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9) => {
	requestWin.webContents.send('updateBasicFormRequest', formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9);
});

// Update a birth form request
ipcMain.on('updateBirthFormRequest', (event, formId, question_1, question_2, question_3, question_4) => {
	requestWin.webContents.send('updateBirthFormRequest', formId, question_1, question_2, question_3, question_4);
});

// Update an education form request
ipcMain.on('updateEducationFormRequest', (event, formId, question_1, question_2, question_3, question_4, question_5, question_6) => {
	requestWin.webContents.send('updateEducationFormRequest', formId, question_1, question_2, question_3, question_4, question_5, question_6);
});

// Update a family form request
ipcMain.on('updateFamilyFormRequest', (event, formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12) => {
	requestWin.webContents.send('updateFamilyFormRequest', formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12);
});

// Update a illness form request
ipcMain.on('updateIllnessFormRequest', (event, formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12, question_13, question_14, question_15, question_16, question_17, question_18, question_19, question_20, question_21, question_22, question_23, question_24, question_25, question_26, question_27, question_28, question_29, question_30, question_31) => {
	requestWin.webContents.send('updateIllnessFormRequest', formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12, question_13, question_14, question_15, question_16, question_17, question_18, question_19, question_20, question_21, question_22, question_23, question_24, question_25, question_26, question_27, question_28, question_29, question_30, question_31);
});

// Update a family form request
ipcMain.on('updateInfancyFormRequest', (event, formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7) => {
	requestWin.webContents.send('updateInfancyFormRequest', formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7);
});

// Update a pregnancy form request
ipcMain.on('updatePregnancyFormRequest', (event, formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12, question_13, question_14, question_15) => {
	requestWin.webContents.send('updatePregnancyFormRequest', formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12, question_13, question_14, question_15);
});

// Update a birth form request
ipcMain.on('updatePresentFormRequest', (event, formId, question_1, question_2, question_3, question_4) => {
	requestWin.webContents.send('updatePresentFormRequest', formId, question_1, question_2, question_3, question_4);
});

// Update a toddler form request
ipcMain.on('updateToddlerFormRequest', (event, formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12, question_13, question_14, question_15, question_16, question_17, question_18, question_19, question_20, question_21, question_22) => {
	requestWin.webContents.send('updateToddlerFormRequest', formId, question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, question_11, question_12, question_13, question_14, question_15, question_16, question_17, question_18, question_19, question_20, question_21, question_22,);
});

// *******************
// Data to set up session
// *******************
ipcMain.on('getUserAvatarSuccess', (event, pImage) => {
	var avatarPath = userFolder+'/images/avatar/avatar_'+userInfo.avatarId;

	// Write the file and set path to avatar
	store(pImage, avatarPath);
	userAvatar = avatarPath;
});

ipcMain.on('getUserImageSuccess', (event, image, imageId) => {
	var imagePath = userFolder+'/images/personal/image_'+imageId;

	// Write the file and set path
	store(image, imagePath);
	userImagesPath.push(getRelativePath(imagePath));
	win.webContents.send('loadUserPictures', userImagesPath);
});

ipcMain.on('getUserPaymentsSuccess', (event, payments) => {
	var avatarPath = userFolder+'/user_info/payments';

	// Write the file and set path to avatar
	store(payments, avatarPath);
});

ipcMain.on('getManagerResourcesSuccess', (event, pManagerResources) => {
	managerNewUserList 	= pManagerResources.newUsers;
	managerUserList 		= pManagerResources.users;
	managerStudentList 	= pManagerResources.students;
	managerInactiveStudentList = pManagerResources.inactiveStudents;
	managerReportList 	= pManagerResources.reports;
	readyManagerPageResources();
});

ipcMain.on('getTeacherResourcesSuccess', (event, pTeacherResources) => {
	teacherReportList 	= pTeacherResources.reports;
	teacherStudentList 	= pTeacherResources.students;
	teacherManagerList  = pTeacherResources.managers;
	teacherInfo = {};
	teacherInfo['id'] 					= pTeacherResources.id;
	teacherInfo['numStudents'] 	= pTeacherResources.numStudents;
	teacherInfo['userId'] 			= pTeacherResources.userId;
	readyTeacherPageResources();
});

ipcMain.on('getImageSuccess', (event, image, localPath) => {
	// Write the file
	store(image, localPath);
});

ipcMain.on('connectionError', (event, arg) => {
	win.webContents.send('snackbarMessage', 'Unable to connect to server.');
});


// ****************
// Client data flow
// ****************

// From: Sidebar.js
ipcMain.on('appSignOut', (event) => {

	// Reset session data
	userGoogle = null;

	// User data
	userLocalInfo = null;

	// Data for user page
	userPageResources 	= null;
	userAvatar 					= null;
	userInfo 	 					= null;
	userImagesPath 	 		= [];

	// Data for manager page
	managerInfo = null;
	managerPageResources = null;
	managerUserList 		= [];
	managerNewUserList 	= [];
	managerStudentList 	= [];
	managerReportList 	= [];

	// Data for teacher
	teacherInfo = null;
	teacherPageResources = null;
	teacherManagerList 	= [];
	teacherStudentList 	= [];
	teacherReportList 	= [];

	// Path to navigate user files
	userFolder 					= null;
	userFolderAbsolute 	= null; // Electron usage
	userFolderRelative 	= null; // Reactjs usage

	// Path to navigate manager files
	managerFolder						= null;
	managerFolderAbsolute 	= null;
	managerFolderRelative 	= null;

	// Path to navigate teacher files
	teacherFolder						= null;
	teacherFolderAbsolute 	= null;
	teacherFolderRelative 	= null;

	win.webContents.send('loggedOut');
});


// From: Sidebar.js
// To:   Content.js
ipcMain.on('appSelectContent', (event, arg) => {
	if (arg === "user")	{
		userResources = { "avatar": userAvatar, 
											"userInfo": userInfo};

		win.webContents.send('appChangeContent', arg,	userResources);
	} else if(arg === "manager")	{
		managerResources = 	{ 
													"managerFolder"			: managerFolderRelative,
													"managerUserList"		: managerUserList,
													"managerNewUserList": managerNewUserList,
													"managerStudentList": managerStudentList,
													"managerInactiveStudentList": managerInactiveStudentList,
													"managerReportList"	: managerReportList,
												};
												
		win.webContents.send('appChangeContent', arg,	managerResources);
	} else if(arg === "teacher")	{
		teacherResources = 	{ 
													"teacherInfo"   		: teacherInfo,
													"teacherFolder"			: teacherFolderRelative,
													"teacherManagerList": teacherManagerList,
													"teacherStudentList": teacherStudentList,
													"teacherReportList"	: teacherReportList,
												};

		win.webContents.send('appChangeContent', arg,	teacherResources);
	}
	else 
		win.webContents.send('appChangeContent', arg);
});

// Set user google data
ipcMain.on('appUserGoogleLogin', (event, userGoogleInfo) => {
	userGoogle = userGoogleInfo;
});

// Return user google data
ipcMain.on('registerSuccess', (event, result) => {
	//win.webContents.send('registerSuccess', userGoogle);
});

// Give user images path to UserPictures.js
// From: UserPictures.js
// To:   UserPictures.js
ipcMain.on('getUserPictures', (event) => {
	win.webContents.send('loadUserPictures', userImagesPath);
});


// Give the necessary reports to window
// From: Employee, Student components
// To: 	 Employee, Student components
ipcMain.on('getReports', (event, request, idArray) => {
	// Look for the reports belong to the employee and return it
	var result = [];
	if(request === 'employee') {
		idArray.forEach( (index) => {
			result.push(managerReportList[index.id - 1]);
		});
		win.webContents.send('employeeReportsResult', result);
	}	else if(request === 'student') {
		idArray.forEach( (index) => {
			result.push(managerReportList[index.id - 1]);
		});
		win.webContents.send('studeentReportsResult', result);
	}	
});

// Give the students informations to window
// From: Employee, Student components
// To: 	 Employee, Student components
ipcMain.on('getStudents', (event, request, idArray) => {
	var result = [];

	// Look for the students belong to the employee and return it
	if(request === 'employee') { 
		idArray.forEach( (student) => {
			for( index in managerStudentList ) {
				if(managerStudentList[index].id === student.studentId) {
					result.push(managerStudentList[index]);
					break;
				}
			}
		});
		win.webContents.send('employeeStudentsResult', result);
	}	
});