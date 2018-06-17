import React, { Component } from 'react';

/* global gapi */

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class MailSnippet extends Component {
	constructor(props) {
		super(props);
	}

	RenderMailSnippet = () => {
		return (
			<div className="mail-snippet-container">
				<div className="snippet-from">
					{this.props.from}
				</div>
				<div className="snippet-date">
					{this.props.date}
				</div>
				<div className="snippet-subject">
					{this.props.subject}
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderMailSnippet />
			);
	}
}

export default MailSnippet;
