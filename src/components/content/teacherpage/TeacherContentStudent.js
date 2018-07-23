import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';
import List 		from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import Student from '../student/Student';


import defaultAvatar from '../../../images/default_avatar.png';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class TeacherContentStudent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			studentIndex: 0,
			folder: null,
			addStudentDialog: false,
			firstName: '',
			lastName: '',
			DoB: '',
		};

		this.renderStudentContent 		= this.renderStudentContent.bind(this);
		this.handleAddStudentRequest 	= this.handleAddStudentRequest.bind(this);
		this.handleAddStudentChange 	= this.handleAddStudentChange.bind(this);
		this.handleOpenAddStudentDialog = this.handleOpenAddStudentDialog.bind(this);
		this.handleDialogExit = this.handleDialogExit.bind(this);
	}

	componentDidMount() {
		this.setState({
			students: this.props.students,
			folder: this.props.folder,
		})
	}

	handleAddStudentChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

	handleAddStudentRequest() {
		ipcRenderer.send('addStudentRequest', this.state.firstName, this.state.lastName, this.state.DoB);
		this.setState({
    	addStudentDialog: false,
    });
	}

	handleOpenAddStudentDialog() {
    this.setState({
    	addStudentDialog: true,
    });
	}

	handleDialogExit(event) {
		event.preventDefault();
    this.setState({
    	addStudentDialog: false,
    });
  }

	renderStudentContent(studentIndex) {
		this.setState({
			studentIndex: studentIndex,
		});
		console.log(this.state.students[studentIndex]);
	}

	RenderTeacherContentStudent = () => {
		var studentList = this.state.students;
		const teacherFolder = this.state.folder;

		var renderStudentList 		= null;
		var renderStudentContent 	= null;

		// Render a list of students
		if(studentList.length !== 0) {
     	renderStudentList = studentList.map( (student, index) => {
     		var avatarPath = defaultAvatar;
     		if(student.avatarId !== 0) {
     			avatarPath = teacherFolder + '/students/' + student.lastName + '_' + student.firstName + '_' + student.id +  '/images/image_' + student.avatarId;
     		}

				return <ListItem 	className="user-wrapper"
													label={student.id}
													key={student.id}
													avatar={avatarPath}
								          caption={student.lastName + ' ' + student.firstName}
								          onClick={() => this.renderStudentContent(index)} />
			});		
		}

		if(studentList.length !== 0) {
			renderStudentContent = <Student student={studentList[this.state.studentIndex]} />;
		}

		return (
			<div className="teacher-page-main">
				<Dialog className="teacher-page-dialog" active={this.state.addStudentDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input type='text' label='Last Name' name='lastName' value={this.state.lastName} onChange={this.handleAddStudentChange.bind(this, 'lastName')} maxLength={32} />
					<Input type='text' label='First Name' name='firstName' value={this.state.firstName} onChange={this.handleAddStudentChange.bind(this, 'firstName')} maxLength={32} />
					<Input type='date' label='DoB' name='DoB' value={this.state.DoB} onChange={this.handleAddStudentChange.bind(this, 'DoB')} maxLength={32} />

			    <Button icon='add' label='Submit' onClick={this.handleAddStudentRequest} raised primary />
      	</Dialog>
				<div className="teacher-page-left">
					<List selectable ripple className="teacher-page-list">
			      <ListSubHeader caption='Students' />
			      {renderStudentList}
			    </List>
			    <div className="teacher-page-list-bottom">
			    	<Button icon='add' label='Add student' onClick={this.handleOpenAddStudentDialog} accent primary />
			    </div>
				</div>
				<div className="teacher-page-right">
					{renderStudentContent}
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderTeacherContentStudent />
		);
	}
}


export default TeacherContentStudent;