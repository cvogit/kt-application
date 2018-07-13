import React, { Component } from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import Banner 				from '../commons/Banner';
import TeacherContentManager from './teacherpage/TeacherContentManager';
import TeacherContentStudent from './teacherpage/TeacherContentStudent';

import defaultAvatar from '../../images/default_avatar.png';

import '../../css/content/teacherPage.css';

class TeacherPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teacherResources: null,
			listClicked: 'manager',
			studentIndex: 0,
			managerIndex: 0,
		};

		this.renderManagerContent = this.renderManagerContent.bind(this);
	}

	componentDidMount() {

	}

	renderManagerContent(managerIndex) {
		this.setState({
			listClicked: 'manager',
			managerIndex: managerIndex,
		});
	}

	renderStudentContent(studentIndex) {
		this.setState({
			listClicked: 'student',
			studentIndex: studentIndex,
		});
	}

	RenderTeacherPage = () => {
		const resources = this.props.resources;
		const teacherFolder = resources.teacherFolder;

		var managerList = resources.teacherManagerList;
		var studentList = resources.teacherStudentList;

		var renderManagerList = null;
		var renderStudentList = null;
		var renderTeacherContent = null;

		// Render a list of managers
		if(managerList.length === 0) {
			managerList = null;
		} else {
			var index = 0;
     	renderManagerList = managerList.map( (manager, index) => {
     		var avatarPath = defaultAvatar;
     		if(manager.avatarId !== 0) {
     			avatarPath = teacherFolder + '/managers/' + manager.lastName + '_' + manager.firstName + '_' + manager.id +  '/images/image_' + manager.avatarId;
     		}

				return <ListItem 	className="user-wrapper"
													label={manager.id}
													key={manager.id}
													avatar={avatarPath}
								          caption={manager.lastName + ' ' + manager.firstName}
								          onClick={() => this.renderManagerContent(index)} />
			});		
		}

		// Render a list of students
		if(studentList.length === 0) {
			renderStudentList = null;
		} else {
			var index = 0;
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

		// Render the current select user information
		if(this.state.listClicked && (this.state.userIndex !== null)) {
			if(this.state.listClicked === 'student') {
				renderTeacherContent = <TeacherContentStudent student={studentList[this.state.studentIndex]} />
			} else if (this.state.listClicked === 'manager') {
				renderTeacherContent = <TeacherContentManager manager={managerList[this.state.managerIndex]} />
			}
		} else 
			renderTeacherContent = null;

		return (
			<div className="teacher-page-container">
				<Banner alt="banner-icon" />
				<div className="teacher-page-content">
					<List selectable ripple className="user-list">
		        <ListSubHeader caption='Students' />
		        {renderStudentList}
		        <ListSubHeader caption='Managers' />
		        {renderManagerList}
	        </List>
	        {renderTeacherContent}
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderTeacherPage />
		);
	}
}


export default TeacherPage;