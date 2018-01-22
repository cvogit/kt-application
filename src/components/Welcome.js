import React, { Component } from 'react';

import Login from './welcome/Login';
import Register from './welcome/Register';

import '../css/Welcome/welcome.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			select	:	'login', 
		};

		this.handleWelcomeToggle				= this.handleWelcomeToggle.bind(this);
	}

	componentDidMount() {
	}
	
	handleWelcomeToggle(event) {
		event.preventDefault();
		this.setState({
			select: this.state.select === 'login' ? 'register' : 'login',
		});
	}

	RenderWelcome = () => {
		const select 				= this.state.select;
		const result 				=	this.state.registerResultContainer;
		return (
			<div className="welcome-bg">
				<div className="welcome-container">
					{{
						'register' 	: <Register handleWelcomeToggle={this.handleWelcomeToggle} />,
						'login'			: <Login 		handleWelcomeToggle={this.handleWelcomeToggle} />,
					}[select]}
				</div>
			</div>
			);
	}

	render() {

		return (
			<this.RenderWelcome />
		);
	}
}

export default Welcome;