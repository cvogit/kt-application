import React, { Component } from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

class EmployeeStudents extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			students: [],
		};
	}

	RenderEmployeeStudents = () => {

		const teacherResource = this.props.teacher;


		const students = teacherResource[0].students;
		
		var renderStudentList = students.map( (student, index) => {
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