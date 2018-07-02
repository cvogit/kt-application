import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class ManageStudents extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
	}

	RenderManageStudents = () => {
		
		return (
			<div className="manage-student-content">

			</div>
			);
	}

	render() {	
		return (
			<this.RenderManageStudents />
			);
	}
}


export default ManageStudents;