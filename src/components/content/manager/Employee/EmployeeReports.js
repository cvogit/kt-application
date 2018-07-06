import React, { Component } from 'react';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class EmployeeReports extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			reports: [],
			reportSelected: '',
		};

		this.handleLoadReports = this.handleLoadReports.bind(this);
		this.handleReportChange = this.handleReportChange.bind(this);
	}

	componentDidMount() {
		ipcRenderer.send('getReports', 'employee', this.props.employee.reports);
		ipcRenderer.on('employeeReportsResult', this.handleLoadReports);
	}

	handleLoadReports(event, result) {
		// Asign value property to each report for dropdown
		var count = this.state.reports.length;
		result.forEach( (report) => {
			report['value'] = count;
			count++;
		});

		this.setState({
			reports: result,
			reportSelected: 0,
		});
	}

	handleReportChange(value) {
		this.setState({
			reportSelected: value
		});
	}

	reportDropdown (report) {
    const name = report.student.firstName + ' ' + report.student.lastName;

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

		const Reports 			= this.state.reports;
		var SelectedReport 	= null;
		var studentName = null;
		var content 		= null;

		if(Reports.length !== 0) {
			SelectedReport 	= Reports[this.state.reportSelected];
			studentName 		= SelectedReport.student.firstName + ' ' + SelectedReport.student.lastName;
			content 				= SelectedReport.content;
		}

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
        	<h4>{studentName}</h4>
        	<span>{content}</span>
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