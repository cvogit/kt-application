import React, { Component } from 'react';

import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

class EmployeeReports extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			reportSelected: 0,
		};

		this.handleReportChange = this.handleReportChange.bind(this);
	}

	shouldComponentUpdate(prevProps, prevState) {
	  if (prevProps.reports !== this.props.reports) {
	    this.setState({
	    	reportSelected: 0,
	    })
	  }
	  return true;
	}

	handleReportChange(value) {
		this.setState({
			reportSelected: value
		});
	}

	reportDropdown (report) {
    const name = report.student.firstName + ' ' + report.student.lastName + ': ' + report.studentId;

    return (
      <div className="dropdown-container">
        <div className="dropdown-content">
          <strong>{name}</strong>
          <small>{report.created_at}</small>
        </div>
      </div>
    );
  }

	RenderEmployeeReports = () => {

		var Reports = this.props.reports;
		var count 	= 0;
		var SelectedReport 	= null;
		var content 				= null;

		if(Reports) {
			Reports.forEach( (report) => {
				report['value'] = count;
				count++;
			});

			if(Reports.length !== 0) {
				if(this.state.reportSelected >= Reports.length) {
					SelectedReport 	= Reports[0];
				} else
					SelectedReport 	= Reports[this.state.reportSelected];
					
				content 				= SelectedReport.content;
			}
		} else 
			Reports = [];

		return (
			<div className="employee-report" >
				<Dropdown
					className="report-dropdown"
          auto={false}
          source={Reports}
          onChange={this.handleReportChange}
          label='Select a report.'
          template={this.reportDropdown}
          value={this.state.reportSelected}
        />
        <div className="report-container">
        	<div className="report-content">{content}</div>
        </div>
      </div>
			);
	}

	render() {	

		return (
			<this.RenderEmployeeReports />
			);
	}

}

export default EmployeeReports;