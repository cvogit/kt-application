import React, { Component } from 'react';

import '../../css/content/teacherPage.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class TeacherPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	componentDidMount() {
	}

	RenderTeacherPage = () => {

		return (
			<div className="teacher-page">
				
			</div>
			);
	}

	render() {	
		return (
			<this.RenderTeacherPage />
		);
	}
}


export default TeacherPage;