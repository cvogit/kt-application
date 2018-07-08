import React, { Component } from 'react';

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
		ipcRenderer.send("getReports", 'employee', this.props.employee.reports);
		ipcRenderer.on('employeeReportsResult', this.handleLoadReports);
	}

	componentWillUnmount() {
		ipcRenderer.removeListener('employeeReportsResult', this.handleLoadReports);
	}

	componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
	  if (this.props.employee.id !== prevProps.employee.id) {
	    ipcRenderer.send("getReports", 'employee', this.props.employee.reports);
	  }
	}

	handleLoadReports(event, reports) {
		// Asign value property to each report for dropdown
		var count = this.state.reports.length;
		reports.forEach( (report) => {
			report['value'] = count;
			count++;
		});

		this.setState({
			reports: reports,
			reportSelected: 0,
		});
	}

	handleReportChange(value) {
		this.setState({
			reportSelected: value
		});
	}

	reportDropdown (report) {
    const name = report.student.firstName + ' ' + report.student.lastName + ': ' + report.student.studentId;

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
		var content 				= null;

		if(Reports.length !== 0) {
			SelectedReport 	= Reports[this.state.reportSelected];
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