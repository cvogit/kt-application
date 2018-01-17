import React, { Component } from 'react';

import Sidebar from './Sidebar.js';
import Content from './Content.js';

import '../css/dashboard.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Dashboard extends Component {
	constructor(props) {
		super(props);
    this.state = {
  		selection : 'home',
   	};

   	this.handleAppChange = this.handleAppChange.bind(this);
	}

	componentDidMount() {
		
	}

	handleAppChange(event){
		event.preventDefault();
		this.setState({
			selection: event.target.value
		});
	}

	render() {	
		return (
			<div className="dashboard">
				<Sidebar props={this.state.selection} handleSelectionChange={this.handleAppChange} />
				<Content props={this.state.selection} />
			</div>
		);
	}
}

export default Dashboard;