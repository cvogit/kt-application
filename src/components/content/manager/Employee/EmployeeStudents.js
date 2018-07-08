import React, { Component } from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class EmployeeStudents extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			students: [],
		};

		this.handleLoadStudents = this.handleLoadStudents.bind(this);
	}

	componentDidMount() {
		ipcRenderer.send('getStudents', 'employee', this.props.employee.teacher[0].students);
		ipcRenderer.on('employeeStudentsResult', this.handleLoadStudents);
	}

	componentWillUnmount() {
		ipcRenderer.removeListener('employeeStudentsResult', this.handleLoadStudents);
	}

	handleLoadStudents(event, students) {
		this.setState({
			students: students,
		});
	}

	RenderEmployeeStudents = () => {

		const Students = this.state.students;

		var renderStudentList = Students.map( (student, index) => {
			return <ListItem 	className="student-wrapper"
												label={student.id}
												key={student.id}
							          caption={student.firstName + ' ' + student.lastName}
							          />
		});


		return (
			<div className="employee-students" >
				<List selectable ripple className="student-list">
	        {renderStudentList}
        </List>
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