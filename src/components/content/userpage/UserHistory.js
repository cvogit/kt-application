import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	componentWillMount() {

	}

	
	RenderUserHistory = () => {
		return (
			<div className="userpage-center-content">
						
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserHistory />
			);
	}
}


export default UserHistory;