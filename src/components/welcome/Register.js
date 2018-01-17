import React, { Component } from 'react';

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
		this.handleFirstNameChange 	= this.handleFirstNameChange.bind(this);
		this.handleLastNameChange 	= this.handleLastNameChange.bind(this);
		this.handleEmailChange 			= this.handleEmailChange.bind(this);
		this.handlePasswordChange 	= this.handlePasswordChange.bind(this);

		this.handleConfirmPasswordChange 	= this.handleConfirmPasswordChange.bind(this);
		this.handleRegisterSubmit			= this.handleRegisterSubmit.bind(this);
	}

	componentDidMount() {
	}

	handleRegisterFailure(event, arg) {
		this.setState({popUp: arg.message });
	}

	handleFirstNameChange(event) {
		this.setState({firstName: event.target.value});
	}

	handleLastNameChange(event) {
		this.setState({lastName: event.target.value});
	}

	handleEmailChange(event) {
		this.setState({email: event.target.value});
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
					<form className="register-form">
						<label>
							<input type="name" id="firstName" className="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleFirstNameChange} />
							<input type="name" id="lastName" className="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLastNameChange} />
							<input type="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
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