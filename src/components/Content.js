import React, { Component } from 'react';

import '../css/content.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content : "home",
		};
		this.handleChangeContent = this.handleChangeContent.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('appChangeContent', 		this.handleChangeContent);

	}

	handleChangeContent(event, arg) {
		this.setState({
			content: arg
		});
	}

	RenderContent = () => {
		const content = this.state.content;
		const getContent = (content) => {
			if(content === "home")
				return "home"
			else if(content === "user")
				return "user"
			else if(content === "manager")
				return "manager"
			else if(content === "teacher")
				return "teacher"
		}

		return (
			<div className="content"> { getContent } </div>
		);
	}

	render() {	
		return (
			<this.RenderContent />
		);
	}
}

export default Content;