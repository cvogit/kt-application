import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';
import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import Student from '../student/Student.js'
import defaultAvatar from '../../../images/default_avatar.png';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class ManageStudents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addStudentDialog: false,
			listClicked: 	null,
			studentIndex: null,
			studentName: '',
			DoB: '',
		};

		this.handleAddStudentChange 	= this.handleAddStudentChange.bind(this);
		this.handleAddStudentRequest 	= this.handleAddStudentRequest.bind(this);
		this.handleDialogExit 				= this.handleDialogExit.bind(this);
		this.handleOpenAddStudentDialog 	= this.handleOpenAddStudentDialog.bind(this);
		this.renderInactiveStudentContent = this.renderInactiveStudentContent.bind(this);
		this.renderStudentContent 				= this.renderStudentContent.bind(this);
	}

	handleAddStudentChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

	handleAddStudentRequest() {
		ipcRenderer.send('addStudentRequest', this.state.studentName, this.state.DoB);
		this.setState({
    	addStudentDialog: false,
    });
	}

	handleDialogExit() {
		this.setState({
    	formEditDialog: false,
    });
	}

	handleOpenAddStudentDialog() {
    this.setState({
    	addStudentDialog: true,
    });
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
				<Dialog className="add-student-dialog" active={this.state.addStudentDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input type='text' label='Name' name='student name' value={this.state.studentName} onChange={this.handleAddStudentChange.bind(this, 'studentName')} maxLength={32} />
					<Input type='date' label='DoB' name='DoB' value={this.state.DoB} onChange={this.handleAddStudentChange.bind(this, 'DoB')} maxLength={32} />

			    <Button icon='add' label='Submit' onClick={this.handleAddStudentRequest} raised primary />
      	</Dialog>
				<div className="manage-student-content">
					<List selectable ripple className="student-list">
			    	<Button icon='add' label='Add student' onClick={this.handleOpenAddStudentDialog} accent primary />
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