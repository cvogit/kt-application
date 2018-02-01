import React, { Component } from 'react';

import '../../css/content/managerPage.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class ManagerPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

	}

	componentDidMount() {
	}

	RenderManagerPage = () => {

		return (
			<div className="home-page">
				
			</div>
			);
	}

	render() {	
		return (
			<this.RenderManagerPage />
		);
	}
}


export default ManagerPage;