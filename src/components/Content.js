import React, { Component } from 'react';

import '../css/content.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	componentDidMount() {
	}



	render() {	
		return (
			<div className="content">
				
			</div>
		);
	}
}

export default Content;