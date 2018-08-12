import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Input  from 'react-toolbox/lib/input/Input';

import Report 			from './Report';

import '../../../css/reports.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class ReportList extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			report: '',
			reportPart: 0,
			reportSelected: null,
			addReportDialog: false,
			addReportContent: '',
		};

		this.handleAddReportRequest 		= this.handleAddReportRequest.bind(this);
		this.handleReportPartChange 		= this.handleReportPartChange.bind(this);
		this.handleOpenAddReportDialog 	= this.handleOpenAddReportDialog.bind(this);
		this.handleReportExit 	= this.handleReportExit.bind(this);
		this.handleReportChange = this.handleReportChange.bind(this);
	}

	shouldComponentUpdate(prevProps, prevState) {
	  if (prevProps.studentId !== this.props.studentId) {
	    this.setState({
	    	reportSelected: null,
	    })
	  }
	  return true;
	}

	handleReportPartChange(index) {
		this.setState({
    	reportPart: index,
    });
	}

	handleOpenAddReportDialog() {
    this.setState({
    	addReportDialog: true,
    });
	}

	handleAddReportRequest() {
		ipcRenderer.send('addReportRequest', this.state.addReportContent, this.props.studentId);
		this.setState({
    	addReportDialog: false,
    });
	}

	handleReportExit(event) {
		event.preventDefault();
    this.setState({
    	addReportDialog: false,
    });
  }

	handleReportChange(value) {
		this.setState({
			reportSelected: value
		});

		var Reports 				= this.props.reports;
		var SelectedReport 	= Reports[value];

		this.setState({
			reportPart: 0,
			reportSelected: value
		});
	}

	handleAddReportContentChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

	reportDropdown (report) {
    const name = report.student.name;
    return (
      <div className="dropdown-container">
        <div className="dropdown-content">
          <strong>{name}</strong>
          <small>{report.created_at}</small>
        </div>
      </div>
    );
  }

	RenderReportList = () => {
		var Reports = this.props.reports;
		var count 	= 0;
		var ReportSelected 	= this.state.reportSelected;
		var ReportContent 	= null;

		// Recount the report in case new report are added
		if(Reports) {
			Reports.forEach( (report) => {
				report['value'] = count;
				count++;
			});
		} else 
			Reports = [];

	  // Render the part of the report the user want to look at
		if(ReportSelected !== null && Reports[ReportSelected] !== null) {
			ReportContent = <Report role={this.props.role} report={Reports[ReportSelected]} />
		} else {
			ReportContent = <div className="report-content"></div>;
		}

		return (
			<div className="report-list-container" >
				<Dialog className="report-part-dialog" active={this.state.addReportDialog} onOverlayClick={this.handleReportExit}>
					<Input className="toolbox-textarea-report-part" type='text' multiline rows={10} label='Report part 1' value={this.state.addReportContent} onChange={this.handleAddReportContentChange.bind(this, 'addReportContent')} maxLength={65535} />
			    
			    <Button className="submit-report-button" icon='add' label='Submit' onClick={this.handleAddReportRequest} raised primary />
      	</Dialog>
				<Dropdown
					className="report-dropdown"
          auto={false}
          source={Reports}
          onChange={this.handleReportChange}
          label='Select a report.'
          template={this.reportDropdown}
          value={this.state.reportSelected}
        />
        <Button className="report-button" icon='add' label='Add Report' onClick={this.handleOpenAddReportDialog} raised primary />
        <div className="report-container">
        	{ReportContent}
        </div>
      </div>
			);
	}

	render() {	

		return (
			<this.RenderReportList />
			);
	}

}

export default ReportList;