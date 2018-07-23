import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input from 'react-toolbox/lib/input/Input';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phoneNum: '',
			dialogActive: false,
		};
		this.handleCloseDialog 	= this.handleCloseDialog.bind(this);
		this.handleOpenDialog 	= this.handleOpenDialog.bind(this);
		this.handleChangeInfoRequest = this.handleChangeInfoRequest.bind(this);
	}

	componentWillMount() {
		this.setState({
			email: 		this.props.user.email,
			phoneNum: this.props.user.phoneNum,
		});
	}

	handleCloseDialog(event) {
		event.preventDefault();
    this.setState({
    	dialogActive: false,
    });
  }

  handleOpenDialog() {
    this.setState({
    	dialogActive: true,
    });
	}

	handleInfoChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

	handleChangeInfoRequest() {
		ipcRenderer.send('putUserInfoRequest', this.state.email, this.state.phoneNum);
		this.setState({
    	dialogActive: false,
    });
	}

	
	RenderUserEdit = () => {
		
		return (
			<div className="user-page-center-container">
				<Dialog className="dialog-container" active={this.state.dialogActive} onOverlayClick={this.handleCloseDialog} type="normal">
					<Input type='text' label='Email' name='Email' value={this.state.email} onChange={this.handleInfoChange.bind(this, 'email')} maxLength={32} />
					<Input type='tel' label='PhoneNumber' name='PhoneNumber' value={this.state.phoneNum} onChange={this.handleInfoChange.bind(this, 'phoneNum')} maxLength={32} />

			    <Button icon='add' label='Submit' onClick={this.handleChangeInfoRequest} raised primary />
				</Dialog>;
				<div className="user-page-left">
		    	<Button icon='build' label='Update Info' onClick={this.handleOpenDialog} raised primary />
				</div>
				<div className="user-page-right">
					<div className="user-profile-container">
						<div className="gray-banner-sm" />
						<div className="user-profile-content">
							<div className="info-container">
								<h5 className="info-title">Email: </h5>
								<h5 className="info-field"> {this.state.email} </h5>
							</div>
							<div className="info-container">
								<h5 className="info-title">Phone: </h5>
								<h5 className="info-field"> {this.state.phoneNum} </h5>
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserEdit />
			);
	}
}


export default UserEdit;