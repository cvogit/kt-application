import React, { Component } from 'react';

import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import ReportList from './ReportList';
import StudentForms 	from './StudentForms';

import '../../../css/student.css';

class Student extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentIndex: 0,
		};
		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	handleFixedTabChange(index) {
		this.setState({
			studentIndex: index
		});
	}

	RenderStudent = () => {

		var studentIndex = this.state.studentIndex;
		var studentContent = null;

		if(this.props.student !== null) {
			if(studentIndex === 0) {
				studentContent = <ReportList role={this.props.role} reports={this.props.student.reports} studentId={this.props.student.id} />
			} else if(studentIndex === 1) {
				studentContent = <StudentForms student={this.props.student} />
			} else if(studentIndex === 2) {
				studentContent = <div />
			} 
		}

		return (
			<div className="student-container">
				<Tabs className="student-tabs" index={this.state.studentIndex} onChange={this.handleFixedTabChange} fixed>
          <Tab label='Reports'></Tab>
          <Tab label='Forms'></Tab>
          <Tab label='Images'></Tab>
        </Tabs>
        {studentContent}
			</div>
			);
	}

	render() {	
		return (
			<this.RenderStudent />
		);
	}
}


export default Student;