import React, { Component } from 'react';

class TeacherContentManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};

		this.RenderTeacherContentManager = this.RenderTeacherContentManager.bind(this);
	}

	componentDidMount() {

	}

	

	RenderTeacherContentManager = () => {
		console.log(this.props.manager);
		
		return (
			<div className="teacher-page-content">
				
			</div>
			);
	}

	render() {	
		return (
			<this.RenderTeacherContentManager />
		);
	}
}


export default TeacherContentManager;