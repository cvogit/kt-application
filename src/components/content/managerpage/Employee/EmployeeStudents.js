import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class EmployeeStudents extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			unAssignedStudents: [],
		};

		this.handleAddStudent 		= this.handleAddStudent.bind(this);
		this.handleRemoveStudent 	= this.handleRemoveStudent.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	componentDidMount() {

		const teacherResource = this.props.teacher;
		var students = [];

		// Set the list of student assigned to the employee
		var studentList = [];
		if(teacherResource[0].students) {
			teacherResource[0].students.forEach( (student) => {
				var newStudent = {};
				newStudent.name = student.firstName + ' ' + student.lastName + ' (' + student.id + ')';
				newStudent.id 	= student.id;
				newStudent.DoB 	= student.DoB;
				newStudent.checked = false;
				studentList.push(newStudent);
			});
		}

		// Set the list of students not assigned to the employee
		const allStudents 	= this.props.students;
		var 	unAssignedStudents = allStudents;
		teacherResource[0].students.forEach( (student) => {
			unAssignedStudents = unAssignedStudents.filter( (unAddStudent) => {
				if(student.id !== unAddStudent.id) {
					return unAddStudent;
				}
			})
		});

		var unAssignedStudentList = [];
		unAssignedStudents.forEach( (student) => {
			var newStudent = {};
			newStudent.name 	= student.firstName + ' ' + student.lastName + ' (' + student.id + ')';
			newStudent.id 		= student.id;
			newStudent.checked = false;
			unAssignedStudentList.push(newStudent);
		});

		// Set state
		this.setState({
			students: studentList,
			unAssignedStudents: unAssignedStudentList,			
		});
	}

	handleAddStudent() {
		const teacherId = this.props.teacher[0].id;
		this.state.unAssignedStudents.forEach( (student) => {
			if(student.checked)
				ipcRenderer.send('AssignStudentRequest', teacherId, student.id);
		});
	}

	handleRemoveStudent() {
		const teacherId = this.props.teacher[0].id;
		this.state.students.forEach( (student) => {
			if(student.checked)
				ipcRenderer.send('UnAssignStudentRequest', teacherId, student.id);
		});
	}

	handleCheckboxChange(table, index) {
		if(table === 'assigned') {
			var students = this.state.students;
			students[index].checked = !students[index].checked;
			this.setState({
				students: students
			})
		} else if(table === 'unassigned') {
			var students = this.state.unAssignedStudents;
			students[index].checked = !students[index].checked;
			this.setState({
				unAssignedStudents: students
			})
		}
	}

	RenderEmployeeStudents = () => {

		const students = this.state.students;
		const unAssignedStudents = this.state.unAssignedStudents;
		
		return (	
			<div className="employee-students" >
				<div className="student-list-container">
					<Button className="remove-student-button" onClick={this.handleRemoveStudent} icon='delete' floating />
					<List selectable ripple>
		        <ListSubHeader caption='Assigned Students' />
		        {students.map((student, index) => (
							<ListCheckbox
								key={index}
			          caption={student.name}
			          className="ListCheckBox"
			          checked={student.checked}
			          onChange={() => this.handleCheckboxChange('assigned', index)}
			        />
						))}
		      </List>
				</div>

				<div className="unassigned-student-container">
					<Button className="add-student-button" onClick={this.handleAddStudent} icon='add' floating />
					<List selectable ripple>
		        <ListSubHeader caption='Unassigned Students' />
		        {unAssignedStudents.map((student, index) => (
							<ListCheckbox
								key={index}
			          caption={student.name}
			          className="ListCheckBox"
			          checked={student.checked}
			          onChange={() => this.handleCheckboxChange('unassigned', index)}
			        />
						))}
		      </List>
				</div>
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