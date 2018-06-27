import React, { Component } from 'react';

const electron = window.require('electron');

class MailSnippet extends Component {
	constructor(props) {
		super(props);
	}

	RenderMailSnippet = () => {
		// Fix up 'From'
		const pFrom 		= this.props.from.replace(/<.*>/,"");

		// Fix up 'Snippet'
		var textArea	= document.createElement("textarea");
		textArea.innerHTML = this.props.snippet;
		const pSnippet	= textArea.value;

		// Date
		var tDate;
		var tMailDate = new Date(parseInt(this.props.date, 10));
		const tCurrentDate = new Date();

		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
		  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
		];

		var regularTime = (pDate) => {
			var tHour 	= pDate.getHours();
			var tMinute = pDate.getMinutes();
			var tMeridies = ' am';

			if(tHour >= 12) {
				if(tHour !== 12)
					tHour = pDate.getHours() - 12;
				tMeridies = ' pm';
			}
			if(tMinute < 10)
				tMinute = '0' + tMinute;

			return tHour + ":" + tMinute + tMeridies;
		}

		if( tMailDate.getFullYear() === tCurrentDate.getFullYear() &&
				tMailDate.getMonth() === tCurrentDate.getMonth() &&
				tMailDate.getDate() === tCurrentDate.getDate() ) {
			tDate = regularTime(tMailDate);
		} else {
			tDate = tMailDate.getDate() + ", " + monthNames[tMailDate.getMonth()];
		}

		// The mail content
		const pContent = this.props.content;

		return (
			<div className="mail-snippet-container" onClick={() => this.props.onClick(pContent)} >
				<div className="snippet-from">
					{pFrom}
				</div>
				<div className="snippet-content">
					{pSnippet}
				</div>
				<div className="snippet-date">
					{tDate}
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderMailSnippet />
			);
	}
}

export default MailSnippet;
