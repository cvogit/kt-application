import React, { Component } from 'react';

class ReportPart extends Component { 
	constructor(props) {
		super(props);
	}

	RenderReportPart = () => {

		const title 	= this.props.title;
		const content =	this.props.content;

		return (
      <div className="report-part-container">
      	<div className="report-part-title">
      		{title}
      	</div>
				<div className="report-part-content">
      		{content}
      	</div>
      </div>
			);
	}

	render() {	

		return (
			<this.RenderReportPart />
			);
	}

}

export default ReportPart;