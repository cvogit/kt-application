import React, { Component } from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import Student from '../student/Student.js'
import defaultAvatar from '../../../images/default_avatar.png';

class ManageStudents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listClicked: 	null,
			studentIndex: null,
		};

		this.renderInactiveStudentContent = this.renderInactiveStudentContent.bind(this);
		this.renderStudentContent 				= this.renderStudentContent.bind(this);
	}

	renderInactiveStudentContent(studentIndex) {
		this.setState({
			listClicked: 	'inactiveStudents',
			studentIndex: studentIndex,
		});
	}

	renderStudentContent(studentIndex) {
		this.setState({
			listClicked: 'students',
			studentIndex: studentIndex,
		});
	}

	RenderManageStudents = () => {
		var renderStudentList;
		var renderInactiveStudentList;
		var renderStudentContent = null;

		var studentList 				= this.props.students;
		var inactiveStudentList = this.props.inactiveStudents;
		const managerFolder 		= this.props.folder;

		// Render a list of active students
		if(studentList.length === 0) {
			renderStudentList = null;
		} else {
     	renderStudentList = studentList.map( (student, index) => {
     		var avatarPath = defaultAvatar;
     		if(student.avatarId !== 0) {
     			avatarPath = managerFolder + '/students/' + student.name + '_' + student.id +  '/images/image_' + student.avatarId;
     		}

				return <ListItem 	className="student-wrapper"
													label={student.id}
													key={student.id}
													avatar={avatarPath}
								          caption={student.name}
								          onClick={() => this.renderStudentContent(index)} />
			});		
		}

		// Rendera  list of inactive students
		if(inactiveStudentList.length === 0) {
			renderInactiveStudentList = null;
		} else {
     	renderInactiveStudentList = inactiveStudentList.map( (student, index) => {
     		var avatarPath = defaultAvatar;
     		if(student.avatarId !== 0) {
     			avatarPath = managerFolder + '/students/' + student.name + '_' + student.id +  '/images/image_' + student.avatarId;
     		}

				return <ListItem 	className="student-wrapper"
													label={student.id}
													key={student.id}
													avatar={avatarPath}
								          caption={student.name}
								          onClick={() => this.renderInactiveStudentContent(index)} />
			});		
		}

		// Render the current select student information
		if(this.state.listClicked && (this.state.studentIndex !== null)) {
			if(this.state.listClicked === 'students') {
				renderStudentContent = <Student student={studentList[this.state.studentIndex]}/>;
			} else if (this.state.listClicked === 'inactiveStudents') {
				renderStudentContent = <Student student={inactiveStudentList[this.state.studentIndex]}/>;
			}
		}

		return (
			<div className="manage-student-container">
				<div className="manage-student-content">
					<List selectable ripple className="student-list">
		        <ListSubHeader caption='Current' />
		        {renderStudentList}
		        <ListSubHeader caption='Inactive' />
		        {renderInactiveStudentList}
	        </List>
	        {renderStudentContent}
	      </div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderManageStudents />
			);
	}
}


export default ManageStudents;