import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Navigation from 'react-toolbox/lib/navigation/Navigation';

import '../css/sidebar/sidebar.css';

import homeIcon from '../images/home_icon.png';

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
		this.handleSignOut 			= this.handleSignOut.bind(this);
		this.handleTabSelect 		= this.handleTabSelect.bind(this);
		this.getMonthFromDate 	= this.getMonthFromDate.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('userRolesSuccess', 	this.handleRolesSet);
	}

	handleHomeButton(event) {
		ipcRenderer.send('appSelectContent', "home");
		this.setState({
			active: "home",
		});
	}

	handleRolesSet(event, pRoles) {
		var tRoles = "user ";
		if(pRoles !== null)
			tRoles += pRoles;
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

	handleSignOut(event) {
		event.preventDefault();
	
		ipcRenderer.send('appSignOut');
	}

	getMonthFromDate(pDate) {
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
		  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
		];

		return monthNames[pDate.getMonth()];
	}

	RenderSidebar = () => {
		const rolesArray 	= this.state.roles.split(" ");
		const activeTab   = this.state.active;
		const tabSelect 	= this.handleTabSelect;
		const date 				= new Date();
		const currentDate = date.getDate();
		const currentMonth = this.getMonthFromDate(date);

		const renderTabs = rolesArray.map(function(role){
			if (activeTab === role)
				return <Button className="tab-active" key={role} label={role} accent onClick={tabSelect} value={role} />
			else if ( role !== '')
				return <Button className="tab" key={role} label={role} accent onClick={tabSelect} value={role} />	
			else
				return null;
		});


		return (
			<div className="sidebar">
				<div className="sidebar-header">
					<a className="home-btn" onClick={this.handleHomeButton} value="home">
						<img src={homeIcon} alt="home-icon"/>
					</a>
					<h3 className="sidebar-month"> {currentMonth} </h3>
					<h4 className="sidebar-date"> {currentDate} </h4>
				</div>
				<Navigation type='vertical'>
					{ renderTabs } 
					<Button className="sign-out" onClick={this.handleSignOut} label="Sign out" value="sign out" />
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