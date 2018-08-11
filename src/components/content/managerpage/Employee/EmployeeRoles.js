import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Switch from 'react-toolbox/lib/switch/Switch';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class EmployeeRoles extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			teacherRole: 		false,
			consultantRole: false,
			submitTeacherRole: false,
			submitConsultantRole: false
		};

		this.handleSubmitRoles = this.handleSubmitRoles.bind(this);
	}

	componentDidMount() {
		const user = this.props.user;
		var consultant = false;
		var teacher = false;

		if( user.teacher === 1 )
			teacher = true;
		if( user.consultant === 1 )
			consultant = true;

		this.setState({
			teacherRole: 		teacher,
			consultantRole: consultant,
			submitTeacherRole: 		teacher,
			submitConsultantRole: consultant,
		});
	}

	handleSubmitRoles() {

		// Change consultant role if toggled
		if( this.state.submitConsultantRole !== this.state.consultantRole ) {
			if( this.state.consultantRole )
				ipcRenderer.send('postUserRole', this.props.user.id, 'consultant');
			else
				ipcRenderer.send('deleteUserRole', this.props.user.id, 'consultant');

			this.setState({
				submitConsultantRole: this.state.consultantRole
			});
		} 

		// Change teacher role if toggled
		if( this.state.submitTeacherRole !== this.state.teacherRole ) {
			if( this.state.teacherRole )
				ipcRenderer.send('postUserRole', this.props.user.id, 'teacher');
			else
				ipcRenderer.send('deleteUserRole', this.props.user.id, 'teacher');

			this.setState({
				submitTeacherRole: this.state.teacherRole
			});
		}
	}

	handleSwitchChange= (field, value) => {
    this.setState({...this.state, [field]: value});
  };

	RenderEmployeeRoles = () => {

		return (
			<div className="employee-roles-container" >
				<Switch
          checked={this.state.teacherRole}
          label="Teacher"
          onChange={this.handleSwitchChange.bind(this, 'teacherRole')}
        />
        <Switch
          checked={this.state.consultantRole}
          label="Consultant"
          onChange={this.handleSwitchChange.bind(this, 'consultantRole')}
        />
        <Button className="" icon='arrow_drop_up' label='Submit Roles' onClick={this.handleSubmitRoles} raised primary />
      </div>
			);
	}

	render() {	

		return (
			<this.RenderEmployeeRoles />
			);
	}

}

export default EmployeeRoles;