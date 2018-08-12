import React, { Component } from 'react';

import HomePage 		from './content/HomePage';
//import ConsultantPage 	from './content/ConsultantPage';
import ManagerPage 	from './content/ManagerPage';
import TeacherPage 	from './content/TeacherPage';
import UserPage 		from './content/UserPage';

import '../css/content.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content : "home",
			userPageResources: null,
			managerPageResources: null,
			teacherPageResources: null,

		};
		this.handleChangeContent = this.handleChangeContent.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('appChangeContent', 		this.handleChangeContent);
	}

	handleChangeContent(event, page, resources) {
		if( page === "user" ) {
			this.setState({
				userPageResources: resources,
			});
		} else if( page === 'manager' ) {
			this.setState({
				managerPageResources: resources,
			});
		} else if( page === 'teacher' ) {
			this.setState({
				teacherPageResources: resources,
			});
		}

		this.setState({
			content: page,
		});
	}

	RenderContent = () => {
		const stateContent = this.state.content;
		let content = null; 
		
		if(stateContent === "home")
			content = <HomePage />;
		else if(stateContent === "user")
			content = <UserPage resources={this.state.userPageResources} />;
		else if(stateContent === "manager")
			content = <ManagerPage resources={this.state.managerPageResources} />;
		else if(stateContent === "teacher")
			content = <TeacherPage role='teacher' resources={this.state.teacherPageResources} />;

		return (
			<div className="content"> { content } </div>
		);
	}

	render() {	

		return (
			<this.RenderContent />
		);
	}
}

export default Content;