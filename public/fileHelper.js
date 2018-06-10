/**
 *	Helpers functions for main.js
 *
 *	Take care of commons interaction with local files and directories
 *
 **/ 

// **********************
// Interaction with local files
// **********************

// return: bool
function isAvatarExist = (absolutePath) => {
	const avatarPath = absolutePath+'/images/avatar/avatar_'+currentUser.avatarId;
	if ( jetpack.exists(avatarPath) === "file") {
		return true;
	}

	// If avatar doesn't exit or is the wrong avatar, reset avatar folder
	jetpack.dir(absolutePath+'/images/avatar', { empty: true,});
	return false;
}

// return: string
// Return absolute path for local files
// depending on dev or build environment
// Use for electron processes
function getAbsolutePath = (path) => {
	if (isDev)
		return appPath+'/public'+path;
	else
		return appPath+'/build'+path;
}

// Return relative path for local files
// depending on dev or build environment.
// Use for react components
function getRelativePath = (path) => {
	if (isDev)
		return path;
	else
		return '.'+path;
}

// return: string
// Turn absolute path to relative
function changeAbsoluteToRelativePath = (path) => {
	var tPath = path;
	if (isDev) {
		return tPath.replace(appPath+'/public', '');
	}
	else {
		return tPath.replace(appPath+'/build', '.');
	}
}

function setAvatarPath = (absolutePath) => {
	var avatarPath = '/users/'+userFolder+'/images/avatar/avatar_'+currentUser.avatarId;
	userAvatar = getRelativePath(avatarPath);
}

// Store file to local disk
function store = (file, path) => {
	let absolutePath = getAbsolutePath(path);
	jetpack.write(absolutePath, file);
	return getRelativePath(path);
}