import React, { Component } from 'react';

/* global gapi */

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class MailSnippet extends Component {
	constructor(props) {
		super(props);
	}

	RenderMailSnippet = () => {
		// Fix up 'From'
		const pFrom 		= this.props.from.replace(/<.*>/,"");
		if(this.props.box === 'Sent')
			console.log(this.props.from);
		// Fix up 'Snippet'
		var textArea	= document.createElement("textarea");
		textArea.innerHTML = this.props.snippet;
		const pSnippet	= textArea.value;

		// Date
		var tDate = this.props.date;

		return (
			<div className="mail-snippet-container">
				<div className="snippet-from">
					{pFrom}
				</div>
				<div className="snippet-content">
					{pSnippet}
				</div>
				<div className="snippet-date">
					{tDate}
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
