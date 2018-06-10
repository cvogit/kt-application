import React, { Component } from 'react';
import GoogleSignIn 		from '../commons/GoogleSignIn';

import '../../css/Welcome/register.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName 	: '',
			lastName 		: '',
			email 			: '',
			password 		: '',
			confirmPassword : '',
			popUp	: {},
		};
		this.handleSetGoogleUser 	= this.handleSetGoogleUser.bind(this);
		this.handlePasswordChange 	= this.handlePasswordChange.bind(this);
		this.handleConfirmPasswordChange 	= this.handleConfirmPasswordChange.bind(this);
		this.handleRegisterSubmit			= this.handleRegisterSubmit.bind(this);
	}

	componentDidMount() {
	}

	handleRegisterFailure(event, arg) {
		this.setState({popUp: arg.message });
	}

	handleSetGoogleUser(googleUser) {
		var profile 	= googleUser.getBasicProfile();
		var nameArray = profile.getName().split(" ");
		this.setState({
			email: 			profile.getEmail(),
			firstName: 	nameArray[0],
			lastName: 	nameArray[nameArray.length - 1],
		});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleConfirmPasswordChange(event) {
		this.setState({confirmPassword: event.target.value});
	}

	handleRegisterSubmit(event) {
		event.preventDefault();
		ipcRenderer.send('postRegisterRequest', this.state);
	}

	RenderRegisterForm = () => {
			return (
				<div className="register-container">
					<div className="register-header">
						<h1>Register</h1>
					</div>
					<GoogleSignIn onGoogleSignIn={this.handleSetGoogleUser} />
					<form className="register-form">
						<label>
							<input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
							<input type="password" id="confirmPassword" placeholder="Retype Password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
						</label>
						<p className="toggle-login"><a onClick={this.props.handleWelcomeToggle}>Login</a></p>
						<input className="register-btn" type="submit" onClick={this.handleRegisterSubmit} value="Register" />
					</form>
				</div>
				);
		}

	render() {

	
		return (
			<this.RenderRegisterForm />
		);
	}
}

export default Register;