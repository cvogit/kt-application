import React, { Component } from 'react';

import HomePage 		from './content/HomePage';
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
			resources: null,
		};
		this.handleChangeContent = this.handleChangeContent.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('appChangeContent', 		this.handleChangeContent);

	}

	handleChangeContent(event, page, resources) {
		this.setState({
			content: page,
			resources: resources,
		});
	}

	RenderContent = () => {
		const stateContent = this.state.content;
		let content = null; 

		if(stateContent === "home")
			content = <HomePage />;
		else if(stateContent === "user")
			content = <UserPage resources={this.state.resources} />;
		else if(stateContent === "manager")
			content = <ManagerPage />;
		else if(stateContent === "teacher")
			content = <TeacherPage />;

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