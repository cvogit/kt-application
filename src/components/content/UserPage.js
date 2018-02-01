import React, { Component } from 'react';

import '../../css/content/userPage.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	componentDidMount() {
	}

	RenderUserPage = () => {

		return (
			<div className="user-page">
				
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserPage />
		);
	}
}


export default UserPage;