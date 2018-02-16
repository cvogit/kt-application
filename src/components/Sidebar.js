import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Navigation from 'react-toolbox/lib/navigation/Navigation';

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
		this.handleTabSelect 		= this.handleTabSelect.bind(this);

	}

	componentDidMount() {
		ipcRenderer.on('userRolesSuccess', 	this.handleRolesSet);
	}

	handleHomeButton(event) {
		ipcRenderer.send('appSelectContent', "home");
	}

	handleRolesSet(event, arg) {
		var tRoles = this.state.roles;
		tRoles += arg;
		this.setState({
			roles: tRoles,
		});
	}

	handleTabSelect(event) {
		event.preventDefault();
		this.setState({
			active: event.target.value,
		});
		
		ipcRenderer.send('appSelectContent', event.target.value);
	}

	RenderSidebar = () => {
		const rolesArray 	= this.state.roles.split(" ");
		const activeTab   = this.state.active;
		const tabSelect 	= this.handleTabSelect

		const getTabs = rolesArray.map(function(role){
			if (activeTab == role)
				return <Button className="tab-active" label={role} accent onClick={tabSelect} value={role} />
			else 
				return <Button className="tab" label={role} accent onClick={tabSelect} value={role} />	
		});

		return (
			<div className="sidebar">
				<div className="sidebar-header">
					<a className="home-btn" href="#" onClick={this.handleHomeButton} value="home">H</a>
				</div>
				<Navigation type='vertical'>
					{ getTabs } 
				</Navigation>
			</div>
		);
	}

	render() {
		return (
			<this.RenderSidebar />
		);
	}
}

export default Sidebar;