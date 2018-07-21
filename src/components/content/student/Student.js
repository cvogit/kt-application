import React, { Component } from 'react';

import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Reports from './Reports';

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
				studentContent = <Reports reports={this.props.student.reports} studentId={this.props.student.id} />
			} else if(studentIndex === 1) {
				studentContent = <div />
			} else if(studentIndex === 2) {
				studentContent = <div />
			} 
		}

		return (
			<div className="student-container">
				<Tabs index={this.state.studentIndex} onChange={this.handleFixedTabChange} fixed>
          <Tab label='Reports'></Tab>
          <Tab label='Images'></Tab>
          <Tab label='Info'></Tab>
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