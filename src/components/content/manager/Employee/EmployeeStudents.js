import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class EmployeeStudents extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			
		};

		this.handleLoadStudents = this.handleLoadStudents.bind(this);
	}

	componentDidMount() {
		ipcRenderer.send('getStudents', 'teacher', this.props.employee.teacher[0].students);
		ipcRenderer.on('employeeStudentsResult', this.handleLoadStudents);
	}

	handleLoadStudents(event, students) {
		console.log(students);
	}

	RenderEmployeeStudents = () => {


		return (
			<div className="employee-students" >

      </div>
			);
	}

	render() {	

		return (
			<this.RenderEmployeeStudents />
			);
	}

}

export default EmployeeStudents;