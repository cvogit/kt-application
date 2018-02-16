import React, { Component } from 'react';

class Announcement extends Component {
	constructor(props) {
		super(props);
	}


	render() {	
		return (
			<div className="announcement-container">
				<div className="announcement-date">			
					<h5>{ this.props.date }</h5>
				</div>
				<div className="announcement-title">
					<h2>{ this.props.title }</h2>
				</div>
				<div className="announcement-content">
					<p>{ this.props.content }</p>
				</div>
			</div>
		);
	}
}


export default Announcement;