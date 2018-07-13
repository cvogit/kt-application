import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';

import Table 					from 'react-toolbox/lib/table/Table';
import TableHead			from 'react-toolbox/lib/table/TableHead';
import TableRow				from 'react-toolbox/lib/table/TableRow';
import TableCell			from 'react-toolbox/lib/table/TableCell';

import Tooltip			from 'react-toolbox/lib/tooltip/Tooltip';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const TooltipCell = Tooltip(TableCell);

class EmployeeStudents extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			selected: [],
			unAssignedStudents: [],
			unAssignedSelected: [],
		};

		this.handleAddStudent 		= this.handleAddStudent.bind(this);
		this.handleRemoveStudent 	= this.handleRemoveStudent.bind(this);
	}

	componentDidMount() {

		const teacherResource = this.props.teacher;
		const students = teacherResource[0].students;

		// Set the list of student assigned to the employee
		var studentList = [];
		students.forEach( (student) => {
			var newStudent = {};
			newStudent.name = student.firstName + ' ' + student.lastName;
			newStudent.id 	= student.id;
			newStudent.DoB 	= student.DoB;
			studentList.push(newStudent);
		});

		// Set the list of students not assigned to the employee
		const allStudents 	= this.props.students;
		var 	unAssignedStudents = allStudents;
		students.forEach( (student) => {
			unAssignedStudents = unAssignedStudents.filter( (unAddStudent) => {
				if(student.id !== unAddStudent.id) {
					return unAddStudent;
				}
			})
		});

		var unAssignedStudentList = [];
		unAssignedStudents.forEach( (student) => {
			var newStudent = {};
			newStudent.name 	= student.firstName + ' ' + student.lastName;
			newStudent.id 		= student.id;
			unAssignedStudentList.push(newStudent);
		});

		// Set state
		this.setState({
			students: studentList,
			unAssignedStudents: unAssignedStudentList,			
		});
	}

	handleAssignedStudentRowSelect = selected => {
		const students = this.state.students;
		this.setState({ selected: selected.map(student => students[student].id) });
	};

	handleUnAssignedStudentRowSelect = selected => {
		const students = this.state.unAssignedStudents;
		this.setState({ unAssignedSelected: selected.map(student => students[student].id) });
	};

	handleAddStudent() {
		const teacherId = this.props.teacher[0].id;
		this.state.unAssignedSelected.forEach( (studentId) => {
			ipcRenderer.send('AssignStudentRequest', teacherId, studentId);
		});
	}

	handleRemoveStudent() {
		const teacherId = this.props.teacher[0].id;
		this.state.selected.forEach( (studentId) => {
			ipcRenderer.send('UnAssignStudentRequest', teacherId, studentId);
		});
	}

	RenderEmployeeStudents = () => {

		const students = this.state.students;
		const unAssignedStudents = this.state.unAssignedStudents;
		
		return (	
			<div className="employee-students" >
				<div className="student-list-container">
					<Button className="remove-student-button" onClick={this.handleRemoveStudent} icon='delete' floating />
					<Table multiSelectable onRowSelect={this.handleAssignedStudentRowSelect} style={{ marginTop: 10 }}>
						<TableHead>
							<TooltipCell tooltip="Students assigned to the teacher.">
								Assigned Students
							</TooltipCell>
							<TableCell className="tablecell" numeric>Id</TableCell>
							<TableCell className="tablecell" numeric>Name</TableCell>
							<TableCell className="tablecell-right" numeric>DoB</TableCell>
						</TableHead>
						{students.map((student, index) => (
							<TableRow key={index} selected={this.state.selected.indexOf(student.id) !== -1}>
								<TableCell className="tablecell" numeric>{student.id}</TableCell>
								<TableCell className="tablecell" >{student.name}</TableCell>
								<TableCell className="tablecell-right" >{student.DoB}</TableCell>
							</TableRow>
						))}
					</Table>
				</div>
				<div className="unassigned-student-container">
					<Button className="add-student-button" onClick={this.handleAddStudent} icon='add' floating />
					<Table multiSelectable onRowSelect={this.handleUnAssignedStudentRowSelect} style={{ marginTop: 10 }}>
						<TableHead>
							<TooltipCell tooltip="Students not assigned to the teacher.">
								Not Assigned Students
							</TooltipCell>
							<TableCell className="tablecell" numeric>Id</TableCell>
							<TableCell className="tablecell-right" numeric>Name</TableCell>
						</TableHead>
						{unAssignedStudents.map((student, index) => (
							<TableRow key={index} selected={this.state.unAssignedSelected.indexOf(student.id) !== -1}>
								<TableCell className="tablecell" numeric>{student.id}</TableCell>
								<TableCell className="tablecell-right" >{student.name}</TableCell>
							</TableRow>
						))}
					</Table>
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