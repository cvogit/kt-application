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
					<div className="new-employee-container">
						<Button className="add-employee-button" icon='add' label='Add' onClick={this.handleAddEmployee} raised primary />
						<div className="new-employee-name">
							Name: {employeeName}
						</div>
						<div className="new-employee-id">
							Id: 	{employeeId}
						</div>
					</div>
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