import React, { Component } from 'react';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserPictures extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount() {

	}

	
	RenderUserPictures = () => {
		return (
			<div className="userpage-center-content">
						
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserPictures />
			);
	}
}


export default UserPictures;