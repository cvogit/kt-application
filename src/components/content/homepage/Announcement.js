import React, { Component } from 'react';

class Announcement extends Component {
	constructor(props) {
		super(props);
		this.getDayFromDate = this.getDayFromDate.bind(this);
		this.getMonthFromDate = this.getMonthFromDate.bind(this);
	}

	getDayFromDate(pDate) {
		var tSec = Date.parse(pDate.toString());
		var tDate = new Date(tSec);
		return tDate.getDate();
	}

	getMonthFromDate(pDate) {
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
		  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
		];

		var tSec = Date.parse(pDate.toString());
		var tDate = new Date(tSec);
		return monthNames[tDate.getMonth()];
	}

	render() {	
		return (
			<div className="announcement-container">
				<div className="row">
					<div className="announcement-date col-1">			
						<h4>{ this.getMonthFromDate(this.props.date) }</h4>
						<h5>{ this.getDayFromDate(this.props.date) }</h5>
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