import React, { Component } from 'react';

import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

class TeacherContentStudent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teacherPageIndex: 0,
		};

		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	handleFixedTabChange(index) {
		this.setState({
			teacherPageIndex: index
		});
	}

	RenderTeacherContentStudent = () => {

		const teacherPageIndex = this.state.teacherPageIndex;

		console.log(teacherPageIndex);
		console.log(this.props);

		return (
			<div className="teacher-page-content">
				<Tabs index={teacherPageIndex} onChange={this.handleFixedTabChange} fixed>
          <Tab label='Reports'></Tab>
          <Tab label='Info'></Tab>
        </Tabs>
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