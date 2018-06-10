import React, { Component } from 'react';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount() {

	}

	
	RenderUserEdit = () => {
		return (
			<div className="userpage-center-content">
						
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserEdit />
			);
	}
}


export default UserEdit;