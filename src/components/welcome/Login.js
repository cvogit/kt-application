import React, { Component } from 'react';

import '../../css/Welcome/login.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email				: '',
			password		: '',
			loginFailure: false,
		};

		this.handleSetGoogleUser 	= this.handleSetGoogleUser.bind(this);
		this.handleEmailChange 		= this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLoginSubmit 		= this.handleLoginSubmit.bind(this);
	}

	componentDidMount() {

	}

	handleSetGoogleUser(googleUser) {
		var profile 	= googleUser.getBasicProfile();
		const email 	= profile.getEmail();
		this.setState({email: email});
	}

	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleLoginSubmit(event) {
		event.preventDefault();
		ipcRenderer.send('getLoginRequest', this.state);
	}

	RenderLoginForm = () => {

			return (
			<div className="login-container">
				<div className="login-header">
					<h1>Login</h1>
				</div>
				<form className="login-form">
					<label>
						<input type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
						<input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
					</label>
					<div className="button-container">
						<input className="login-btn" type="submit" onClick={this.handleLoginSubmit} value="Login" />
						<p className="password-reset"><a>Forgot your password?</a></p>
						<p className="toggle-register"><a onClick={this.props.handleWelcomeToggle}>Register</a></p>
					</div>
				</form>
			</div>
			);
	};

	render() {
		
		return (
			<this.RenderLoginForm />
		);
	}
}

export default Login;