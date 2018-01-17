import React, { Component } from 'react';

import Tab from './sidebar/Tab.js';

import '../css/sidebar/sidebar.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roles : "user ",
			active: "home",
		};

		this.handleHomeButton 	= this.handleHomeButton.bind(this);
		this.handleRolesSet 		= this.handleRolesSet.bind(this);
	}

	handleHomeButton(event) {
		event.preventDefault();
	}

	componentDidMount() {
		ipcRenderer.on('userRolesSuccess', 	this.handleRolesSet);
	}

	handleRolesSet(event, arg) {
		var tRoles = this.state.roles;
		tRoles += arg;
		this.setState({
			roles: tRoles,
			active: "",
		});
	}

	RenderTabs = () => {
		var rolesArray = this.state.roles.split(" ");
		var rolesTab = rolesArray.map(function(role){
			return <Tab key={role} role={role} />
		});
		return (
			<div className="sidebar-tabs"> { rolesTab } </div>
		);
	}

	

	render() {
		return (
			<div className="sidebar">
				<div className="sidebar-header">
					<a className="home-btn" href="#" onClick={this.props.handleHomeButton} value="home">H</a>
				</div>
				<this.RenderTabs />
			</div>
		);
	}
}

export default Sidebar;