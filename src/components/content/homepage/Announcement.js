import React, { Component } from 'react';

class Announcement extends Component {
	constructor(props) {
		super(props);
	}


	render() {	
		return (
			<div className="announcement-container">
				<div className="row">
					<div className="announcement-date col-1">			
						<h6>{ this.props.date }</h6>
					</div>
					<div className="announcement-content col-11">
						<h2 className="announcement-title">{ this.props.title }</h2>
						<p>{ this.props.content }</p>
					</div>
					<div className="announcement-bar col-12"></div>
				</div>
			</div>
		);
	}
}


export default Announcement;