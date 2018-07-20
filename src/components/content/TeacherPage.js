import React, { Component } from 'react';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Banner 				from '../commons/Banner';
import TeacherContentManager from './teacherpage/TeacherContentManager';
import TeacherContentStudent from './teacherpage/TeacherContentStudent';

import '../../css/content/teacherPage.css';

class TeacherPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teacherResources: null,
			teacherPageIndex: 0,
			listClicked: 'manager',
			studentIndex: 0,
			managerIndex: 0,
		};
		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	handleFixedTabChange(index) {
		this.setState({
			teacherPageIndex: index
		});
	}

	RenderTeacherPage = () => {
		const resources = this.props.resources;
		const teacherFolder = resources.teacherFolder;
		const managerList 	= resources.teacherManagerList;
		const studentList 	= resources.teacherStudentList;

		const teacherPageIndex = this.state.teacherPageIndex;

		var renderTeacherContent = <TeacherContentStudent students={studentList} folder={teacherFolder} />;
		if(teacherPageIndex === 1)
			renderTeacherContent = <TeacherContentManager managers={managerList} folder={teacherFolder} />;

		return (
			<div className="teacher-page-container">
				<Banner alt="banner-icon" />
				<div className="teacher-page-content">
					<Tabs index={teacherPageIndex} className="teacher-page-tabs" onChange={this.handleFixedTabChange} fixed>
					  <Tab label='Students'></Tab>
					  <Tab label='Managers'></Tab>
					</Tabs>
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