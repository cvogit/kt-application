import React, { Component } from 'react';

class Announcement extends Component {
	constructor(props) {
		super(props);
	}


	render() {	
		return (
			<div className="announcement-container">
				<div className="announcement-date">			
					{ this.props.date }
				</div>
				<div className="announcement-title">
					{ this.props.title }
				</div>
				<div className="announcement-content">
					{ this.props.content }
				</div>
			</div>
		);
	}
}


export default Announcement;