import React, { Component } from 'react';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserPictures extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	RenderUserPictures = () => {
		const userPictures = this.props.pictures;
		var picturesRender = null;

		userPictures.forEach((picture) => {
			picturesRender = <img  src={picture} alt="user-picture"/>
		});

		return (
			<div className="userpage-center-content">
				{picturesRender}
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