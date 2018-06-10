import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentWillMount() {

	}

	RenderUserSidebar = () => {
		var userName = this.props.firstName + " " + this.props.lastName;
		var userPhone = this.props.phoneNum;
		return (
			<div className="userpage-sidebar">
				<h4> {userName} </h4>
				<h5> {userPhone} </h5>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserSidebar />
			);
	}
}

export default UserSidebar;