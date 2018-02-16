import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Tab extends Component {

	constructor(props) {
		super(props);
		this.handleTabSelect = this.handleTabSelect.bind(this);
	}

	handleTabSelect(event) {
		event.preventDefault();
		ipcRenderer.send('appSelectContent', event.target.value);
	}

	render()
	{	
		return (
			<Button className="tab" label={this.props.role} accent onClick={this.handleTabSelect} value={this.props.role} />
		);
	}
}

export default Tab;