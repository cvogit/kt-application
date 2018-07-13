import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class EmployeeContent extends Component { 
	constructor(props) {
		super(props);
		this.handleAddEmployee = this.handleAddEmployee.bind(this);
	}

	handleAddEmployee() {
		ipcRenderer.send('addEmployeeRequest', this.props.employee.id);
	}

	RenderManageEmployees = () => {
		const employee = this.props.employee;
		const employeeName = employee.lastName + ' ' + employee.firstName;
		const employeeId 	 = employee.id;

		return (
			<div className="employee-content" >
				<div className="left-content">
					<h4>Name: {employeeName}</h4>
					<h5>Id: 	{employeeId}</h5>
				</div>
				<div className="right-content">
					<Button icon='add' label='Add Employee' onClick={this.handleAddEmployee} flat primary />
				</div>
      </div>
			);
	}

	render() {	

		return (
			<this.RenderManageEmployees />
			);
	}
}

export default EmployeeContent;